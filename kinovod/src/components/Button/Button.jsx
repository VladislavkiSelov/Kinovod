import React, { useState } from "react";
import { Oval } from "react-loader-spinner";
import style from "./Button.module.scss";

export default function Button({ type = "submit", text, classBtn, handelClick }) {
  const [loading, setLoading] = useState(false);


  return (
    <button type={type} onClick={handelClick} className={`${style.btn} ${classBtn || ""}`}>
      {text}
      {loading && (
        <Oval
          height={15}
          width={15}
          color="#f1f1f1"
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#f1f1f1"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      )}
    </button>
  );
}
