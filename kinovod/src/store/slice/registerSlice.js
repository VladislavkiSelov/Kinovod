import { createSlice } from "@reduxjs/toolkit";

export const registerSlice = createSlice({
  name: "register",
  initialState: {
    status: false,
  },
  reducers: {
    setStatusRegister: (state, action) => {
      return { status: action.payload };
    },
  },
});

export const { setStatusRegister } = registerSlice.actions;

export default registerSlice.reducer;
