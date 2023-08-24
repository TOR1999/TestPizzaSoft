import { React, useEffect, useState } from "react";
import { Checkbox, Select, Button } from "antd";
import { useStore } from "effector-react";
import { UsersStore } from "../store/Users/UsersStore";
import { FilterStore } from "../store/Filter/FilterStore";
import { useNavigate } from "react-router-dom";
import { PageRoutes } from "../router/Constants";
import { useTranslation } from "react-i18next";
import { SystemStore } from "../store/System/SystemStore";

export const FilterSortForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const optionsStatus = useStore(UsersStore.store.$optionsStatus);
  const widthWindow = useStore(SystemStore.store.$widthWindow);
  console.log(widthWindow);

  const onChangeIsArchive = (e) => {
    FilterStore.events.changeFilterIsArchive(e.target.checked);
  };

  const onChangeSelectStatus = (value) => {
    value === undefined
      ? FilterStore.events.changeFilterStatus("")
      : FilterStore.events.changeFilterStatus(value);
  };

  const onClickDropFilterIsArchive = () => {
    FilterStore.events.changeFilterIsArchive(null);
  };

  const onClickNewUser = () => {
    navigate(PageRoutes.NEW_USER_PAGE);
  };

  const selectOptions = optionsStatus.map((role) => ({
    value: role,
    label: t(role),
  }));

  const mobileFlag = widthWindow < 1024;

  return (
    <>
      <>
        <h1>Должность</h1>
        <Select
          allowClear
          onChange={onChangeSelectStatus}
          defaultValue={t("selectRole")}
          style={{
            width: 200,
          }}
          options={selectOptions}
        />
        <Checkbox onChange={onChangeIsArchive}>В архиве</Checkbox>
      </>
      {mobileFlag && (
        <>
          <Button>Сортировать по дате рождения</Button>
          <Button>Сортировать по имени</Button>
        </>
      )}

      <Button onClick={onClickDropFilterIsArchive}>
        Сбросить фильтр по архиву
      </Button>
      <Button onClick={onClickNewUser}>Добавить нового пользователя</Button>
    </>
  );
};
