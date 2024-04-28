import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "counter",
  initialState: {
    user: {},
  },
  reducers: {
    setUser: (state, action) => {
      return { ...state, user: action.payload };
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
