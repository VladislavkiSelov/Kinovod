import React from "react";
import style from "./Main.module.scss";

export default function Main() {
  return (
    <>
      <div>
        <h3 className={style.titel}>Популярные</h3>
        <div className={style.content}></div>
      </div>
      <div>
        <h3 className={style.titel}>Фильмы</h3>
        <div className={style.content}></div>
      </div>
      <div>
        <h3 className={style.titel}>Сериалы</h3>
        <div className={style.content}></div>
      </div>
      <div>
        <h3 className={style.titel}>Телепередачи</h3>
        <div className={style.content}></div>
      </div>
    </>
  );
}
