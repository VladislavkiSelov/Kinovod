import { createSlice } from "@reduxjs/toolkit";

export const logInSlice = createSlice({
  name: "logIn",
  initialState: {
    status: false,
  },
  reducers: {
    setStatusLogIn: (state, action) => {
      return {status:action.payload};
    },
  },
});

export const { setStatusLogIn } = logInSlice.actions;

export default logInSlice.reducer;
