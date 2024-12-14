import { saveAsTemplate, saveFile } from "../../redux/canvasSlice"
import { MyDispatch } from "../../redux/store"
import { Box, Modal } from "@mui/material"
import { useState } from "react"
import { useDispatch } from "react-redux"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 3,
}

const SaveModal = ({
  whiteboardData,
  openModal,
  setOpenModal,
}: {
  whiteboardData: any
  openModal: boolean
  setOpenModal: (arg: boolean) => void
}) => {
  const dispatch = useDispatch<MyDispatch>()

  const [templateName, setTemplateName] = useState<string>("")
  const [templateNameError, setTemplateNameError] = useState<boolean>(false)

  return (
    <Modal
      open={openModal}
      onClose={() => setOpenModal(false)}
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
        <p className="text-2xl font-prosto text-center py-5">Save Template</p>

        <input
          type="text"
          className="border w-full rounded-md px-2 py-1"
          placeholder="Template Name Here..."
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
        />
        {templateNameError && (
          <p className="text-sm text-red-600 font-bold">
            Template Name Is Required
          </p>
        )}

        <button
          onClick={() => {
            if (templateName) {
              dispatch(
                saveAsTemplate({
                  template: whiteboardData,
                  name: templateName,
                })
              )
              dispatch(saveFile(whiteboardData))
              setOpenModal(false)
              window.location.reload()
            } else setTemplateNameError(true)
          }}
          className={
            "text-white disabled:bg-purple-600/60 bg-purple-600 px-8 mt-3 max-w-fit float-right py-2 rounded-lg"
          }
        >
          Save
        </button>
      </Box>
    </Modal>
  )
}

export default SaveModal
