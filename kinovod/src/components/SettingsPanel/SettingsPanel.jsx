import React, { useState } from "react";
import ButtonAuth from "../ButtonAuth/ButtonAuth";
import style from "./SettingsPanel.module.scss";
import RegistrationModal from "../RegistrationModal/RegistrationModal";
import PasswordRecovery from "../PasswordRecovery/PasswordRecovery";
import LogInModal from "../LogInModal/LogInModal";

export default function SettingsPanel() {
  const [logInStatus, setLogInStatus] = useState(false);
  const [registrationStataus, setRegistrationStatus] = useState(false);
  const [fogotPasswordStataus, serFogotPasswordStataus] = useState(false);

  const clickLogIn = () => (logInStatus ? setLogInStatus(false) : setLogInStatus(true));
  const clickRegistration = () => (registrationStataus ? setRegistrationStatus(false) : setRegistrationStatus(true));
  const clickFogotPassword = () => (fogotPasswordStataus ? serFogotPasswordStataus(false) : serFogotPasswordStataus(true));

  const updateFogotPasswordStataus = (value) => serFogotPasswordStataus(value);
  const updateLogInStatus = (value) => setLogInStatus(value);
  const updateRegistrationStatus = (value) => setRegistrationStatus(value);

  return (
    <>
      <div className={style.panel}>
        <ButtonAuth handelClick={clickLogIn} text="Войти в профиль" />
        <p onClick={clickFogotPassword}>Я не помню пароль</p>
        <p onClick={clickRegistration}>Зарегистрироваться</p>
        <div className={style.footer}></div>
      </div>
      {registrationStataus && <RegistrationModal setLogInStatus={updateLogInStatus} setRegistrationStatus={updateRegistrationStatus} />}
      {logInStatus && (
        <LogInModal
          serFogotPasswordStataus={updateFogotPasswordStataus}
          setRegistrationStatus={updateRegistrationStatus}
          setLogInStatus={(value) => setLogInStatus(value)}
        />
      )}
      {fogotPasswordStataus && (
        <PasswordRecovery
          setLogInStatus={(value) => setLogInStatus(value)}
          setRegistrationStatus={updateRegistrationStatus}
          serFogotPasswordStataus={updateFogotPasswordStataus}
        />
      )}
    </>
  );
}
