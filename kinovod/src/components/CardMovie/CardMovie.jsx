import React, { useState } from "react";
import style from "./CardMovie.module.scss";
import { ReactComponent as IconStar } from "../../assets/icon/raiting.svg";
import { ReactComponent as IconSaveMovie } from "../../assets/icon/add_save.svg";
import { ReactComponent as IconDeleteMovie } from "../../assets/icon/delete_save.svg";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import noImg from "../../assets/pic/no_img.jpg";

export default function CardMovie(props) {
  const { item } = props;
  const navigate = useNavigate();
  const [save, setSave] = useState(false);

  function handelClick() {
    navigate(`/movie/${item.id}/type/${item.type}`);
  }

  return (
    <div className={style.card}>
      <div onClick={handelClick} className={style.wrapper_card}>
        <div className={style.poster}>
          <img src={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : noImg} alt="poster" />
        </div>
        <h3 className={style.titel}>{item.title || item.name}</h3>
        <div className={style.info}>
          <IconStar className={style.icon_start} />
          <span className={style.rating}>{item.vote_average}</span>
          <span className={style.year}>{moment(item.release_date || item.first_air_date).format("YYYY")}</span>
        </div>
      </div>
      <button onClick={() => (!save ? setSave(true) : setSave(false))} className={style.save_btn}>
        {!save ? <IconSaveMovie className={style.white} /> : <IconDeleteMovie className={style.white} />}
      </button>
    </div>
  );
}
