import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./style/reset.scss";
import "./style/fonts.scss";
import "./style/index.scss";

import Layout from "./page/Layout/Layout";
import Main from "./page/Main/Main";
import MoviePage from "./page/MoviePage/MoviePage";
import MediaContent from "./page/MediaContent/MediaContent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Main /> },
      { path: "/movie/:movie_id/type/:type", element: <MoviePage /> },
      { path: "/media-content/:media_content", element: <MediaContent /> },
      { path: "/media-content/:media_content/params/:params", element: <MediaContent /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);


