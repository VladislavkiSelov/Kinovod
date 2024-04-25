import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as Icon } from "../../assets/icon/filter_icon.svg";
import style from "./Filter.module.scss";
import ListFilters from "./ListFilters/ListFilters";

export default function Filter() {
  const [activeFilter, setActiveFilter] = useState(false);
  const listRef = useRef(null);

  function handleClick() {
    setActiveFilter(true);
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (!listRef.current.contains(e.target)) {
        setActiveFilter(false);
      }
    }

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={listRef} className={style.title} onClick={handleClick}>
      <Icon />
      <h3>Фильтры</h3>
      {activeFilter && <ListFilters />}
    </div>
  );
}
