import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from "./MediaContent.module.scss";
import { client } from "../../api/tndb";
import { clientMyDB } from "../../api/mydb";
import CardMovie from "../../components/CardMovie/CardMovie";
import { addTypeMediaContent, getFavoriteMovieTMDB } from "../../helpFunction/helpFunction";
import Filter from "../../components/Filter/Filter";
import Sort from "../../components/Sort/Sort";
import MyPagination from "../../components/MyPagination/MyPagination";
import { Oval } from "react-loader-spinner";
import { useSelector } from "react-redux";

export default function MediaContent() {
  const { media_content, params } = useParams();
  const [content, setContent] = useState([]);
  const [titel, setTitel] = useState([]);
  const [totalPages, setTotalPages] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const userState = useSelector((state) => state.user.user);

  useEffect(() => {
    function getParamsFilter() {
      const getParams = new URLSearchParams(params);
      const paramsObject = !params ? { language: "ru" } : Object.fromEntries(getParams.entries());
      paramsObject.page = currentPage;
      return new URLSearchParams(paramsObject);
    }

    const queryParams = getParamsFilter();

    setLoading(true);

    switch (media_content) {
      case "movie":
        client.getMoviesPopular(`3/discover/movie?${queryParams}`).then((res) => {
          const result = addTypeMediaContent(res.results, "movie");
          setContent(result);
          setTitel("Фильмы");
          setTotalPages(res.total_pages > 500 ? 500 : res.total_pages);
        });
        break;

      case "serial":
        client.getSerialPopular(`3/discover/tv?${queryParams}`).then((res) => {
          const result = addTypeMediaContent(res.results, "serial");
          setContent(result);
          setTitel("Сериалы");
          setTotalPages(res.total_pages > 500 ? 500 : res.total_pages);
        });
        break;

      case "coming-soon":
        client.ComingSoon(`3/movie/upcoming?language=ru&page=${currentPage}`).then((res) => {
          const result = addTypeMediaContent(res.results, "movie");
          setContent(result);
          setTitel("Скоро на сайте");
          setTotalPages(res.total_pages > 500 ? 500 : res.total_pages);
        });
        break;

      case "search":
        Promise.all([
          client.getSearchListMovie(`3/search/movie?${queryParams}`),
          client.getSearchListMovie(`3/search/tv?${queryParams}`),
          client.getSearchListMovie(`3/search/multi?${queryParams}`),
        ])
          .then(([movie, tv, multi]) => {
            const movies = addTypeMediaContent(movie.results, "movie");
            const tvs = addTypeMediaContent(tv.results, "serial");
            const multis = addTypeMediaContent(multi.results, "movie");
            setContent([...movies, ...tvs, ...multis]);
          })
          .catch((error) => {
            console.error("An error occurred:", error);
          });
        break;

      case "favorites":
        clientMyDB
          .getMovieFavorite("movie/favorite", userState.token, { user_id: userState.id })
          .then((res) => getFavoriteMovieTMDB(res.data.movies))
          .then((res) => {
            setContent(res || []);
            setTitel("Избраное");
          });
        break;
        
      default:
        setContent([]);
        setTitel("");
        setTotalPages(false);
        break;
    }
  }, [currentPage, media_content, params, navigate]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
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

  const showSortFilter = media_content === "coming-soon" || media_content === "search" || media_content === "favorites";
  const statusSave = media_content === "favorites" ? true : false;

  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <h3 className={style.titel}>{titel}</h3>
        {!showSortFilter && (
          <div className={style.filter}>
            <Filter />
            <Sort />
          </div>
        )}
      </div>
      <div className={style.content}>
        {content.map((item, i) => {
          return <CardMovie statusSave={statusSave} key={i} item={item} />;
        })}
      </div>
      {totalPages && <MyPagination totalPages={totalPages} handlePageChange={handlePageChange} />}
    </div>
  );
}
