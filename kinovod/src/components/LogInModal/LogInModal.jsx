import React, { useRef } from "react";
import style from "./LogInModal.module.scss";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Button from "../Button/Button";
import { fetchUser } from "../../store/slice/userSlice";
import { mydbConfig } from "../../config";

export default function LogInModal({ setLogInStatus, serFogotPasswordStataus, setRegistrationStatus }) {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const ref = useRef();

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
  const passwordRegex = /^(?=.*\d).{6,}$/;

  const onSubmit = async (data) => {
    const url = `${mydbConfig.URL}/auth/login`;
    const params = { email: data.email, password: data.password };
    const token = await dispatch(fetchUser({ url, params }));

    if (!token.payload) {
      return;
    }

    localStorage.setItem("user", JSON.stringify(token.payload));
    setLogInStatus(false);
  };

  function handleClick(e) {
    if (!ref.current.contains(e.target)) {
      setLogInStatus(false);
    }
  }

  function clickRegisterBtn(e) {
    e.stopPropagation();
    setRegistrationStatus(true);
    setLogInStatus(false);
  }

  function clickRecoverBtn(e) {
    e.stopPropagation();
    serFogotPasswordStataus(true);
    setLogInStatus(false);
  }

  return (
    <div onClick={handleClick} className={style.wrapper}>
      <div ref={ref} className={style.logIn}>
        <form className={style.logIn_form} onSubmit={handleSubmit(onSubmit)}>
          <h2>Вход</h2>
          <div className={style.box_input}>
            <input
              {...register("email", {
                required: true,
                pattern: { value: emailRegex, message: "Email неправильного формата" },
              })}
              placeholder="Электронная почта"
            />
            {errors?.email && <p className={style.error}>{errors.email.message}</p>}
            <input
              {...register("password", {
                required: true,
                pattern: { value: passwordRegex, message: "Пароль неправильного формата" },
              })}
              placeholder="Пароль"
            />
            {errors?.password && <p className={style.error}>{errors.password.message}</p>}
          </div>
          <Button text="Войти" classBtn={style.btn_logIn} />
        </form>
        <button onClick={clickRegisterBtn} className={style.register_btn}>
          Зарегистрироваться
        </button>
        <button onClick={clickRecoverBtn} className={style.recover_btn}>
          Я не помню пароль
        </button>
      </div>
      <div className={style.background}></div>
    </div>
  );
}
