import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./style/reset.scss"; 
import "./style/fonts.scss"; 
import "./style/index.scss"; 

import Layout from "./page/Layout/Layout";
import Main from "./page/Main/Main";
import MoviePage from "./page/MoviePage/MoviePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Main/> },
      { path: "/movie/:movie_id", element: <MoviePage/> }
  ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
