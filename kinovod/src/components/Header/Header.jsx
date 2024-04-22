import React, { useEffect, useRef, useState } from "react";
import style from "./Header.module.scss";
import { Link } from "react-router-dom";
import { ReactComponent as ProfileIcon } from "../../assets/icon/profile.svg";
import { ReactComponent as SeachIcon } from "../../assets/icon/seach.svg";
import InputSeach from "../InputSeach/InputSeach";

export default function Header() {
  const [activeSeach, setActiveSeach] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (!listRef.current.contains(e.target)) {
        setActiveSeach(false);
      }
    }

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

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
            <Link to="media-content/movie/params/language=ru">Фильмы</Link>
          </li>
          <li>
            <Link to="media-content/serial/params/language=ru">Сериалы</Link>
          </li>
          <li>
            <Link to="media-content/coming-soon/params/language=ru">Скоро</Link>
          </li>
        </ul>
      </nav>
      <div className={`${style.navigation_right}`}>
        <div
          onClick={(e) => {
            e.stopPropagation();
            setActiveSeach(true);
          }}
          ref={listRef}
          className={style.seach}
        >
          {!activeSeach && <SeachIcon className={`${style.search_icon} ${style.white}`} />}
          {activeSeach && <InputSeach activeSeach={activeSeach} />}
        </div>
        <div className={style.profile}>
          <ProfileIcon className={style.white} />
        </div>
      </div>
    </header>
  );
}
