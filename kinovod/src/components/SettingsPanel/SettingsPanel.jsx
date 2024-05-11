import React from "react";
import ButtonAuth from "../ButtonAuth/ButtonAuth";
import style from "./SettingsPanel.module.scss";
import { setStatusLogIn } from "../../store/slice/logInSlice";
import { useDispatch, useSelector } from "react-redux";
import { setStatusRegister } from "../../store/slice/registerSlice";
import { setStatusPasswordRecovery } from "../../store/slice/passwordRecovery";

export default function SettingsPanel() {
  const dispatch = useDispatch();
  const logInStatus = useSelector((state) => state.logIn.status);
  const registrationStataus = useSelector((state) => state.register.status);
  const fogotPasswordStataus = useSelector((state) => state.passwordRecovery.status);

  const clickLogIn = () => (logInStatus ? dispatch(setStatusLogIn(false)) : dispatch(setStatusLogIn(true)));
  const clickRegistration = () => (registrationStataus ? dispatch(setStatusRegister(false)) : dispatch(setStatusRegister(true)));
  const clickFogotPassword = () => (fogotPasswordStataus ? dispatch(setStatusPasswordRecovery(false)) : dispatch(setStatusPasswordRecovery(true)));

  return (
    <>
      <div className={style.panel}>
        <ButtonAuth handelClick={clickLogIn} text="Войти в профиль" />
        <p onClick={clickFogotPassword}>Я не помню пароль</p>
        <p onClick={clickRegistration}>Зарегистрироваться</p>
        <div className={style.footer}></div>
      </div>
    </>
  );
}
