import { MySelector } from "../../redux/store"
import { Button, Menu, MenuItem } from "@mui/material"
import { useState } from "react"

const TemplateMenu = ({
  appendTemplateToWhiteBoard,
}: {
  appendTemplateToWhiteBoard: (arg: any) => void
}) => {
  const { templates } = MySelector((state) => state.canvas)

  const [openMenu, setOpenMenu] = useState<null | HTMLElement>(null)
  const anchorOpen = Boolean(openMenu)

  const handleClose = (template: any) => {
    appendTemplateToWhiteBoard(template)
    setOpenMenu(null)
  }

  return (
    <div
      className={`absolute left-20 ${templates?.length > 0 ? "" : "hidden"}`}
    >
      <Button
        id="basic-button"
        aria-controls={anchorOpen ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={anchorOpen ? "true" : undefined}
        onClick={(e) => setOpenMenu(e.currentTarget)}
        sx={{ color: "#9333ea" }}
      >
        Templates
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
        {templates?.map((t) => (
          <MenuItem key={t.id} onClick={() => handleClose(t.template)}>
            {t.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}

export default TemplateMenu
