import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw"
import { MyDispatch, MySelector } from "../redux/store"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { useDispatch } from "react-redux"
import { saveFile, setCurrentFile, updateServer } from "../redux/canvasSlice"
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material"
import openIcon from "../assets/open.svg"
import "../canvas.scss"
import { toast } from "sonner"

const Canvas = ({ theme }: { theme: string }) => {
  const location = useLocation()
  const dispatch = useDispatch<MyDispatch>()
  const { currentFile, allFiles } = MySelector((state) => state.canvas)

  const [whiteboardData, setWhiteBoardData] = useState<any>(null)
  const [selectedServer, setSelectedServer] = useState<string>("")
  const [open, setOpen] = useState<boolean>(false)

  const save = () => {
    dispatch(saveFile(whiteboardData))
  }

  const openSidebar = () => {
    if (selectedServer === "") return toast.info("Select a Server First")
    setOpen(true)
  }

  const closeSidebar = () => {
    setOpen(false)
  }

  const serverData = [
    {
      name: "AWS",
      components: [
        {
          name: "Operating System",
          content: [
            { name: "Windows 2019", canvasCode: "" },
            { name: "Windows 2016" },
            { name: "Windows 10" },
            { name: "Windows 7" },
            { name: "Ubuntu 22.04" },
            { name: "Ubuntu Server 22.04" },
            { name: "Kali Linux" },
          ],
        },
        {
          name: "Configurations",
          content: [
            { name: "Install Active Directory" },
            { name: "Join Domain" },
            { name: "Install Splunk Server" },
            { name: "Install Splunk Forwarder" },
            { name: "Install Sysmon" },
            { name: "Enable CommandLine Logging" },
            { name: "Enable Powershell Logging" },
            { name: "ASREPRoasting Vulnerability" },
            { name: "Vulnerable Share" },
          ],
        },
      ],
    },
  ]

  useEffect(() => {
    if (currentFile) return
    if (!location) return
    if (!allFiles) return
    const fileId = location.pathname.split("/")[2]
    dispatch(setCurrentFile({ id: fileId }))
  }, [location, allFiles])

  useEffect(() => {
    if (!currentFile) return
    if (currentFile.server) setSelectedServer(currentFile.server)
  }, [currentFile])

  return (
    <div className="flex flex-1">
      {currentFile && (
        <div className="flex-1" id="canvas-wrapper">
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
                <>
                  <FormControl
                    sx={{ minWidth: 150, color: "white" }}
                    size="small"
                  >
                    <InputLabel id="demo-multiple-name-label">
                      {selectedServer === "" ? "Select Server" : "Server"}
                    </InputLabel>
                    <Select
                      sx={{ color: theme === "dark" ? "white" : "black" }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectedServer}
                      label="Age"
                      onChange={(e: SelectChangeEvent) => {
                        setSelectedServer(e.target.value)
                        dispatch(updateServer(e.target.value))
                      }}
                    >
                      {serverData?.map((sd) => (
                        <MenuItem value={sd.name}>{sd?.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <button
                    className="bg-purple-600 outline-none py-1 px-6 rounded-lg text-lg text-white"
                    onClick={save}
                  >
                    Save
                  </button>
                  <div className="absolute flex justify-center items-center right-0 h-full">
                    <div
                      className={`bg-themeDarkWhite dark:bg-themeLightBlack h-[80%] max-h-[80%] rounded-l-full border-r border-r-black dark:border-r-white flex justify-center items-center px-1.5 cursor-pointer ${
                        open ? "" : "hidden"
                      }`}
                      onClick={closeSidebar}
                    >
                      <img
                        src={openIcon}
                        className="rotate-180 origin-center"
                        alt=""
                      />
                    </div>
                    <div
                      className={`bg-themeDarkWhite dark:bg-themeLightBlack h-[80%] max-h-[80%] overflow-y-scroll ${
                        open
                          ? "rounded-none w-full px-6 py-3"
                          : "w-10 rounded-l-full"
                      }`}
                    >
                      {open ? (
                        <div>
                          <p className="text-center text-4xl font-semibold">
                            Components
                          </p>
                          <div className="my-5">
                            {serverData
                              ?.find((d) => d.name === selectedServer)
                              ?.components.map((sdc) => (
                                <div className="mb-5">
                                  <p className="text-xl font-medium mb-2">
                                    {sdc?.name}
                                  </p>
                                  <div className="space-y-3">
                                    {sdc?.content?.map((sdcc) => (
                                      <p className="px-3 py-2 border border-purple-500 rounded-lg">
                                        {sdcc?.name}
                                      </p>
                                    ))}
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      ) : (
                        <div
                          className="h-full w-full flex justify-center items-center cursor-pointer"
                          onClick={openSidebar}
                        >
                          <img src={openIcon} alt="" />
                        </div>
                      )}
                    </div>
                  </div>
                </>
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
