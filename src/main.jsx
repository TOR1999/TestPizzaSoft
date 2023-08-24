import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import "./index.css";
import { Router } from "./router/Router";
import ruRU from "antd/locale/ru_RU";
import "./store/Users/Init";
import "./store/System/SystemStore";
import { initI18n } from "./libs/i18n/init";

initI18n();

ReactDOM.createRoot(document.getElementById("root")).render(
  <ConfigProvider locale={ruRU}>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </ConfigProvider>
);
