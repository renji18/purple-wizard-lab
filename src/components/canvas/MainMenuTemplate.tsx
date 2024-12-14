import { MainMenu } from "@excalidraw/excalidraw"

const MainMenuTemplate = () => {
  return (
    <MainMenu>
      <MainMenu.DefaultItems.ClearCanvas />
      <MainMenu.DefaultItems.SaveAsImage />
      <MainMenu.DefaultItems.Export />
    </MainMenu>
  )
}

export default MainMenuTemplate
