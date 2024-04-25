import React, { useEffect, useState } from "react";
import style from "./Main.module.scss";
import { client } from "../../api/tndb";
import CardMovie from "../../components/CardMovie/CardMovie";
import { addTypeMediaContent } from "../../helpFunction/helpFunction";
import { Oval } from 'react-loader-spinner';

export default function Main() {
  const [moviesNowPlaying, setMoviesNowPlaying] = useState([]);
  const [moviesPopular, setMoviesPopular] = useState([]);
  const [serialPopular, setSerialPopular] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Promise.all([
      client.getMoviesNowPlaying(`3/movie/now_playing?language=ru&page=1`),
      client.getMoviesPopular(`3/movie/popular?language=ru&page=1`),
      client.getSerialPopular(`3/tv/popular?language=ru&page=1`),
    ])
      .then(([resMovieNowPlaying, resMoviePopular, resTvPopular]) => {
        const movieNowPlaying = addTypeMediaContent(resMovieNowPlaying.results, "movie");
        const moviePopular = addTypeMediaContent(resMoviePopular.results, "movie");
        const tvPopular = addTypeMediaContent(resTvPopular.results, "serial");

        setMoviesNowPlaying(movieNowPlaying);
        setMoviesPopular(moviePopular);
        setSerialPopular(tvPopular);
        setLoading(true)
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, []);

  if (!loading) {
    return (
      <Oval
        height={80}
        width={80}
        color="#f1f1f1"
        wrapperClass="container"
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#f1f1f1"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    );
  }

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
