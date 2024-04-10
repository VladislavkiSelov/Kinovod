import React from "react";
import { Outlet } from "react-router-dom";
import "./Layout.module.scss";
import "../../style/container.scss";
import style from './Layout.module.scss'
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function Layout() {
  return (
    <div className="wrapper">
      <Header />
      <section className={`container ${style.section_main}`}>
        <Outlet />
      </section>
      <Footer/>
    </div>
  );
}
