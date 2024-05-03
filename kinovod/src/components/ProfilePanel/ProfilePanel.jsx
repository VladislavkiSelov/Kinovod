import React from "react";
import style from "./ProfilePanel.module.scss";

import { ReactComponent as ProfileIcon } from "../../assets/icon/profile_list/svgexport_5.svg";
import { ReactComponent as SaveIcon } from "../../assets/icon/profile_list/svgexport_6.svg";
import { ReactComponent as HistoryIcon } from "../../assets/icon/profile_list/svgexport_7.svg";
import { ReactComponent as RatingIcon } from "../../assets/icon/profile_list/svgexport_13.svg";
import { ReactComponent as CommentIcon } from "../../assets/icon/profile_list/svgexport_9.svg";
import { ReactComponent as ExitIcon } from "../../assets/icon/profile_list/svgexport_10.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slice/userSlice";

export default function ProfilePanel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function exitProfile() {
    dispatch(setUser({}));
    localStorage.removeItem("user");
    navigate("/");
  }

  return (
    <div className={style.profile_panel}>
      <ul className={style.list}>
        <li>
          <Link to="/profile">
            <ProfileIcon />
            <p>Профиль</p>
          </Link>
        </li>
        <li>
          <Link to="/media-content/favorites">
            <SaveIcon />
            <p>Избранное</p>
          </Link>
        </li>
        <li>
          <Link to="/media-content/history">
            <HistoryIcon />
            <p>История</p>
          </Link>
        </li>
        <li>
          <Link to="/ratings">
            <RatingIcon />
            <p>Оценки</p>
          </Link>
        </li>
        <li>
          <Link to="/comments">
            <CommentIcon />
            <p>Комментарии</p>
          </Link>
        </li>
        <li className={style.exit} onClick={exitProfile}>
          <ExitIcon />
          <p>Выйти</p>
        </li>
      </ul>
    </div>
  );
}
