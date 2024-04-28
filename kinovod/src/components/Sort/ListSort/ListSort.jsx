import React, { useEffect, useState } from "react";
import style from "./ListSort.module.scss";
import { listSort } from "../../../data/data";
import { useNavigate, useParams } from "react-router-dom";

export default function ListSort() {
  const [list, setList] = useState([]);
  const { media_content, params } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setList(listSort);
  }, []);

  function handleClick(e) {
    function getParams(params) {
      const paramsURL = new URLSearchParams(params);
      const paramsObject = Object.fromEntries(paramsURL.entries());
      return paramsObject;
    }

    const paramsObject = getParams(params);
    const entry = Object.entries(list).find(([key, val]) => val === e.target.textContent);
    paramsObject.sort_by = entry[0];
    const queryParams = new URLSearchParams(paramsObject);

    navigate(`/media-content/${media_content}/params/${queryParams}`);
  }

  return (
    <ul className={style.list}>
      {Object.values(list).map((el, i) => (
        <li onClick={handleClick} key={i}>
          {el}
        </li>
      ))}
    </ul>
  );
}
