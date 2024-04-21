import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "./MediaContent.module.scss";
import { client } from "../../api/tndb";
import CardMovie from "../../components/CardMovie/CardMovie";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { addTypeMediaContent } from "../../helpFunction/helpFunction";
import Filter from "../../components/Filter/Filter";
import Sort from "../../components/Sort/Sort";

export default function MediaContent() {
  const { media_content, filter_params } = useParams();
  const [content, setContent] = useState([]);
  const [titel, setTitel] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [сurrentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    function getParamsFilter() {
      const params = new URLSearchParams(filter_params);
      const paramsObject = !filter_params ? { language: "ru" } : Object.fromEntries(params.entries());
      paramsObject.page = сurrentPage;
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
        client.СomingSoon(`3/movie/upcoming?language=ru&page=${сurrentPage}`).then((res) => {
          const result = addTypeMediaContent(res.results, "movie");
          setContent(result);
          setTitel("Скоро на сайте");
          setTotalPages(res.total_pages > 500 ? 500 : res.total_pages);
        });
        break;
      default:
        setContent([]);
        setTitel("");
        setTotalPages(false);
        break;
    }
  }, [сurrentPage, media_content, filter_params]);

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
