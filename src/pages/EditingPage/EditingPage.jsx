import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Checkbox, Input, Select, Button, Typography } from "antd";
import { useStore } from "effector-react";
import { UsersStore } from "../../store/Users/UsersStore";
import { PageRoutes } from "../../router/Constants";
import { MaskInput } from "../../components/MaskInput";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { styled } from "styled-components";
import { device } from "../../style/MainPageStyle";

const EditingPageContainer = styled.div`
  width: 100%;
  padding: 5px;
  margin: 0;

  @media ${device.tablet} {
    width: 400px;
  }
`;

const FieldContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1px;
`;

const ButtonsContainer = styled.div`
  width: 100%;
  gap: 10px;
  display: flex;
  flex-direction: column;
`;

const ErrorContainer = styled.div`
  width: 100%;
  height: 18px;
`;

const validateData = {
  name: (value) => {
    if (!value) return "Поле не может быть пустым";

    return null;
  },
  phone: (value) => {
    if (!value) return "Поле не может быть пустым";
    if (value.includes("_"))
      return "Неообходимо заполнить номер телефона до конца";

    return null;
  },
  birthday: (value) => {
    if (!value) return "Поле не может быть пустым";
    if (value.includes("_")) return "Неообходимо заполнить дату до конца";
    if (!moment(value, "DD.MM.YYYY").isValid()) return "Некорректная дата";
    if (moment(value, "DD.MM.YYYY").isAfter(moment.now()))
      return "Дата не может быть из будущего";

    return null;
  },
};

export const EditingPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const optionsStatus = useStore(UsersStore.store.$optionsStatus);
  const dataUsers = useStore(UsersStore.store.$users);

  const [nameUser, setNameUser] = useState("");
  const [nameUserError, setNameUserError] = useState(null);
  const [statusUser, setStatusUser] = useState(false);
  const [roleUser, setRoleUser] = useState(null);
  const [phoneUser, setPhoneUser] = useState("");
  const [phoneUserError, setPhoneUserError] = useState(null);
  const [birthdayUser, setBirthdayUser] = useState("");
  const [birthdayUserError, setBirthdayUserError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const currUser = dataUsers.find((user) => user.id === Number(userId)) || {};

    if (!currUser.id) return;

    setNameUser(currUser.name);
    setStatusUser(currUser.isArchive);
    setRoleUser(currUser.role);
    setPhoneUser(currUser.phone);
    setBirthdayUser(currUser.birthday);
  }, [userId, dataUsers]);

  const onChangeNameUser = (e) => {
    setNameUser(e.target.value);
    setNameUserError(validateData.name(e.target.value));
  };

  const onChangePhoneUser = (e) => {
    setPhoneUser(e.target.value);
    setPhoneUserError(validateData.phone(e.target.value));
  };

  const onChangeBirthdayUser = (e) => {
    setBirthdayUser(e.target.value);
    setBirthdayUserError(validateData.birthday(e.target.value));
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

    return [
      ...dataUsers,
      {
        id: newId + 1,
        birthday: birthdayUser,
        isArchive: statusUser,
        name: nameUser,
        phone: phoneUser,
        role: roleUser,
      },
    ];
  };

  const clickSaveDataUser = () => {
    userId
      ? UsersStore.events.changeUsers(editingUser())
      : UsersStore.events.changeUsers(addUser());

    navigate(PageRoutes.MAIN_PAGE);
  };

  const clickBackToMainPage = () => {
    navigate(PageRoutes.MAIN_PAGE);
  };

  const selectOptions = optionsStatus.map((role) => ({
    value: role,
    label: t(role),
  }));

  return (
    <EditingPageContainer>
      <FieldContainer>
        Имя сотрудника:
        <Input
          placeholder="Введите имя сотрудника"
          value={nameUser}
          onChange={onChangeNameUser}
        />
        <ErrorContainer>
          {nameUserError && (
            <Typography.Text type="danger">{nameUserError}</Typography.Text>
          )}
        </ErrorContainer>
      </FieldContainer>
      <FieldContainer>
        Телефон:
        <MaskInput
          placeholder="Введите номер телефона"
          mask="+7 (999) 999-9999"
          value={phoneUser}
          onChange={onChangePhoneUser}
        />
        <ErrorContainer>
          {phoneUserError && (
            <Typography.Text type="danger">{phoneUserError}</Typography.Text>
          )}
        </ErrorContainer>
      </FieldContainer>
      <FieldContainer>
        Дата рождения:
        <MaskInput
          placeholder="Введите дату рождения"
          value={birthdayUser}
          mask={"99.99.9999"}
          maskChar={"_"}
          onChange={onChangeBirthdayUser}
        />
        <ErrorContainer>
          {birthdayUserError && (
            <Typography.Text type="danger">{birthdayUserError}</Typography.Text>
          )}
        </ErrorContainer>
      </FieldContainer>
      <FieldContainer>
        Должность:
        <Select
          placeholder="Выберите должность"
          value={roleUser}
          onChange={onChangeRoleUser}
          options={selectOptions}
        />
      </FieldContainer>
      <FieldContainer>
        Статус:
        <Checkbox checked={statusUser} onChange={onChangeStatusUser}>
          В архиве
        </Checkbox>
      </FieldContainer>
      <ButtonsContainer>
        <Button
          disabled={
            nameUserError ||
            phoneUserError ||
            birthdayUserError ||
            roleUser === null
          }
          onClick={clickSaveDataUser}
        >
          Сохранить данные
        </Button>
        <Button onClick={clickBackToMainPage}>
          Вернуться на главную страницу
        </Button>
      </ButtonsContainer>
    </EditingPageContainer>
  );
};
