import React, { useEffect, useState } from "react";
import { client } from "../../../api/tndb";
import style from "./List.module.scss";
import Button from "../../Button/Button";
import { ReactComponent as Arrow } from "../../../assets/icon/arrow_right.svg";
import { dataListYear } from "../../../data/data";

export default function List({ setActiveElementLi, type, register }) {
  const [list, setList] = useState([]);

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

  function handelClick(e) {
    e.stopPropagation();
    setActiveElementLi(null);
  }

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
              <input {...register(type)} value={type === "genre" ? el.id : type === "country" ? el.iso_3166_1 : el} type="checkbox" />
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
