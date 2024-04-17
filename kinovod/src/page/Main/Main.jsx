import React, { useEffect, useState } from "react";
import style from "./Main.module.scss";
import { client } from "../../api/tndb";
import CardMovie from "../../components/CardMovie/CardMovie";

export default function Main() {
  const [moviesNowPlaying, setMoviesNowPlaying] = useState([]);
  const [moviesPopular, setMoviesPopular] = useState([]);
  const [serialPopular, setSerialPopular] = useState([]);

  useEffect(() => {
    client.getMoviesNowPlaying(`3/movie/now_playing?language=ru&page=1`).then((res) => setMoviesNowPlaying(res.results));
    client.getMoviesPopular(`3/movie/popular?language=ru&page=1`).then((res) => setMoviesPopular(res.results));
    client.getSerialPopular(`3/tv/popular?language=ru&page=1`).then((res) => setSerialPopular(res.results));
  }, []);

  return (
    <>
      <div>
        <h3 className={style.titel}>Популярные</h3>
        <div className={style.content}>
          {moviesPopular.map((item) => {
            return <CardMovie key={item.id} item={item} />;
          })}
        </div>
      </div>
      <div>
        <h3 className={style.titel}>Фильмы</h3>
        <div className={style.content}>
          {moviesNowPlaying.map((item) => (
            <CardMovie key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div>
        <h3 className={style.titel}>Сериалы</h3>
        <div className={style.content}>
          {serialPopular.map((item) => (
            <CardMovie key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}
