import { createSlice } from "@reduxjs/toolkit";

export const passwordRecoverySlice = createSlice({
  name: "passwordRecovery",
  initialState: {
    status: false,
  },
  reducers: {
    setStatusPasswordRecovery: (state, action) => {
      return { status: action.payload };
    },
  },
});

export const { setStatusPasswordRecovery } = passwordRecoverySlice.actions;

export default passwordRecoverySlice.reducer;
