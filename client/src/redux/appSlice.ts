import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type AppState = {
  status: string;
  isOpenForm: boolean;
}

const initialState: AppState = {
  status: "",
  isOpenForm: false,
}

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    setOpenForm: (state, action: PayloadAction<boolean>) => {
      state.isOpenForm = action.payload;
    }
  }
});

export const { setStatus, setOpenForm } = appSlice.actions;

export default appSlice.reducer;