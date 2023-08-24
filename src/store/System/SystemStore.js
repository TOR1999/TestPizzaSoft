import { createEvent, createStore } from "effector";
import { DeviceBreakPoints } from "../../style/MainPageStyle";

const events = {
  changeWidthWindow: createEvent(),
};

const $widthWindow = createStore(window.screen.width).on(
  events.changeWidthWindow,
  (prevState, payLoad) => payLoad
);

const $flagIsTablet = $widthWindow.map(
  (state) => state < DeviceBreakPoints.laptop
);

const store = { $widthWindow, $flagIsTablet };

export const SystemStore = { events, store };
