import { PageRoutes } from "../../router/Constants";
import dataJSON from "../data/employees.json";
import { createEvent, createStore } from "effector";
import connectLocalStorage from "effector-localstorage";

export const dataUsers = [];

const events = {
  initOptions: createEvent(),
  addUser: createEvent(),
  updateUser: createEvent(),
  changeUsers: createEvent(),
  deleteUser: createEvent(),
};

const $users = createStore(dataJSON)
  .on(events.deleteUser, (prevState, payloadId) => {
    return prevState.filter((user) => user.id !== payloadId);
  })
  .on(events.changeUsers, (prevState, payload) => {
    return payload;
  });

connectLocalStorage({
  key: "users",
  store: $users,
});

const $usersTableData = $users.map((state) => {
  let num = 0;
  const tableData = state.map((currentuser) => {
    num++;
    return {
      key: currentuser.id,
      numeral: num,
      name: currentuser.name,
      isArchive: currentuser.isArchive,
      role: currentuser.role,
      phone: currentuser.phone,
      birthday: currentuser.birthday,
      link: PageRoutes.EDIT_PAGE,
    };
  });
  return tableData;
});

const $optionsStatus = $users.map((state) => {
  const roles = state.map(({ role }) => role);
  return [...new Set(roles)];
});

const store = { $users, $usersTableData, $optionsStatus };

export const UsersStore = {
  events,
  store,
};
