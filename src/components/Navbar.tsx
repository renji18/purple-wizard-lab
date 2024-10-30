import { useState } from "react"
import uploadIcon from "../assets/uploadIcon.svg"

const Navbar = ({
  theme,
  setTheme,
}: {
  theme: string
  setTheme: (arg: string) => void
}) => {
  const tabs = [
    { title: "New", func: "", route: "new" },
    { title: "Open", func: "", route: "open" },
    { title: "Help", func: "", route: "help" },
  ]

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

  return (
    <div className="bg-themeLightWhite dark:bg-themeLightBlack py-2.5 px-11 flex justify-between items-center">
      <div className="flex gap-12 justify-center items-center">
        <p className="font-prosto text-2xl text-purple-600">Purplewizard Lab</p>
        <div className="flex gap-10 justify-center items-center text-lg">
          {tabs?.map((t) => (
            <span
              className="cursor-pointer text-themeLightBlack dark:text-themeLightWhite"
              key={t.route}
            >
              {t.title}
            </span>
          ))}
        </div>
      </div>
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
          <span className="text-white text-xl">Save</span>
        </button>
      </div>
    </div>
  )
}

export default Navbar
