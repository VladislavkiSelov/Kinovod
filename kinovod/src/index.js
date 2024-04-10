import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./style/reset.scss"; 
import "./style/fonts.scss"; 
import "./style/index.scss"; 

import Layout from "./page/Layout/Layout";
import Main from "./page/Main/Main";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{ path: "/", element: <Main/> }]
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
