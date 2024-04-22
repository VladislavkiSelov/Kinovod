import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from "./MediaContent.module.scss";
import { client } from "../../api/tndb";
import CardMovie from "../../components/CardMovie/CardMovie";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { addTypeMediaContent } from "../../helpFunction/helpFunction";
import Filter from "../../components/Filter/Filter";
import Sort from "../../components/Sort/Sort";

export default function MediaContent() {
  const { media_content, params } = useParams();
  const [content, setContent] = useState([]);
  const [titel, setTitel] = useState([]);
  const [totalPages, setTotalPages] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    function getParamsFilter() {
      const getParams = new URLSearchParams(params);
      const paramsObject = !params ? { language: "ru" } : Object.fromEntries(getParams.entries());
      paramsObject.page = currentPage;
      return new URLSearchParams(paramsObject);
    }

    const queryParams = getParamsFilter();

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
        client.СomingSoon(`3/movie/upcoming?language=ru&page=${currentPage}`).then((res) => {
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
            const tvs = addTypeMediaContent(movie.results, "serial");
            const multis = addTypeMediaContent(movie.results, "movie");
            //add type;
            if ([...movie.results, ...tv.results, ...multi.results].length) {
              setContent([...movies, ...tvs, ...multis]);
            } else {
              navigate(-1);
            }
          })
          .catch((error) => {
            console.error("An error occurred:", error);
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

  return (
    <div>
      <div className={style.header}>
        <h3 className={style.titel}>{titel}</h3>
        {media_content !== "coming-soon" && (
          <div className={style.filter}>
            <Filter />
            <Sort />
          </div>
        )}
      </div>
      <div className={style.content}>
        {content.map((item, i) => {
          return <CardMovie key={i} item={item} />;
        })}
      </div>
      {totalPages && (
        <Stack spacing={2}>
          <Pagination
            onChange={handlePageChange}
            count={totalPages}
            style={{ backgroundColor: "blue", color: "white" }}
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      )}
    </div>
  );
}
