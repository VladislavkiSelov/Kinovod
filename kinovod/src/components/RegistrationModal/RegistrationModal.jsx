import React, { useRef } from "react";
import style from "./RegistrationModal.module.scss";
import { useForm } from "react-hook-form";
import Button from "../Button/Button";

export default function RegistrationModal({ setRegistrationStatus, setLogInStatus }) {
  const { register, handleSubmit } = useForm();
  const ref = useRef();

  const onSubmit = async (data) => {
    console.log(data);
  };

  function handleClick(e) {
    if (!ref.current.contains(e.target)) {
      setRegistrationStatus(false);
    }
  }

  function clickLogInBtn(e){
    e.stopPropagation();
    setLogInStatus(true)
    setRegistrationStatus(false);
  }

  return (
    <div onClick={handleClick} className={style.wrapper}>
      <div ref={ref} className={style.registration}>
        <form className={style.registration_form} onSubmit={handleSubmit(onSubmit)}>
          <h2>Регистрация</h2>
          <div className={style.box_input}>
            <input {...register("email")} placeholder="Электронная почта" />
            <input {...register("name")} placeholder="Ваше имя" />
            <input {...register("password")} placeholder="Пароль" />
            <input {...register("repeat_password")} placeholder="Подтвердите пароль" />
          </div>
          <Button text="Зарегистрироваться" classBtn={style.btn_registration} />
        </form>
        <button onClick={clickLogInBtn} className={style.logInBtn}>Войти</button>
      </div>
      <div className={style.background}></div>
    </div>
  );
}
