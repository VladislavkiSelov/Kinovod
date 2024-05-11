import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/userSlice";
import logInSlice from "./slice/logInSlice";
import registerSlice from "./slice/registerSlice";
import passwordRecoverySlice from "./slice/passwordRecovery";

export default configureStore({
  reducer: {
    user: userSlice,
    logIn: logInSlice,
    register: registerSlice,
    passwordRecovery: passwordRecoverySlice,
  },
});
