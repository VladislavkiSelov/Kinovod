import React from "react";
import style from "./CardMovie.module.scss";
import { ReactComponent as IconStar } from "../../assets/icon/raiting.svg";
import moment from "moment";

export default function CardMovie(props) {
  const { item } = props;

  return (
    <div className={style.card}>
      <div className={style.poster}>
        <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt="poster" />
      </div>
      <h3 className={style.titel}>{item.title}</h3>
      <div className={style.info}>
        <IconStar className={style.icon_start} />
        <span className={style.rating}>{item.vote_average}</span>
        <span className={style.year}>{moment(item.release_date).format("YYYY")}</span>
      </div>
    </div>
  );
}
