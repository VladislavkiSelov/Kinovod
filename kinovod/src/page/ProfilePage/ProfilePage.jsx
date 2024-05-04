import React, { useEffect } from "react";
import style from "./ProfilePage.module.scss";

import Button from "../../components/Button/Button";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSelector } from "react-redux";
import { mydbConfig } from "../../config";

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
const passwordRegex = /^(?=.*\d).{6,}$/;

export default function ProfilePage() {
  const userState = useSelector((state) => state.user.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm();

  useEffect(() => {
    const url = `${mydbConfig.URL}/user`;
    const params = { id: userState.id };

    axios
      .get(url, {
        params,
        headers: {
          Authorization: `Bearer ${userState.token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setValue("email", res.data.email);
        setValue("username", res.data.username);
      });
  }, []);

  const onSubmit = async (data) => {
    const url = `${mydbConfig.URL}/user/edit`;
    const params = { id: userState.id };
    const { username, email, password } = data;

    const newObj = Object.fromEntries(Object.entries({ username, email, password }).filter(([key, value]) => value !== ""));

    axios
      .patch(url, newObj, {
        params,
        headers: {
          Authorization: `Bearer ${userState.token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setValue("email", res.data.email);
        setValue("username", res.data.username);
        setValue("password", "");
        setValue("repeat_password", "");
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.profile_page}>
      <h2>Профиль</h2>
      <label className={style.email}>
        <h3>Электронная почта</h3>
        <input
          {...register("email", { required: true, pattern: { value: emailRegex, message: "Email неправильного формата" } })}
          placeholder="Почта"
        />
        <span>При изменении электронной почты, будет отравлено письмо с подтверждением</span>
        <p className={style.error}>{errors?.email ? errors.email.message : null}</p>
      </label>
      <label className={style.username}>
        <h3>Ваше имя</h3>
        <input {...register("username", { required: true, minLength: { value: 2, message: "Имя слишком короткое" } })} placeholder="Имя" />
        <span>Имя, которое будет показываться в комментариях</span>
        <p className={style.error}>{errors?.name ? errors.name.message : null}</p>
      </label>
      <label className={style.password}>
        <h3>{`Новый пароль (не обязательно)`}</h3>
        <input {...register("password", { pattern: { value: passwordRegex, message: "Пароль неправильного формата" } })} placeholder="Пароль" />
        <span>Если пароль менять не нужно — оставьте поле пустым</span>
        <p className={style.error}>{errors?.password ? errors.password.message : null}</p>
      </label>
      <label>
        <h3>{`Повторите пароль (не обязательно)`}</h3>
        <input
          {...register("repeat_password", {
            validate: {
              matchesPreviousPassword: (value) => {
                const password = getValues("password");
                return password === value || "Пароли не совпадают";
              },
            },
          })}
          className={style.name}
          placeholder="Повторите пароль"
        />
        <span>Если пароль менять не нужно — оставьте поле пустым</span>
        <p className={style.error}>{errors?.repeat_password ? errors.repeat_password.message : null}</p>
      </label>
      <Button text="Сохранить" />
    </form>
  );
}
