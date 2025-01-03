import { createSlice } from "@reduxjs/toolkit"
import { nanoid } from "nanoid"
import { toast } from "sonner"
import createJsonObject from "../common/jsonTemplate"

const saveToStorage = (files: any, type: "file" | "template") => {
  if (type === "file")
    localStorage.setItem(
      process.env.REACT_APP_FILE_DATA_PURPLE_WIZARD_LAB || "",
      JSON.stringify(files)
    )
  if (type === "template")
    localStorage.setItem(
      process.env.REACT_APP_TEMPLATE_DATA_PURPLE_WIZARD_LAB || "",
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
  templates: Array<{
    template: {
      id: string
      fileName: string
      canvas?: any
      server?: string
    }
    name: string
    id: string
  }>
  loading: boolean
  error: any
  status: string
} = {
  allFiles: null,
  currentFile: null,
  templates: [],
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

      saveToStorage(state.allFiles, "file")

      toast.success("File Created Successfully")
      action.payload.navigate(`/lab/${newFile.id}`)
    },
    setAllFiles: (state, action) => {
      state.allFiles = action.payload
    },
    setAllTemplates: (state, action) => {
      state.templates = action.payload
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

      saveToStorage(state.allFiles, "file")
      toast.success("Canvas Saved Successfully")
    },
    saveAsTemplate: (state, action) => {
      state.templates = Array.isArray(state.templates)
        ? [
            ...state.templates,
            {
              template: action.payload.template,
              name: action.payload.name,
              id: nanoid(),
            },
          ]
        : [
            {
              template: action.payload.template,
              name: action.payload.name,
              id: nanoid(),
            },
          ]

      saveToStorage(state.templates, "template")
      toast.success("Template Saved Successfully")
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
    exportAsJson: (state) => {
      toast.info(
        "Exporter downloads the last saved version of the file. Make sure any latest changes are saved properly."
      )
      if (state.currentFile) {
        const jsonObject = createJsonObject(state.currentFile)

        if (!jsonObject) return

        const blob = new Blob([jsonObject], {
          type: "application/json",
        })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = state.currentFile?.fileName + ".json"
        a.click()
        window.URL.revokeObjectURL(url)
      } else {
        toast.error("No File Found")
      }
    },
  },
})

export const {
  createFile,
  setAllFiles,
  saveFile,
  setCurrentFile,
  updateServer,
  saveAsTemplate,
  setAllTemplates,
  exportAsJson,
} = canvasSlice.actions
export default canvasSlice.reducer
