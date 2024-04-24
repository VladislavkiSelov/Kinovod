import React, { useEffect, useState } from "react";
import { client } from "../../../api/tndb";
import style from "./List.module.scss";
import Button from "../../Button/Button";
import { ReactComponent as Arrow } from "../../../assets/icon/arrow_right.svg";
import { dataListYear } from "../../../data/data";
import { getParamsFilter } from "../../../helpFunction/helpFunction";
import { useParams } from "react-router-dom";

export default function List({ setActiveElementLi, type, register, setValue }) {
  const [list, setList] = useState([]);
  const { params } = useParams();
  const { with_genres, with_origin_country, primary_release_year, first_air_date_year } = getParamsFilter(params);

  useEffect(() => {
    switch (type) {
      case "genre":
        client.getListGenres(`3/genre/movie/list?language=ru`).then((res) => {
          setList(res.genres);
        });
        break;

      case "country":
        client.getListCountry(`3/configuration/countries?language=ru`).then((res) => {
          setList(res);
        });
        break;

      case "year":
        setList(dataListYear);
        break;
      default:
        setList([]);
        break;
    }
  }, [type]);

  useEffect(() => {
    // Устанавливаем значения чекбоксов, если они есть в URL
    if (with_genres) {
      setValue("genre", with_genres.split(",").map(Number));
    }
    if (with_origin_country) {
      setValue("country", with_origin_country.split(","));
    }
    if (primary_release_year) {
      setValue("year", parseInt(primary_release_year));
    }
    if (first_air_date_year) {
      setValue("year", parseInt(first_air_date_year));
    }
  }, [setValue, with_genres, with_origin_country, primary_release_year, first_air_date_year]);

  function handelClick(e) {
    e.stopPropagation();
    setActiveElementLi(null);
  }

  console.log(list);
  console.log(primary_release_year);

  return (
    <div className={style.wrapper}>
      <div className={style.title}>
        <Arrow className={style.arrow} />
        <h3 onClick={handelClick}>Жанр</h3>
      </div>
      <ul className={style.list}>
        {list.map((el, i) => (
          <li key={i}>
            <label>
              <input
                {...register(type)}
                value={type === "genre" ? el.id : type === "country" ? el.iso_3166_1 : el}
                type="checkbox"
                defaultChecked={
                  type === "genre"
                    ? with_genres && with_genres.split(",").includes(String(el.id))
                    : type === "country"
                    ? with_origin_country && with_origin_country.split(",").includes(el.iso_3166_1)
                    : type === "year"
                    ? (primary_release_year || first_air_date_year) && (primary_release_year || first_air_date_year).split(",").includes(el + "")
                    : false
                }
              />
              {type === "genre"
                ? el.name[0].toUpperCase() + el.name.slice(1)
                : type === "country"
                ? el.native_name[0].toUpperCase() + el.native_name.slice(1)
                : el}
            </label>
          </li>
        ))}
      </ul>
      <div className={style.box_btn}>
        <Button text="Сбросить" />
        <Button text="Применить" />
      </div>
    </div>
  );
}
