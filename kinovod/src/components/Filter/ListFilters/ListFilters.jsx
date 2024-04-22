import React, { useState } from "react";
import style from "./ListFilters.module.scss";
import { ReactComponent as Arrow } from "../../../assets/icon/arrow_right.svg";
import List from "../List/List";
import Button from "../../Button/Button";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

export default function ListFilters() {
  const [activeElementLi, setActiveElementLi] = useState(null);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { media_content, filter_params } = useParams();

  const onSubmit = (data) => {
    function getParamsFilter() {
      const params = new URLSearchParams(filter_params);
      const paramsObject = Object.fromEntries(params.entries());
      return paramsObject;
    }

    const params = getParamsFilter();

    console.log(data);

    switch (media_content) {
      case "movie":
        if (data.year?.length) {
          params.primary_release_year = data.year;
        }

        if (data.country?.length) {
          params.with_origin_country = data.country;
        }

        if (data.genre?.length) {
          params.with_genres = data.genre;
        }
        break;

      case "serial":
        if (data.year?.length) {
          params.first_air_date_year = data.year;
        }

        if (data.country?.length) {
          params.with_origin_country = data.country;
        }

        if (data.genre?.length) {
          params.with_genres = data.genre;
        }
        break;

      default:
        break;
    }

    params.language = "ru";
    params.page = "1";

    const queryParams = new URLSearchParams(params);
    console.log(queryParams);
    console.log(params);
    navigate(`/media-content/${media_content}/params/${queryParams}`);
  };

  return (
    <>
      <div className={style.filter}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ul className={style.list}>
            <li onClick={() => setActiveElementLi("genre")}>
              Жанр <Arrow className={style.arrow} />
            </li>
            <li onClick={() => setActiveElementLi("country")}>
              Страна <Arrow className={style.arrow} />
            </li>
            <li onClick={() => setActiveElementLi("year")}>
              Год <Arrow className={style.arrow} />
            </li>
          </ul>
          <div className={style.box_btn}>
            <Button text="Сбросить" />
            <Button text="Применить" />
          </div>
          {activeElementLi === "genre" && <List type="genre" register={register} setActiveElementLi={(value) => setActiveElementLi(value)} />}
          {activeElementLi === "country" && <List type="country" register={register} setActiveElementLi={(value) => setActiveElementLi(value)} />}
          {activeElementLi === "year" && <List type="year" register={register} setActiveElementLi={(value) => setActiveElementLi(value)} />}
        </form>
      </div>
    </>
  );
}
