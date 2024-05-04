import React from "react";
import style from "./Button.module.scss";

export default function Button({ type="submit", text, classBtn, handelClick }) {
  return <input type={type} value={text} onClick={handelClick} className={`${style.btn} ${classBtn || ""}`} />;
}
