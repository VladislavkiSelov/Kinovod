import React, { useRef } from "react";
import style from "./PasswordRecovery.module.scss";
import { useForm } from "react-hook-form";
import Button from "../../Button/Button";
import { setStatusLogIn } from "../../../store/slice/logInSlice";
import { useDispatch } from "react-redux";
import { setStatusPasswordRecovery } from "../../../store/slice/passwordRecovery";
import { setStatusRegister } from "../../../store/slice/registerSlice";

export default function PasswordRecovery() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const ref = useRef();

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;

  const onSubmit = async (data) => {
    console.log(data);
  };

  function handleClick(e) {
    if (!ref.current.contains(e.target)) {
      dispatch(setStatusPasswordRecovery(false));
    }
  }

  function clickRegisterBtn(e) {
    e.stopPropagation();
    dispatch(setStatusRegister(true));
    dispatch(setStatusPasswordRecovery(false));
  }

  function clickLogInBtn(e) {
    e.stopPropagation();
    dispatch(setStatusLogIn(true));
    dispatch(setStatusPasswordRecovery(false));
  }

  return (
    <div className={style.wrapper}>
      <div ref={ref} className={style.password_recovery}>
        <form className={style.password_recovery_form} onSubmit={handleSubmit(onSubmit)}>
          <h2>Восстановление пароля</h2>
          <div className={style.box_input}>
            <input
              {...register("email", {
                required: true,
                pattern: { value: emailRegex, message: "Email неправильного формата" },
              })}
              placeholder="Электронная почта"
            />
            <p className={style.error}>{errors?.email ? errors.email.message : null}</p>
          </div>
          <Button text="Отправить инструкцию" classBtn={style.btn_password_recovery} />
        </form>
        <button onClick={clickRegisterBtn} className={style.register_btn}>
          Зарегистрироваться
        </button>
        <button onClick={clickLogInBtn} className={style.logIn_btn}>
          Войти
        </button>
      </div>
      <div onClick={handleClick} className={style.background}></div>
    </div>
  );
}
