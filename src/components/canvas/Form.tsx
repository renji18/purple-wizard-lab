import { updateServer } from "../../redux/canvasSlice"
import { MyDispatch } from "@/src/redux/store"
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material"
import { useDispatch } from "react-redux"

const Form = ({
  selectedServer,
  setSelectedServer,
  theme,
  serverData,
}: {
  selectedServer: string
  setSelectedServer: (arg: string) => void
  theme: string
  serverData: Array<{
    name: string
    components: Array<{
      name: string
      content: Array<{ name: string; shape: string }>
    }>
  }>
}) => {
  const dispatch = useDispatch<MyDispatch>()
  return (
    <FormControl sx={{ minWidth: 150, color: "white" }} size="small">
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
          <MenuItem value={sd.name} key={sd.name}>
            {sd?.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default Form
