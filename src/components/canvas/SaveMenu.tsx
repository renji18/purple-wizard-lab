import { saveFile } from "../../redux/canvasSlice"
import { MyDispatch } from "@/src/redux/store"
import { Button, Menu, MenuItem } from "@mui/material"
import { useState } from "react"
import { useDispatch } from "react-redux"

const SaveMenu = ({
  whiteboardData,
  setOpenModal,
}: {
  whiteboardData: any
  setOpenModal: (arg: boolean) => void
}) => {
  const dispatch = useDispatch<MyDispatch>()

  const [openMenu, setOpenMenu] = useState<null | HTMLElement>(null)
  const anchorOpen = Boolean(openMenu)

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={anchorOpen ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={anchorOpen ? "true" : undefined}
        onClick={(e) => {
          if (Array.isArray(whiteboardData) && whiteboardData.length === 0) {
            dispatch(saveFile(whiteboardData))
            return
          }
          setOpenMenu(e.currentTarget)
        }}
        sx={{
          background: "#9333ea",
          outline: "none",
          padding: "0.25rem 1.5rem",
          borderRadius: "0.5rem",
          fontSize: "1.125rem",
          lineHeight: "1.75rem",
          color: "white",
          zIndex: 500,
          fontWeight: 400,
        }}
      >
        Save
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={openMenu}
        open={anchorOpen}
        onClose={() => setOpenMenu(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            dispatch(saveFile(whiteboardData))
            setOpenMenu(null)
          }}
        >
          Save
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpenModal(true)
            setOpenMenu(null)
          }}
        >
          Save As Template
        </MenuItem>
      </Menu>
    </div>
  )
}

export default SaveMenu
