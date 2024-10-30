import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import { useEffect, useState } from "react"
import { Toaster } from "sonner"
import Canvas from "./pages/Canvas"

const App = () => {
  const [theme, setTheme] = useState("dark")
  const [allFiles, setAllFiles] = useState<
    | Array<{
        id: string
        fileName: string
        canvas?: string
      }>
    | null
    | undefined
  >(null)

  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark")
    else document.documentElement.classList.remove("dark")
  }, [theme])

  useEffect(() => {
    const savedFiles = sessionStorage.getItem(
      process.env.REACT_APP_FILE_DATA_PURPLE_WIZARD_LAB || ""
    )
    if (savedFiles) setAllFiles(JSON.parse(savedFiles))
  }, [])

  return (
    <div className="min-h-screen bg-themeDarkWhite dark:bg-themeDarkBlack flex flex-col">
      <Navbar
        theme={theme}
        setTheme={setTheme}
        allFiles={allFiles}
        setAllFiles={setAllFiles}
      />
      <Routes>
        <Route path="/" element={<Home allFiles={allFiles} />} />
        <Route
          path="/canvas/:id"
          element={
            <Canvas
              allFiles={allFiles}
              setAllFiles={setAllFiles}
              theme={theme}
            />
          }
        />
      </Routes>
      <Toaster richColors />
    </div>
  )
}

export default App
