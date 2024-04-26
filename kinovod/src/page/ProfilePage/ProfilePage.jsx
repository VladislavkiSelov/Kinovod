import React from "react";
import style from "./ProfilePage.module.scss";
import avatarDefault from "../../assets/icon/avatar.svg";

import Button from "../../components/Button/Button";
import { useForm } from "react-hook-form";

export default function ProfilePage() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.profile_page}>
      <h2>Профиль</h2>
      <div className={style.wrapper_avatar}>
        <div className={style.avatar_preview}>
          <img src={avatarDefault} alt="avatar" />
        </div>
        <Button text="Выбрать" />
      </div>
      <label className={style.email}>
        <h3>Электронная почта</h3>
        <input {...register("email")} placeholder="Почта" />
        <span>При изменении электронной почты, будет отравлено письмо с подтверждением</span>
      </label>
      <label className={style.name}>
        <h3>Ваше имя</h3>
        <input {...register("name")} placeholder="Имя" />
        <span>Имя, которое будет показываться в комментариях</span>
      </label>
      <label className={style.password}>
        <h3>{`Новый пароль (не обязательно)`}</h3>
        <input {...register("name")} placeholder="Пароль" />
        <span>Если пароль менять не нужно — оставьте поле пустым</span>
      </label>
      <label>
        <h3>{`Повторите пароль (не обязательно)`}</h3>
        <input {...register("name")} className={style.name} placeholder="Повторите пароль" />
        <span>Если пароль менять не нужно — оставьте поле пустым</span>
      </label>
      <Button text="Сохранить" />
    </form>
  );
}
