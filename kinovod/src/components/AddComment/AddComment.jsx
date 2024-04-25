import React from "react";
import { useForm } from "react-hook-form";
import style from "./AddComment.module.scss";
import Button from "../Button/Button";

export default function AddComment() {
  const { register, handleSubmit, reset } = useForm();

  function onSubmit(data) {
    console.log(data);
    reset();
  }

  return (
    <form className={style.form_add_comment} onSubmit={handleSubmit(onSubmit)}>
      <textarea placeholder="Ваш комментарий" {...register("comment", { minLength: 3 })} />
      <Button type="submit" text="Добавить" />
    </form>
  );
}
