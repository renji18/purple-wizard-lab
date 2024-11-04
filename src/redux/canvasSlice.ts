import { createSlice } from "@reduxjs/toolkit"
import { nanoid } from "nanoid"
import { toast } from "sonner"

const saveToStorage = (files: any) => {
  sessionStorage.setItem(
    process.env.REACT_APP_FILE_DATA_PURPLE_WIZARD_LAB || "",
    JSON.stringify(files)
  )
}

const initialState: {
  allFiles: Array<{
    id: string
    fileName: string
    canvas?: any
    server?: string
  }> | null
  currentFile: {
    id: string
    fileName: string
    canvas?: any
    server?: string
  } | null
  loading: boolean
  error: any
  status: string
} = {
  allFiles: null,
  currentFile: null,
  loading: false,
  error: null,
  status: "",
}

const canvasSlice = createSlice({
  name: "Canvas",
  initialState,
  reducers: {
    createFile: (state, action) => {
      const newFile = {
        id: nanoid(),
        fileName: action.payload.fileName,
      }
      state.allFiles = Array.isArray(state.allFiles)
        ? [...state.allFiles, newFile]
        : [newFile]
      state.currentFile = newFile

      saveToStorage(state.allFiles)

      toast.success("File Created Successfully")
      action.payload.navigate(`/lab/${newFile.id}`)
    },
    setAllFiles: (state, action) => {
      state.allFiles = action.payload
    },
    setCurrentFile: (state, action) => {
      const file = state.allFiles?.find((f) => f.id === action.payload.id)

      if (file) {
        state.currentFile = file
        action.payload.navigate && action.payload.navigate(`/lab/${file.id}`)
      } else toast.error("File Not Found")
    },
    saveFile: (state, action) => {
      if (state.currentFile) {
        const file = { ...state.currentFile, canvas: action.payload }
        state.currentFile = file

        state.allFiles = Array.isArray(state.allFiles)
          ? state.allFiles.map((f) => (f.id === file.id ? file : f))
          : [file]
      }

      saveToStorage(state.allFiles)
      toast.success("Canvas Saved Successfully")
    },
    updateServer: (state, action) => {
      if (state.currentFile) {
        const file = { ...state.currentFile, server: action.payload }
        state.currentFile = file

        state.allFiles = Array.isArray(state.allFiles)
          ? state.allFiles.map((f) => (f.id === file.id ? file : f))
          : [file]
      }
      toast.success("Server Updated Successfully")
    },
  },
})

export const {
  createFile,
  setAllFiles,
  saveFile,
  setCurrentFile,
  updateServer,
} = canvasSlice.actions
export default canvasSlice.reducer
