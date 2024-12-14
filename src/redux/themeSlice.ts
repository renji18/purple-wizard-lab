import { createSlice } from "@reduxjs/toolkit"

const themeSlice = createSlice({
  name: "Theme",
  initialState: {
    theme: "dark",
  },
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload
    },
  },
})

export const { setTheme } = themeSlice.actions
export default themeSlice.reducer
