import React from "react";
import style from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={`container ${style.footer}`}>
      <p>Пишите нам на почту: support@kinovod.net</p>
    </footer>
  );
}
