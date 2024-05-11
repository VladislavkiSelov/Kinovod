import React, { useState } from "react";
import style from "./CardMovie.module.scss";
import { ReactComponent as IconStar } from "../../assets/icon/raiting.svg";
import { ReactComponent as IconSaveMovie } from "../../assets/icon/add_save.svg";
import { ReactComponent as IconDeleteMovie } from "../../assets/icon/delete_save.svg";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import noImg from "../../assets/pic/no_img.jpg";
import { useDispatch, useSelector } from "react-redux";
import { clientMyDB } from "../../api/mydb";
import { setStatusLogIn } from "../../store/slice/logInSlice";

export default function CardMovie(props, statusSave = false) {
  const { item } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { media_content } = useParams();
  const [save, setSave] = useState(props.statusSave);
  const userState = useSelector((state) => state.user.user);

  function handelClick() {
    navigate(`/movie/${item.id}/type/${item.type}`);
  }

  const body = {
    movie_id: item.id,
    user_id: userState.id,
    type: item.type,
  };

  async function clickSaveMovie() {
    if (!!!userState.token) {
      dispatch(setStatusLogIn(true));
      return
    }

    if (!save) {
      await clientMyDB
        .addMovieFavorite({ path: "movie/favorite", token: userState.token, body })
        .then(() => setSave(true))
        .catch(() => console.log("Ошибка добавления фильма в избранное"));
    } else {
      await clientMyDB
        .deleteMovieFavorite({ path: "movie/favorite", token: userState.token, params: { movie_id: item.id, user_id: userState.id } })
        .then(() => {
          setSave(false);
          if (media_content === "favorites") {
            navigate("/media-content/favorites");
          }
        })
        .catch(() => console.log("Ошибка удаления фильма из избранного"));
    }
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
      <button onClick={clickSaveMovie} className={style.save_btn}>
        {!save ? <IconSaveMovie className={style.white} /> : <IconDeleteMovie className={style.white} />}
      </button>
    </div>
  );
}
