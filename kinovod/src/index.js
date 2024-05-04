import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import "./style/reset.scss";
import "./style/fonts.scss";
import "./style/index.scss";

import Layout from "./page/Layout/Layout";
import Main from "./page/Main/Main";
import MoviePage from "./page/MoviePage/MoviePage";
import MediaContent from "./page/MediaContent/MediaContent";
import ProfilePage from "./page/ProfilePage/ProfilePage";
import RatingsPage from "./page/RatingsPage/RatingsPage";
import CommentsPage from "./page/CommentsPage/CommentsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Main /> },
      { path: "/profile", element: <ProfilePage /> },
      { path: "/ratings", element: <RatingsPage /> },
      { path: "/comments", element: <CommentsPage /> },
      { path: "/movie/:movie_id/type/:type", element: <MoviePage /> },
      { path: "/media-content/:media_content", element: <MediaContent /> },
      { path: "/media-content/:media_content/params/:params", element: <MediaContent /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
