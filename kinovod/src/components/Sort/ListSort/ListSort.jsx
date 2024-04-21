import React, { useEffect, useState } from "react";
import style from "./ListSort.module.scss";
import { listSort } from "../../../data/data";
import { useNavigate, useParams } from "react-router-dom";

export default function ListSort() {
  const [list, setList] = useState([]);
  const { media_content, filter_params } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setList(listSort);
  }, []);

  function handleClick(e) {
    function getParamsFilter() {
      const params = new URLSearchParams(filter_params);
      const paramsObject = Object.fromEntries(params.entries());
      return paramsObject;
    }

    const params = getParamsFilter();
    const entry = Object.entries(list).find(([key, val]) => val === e.target.textContent);
    params.sort_by = entry[0];
    const queryParams = new URLSearchParams(params);

    navigate(`/media-content/${media_content}/filter_params/${queryParams}`);
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
