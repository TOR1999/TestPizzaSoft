import { createEvent, createStore } from "effector";

const events = {
  changeFilterStatus: createEvent(),
  changeFilterIsArchive: createEvent(),
};

const $filterStatus = createStore("").on(
  events.changeFilterStatus,
  (prevState, payload) => payload
);

const $filterIsArchive = createStore(null).on(
  events.changeFilterIsArchive,
  (prevState, payload) => payload
);

const store = { $filterStatus, $filterIsArchive };

export const FilterStore = { events, store };
