import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./Layout.module.scss";
import "../../style/container.scss";
import style from "./Layout.module.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function Layout() {
  const location = useLocation();

  return (
    <div className="wrapper">
      <Header />
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="fade" timeout={500}>
          <section className={`container ${style.section_main}`}>
            <Outlet />
          </section>
        </CSSTransition>
      </TransitionGroup>
      <Footer />
    </div>
  );
}
