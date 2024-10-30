import { Box, Modal } from "@mui/material"
import uploadIcon from "../assets/uploadIcon.svg"
import { useEffect, useState } from "react"
import { nanoid } from "nanoid"
import { toast } from "sonner"
import { useLocation, useNavigate } from "react-router-dom"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
}

const Navbar = ({
  theme,
  setTheme,
  allFiles,
  setAllFiles,
}: {
  theme: string
  setTheme: (arg: string) => void
  allFiles: Array<{ id: string; fileName: string }> | null | undefined
  setAllFiles: (arg: typeof allFiles) => void
}) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = useState<boolean>(false)
  const [fileName, setFileName] = useState<string>("")
  const [activeFileName, setActiveFileName] = useState<string>("")

  const tabs = [{ title: "New", func: newFile }]

  function newFile() {
    setOpen(true)
  }

  const handleToggle = () => {
    const toggleElement = document.getElementById("toggle-circle")
    const toggleParent = document.getElementById("toggle-handler")

    if (
      toggleElement &&
      toggleParent &&
      toggleElement.classList.contains("toggle-left")
    ) {
      toggleElement.classList.remove("toggle-left")
      toggleElement.classList.add("toggle-right")
      toggleParent.classList.remove("toggle-off")
      toggleParent.classList.add("toggle-on")
    } else if (
      toggleElement &&
      toggleParent &&
      toggleElement.classList.contains("toggle-right")
    ) {
      toggleElement.classList.remove("toggle-right")
      toggleElement.classList.add("toggle-left")
      toggleParent.classList.remove("toggle-on")
      toggleParent.classList.add("toggle-off")
    }

    setTheme(theme === "dark" ? "light" : "dark")
  }

  const createFile = () => {
    const existingFiles = sessionStorage.getItem(
      process.env.REACT_APP_FILE_DATA_PURPLE_WIZARD_LAB || ""
    )
    const newFile = { id: nanoid(), fileName }

    if (existingFiles) {
      sessionStorage.setItem(
        process.env.REACT_APP_FILE_DATA_PURPLE_WIZARD_LAB || "",
        JSON.stringify([...JSON.parse(existingFiles), newFile])
      )
    } else {
      sessionStorage.setItem(
        process.env.REACT_APP_FILE_DATA_PURPLE_WIZARD_LAB || "",
        JSON.stringify([newFile])
      )
    }

    setAllFiles(Array.isArray(allFiles) ? [...allFiles, newFile] : [newFile])
    setOpen(false)
    setFileName("")
    navigate(`/canvas/${newFile.id}`)
    toast.success("File Created Successfully")
  }

  const saveCanvas = () => {
    if (!location.pathname.startsWith("/canvas")) return
    sessionStorage.setItem(
      process.env.REACT_APP_FILE_DATA_PURPLE_WIZARD_LAB || "",
      JSON.stringify(allFiles)
    )

    toast.success("Canvas Saved Successfully!")
  }

  useEffect(() => {
    if (!location) return
    const openId = location.pathname.split("/")[2]
    const openFile = allFiles?.find((f) => f.id === openId)
    if (openFile) setActiveFileName(openFile.fileName)
  }, [location, allFiles])

  return (
    <div className="bg-themeLightWhite dark:bg-themeLightBlack py-2.5 px-11 flex justify-between items-center sticky top-0 border-b border-b-themeDarkWhite dark:border-b-themeLightBlack">
      <div className="flex gap-12 justify-center items-center">
        <p
          onClick={() => navigate("/")}
          className="font-prosto text-2xl cursor-pointer text-purple-600"
        >
          Purplewizard Lab
        </p>
        {!location.pathname.startsWith("/canvas") && (
          <div className="flex gap-10 justify-center items-center text-lg">
            {tabs?.map((t) => (
              <span
                className="cursor-pointer text-themeLightBlack dark:text-themeLightWhite"
                key={t.title}
                onClick={t.func}
              >
                {t.title}
              </span>
            ))}
          </div>
        )}
      </div>

      <p className="cursor-pointer text-themeLightBlack dark:text-themeLightWhite text-2xl italic font-bold tracking-wider">
        {activeFileName}
      </p>

      <div className="flex gap-10 justify-center items-center">
        <div
          onClick={handleToggle}
          id="toggle-handler"
          className="w-[50px] flex pl-[2.5px] items-center rounded-full transition-all duration-200 ease-linear cursor-pointer toggle-on"
        >
          <div
            id="toggle-circle"
            className={`h-[22px] w-[22px] transition-all duration-200 ease-linear rounded-full bg-themeLightWhite dark:bg-purple-600 ${
              theme === "dark" ? "toggle-right" : "toggle-left"
            }`}
          />
        </div>

        <button className="flex gap-2.5 items-center justify-center bg-purple-600 py-2 px-4 rounded-xl">
          <img
            src={uploadIcon}
            alt="upload icon"
            className="h-[20px] w-[20px]"
          />
          <span onClick={saveCanvas} className="text-white text-xl">
            {location.pathname.startsWith("/canvas") ? "Save" : "Deploy"}
          </span>
        </button>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...style,
            outline: "none",
            borderRadius: "8px",
          }}
        >
          <p className="text-2xl font-prosto text-center">Create New File</p>
          <input
            type="text"
            placeholder="Enter File Name"
            className="mt-5 mb-3 w-full rounded-lg border-2 border-purple-200 focus:border-purple-500 outline-none px-4 py-2"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") createFile()
            }}
          />
          <button
            disabled={!fileName}
            onClick={createFile}
            className={
              "text-white disabled:bg-purple-600/60 bg-purple-600 px-4 w-full py-2 rounded-lg text-xl"
            }
          >
            Create
          </button>
        </Box>
      </Modal>
    </div>
  )
}

export default Navbar
