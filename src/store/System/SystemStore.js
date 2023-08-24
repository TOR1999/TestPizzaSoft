import { createEvent, createStore } from "effector";

const events = {
  changeWidthWindow: createEvent(),
  changeMaxIdUser: createEvent(),
};

const $widthWindow = createStore(0).on(
  events.changeWidthWindow,
  (prevState, payLoad) => payLoad
);

const $maxIdUser = createStore(0).on(
  events.changeMaxIdUser,
  (prevState, payLoad) => payLoad
);

const store = { $widthWindow, $maxIdUser };

export const SystemStore = { events, store };
