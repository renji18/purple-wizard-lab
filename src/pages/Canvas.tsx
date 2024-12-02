import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw"
import { MyDispatch, MySelector } from "../redux/store"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { useDispatch } from "react-redux"
import { saveAsTemplate, saveFile, setCurrentFile } from "../redux/canvasSlice"
import { toast } from "sonner"
import Form from "../components/canvas/Form"
import Sidebar from "../components/canvas/Sidebar"
import { nanoid } from "nanoid"
import "../styles/canvas.scss"
import { Box, Modal } from "@mui/material"
import TemplateMenu from "../components/canvas/TemplateMenu"
import SaveMenu from "../components/canvas/SaveMenu"

const commonConfig = {
  angle: 0,
  backgroundColor: "transparent",
  fillStyle: "solid",
  groupIds: [],
  opacity: 100,
  roughness: 1,
  strokeColor: "#1e1e1e",
  strokeStyle: "solid",
  strokeWidth: 2,
}

const commonTextConfig = {
  fontFamily: 1,
  fontSize: 15,
  lineHeight: 1.25,
  textAlign: "center",
  type: "text",
  x: 130,
  ...commonConfig,
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 3,
}

const Canvas = ({ theme }: { theme: string }) => {
  const location = useLocation()
  const dispatch = useDispatch<MyDispatch>()
  const { currentFile, allFiles } = MySelector((state) => state.canvas)

  const serverData: Array<{
    name: string
    components: Array<{
      name: string
      content: Array<{ name: string; shape: string }>
    }>
  }> = [
    {
      name: "AWS",
      components: [
        {
          name: "Operating System",
          content: [
            { name: "Windows 2019", shape: "rectangle" },
            { name: "Windows 2016", shape: "rectangle" },
            { name: "Windows 10", shape: "rectangle" },
            { name: "Windows 7", shape: "rectangle" },
            { name: "Ubuntu 22.04", shape: "rectangle" },
            { name: "Ubuntu Server 22.04", shape: "rectangle" },
            { name: "Kali Linux", shape: "rectangle" },
          ],
        },
        {
          name: "Configurations",
          content: [
            { name: "Install Active Directory", shape: "ellipse" },
            { name: "Join Domain", shape: "ellipse" },
            { name: "Install Splunk Server", shape: "ellipse" },
            { name: "Install Splunk Forwarder", shape: "ellipse" },
            { name: "Install Sysmon", shape: "ellipse" },
            { name: "Enable CommandLine Logging", shape: "ellipse" },
            { name: "Enable Powershell Logging", shape: "ellipse" },
            { name: "ASREPRoasting Vulnerability", shape: "ellipse" },
            { name: "Vulnerable Share", shape: "ellipse" },
          ],
        },
      ],
    },
  ]

  const [excalidrawAPI, setExcalidrawAPI] = useState<any>(null)
  const [whiteboardData, setWhiteBoardData] = useState<any>(null)
  const [selectedServer, setSelectedServer] = useState<string>("")
  const [open, setOpen] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [templateName, setTemplateName] = useState<string>("")
  const [templateNameError, setTemplateNameError] = useState<boolean>(false)

  const openSidebar = () => {
    if (selectedServer === "") return toast.info("Select a Server First")
    setOpen(true)
  }

  const closeSidebar = () => {
    setOpen(false)
  }

  function appendToWhiteBoard(type: string, text: string) {
    const containerId = nanoid()
    const textId = nanoid()

    const newData =
      type === "rectangle"
        ? [
            {
              boundElements: [{ type: "text", id: textId }],
              height: 74.9453125,
              id: containerId,
              roundness: {
                type: 3,
                value: 32,
              },
              type,
              width: 230,
              x: 100,
              y: 100,
              ...commonConfig,
            },
            {
              baseline: 16,
              containerId,
              height: 22,
              id: textId,
              originalText: text,
              text,
              verticalAlign: "center",
              width: 178.3199005126953,
              y: 132,
              ...commonTextConfig,
            },
          ]
        : [
            {
              boundElements: [{ type: "text", id: textId }],
              height: 175,
              id: containerId,
              roundness: {
                type: 2,
              },
              type,
              width: 175,
              x: 100,
              y: 100,
              ...commonConfig,
            },
            {
              baseline: 36,
              containerId,
              height: 52,
              id: textId,
              originalText: text,
              text: text.replace(/ /g, "\n"),
              verticalAlign: "middle",
              width: 110.48292541503906,
              y: 162,
              ...commonTextConfig,
            },
          ]

    excalidrawAPI?.updateScene({ elements: [...whiteboardData, ...newData] })
  }

  const appendTemplateToWhiteBoard = (template: any) => {
    const newData =
      Array.isArray(whiteboardData) && whiteboardData.length > 0
        ? [...whiteboardData, ...template]
        : template

    excalidrawAPI?.updateScene({
      elements: newData,
    })
    dispatch(saveFile(newData))
    window.location.reload()
  }

  // effect to check the dependence between join domain and active directory
  useEffect(() => {
    if (!Array.isArray(whiteboardData)) return

    const hasJoinDomain = whiteboardData?.filter(
      (wd) => wd?.originalText === "Join Domain"
    )
    if (hasJoinDomain?.length === 0) return

    const hasActiveDirectory = whiteboardData?.filter(
      (wd) => wd?.originalText === "Install Active Directory"
    )
    if (hasActiveDirectory?.length > 0) return

    toast.info("Active Directory is required for Join Domain")
  }, [whiteboardData])

  // effect to set current file
  useEffect(() => {
    if (currentFile) return
    if (!location) return
    if (!allFiles) return
    const fileId = location.pathname.split("/")[2]
    dispatch(setCurrentFile({ id: fileId }))
  }, [location, allFiles])

  // effect to update the previous state of the current file
  useEffect(() => {
    if (!currentFile) return
    if (currentFile.server) setSelectedServer(currentFile.server)
    if (currentFile.canvas) excalidrawAPI?.updateScene(currentFile.canvas)
  }, [currentFile])

  return (
    <div className="flex flex-1">
      {currentFile && (
        <div className="flex-1" id="canvas-wrapper">
          <Excalidraw
            initialData={{
              elements: currentFile?.canvas && currentFile?.canvas,
              scrollToContent: true,
            }}
            theme={theme === "dark" ? "dark" : "light"}
            onChange={(excalidrawElements, appState, files) =>
              setWhiteBoardData(excalidrawElements)
            }
            excalidrawAPI={(api) => setExcalidrawAPI(api)}
            renderTopRightUI={() => {
              return (
                <>
                  <TemplateMenu
                    appendTemplateToWhiteBoard={appendTemplateToWhiteBoard}
                  />

                  <Form
                    selectedServer={selectedServer}
                    setSelectedServer={setSelectedServer}
                    theme={theme}
                    serverData={serverData}
                  />

                  <SaveMenu
                    whiteboardData={whiteboardData}
                    setOpenModal={setOpenModal}
                  />

                  <Sidebar
                    open={open}
                    closeSidebar={closeSidebar}
                    serverData={serverData}
                    selectedServer={selectedServer}
                    openSidebar={openSidebar}
                    appendToWhiteBoard={appendToWhiteBoard}
                  />
                </>
              )
            }}
          >
            <MainMenu>
              <MainMenu.DefaultItems.ClearCanvas />
              <MainMenu.DefaultItems.SaveAsImage />
              <MainMenu.DefaultItems.ChangeCanvasBackground />
              <MainMenu.DefaultItems.Export />
            </MainMenu>
            <WelcomeScreen>
              <WelcomeScreen.Hints.HelpHint />
              <WelcomeScreen.Hints.MenuHint />
              <WelcomeScreen.Hints.ToolbarHint />
              <WelcomeScreen.Center>
                <WelcomeScreen.Center.Logo>
                  Purple Wizard Lab
                </WelcomeScreen.Center.Logo>
                <WelcomeScreen.Center.Heading>
                  Diagrams. Made. Simple
                </WelcomeScreen.Center.Heading>
              </WelcomeScreen.Center>
            </WelcomeScreen>
          </Excalidraw>
        </div>
      )}

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...style,
            outline: "none",
            borderRadius: "8px",
          }}
        >
          <p className="text-2xl font-prosto text-center py-5">Save Template</p>

          <input
            type="text"
            className="border w-full rounded-md px-2 py-1"
            placeholder="Template Name Here..."
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
          />
          {templateNameError && (
            <p className="text-sm text-red-600 font-bold">
              Template Name Is Required
            </p>
          )}

          <button
            onClick={() => {
              if (templateName) {
                dispatch(
                  saveAsTemplate({
                    template: whiteboardData,
                    name: templateName,
                  })
                )
                dispatch(saveFile(whiteboardData))
                setOpenModal(false)
                window.location.reload()
              } else setTemplateNameError(true)
            }}
            className={
              "text-white disabled:bg-purple-600/60 bg-purple-600 px-8 mt-3 max-w-fit float-right py-2 rounded-lg"
            }
          >
            Save
          </button>
        </Box>
      </Modal>
    </div>
  )
}

export default Canvas
