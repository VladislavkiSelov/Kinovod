import React from "react";
import style from "./ButtonAuth.module.scss";

export default function ButtonAuth({ text, classBtn, handelClick }) {
  return <input type="submit" value={text} onClick={handelClick} className={`${style.btn} ${classBtn || ""}`} />;
}
