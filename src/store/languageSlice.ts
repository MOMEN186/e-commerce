import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from "./store"

// Define a type for the slice state
interface languageState {
  value: string
}

// Define the initial state using that type
const initialState: languageState = {
  value: "en",
}

export const LanguageSlice = createSlice({
  name: 'language',
    initialState,
  reducers: {
      setLanguage: (state,action:PayloadAction<string>) => {
          state.value=action.payload
    }
  },
})

export const {  setLanguage} = LanguageSlice.actions
export const selectCount = (state: RootState) => state.language.value
export default LanguageSlice.reducer