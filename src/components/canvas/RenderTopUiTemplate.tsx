import { useDispatch } from "react-redux"
import Form from "./Form"
import SaveMenu from "./SaveMenu"
import Sidebar from "./Sidebar"
import TemplateMenu from "./TemplateMenu"
import { saveFile } from "../../redux/canvasSlice"
import { useState } from "react"
import { toast } from "sonner"
import { nanoid } from "nanoid"
import { MyDispatch } from "../../redux/store"

const commonConfig = {
  angle: 0,
  backgroundColor: "transparent",
  fillStyle: "solid",
  groupIds: [],
  opacity: 100,
  roughness: 1,
  strokeColor: "#1e1e1e",
  strokeStyle: "solid",
  strokeWidth: 2,
}

const commonTextConfig = {
  fontFamily: 1,
  fontSize: 15,
  lineHeight: 1.25,
  textAlign: "center",
  type: "text",
  x: 130,
  ...commonConfig,
}

const RenderTopUiTemplate = ({
  whiteboardData,
  excalidrawAPI,
  selectedServer,
  setSelectedServer,
  setOpenModal,
}: {
  whiteboardData: any
  excalidrawAPI: any
  selectedServer: string
  setSelectedServer: (arg: string) => void
  setOpenModal: (arg: boolean) => void
}) => {
  const dispatch = useDispatch<MyDispatch>()

  // SIDEBAR STATE
  const [open, setOpen] = useState<boolean>(false)

  // TEMPLATE MENU FUNCTIONS
  const appendTemplateToWhiteBoard = (template: any) => {
    const newData =
      Array.isArray(whiteboardData) && whiteboardData.length > 0
        ? [...whiteboardData, ...template]
        : template

    excalidrawAPI?.updateScene({
      elements: newData,
    })
    dispatch(saveFile(newData))
    window.location.reload()
  }

  // SIDEBAR FUNCTIONS
  const openSidebar = () => {
    if (selectedServer === "") return toast.info("Select a Server First")
    setOpen(true)
  }

  const closeSidebar = () => {
    setOpen(false)
  }

  function appendToWhiteBoard(type: string, text: string, dependsOn?: string) {
    if (dependsOn) {
      const hasDependent = whiteboardData?.filter(
        (wd: { originalText: string }) => wd?.originalText === dependsOn
      )

      if (hasDependent?.length === 0)
        return toast.info(`${text} depends on ${dependsOn}`)
    }

    const containerId = nanoid()
    const textId = nanoid()

    const newData =
      type === "rectangle"
        ? [
            {
              boundElements: [{ type: "text", id: textId }],
              height: 74.9453125,
              id: containerId,
              roundness: {
                type: 3,
                value: 32,
              },
              type,
              width: 230,
              x: 100,
              y: 100,
              ...commonConfig,
            },
            {
              baseline: 16,
              containerId,
              height: 22,
              id: textId,
              originalText: text,
              text,
              verticalAlign: "center",
              width: 178.3199005126953,
              y: 132,
              ...commonTextConfig,
            },
          ]
        : [
            {
              boundElements: [{ type: "text", id: textId }],
              height: 175,
              id: containerId,
              roundness: {
                type: 2,
              },
              type,
              width: 175,
              x: 100,
              y: 100,
              ...commonConfig,
            },
            {
              baseline: 36,
              containerId,
              height: 52,
              id: textId,
              originalText: text,
              text: text.replace(/ /g, "\n"),
              verticalAlign: "middle",
              width: 110.48292541503906,
              y: 162,
              ...commonTextConfig,
            },
          ]

    excalidrawAPI?.updateScene({ elements: [...whiteboardData, ...newData] })
  }

  return (
    <>
      <TemplateMenu appendTemplateToWhiteBoard={appendTemplateToWhiteBoard} />

      <Form
        selectedServer={selectedServer}
        setSelectedServer={setSelectedServer}
      />

      <SaveMenu whiteboardData={whiteboardData} setOpenModal={setOpenModal} />

      <Sidebar
        open={open}
        closeSidebar={closeSidebar}
        selectedServer={selectedServer}
        openSidebar={openSidebar}
        appendToWhiteBoard={appendToWhiteBoard}
      />
    </>
  )
}

export default RenderTopUiTemplate
