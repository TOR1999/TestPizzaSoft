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
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EditingPanelContainer = styled.div`
  width: 100%;
  padding: 5px;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;

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

  const validateData = {
    name: (value) => {
      if (!value) return t("fieldCannotIsEmpty");

      return null;
    },
    phone: (value) => {
      if (!value) return t("fieldCannotIsEmpty");
      if (value.includes("_")) return t("needFullPhone");

      return null;
    },
    birthday: (value) => {
      if (!value) return t("fieldCannotIsEmpty");
      if (value.includes("_")) return t("needFullBirthday");
      if (!moment(value, "DD.MM.YYYY").isValid()) return t("incorrectBirthday");
      if (moment(value, "DD.MM.YYYY").isAfter(moment.now()))
        return t("incorrectBirthdayFeatures");

      return null;
    },
  };

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

  const clickSaveDataUser = () => {
    userId
      ? UsersStore.events.updateUser({
          id: userId,
          birthday: birthdayUser,
          isArchive: statusUser,
          name: nameUser,
          phone: phoneUser,
          role: roleUser,
        })
      : UsersStore.events.addUser({
          birthday: birthdayUser,
          isArchive: statusUser,
          name: nameUser,
          phone: phoneUser,
          role: roleUser,
        });

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
      <EditingPanelContainer>
        <FieldContainer>
          {t("name")}
          <Input
            placeholder={t("enterName")}
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
          {t("phone")}
          <MaskInput
            placeholder={t("enterPhone")}
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
          {t("birthday")}
          <MaskInput
            placeholder={t("enterBirthday")}
            value={birthdayUser}
            mask={"99.99.9999"}
            maskChar={"_"}
            onChange={onChangeBirthdayUser}
          />
          <ErrorContainer>
            {birthdayUserError && (
              <Typography.Text type="danger">
                {birthdayUserError}
              </Typography.Text>
            )}
          </ErrorContainer>
        </FieldContainer>
        <FieldContainer>
          {t("role")}
          <Select
            placeholder={t("selectRole")}
            value={roleUser}
            onChange={onChangeRoleUser}
            options={selectOptions}
          />
        </FieldContainer>
        <FieldContainer>
          {t("status")}
          <Checkbox checked={statusUser} onChange={onChangeStatusUser}>
            {t("inTheArchive")}
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
            {t("saveData")}
          </Button>
          <Button onClick={clickBackToMainPage}>{t("backToMainPage")}</Button>
        </ButtonsContainer>
      </EditingPanelContainer>
    </EditingPageContainer>
  );
};
