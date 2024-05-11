import React from "react";
import RegistrationModal from "./RegistrationModal/RegistrationModal";
import PasswordRecovery from "./PasswordRecovery/PasswordRecovery";
import LogInModal from "./LogInModal/LogInModal";
import { useSelector } from "react-redux";

export default function Auth() {
  const logInStatus = useSelector((state) => state.logIn.status);
  const registrationStataus = useSelector((state) => state.register.status);
  const fogotPasswordStataus = useSelector((state) => state.passwordRecovery.status);

  return (
    <>
      {registrationStataus && <RegistrationModal />}
      {logInStatus && <LogInModal />}
      {fogotPasswordStataus && <PasswordRecovery />}
    </>
  );
}
