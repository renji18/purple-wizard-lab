import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import { ReduxProvider } from "./redux/provider"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <ReduxProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ReduxProvider>
)
