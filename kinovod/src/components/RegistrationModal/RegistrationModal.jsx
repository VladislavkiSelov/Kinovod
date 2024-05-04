import React, { useRef } from "react";
import style from "./RegistrationModal.module.scss";
import { useForm } from "react-hook-form";
import Button from "../Button/Button";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slice/userSlice";
import { mydbConfig } from "../../config";

export default function RegistrationModal({ setRegistrationStatus, setLogInStatus }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();
  const ref = useRef();
  const dispatch = useDispatch();

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
  const passwordRegex = /^(?=.*\d).{6,}$/;

  const onSubmit = async (data) => {
    const body = { username: data.name, email: data.email, password: data.password };
    const url = `${mydbConfig.URL}/auth/register`;

    axios
      .post(url, body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch(setUser(res.data));
        localStorage.setItem("user", JSON.stringify(res.data));
      })
      .catch((err) => console.log(err));
    reset();
  };

  function handleClick(e) {
    if (!ref.current.contains(e.target)) {
      setRegistrationStatus(false);
    }
  }

  function clickLogInBtn(e) {
    e.stopPropagation();
    setLogInStatus(true);
    setRegistrationStatus(false);
  }

  return (
    <div onClick={handleClick} className={style.wrapper}>
      <div ref={ref} className={style.registration}>
        <form className={style.registration_form} onSubmit={handleSubmit(onSubmit)}>
          <h2>Регистрация</h2>
          <div className={style.box_input}>
            <input
              {...register("email", {
                required: true,
                pattern: { value: emailRegex, message: "Email неправильного формата" },
              })}
              placeholder="Электронная почта"
            />
            <p className={style.error}>{errors?.email ? errors.email.message : null}</p>
            <input
              {...register("name", {
                required: true,
                minLength: { value: 2, message: "Имя слишком короткое" },
              })}
              placeholder="Ваше имя"
            />
            <p className={style.error}>{errors?.name ? errors.name.message : null}</p>
            <input
              {...register("password", {
                required: true,
                pattern: { value: passwordRegex, message: "Пароль неправильного формата" },
              })}
              placeholder="Пароль"
            />
            <p className={style.error}>{errors?.password ? errors.password.message : null}</p>
            <input
              {...register("repeat_password", {
                required: true,
                validate: {
                  matchesPreviousPassword: (value) => {
                    const password = getValues("password");
                    return password === value || "Пароли не совпадают";
                  },
                },
              })}
              placeholder="Подтвердите пароль"
            />
            <p className={style.error}>{errors?.repeat_password ? errors.repeat_password.message : null}</p>
          </div>
          <Button text="Зарегистрироваться" classBtn={style.btn_registration} />
        </form>
        <button onClick={clickLogInBtn} className={style.logInBtn}>
          Войти
        </button>
      </div>
      <div className={style.background}></div>
    </div>
  );
}
