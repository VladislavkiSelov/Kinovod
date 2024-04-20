import React, { useState } from "react";
import style from "./ListFilters.module.scss";
import { ReactComponent as Arrow } from "../../../assets/icon/arrow_right.svg";
import List from "../List/List";
import Button from "../../Button/Button";
import { useForm } from "react-hook-form";
import { client } from "../../../api/tndb";

export default function ListFilters() {
  const [activeElementLi, setActiveElementLi] = useState(null);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // client.getFilterListMovie(`3/discover/movie?language=ru&page=1`).then((res) => {
    //   console.log(res);
    // });
  };

  return (
    <>
      <div className={style.filter}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ul className={style.list}>
            <li onClick={() => setActiveElementLi("genre")}>
              Жанр <Arrow className={style.arrow} />
            </li>
            <li onClick={() => setActiveElementLi("country")}>
              Страна <Arrow className={style.arrow} />
            </li>
            <li onClick={() => setActiveElementLi("year")}>
              Год <Arrow className={style.arrow} />
            </li>
          </ul>
          <div className={style.box_btn}>
            <Button text="Сбросить" />
            <Button text="Применить" />
          </div>
          {activeElementLi === "genre" && <List type="genre" register={register} setActiveElementLi={(value) => setActiveElementLi(value)} />}
          {activeElementLi === "country" && <List type="country" register={register} setActiveElementLi={(value) => setActiveElementLi(value)} />}
          {activeElementLi === "year" && <List type="year" register={register} setActiveElementLi={(value) => setActiveElementLi(value)} />}
        </form>
      </div>
    </>
  );
}
