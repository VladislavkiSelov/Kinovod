import React from "react";
import style from "./ProfilePanel.module.scss";

import { ReactComponent as ProfileIcon } from "../../assets/icon/profile_list/svgexport_5.svg";
import { ReactComponent as SaveIcon } from "../../assets/icon/profile_list/svgexport_6.svg";
import { ReactComponent as HistoryIcon } from "../../assets/icon/profile_list/svgexport_7.svg";
import { ReactComponent as RatingIcon } from "../../assets/icon/profile_list/svgexport_13.svg";
import { ReactComponent as CommentIcon } from "../../assets/icon/profile_list/svgexport_9.svg";
import { ReactComponent as ExitIcon } from "../../assets/icon/profile_list/svgexport_10.svg";

export default function ProfilePanel() {
  return (
    <div className={style.profile_panel}>
      <ul className={style.list}>
        <li>
          <ProfileIcon />
          <p>Профиль</p>
        </li>
        <li>
          <SaveIcon />
          <p>Избранное</p>
        </li>
        <li>
          <HistoryIcon />
          <p>История</p>
        </li>
        <li>
          <RatingIcon />
          <p>Оценки</p>
        </li>
        <li>
          <CommentIcon />
          <p>Комментарии</p>
        </li>
        <li>
          <ExitIcon />
          <p>Выйти</p>
        </li>
      </ul>
    </div>
  );
}
