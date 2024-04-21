import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as Icon } from "../../assets/icon/sort_icon.svg";
import style from "./Sort.module.scss";
import ListSort from "./ListSort/ListSort";

export default function Sort() {
  const [activeList, setActiveList] = useState(false);
  const listRef = useRef(null);

  function handleClick() {
    setActiveList(true);
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (!listRef.current.contains(e.target)) {
        setActiveList(false);
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
      <h3>Сортировать</h3>
      {activeList && <ListSort />}
    </div>
  );
}
