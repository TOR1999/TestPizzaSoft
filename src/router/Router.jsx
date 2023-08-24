import { React, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { PageRoutes } from "./Constants";
import { MainPage } from "../pages/MainPage/MainPage";
import { UsersStore } from "../store/Users/UsersStore";
import { SystemStore } from "../store/System/SystemStore";
import { EditingPage } from "../pages/EditingPage/EditingPage";

export const Router = () => {
  useEffect(() => {
    window.addEventListener("resize", (e) => {
      console.log(e.currentTarget.screen.width);
      SystemStore.events.changeWidthWindow(window.screen.width);
    });
  }, []);

  return (
    <Routes>
      <Route
        key={PageRoutes.MAIN_PAGE}
        path={PageRoutes.MAIN_PAGE}
        element={<MainPage />}
      />
      <Route
        key={PageRoutes.EDIT_PAGE}
        path={PageRoutes.EDIT_PAGE}
        element={<EditingPage />}
      />
      <Route
        key={PageRoutes.NEW_USER_PAGE}
        path={PageRoutes.NEW_USER_PAGE}
        element={<EditingPage />}
      />
      <Route key={"*"} path={"*"} element={<MainPage />} />
    </Routes>
  );
};
