import React from "react";
import { ReactComponent as Icon } from "../../assets/icon/sort_icon.svg";
import style from './Sort.module.scss'

export default function Sort() {
  return (
    <div className={style.title}>
      <Icon />
      <h3>Сортировать</h3>
    </div>
  );
}
