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

  return (
    <>
      <div className={style.panel}>
        <ButtonAuth handelClick={clickLogIn} text="Войти в профиль" />
        <p onClick={clickFogotPassword}>Я не помню пароль</p>
        <p onClick={clickRegistration}>Зарегистрироваться</p>
        <div className={style.footer}></div>
      </div>
      {registrationStataus && <RegistrationModal setRegistrationStatus={(value) => setRegistrationStatus(value)} />}
      {logInStatus && <LogInModal setLogInStatus={(value) => setLogInStatus(value)} />}
      {fogotPasswordStataus && <PasswordRecovery serFogotPasswordStataus={(value) => serFogotPasswordStataus(value)} />}
    </>
  );
}
