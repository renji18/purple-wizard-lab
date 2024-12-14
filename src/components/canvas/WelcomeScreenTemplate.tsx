import { WelcomeScreen } from "@excalidraw/excalidraw"

const WelcomeScreenTemplate = () => {
  return (
    <WelcomeScreen>
      <WelcomeScreen.Hints.HelpHint />
      <WelcomeScreen.Hints.MenuHint />
      <WelcomeScreen.Hints.ToolbarHint />
      <WelcomeScreen.Center>
        <WelcomeScreen.Center.Logo>Purple Wizard Lab</WelcomeScreen.Center.Logo>
        <WelcomeScreen.Center.Heading>
          Diagrams. Made. Simple
        </WelcomeScreen.Center.Heading>
      </WelcomeScreen.Center>
    </WelcomeScreen>
  )
}

export default WelcomeScreenTemplate
