import React, { useState } from "react";
import style from "./ListFilters.module.scss";
import { ReactComponent as Arrow } from "../../../assets/icon/arrow_right.svg";
import List from "../List/List";
import Button from "../../Button/Button";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { getParamsFilter } from "../../../helpFunction/helpFunction";

export default function ListFilters() {
  const [activeElementLi, setActiveElementLi] = useState(null);
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const { media_content, params } = useParams();

  const onSubmit = (data) => {
    const paramsObj = getParamsFilter(params);

    switch (media_content) {
      case "movie":
        data.year?.length ? (paramsObj.primary_release_year = data.year) : delete paramsObj.primary_release_year;
        data.country?.length ? (paramsObj.with_origin_country = data.country) : delete paramsObj.with_origin_country;
        data.genre?.length ? (paramsObj.with_genres = data.genre) : delete paramsObj.with_genres;
        break;

      case "serial":
        data.year?.length ? (paramsObj.first_air_date_year = data.year) : delete paramsObj.first_air_date_year;
        data.country?.length ? (paramsObj.with_origin_country = data.country) : delete paramsObj.with_origin_country;
        data.genre?.length ? (paramsObj.with_genres = data.genre) : delete paramsObj.with_genres;
        break;

      default:
        break;
    }

    paramsObj.language = "ru";
    paramsObj.page = "1";

    const queryParams = new URLSearchParams(paramsObj);
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
          {activeElementLi === "genre" && (
            <List
              type="genre"
              setValue={(type, value) => setValue(type, value)}
              register={register}
              setActiveElementLi={(value) => setActiveElementLi(value)}
            />
          )}
          {activeElementLi === "country" && (
            <List
              type="country"
              register={register}
              setValue={(type, value) => setValue(type, value)}
              setActiveElementLi={(value) => setActiveElementLi(value)}
            />
          )}
          {activeElementLi === "year" && (
            <List
              type="year"
              register={register}
              setValue={(type, value) => setValue(type, value)}
              setActiveElementLi={(value) => setActiveElementLi(value)}
            />
          )}
        </form>
      </div>
    </>
  );
}
