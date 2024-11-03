import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw"
import { MyDispatch, MySelector } from "../redux/store"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { useDispatch } from "react-redux"
import { saveFile, setCurrentFile } from "../redux/canvasSlice"

const Canvas = ({ theme }: { theme: string }) => {
  const location = useLocation()
  const dispatch = useDispatch<MyDispatch>()
  const { currentFile, allFiles } = MySelector((state) => state.canvas)

  const [whiteboardData, setWhiteBoardData] = useState<any>(null)

  const save = () => {
    dispatch(saveFile(whiteboardData))
  }

  useEffect(() => {
    if (currentFile) return
    if (!location) return
    if (!allFiles) return
    const fileId = location.pathname.split("/")[2]
    dispatch(setCurrentFile({ id: fileId }))
  }, [location, allFiles])

  return (
    <div className="flex flex-1">
      {currentFile && (
        <div className="flex-1">
          <Excalidraw
            initialData={{
              elements: currentFile?.canvas && currentFile?.canvas,
              scrollToContent: true,
            }}
            theme={theme === "dark" ? "dark" : "light"}
            onChange={(excalidrawElements, appState, files) =>
              setWhiteBoardData(excalidrawElements)
            }
            renderTopRightUI={() => {
              return (
                <button
                  className="bg-purple-600 py-1 px-6 rounded-lg text-lg text-white"
                  onClick={save}
                >
                  Save
                </button>
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
