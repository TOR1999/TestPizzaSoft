import dataJSON from "../data/employees.json";
import { createEvent, createStore } from "effector";
import connectLocalStorage from "effector-localstorage";

export const dataUsers = [];

const events = {
  initOptions: createEvent(),
  addUser: createEvent(),
  updateUser: createEvent(),
  deleteUser: createEvent(),
};

const $users = createStore(dataJSON)
  .on(events.deleteUser, (prevState, payloadId) => {
    return prevState.filter((user) => user.id !== payloadId);
  })
  .on(events.updateUser, (prevState, payload) => {
    return [
      ...prevState.map((currUser) => {
        return Number(currUser.id) == Number(payload.id)
          ? {
              id: payload.id,
              birthday: payload.birthday,
              isArchive: payload.isArchive,
              name: payload.name,
              phone: payload.phone,
              role: payload.role,
            }
          : currUser;
      }),
    ];
  })
  .on(events.addUser, (prevState, payload) => {
    const newId = prevState.reduce((acc, { id }) => {
      return acc > id ? acc : id;
    }, 1);

    return [
      ...prevState,
      {
        id: newId + 1,
        birthday: payload.birthday,
        isArchive: payload.isArchive,
        name: payload.name,
        phone: payload.phone,
        role: payload.role,
      },
    ];
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
