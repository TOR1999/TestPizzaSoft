import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { ru } from "./ru";

export const initI18n = () => {
  const resources = {
    ru: { translation: ru },
  };

  i18next.use(initReactI18next).init({
    compatibilityJSON: "v3",
    resources,
    lng: "ru",
    keySeparator: ".",
  });
};
