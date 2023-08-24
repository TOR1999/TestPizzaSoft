import { React, useEffect, useState } from "react";
import { Checkbox, Select, Button } from "antd";
import { useStore } from "effector-react";
import { UsersStore } from "../store/Users/UsersStore";
import { FilterStore } from "../store/Filter/FilterStore";
import { useNavigate } from "react-router-dom";
import { PageRoutes } from "../router/Constants";

export const FilterSortForm = () => {
  const optionsStatus = useStore(UsersStore.store.$optionsStatus);
  const navigate = useNavigate();

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
  return (
    <>
      <>
        <h1>Должность</h1>
        <Select
          allowClear
          onChange={onChangeSelectStatus}
          defaultValue="Выберите должность"
          style={{
            width: 200,
          }}
          options={optionsStatus}
        />
        <Checkbox onChange={onChangeIsArchive}>В архиве</Checkbox>
      </>
      <Button>Сортировать по дате рождения</Button>
      <Button>Сортировать по имени</Button>
      <Button onClick={onClickDropFilterIsArchive}>
        Сбросить фильтр по архиву
      </Button>
      <Button onClick={onClickNewUser}>Добавить нового пользователя</Button>
    </>
  );
};
