import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw"
import { MyDispatch, MySelector } from "../redux/store"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { useDispatch } from "react-redux"
import { saveFile, setCurrentFile } from "../redux/canvasSlice"
import { toast } from "sonner"
import Form from "../components/canvas/Form"
import Sidebar from "../components/canvas/Sidebar"
import { nanoid } from "nanoid"
import "../styles/canvas.scss"

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

  const save = () => {
    dispatch(saveFile(whiteboardData))
  }

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

  useEffect(() => {
    if (currentFile) return
    if (!location) return
    if (!allFiles) return
    const fileId = location.pathname.split("/")[2]
    dispatch(setCurrentFile({ id: fileId }))
  }, [location, allFiles])

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
                  <Form
                    selectedServer={selectedServer}
                    setSelectedServer={setSelectedServer}
                    theme={theme}
                    serverData={serverData}
                  />
                  <button
                    className="bg-purple-600 outline-none py-1 px-6 rounded-lg text-lg text-white z-[500]"
                    onClick={save}
                  >
                    Save
                  </button>
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
    </div>
  )
}

export default Canvas
