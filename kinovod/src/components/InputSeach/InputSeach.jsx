import React from "react";
import style from "./InputSeach.module.scss";
import { ReactComponent as SearchIcon } from "../../assets/icon/seach_input.svg";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function InputSeach({ setActiveSeach }) {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const queryParams = new URLSearchParams({ query: data.search });
    navigate(`/media-content/search/params/${queryParams}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.wrapper}>
      <input {...register("search")} className={style.seach} placeholder="Поиск" />
      <div className={style.wrapper_btn}>
        <SearchIcon className={`${style.white} ${style.seach_icon}`} />
        <input type="submit" className={style.transparent_button} />
      </div>
    </form>
  );
}
