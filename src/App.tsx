import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import { useEffect, useState } from "react"
import { Toaster } from "sonner"
import Canvas from "./pages/Canvas"
import { useDispatch } from "react-redux"
import { MyDispatch } from "./redux/store"
import { setAllFiles } from "./redux/canvasSlice"

const App = () => {
  const dispatch = useDispatch<MyDispatch>()
  const [theme, setTheme] = useState("dark")

  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark")
    else document.documentElement.classList.remove("dark")
  }, [theme])

  useEffect(() => {
    const savedFiles = sessionStorage.getItem(
      process.env.REACT_APP_FILE_DATA_PURPLE_WIZARD_LAB || ""
    )
    if (savedFiles) dispatch(setAllFiles(JSON.parse(savedFiles)))
  }, [])

  return (
    <div className="min-h-screen bg-themeDarkWhite dark:bg-themeDarkBlack flex flex-col">
      <Navbar theme={theme} setTheme={setTheme} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lab/:id" element={<Canvas theme={theme} />} />
      </Routes>
      <Toaster richColors />
    </div>
  )
}

export default App
