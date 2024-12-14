import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import { useEffect } from "react"
import { Toaster } from "sonner"
import Canvas from "./pages/Canvas"
import { useDispatch } from "react-redux"
import { MyDispatch, MySelector } from "./redux/store"
import { setAllFiles, setAllTemplates } from "./redux/canvasSlice"

const App = () => {
  const dispatch = useDispatch<MyDispatch>()

  const { theme } = MySelector((state) => state.theme)

  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark")
    else document.documentElement.classList.remove("dark")
  }, [theme])

  useEffect(() => {
    const savedFiles = sessionStorage.getItem(
      process.env.REACT_APP_FILE_DATA_PURPLE_WIZARD_LAB || ""
    )
    const savedTemplates = sessionStorage.getItem(
      process.env.REACT_APP_TEMPLATE_DATA_PURPLE_WIZARD_LAB || ""
    )
    if (savedFiles) dispatch(setAllFiles(JSON.parse(savedFiles)))
    if (savedTemplates) dispatch(setAllTemplates(JSON.parse(savedTemplates)))
  }, [])

  return (
    <>
      <div className="hidden min-h-screen bg-themeDarkWhite dark:bg-themeDarkBlack lg:flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lab/:id" element={<Canvas />} />
        </Routes>
        <Toaster richColors />
      </div>
      <div className="flex lg:hidden justify-center items-center h-screen w-screen bg-themeDarkWhite dark:bg-themeDarkBlack text-themeLightBlack dark:text-themeLightWhite">
        Please use a desktop for this site.
      </div>
    </>
  )
}

export default App
