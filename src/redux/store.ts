import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useSelector } from "react-redux"
import canvasSlice from "./canvasSlice"
import themeSlice from "./themeSlice"

export const store = configureStore({
  reducer: {
    canvas: canvasSlice,
    theme: themeSlice,
  },
})

export type MyDispatch = typeof store.dispatch

export const MySelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector
