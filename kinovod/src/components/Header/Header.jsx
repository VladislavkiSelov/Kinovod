import React from "react";
import style from "./Header.module.scss";
import { Link } from "react-router-dom";
import { ReactComponent as ProfileIcon } from "../../assets/icon/profile.svg";
import { ReactComponent as SeachIcon } from "../../assets/icon/seach.svg";

export default function Header() {
  return (
    <header className={`${style.header} container`}>
      <nav className={`${style.navigation_left}`}>
        <div className={style.logo}>
          <Link to="/">
            <img src="/img/icon/logo.png" alt="logo" />
          </Link>
        </div>
        <ul className={style.navigation_list}>
          <li>
            <Link to="media-content/movie">Фильмы</Link>
          </li>
          <li>
            <Link to="media-content/serial">Сериалы</Link>
          </li>
          <li>
            <Link to="media-content/coming-soon">Скоро</Link>
          </li>
        </ul>
      </nav>
      <div className={`${style.navigation_right}`}>
        <div className={style.seach}>
          <SeachIcon className={style.white} />
        </div>
        <div className={style.profile}>
          <ProfileIcon className={style.white} />
        </div>
      </div>
    </header>
  );
}
