import React from "react";
import { Route, Routes } from "react-router-dom";
import { PageRoutes } from "./Constants";
import { MainPage } from "../pages/MainPage/MainPage";

export const Router = () => {
  return (
    <Routes>
      <Route
        key={PageRoutes.MAIN_PAGE}
        path={PageRoutes.MAIN_PAGE}
        element={<MainPage />}
      />
      <Route key={"*"} path={"*"} element={<MainPage />} />
    </Routes>
  );
};
