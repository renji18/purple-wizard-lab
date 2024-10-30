import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw"

const Canvas = ({
  allFiles,
  setAllFiles,
  theme,
}: {
  allFiles: Array<{ id: string; fileName: string }> | null | undefined
  setAllFiles: (arg: typeof allFiles) => void
  theme: string
}) => {
  const location = useLocation()

  const [whiteboardData, setWhiteBoardData] = useState<any>(null)
  const [file, setFile] = useState<{
    id: string
    fileName: string
    canvas?: string
  } | null>(null)

  useEffect(() => {
    const updateFile:
      | Array<{
          id: string
          fileName: string
          canvas?: string
        }>
      | undefined = allFiles?.map(
      (af: { id: string; fileName: string; canvas?: string }) =>
        af.id === file?.id
          ? { ...af, canvas: JSON.stringify(whiteboardData) }
          : af
    )
    setAllFiles(updateFile)
  }, [whiteboardData])

  useEffect(() => {
    if (!location) return
    const openId = location.pathname.split("/")[2]
    const openFile = allFiles?.find((f) => f.id === openId)
    if (openFile) setFile(openFile)
  }, [location, allFiles])

  return (
    <div className="flex flex-1">
      <div className="flex-1">
        <Excalidraw
          initialData={{
            elements: file && file.canvas && JSON.parse(file?.canvas),
          }}
          theme={theme === "dark" ? "dark" : "light"}
          onChange={(excalidrawElements, appState, files) =>
            setWhiteBoardData(excalidrawElements)
          }
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
    </div>
  )
}

export default Canvas
