import React, { useEffect, useRef, useState } from "react";
import style from "./Header.module.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ReactComponent as ProfileIcon } from "../../assets/icon/profile.svg";
import { ReactComponent as SeachIcon } from "../../assets/icon/seach.svg";
import { ReactComponent as CloseIconMenu } from "../../assets/icon/close_humdurger.svg";
import { ReactComponent as OpenIconMenu } from "../../assets/icon/open_humdurger.svg";
import { ReactComponent as SettingsIcon } from "../../assets/icon/settings.svg";
import InputSeach from "../InputSeach/InputSeach";
import ProfilePanel from "../ProfilePanel/ProfilePanel";
import SettingsPanel from "../SettingsPanel/SettingsPanel";

export default function Header() {
  const [activeSeach, setActiveSeach] = useState(false);
  const [activePanel, setActivePanel] = useState(false);
  const [menu, setMenu] = useState(false);
  const seachRef = useRef(null);
  const profileRef = useRef(null);
  const user = Object.keys(useSelector((state) => state.user.user)).length;


  useEffect(() => {
    function handleClickOutside(e) {
      if (seachRef.current && !seachRef.current.contains(e.target)) {
        setActiveSeach(false);
      }

      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setActivePanel(false);
      }
    }

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const clickProfile = () => (!activePanel ? setActivePanel(true) : setActivePanel(false));

  const clickSeach = (e) => {
    e.stopPropagation();
    !activeSeach ? setActiveSeach(true) : setActiveSeach(false);
  };

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
        <div ref={seachRef} className={style.seach}>
          {!activeSeach && <SeachIcon onClick={clickSeach} className={`${style.search_icon} ${style.white}`} />}
          {activeSeach && <InputSeach activeSeach={activeSeach} />}
        </div>

        <div ref={profileRef} className={style.profile}>
          {user ? (
            <>
              <ProfileIcon onClick={clickProfile} className={style.white} />
              {activePanel && <ProfilePanel />}
            </>
          ) : null}

          {!user ? (
            <>
              <SettingsIcon onClick={clickProfile} className={style.white} />
              {activePanel && <SettingsPanel />}
            </>
          ) : null}
        </div>
      </div>
    </header>
  );
}
