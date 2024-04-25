import React, { useEffect, useRef, useState } from "react";
import style from "./Header.module.scss";
import { Link } from "react-router-dom";
import { ReactComponent as ProfileIcon } from "../../assets/icon/profile.svg";
import { ReactComponent as SeachIcon } from "../../assets/icon/seach.svg";
import { ReactComponent as CloseIconMenu } from "../../assets/icon/close_humdurger.svg";
import { ReactComponent as OpenIconMenu } from "../../assets/icon/open_humdurger.svg";
import InputSeach from "../InputSeach/InputSeach";
import ProfilePanel from "../ProfilePanel/ProfilePanel";

export default function Header() {
  const [activeSeach, setActiveSeach] = useState(false);
  const [activeProfile, setActiveProfile] = useState(false);
  const [menu, setMenu] = useState(false);
  const seachRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      // console.log(profileRef.current);
      // console.log(e.target);
      console.log(!profileRef.current.contains(e.target));
      if (!seachRef.current.contains(e.target)) {
        setActiveSeach(false);
      }

      if (!profileRef.current.contains(e.target)) {
        setActiveProfile(false);
      }
    }

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  function clickProfile(e) {
    e.stopPropagation();
    if (!activeProfile) {
      setActiveProfile(true);
    }
  }

  return (
    <header className={`${style.header} container`}>
      <nav className={`${style.navigation_left}`}>
        <div className={style.logo}>
          <Link to="/">
            <img src="/img/icon/logo.png" alt="logo" />
          </Link>
        </div>
        <ul onClick={() => setMenu(false)} className={`${style.navigation_list} ${menu && style.navigation_list_active}`}>
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
        <div onClick={() => (!menu ? setMenu(true) : setMenu(false))} className={style.menu}>
          {!menu && <CloseIconMenu />}
          {menu && <OpenIconMenu />}
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            setActiveSeach(true);
          }}
          ref={seachRef}
          className={style.seach}
        >
          {!activeSeach && <SeachIcon className={`${style.search_icon} ${style.white}`} />}
          {activeSeach && <InputSeach activeSeach={activeSeach} />}
        </div>
        <div ref={profileRef} onClick={clickProfile} className={style.profile}>
          <ProfileIcon className={style.white} />
          {activeProfile && <ProfilePanel />}
        </div>
      </div>
    </header>
  );
}
