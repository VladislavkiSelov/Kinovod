import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "./MoviePage.module.scss";
import { client } from "../../api/tndb";
import { ReactComponent as IconStar } from "../../assets/icon/raiting_grey.svg";
import moment from "moment";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import StarIcon from "@mui/icons-material/Star";
import AddComment from "../../components/AddComment/AddComment";
import Button from "../../components/Button/Button";
import noImg from "../../assets/pic/no_img.jpg";
import { Oval } from "react-loader-spinner";

export default function MoviePage() {
  const { movie_id, type } = useParams();
  const [movie, setMovie] = useState({});
  const [trailer, setTrailer] = useState({});
  const [actors, setActors] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const trailerUrl = `https://www.youtube.com/embed/${trailer?.key}`;

  useEffect(() => {
    switch (type) {
      case "movie":
        client.getMovie(`3/movie/${movie_id}?language=ru`).then((res) => {
          setMovie(res);
          setRating(Math.round(res.vote_average));
          setLoading(true);
        });
        client.getTrailer(`3/movie/${movie_id}/videos?language=ru`).then((res) => setTrailer(res.results.find((video) => video.type === "Trailer")));
        break;

      case "serial":
        client.getMovie(`3/tv/${movie_id}?language=ru`).then((res) => {
          setMovie(res);
          setRating(Math.round(res.vote_average));
          setLoading(true);
        });
        client.getTrailer(`3/tv/${movie_id}/videos?language=ru`).then((res) => setTrailer(res.results[0]?.key));
        break;

      default:
        setMovie({});
        break;
    }

    client.getActors(`3/movie/${movie_id}/credits?language=ru`).then((res) => setActors(res.cast));
    client.getDirectors(`3/movie/${movie_id}/credits?language=ru`).then((res) => setDirectors(res.crew));
  }, [movie_id, type]);

  function transformationMinutes(runtime) {
    const duration = moment.duration(runtime, "minutes");
    const hours = duration.hours();
    const minutes = duration.minutes();
    return { hours, minutes };
  }

  const handleRatingChange = (event, newValue) => {
    console.log(newValue);
    setRating(newValue);
  };

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
    <div className={style.movie_page}>
      <div className={style.wrapper_head}>
        <div className={style.poster}>
          <div className={style.picture}>
            <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : noImg} alt="poster" />
          </div>
          <div className={style.info}>
            <IconStar className={style.icon_start} />
            <p>{movie.vote_average}</p>
          </div>
          <Stack spacing={1}>
            <Rating
              name="size-large"
              onChange={handleRatingChange}
              emptyIcon={<StarIcon style={{ color: "#faaf00", opacity: 0.2 }} fontSize="inherit" />}
              precision={1}
              max={10}
              defaultValue={rating}
              value={rating}
              size="large"
            />
          </Stack>
        </div>
        <div className={style.movie_info}>
          <h2>{movie.title}</h2>
          <div>
            <h3>Название</h3>
            <h4>{movie.original_title || movie.name}</h4>
          </div>
          <div>
            <h3>Год</h3>
            <h4>{moment(movie.release_date || movie.first_air_date).format("YYYY")}</h4>
          </div>
          {movie.production_countries && (
            <div>
              <h3>Страна</h3>
              <div>
                {movie?.production_countries?.map((el) => (
                  <span key={el.name}>{el.name}</span>
                ))}
              </div>
            </div>
          )}
          <div>
            <h3>Жанр</h3>
            <div className={style.list_genres}>
              {movie.genres?.map((el, index) => (
                <span key={index}>{el.name && el.name[0].toUpperCase() + el.name.slice(1) + ", "}</span>
              ))}
            </div>
          </div>
          <div>
            <h3>Режиссер</h3>
            <div>
              {movie.production_countries?.map((el) => (
                <span key={el.name}>{el.name}</span>
              ))}
            </div>
          </div>
          <div>
            <h3>Актеры</h3>
            <div className={style.list_actors}>{actors && actors.slice(0, 10)?.map((el) => <span key={el.name}>{el.name + ", "}</span>)}</div>
          </div>
          <div>
            <h3>Режиссер</h3>
            <div>{actors && directors.slice(0, 1)?.map((el) => <span key={el.name}>{el.name}</span>)}</div>
          </div>
          {type === "movie" && (
            <div>
              <h3>Длительность</h3>
              <span>
                {transformationMinutes(movie.runtime).hours} час {transformationMinutes(movie.runtime).minutes} минута
              </span>
            </div>
          )}
          <div className={style.overview}>
            <p>{movie.overview}</p>
          </div>
        </div>
      </div>
      <div className={style.box_video}>
        <div className={style.video_container}>
          <iframe className={style.trailer} src={trailerUrl} frameBorder="0" allowFullScreen></iframe>
        </div>
        <Button text="В избранное" />
      </div>
      <AddComment />
    </div>
  );
}
