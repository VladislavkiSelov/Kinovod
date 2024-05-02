import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./Layout.module.scss";
import "../../style/container.scss";
import style from "./Layout.module.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../store/slice/userSlice";

export default function Layout() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const updateToken = async () => {
      const user = JSON.parse(localStorage.getItem("user"));

      if (user?.token) {
        const url = `http://localhost:7000/token`;
        const params = { id: user.id };
        const token = await dispatch(fetchUser({ url, params }));
        localStorage.setItem("user", JSON.stringify(token.payload));
      }
    };

    updateToken();

    const intervalId = setInterval(updateToken, 1.5 * 60 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

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
