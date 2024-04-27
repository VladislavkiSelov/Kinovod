import React, { useRef } from "react";
import style from "./PasswordRecovery.module.scss";
import { useForm } from "react-hook-form";
import Button from "../Button/Button";

export default function PasswordRecovery({serFogotPasswordStataus}) {
  const { register, handleSubmit } = useForm();
  const ref = useRef();

  const onSubmit = async (data) => {
    console.log(data);
    serFogotPasswordStataus(false);
  };

  function handleClick(e) {
    if (!ref.current.contains(e.target)) {
      serFogotPasswordStataus(false);
    }
  }

  return (
    <div onClick={handleClick} className={style.wrapper}>
      <div ref={ref} className={style.password_recovery}>
        <form className={style.password_recovery_form} onSubmit={handleSubmit(onSubmit)}>
          <h2>Восстановление пароля</h2>
          <div className={style.box_input}>
            <input {...register("email")} placeholder="Электронная почта" />
          </div>
          <Button text="Отправить инструкцию" classBtn={style.btn_password_recovery} />
        </form>
        <h3 className={style.register_btn}>Зарегистрироваться</h3>
        <h3 className={style.logIn_btn}>Войти</h3>
      </div>
      <div className={style.background}></div>
    </div>
  );
}
