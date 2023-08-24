import { PageRoutes } from "../../router/Constants";
import { SystemStore } from "../System/SystemStore";
import dataJSON from "../data/employees.json";
import { createEvent, createStore } from "effector";

export const dataUsers = [];

const events = {
  initUsers: createEvent(),
  initOptions: createEvent(),
  changeUsers: createEvent(),
  deleteUser: createEvent(),
};

const $users = createStore([])
  .on(events.initUsers, () => dataJSON)
  .on(events.deleteUser, (prevState, payloadId) => {
    return prevState.filter((user) => user.id !== payloadId);
  })
  .on(events.changeUsers, (prevState, payload) => {
    console.log("payload", payload);
    return payload;
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

const $optionsStatus = createStore([]).on(events.initOptions, () => {
  let options = [];

  $users.map((state) => {
    let setOptions = new Set();

    state.map((user) => {
      setOptions.add(user.role);
    });

    for (let value of setOptions) {
      options.push({ value: value, label: value });
    }
  });
  return options;
});

const store = { $users, $usersTableData, $optionsStatus };

export const UsersStore = {
  events,
  store,
};
