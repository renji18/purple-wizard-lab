import { Excalidraw } from "@excalidraw/excalidraw"
import { MyDispatch, MySelector } from "../redux/store"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setCurrentFile } from "../redux/canvasSlice"
import { toast } from "sonner"
import SaveModal from "../components/canvas/SaveModal"
import MainMenuTemplate from "../components/canvas/MainMenuTemplate"
import WelcomeScreenTemplate from "../components/canvas/WelcomeScreenTemplate"
import RenderTopUiTemplate from "../components/canvas/RenderTopUiTemplate"
import "../styles/canvas.scss"

const Canvas = () => {
  const location = useLocation()
  const dispatch = useDispatch<MyDispatch>()
  const { currentFile, allFiles } = MySelector((state) => state.canvas)
  const { theme } = MySelector((state) => state.theme)

  const [excalidrawAPI, setExcalidrawAPI] = useState<any>(null)
  const [whiteboardData, setWhiteBoardData] = useState<any>(null)
  const [selectedServer, setSelectedServer] = useState<string>("")
  const [openModal, setOpenModal] = useState<boolean>(false)

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
            renderTopRightUI={() => (
              <RenderTopUiTemplate
                whiteboardData={whiteboardData}
                excalidrawAPI={excalidrawAPI}
                selectedServer={selectedServer}
                setSelectedServer={setSelectedServer}
                setOpenModal={setOpenModal}
              />
            )}
          >
            <MainMenuTemplate />
            <WelcomeScreenTemplate />
          </Excalidraw>
        </div>
      )}

      <SaveModal
        whiteboardData={whiteboardData}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </div>
  )
}

export default Canvas
