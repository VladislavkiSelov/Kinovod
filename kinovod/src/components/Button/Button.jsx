import React from "react";
import style from "./Button.module.scss";

export default function Button({ text, classBtn, handelClick }) {
  return <input type="submit" value={text} onClick={handelClick} className={`${style.btn} ${classBtn || ""}`} />;
}
