import { createEvent, createStore } from "effector";

const events = {
  changeFilterStatus: createEvent(),
  changeFilterIsArchive: createEvent(),
  toggleSortByName: createEvent(),
  toggleSortByBirthday: createEvent(),
};

export const SortTypes = {
  NONE: "none",
  ASCENDING: "ascending",
  DESCENDING: "descending",
};

const NEXT_SORT_TYPE = {
  [SortTypes.NONE]: SortTypes.ASCENDING,
  [SortTypes.ASCENDING]: SortTypes.DESCENDING,
  [SortTypes.DESCENDING]: SortTypes.NONE,
};

const $typeOfSortByName = createStore("none").on(
  events.toggleSortByName,
  (prevState) => NEXT_SORT_TYPE[prevState]
);

const $typeOfSortByBirthday = createStore("none").on(
  events.toggleSortByBirthday,
  (prevState) => NEXT_SORT_TYPE[prevState]
);

const $filterStatus = createStore("").on(
  events.changeFilterStatus,
  (prevState, payload) => payload
);

const $filterIsArchive = createStore(null).on(
  events.changeFilterIsArchive,
  (prevState, payload) => payload
);

const store = {
  $filterStatus,
  $filterIsArchive,
  $typeOfSortByName,
  $typeOfSortByBirthday,
};

export const FilterStore = { events, store };
