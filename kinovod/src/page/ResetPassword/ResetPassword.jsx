import React from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/Button/Button";
import style from "./ResetPassword.module.scss";
import { clientMyDB } from "../../api/mydb";
import { useParams } from "react-router-dom";
import { setStatusLogIn } from "../../store/slice/logInSlice";
import { useDispatch } from "react-redux";

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();
  const passwordRegex = /^(?=.*\d).{6,}$/;
  const { token } = useParams();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const body = { password: data.password };
    clientMyDB
      .setPassword({ path: "auth/set_password", token, body })
      .then(() => {
        dispatch(setStatusLogIn(true));
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <h2>Изменение пароля</h2>
      <div className={style.box_input}>
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
      <Button text="Отправить" />
    </form>
  );
}
