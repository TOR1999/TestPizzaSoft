import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MaskedInput from "antd-mask-input";
import { Checkbox, Input, Select, Button } from "antd";
import IMask from "imask";
import { useStore } from "effector-react";
import { UsersStore } from "../../store/Users/UsersStore";
import { PageRoutes } from "../../router/Constants";

export const EditingPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => UsersStore.events.initOptions(), []);
  useEffect(() => {
    if (!userId) return;

    const currUser =
      dataUsers.find((user) => Number(user.id) == Number(userId)) || {};

    if (!currUser.id) return;

    setNameUser(currUser.name);
    setStatusUser(currUser.isArchive);
    setRoleUser(currUser.role);
    setPhoneUser(currUser.phone);
    setBirthdayUser(currUser.birthday);
  }, [userId]);

  const optionsStatus = useStore(UsersStore.store.$optionsStatus);
  const dataUsers = useStore(UsersStore.store.$users);

  const [nameUser, setNameUser] = useState("");
  const [statusUser, setStatusUser] = useState("");
  const [roleUser, setRoleUser] = useState("");
  const [phoneUser, setPhoneUser] = useState("");
  const [birthdayUser, setBirthdayUser] = useState("");

  const onChangeNameUser = (e) => {
    setNameUser(e.target.value);
  };

  const onChangePhoneUser = (e) => {
    setPhoneUser(e.target.value);
  };

  const onChangeBirthdayUser = (e) => {
    setBirthdayUser(e.target.value);
  };

  const onChangeRoleUser = (value) => {
    setRoleUser(value);
  };

  const onChangeStatusUser = (e) => {
    setStatusUser(e.target.checked);
  };

  const editingUser = () => {
    return [
      ...dataUsers.map((currUser) => {
        return Number(currUser.id) == Number(userId)
          ? {
              id: userId,
              birthday: birthdayUser,
              isArchive: statusUser,
              name: nameUser,
              phone: phoneUser,
              role: roleUser,
            }
          : currUser;
      }),
    ];
  };

  const addUser = () => {
    const newId = dataUsers.reduce((acc, { id }) => {
      return acc > id ? acc : id;
    }, 1);

    console.log("newId", newId);
    return [
      ...dataUsers,
      {
        id: newId,
        birthday: birthdayUser,
        isArchive: statusUser,
        name: nameUser,
        phone: phoneUser,
        role: roleUser,
      },
    ];
  };

  const clickSaveDataUser = () => {
    // console.log(nameUser, statusUser, roleUser, phoneUser, birthdayUser);
    userId
      ? UsersStore.events.changeUsers(editingUser())
      : UsersStore.events.changeUsers(addUser());

    navigate(PageRoutes.MAIN_PAGE);
  };

  // console.log(dataUsers);

  return (
    <>
      Имя сотрудника:
      <Input
        placeholder="Введите имя сотрудника"
        value={nameUser}
        onChange={onChangeNameUser}
      ></Input>
      Телефон:
      <MaskedInput
        mask="+{7} (000) 000-0000"
        value={phoneUser}
        onChange={onChangePhoneUser}
      />
      Дата рождения:
      <MaskedInput
        value={birthdayUser}
        mask={Date}
        onChange={onChangeBirthdayUser}
      />
      Должность:
      <Select
        value={roleUser}
        onChange={onChangeRoleUser}
        placeholder="Выберите должность"
        style={{
          width: 200,
        }}
        options={optionsStatus}
      />
      Статус:
      <Checkbox checked={statusUser} onChange={onChangeStatusUser}>
        В архиве
      </Checkbox>
      <Button onClick={clickSaveDataUser}>Сохранить данные</Button>
    </>
  );
};
