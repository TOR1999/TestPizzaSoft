import { Checkbox, Select, Button } from "antd";
import { useStore } from "effector-react";
import { UsersStore } from "../store/Users/UsersStore";
import { FilterStore } from "../store/Filter/FilterStore";
import { useNavigate } from "react-router-dom";
import { PageRoutes } from "../router/Constants";
import { useTranslation } from "react-i18next";
import { SystemStore } from "../store/System/SystemStore";
import { styled } from "styled-components";
import { device } from "../style/MainPageStyle";

const FilterSortFormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 5px;
  gap: 10px;
  justify-content: center;

  @media ${device.tablet} {
    width: 400px;
  }
`;

const FilterIsArchive = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FilterSortForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const optionsStatus = useStore(UsersStore.store.$optionsStatus);
  const widthWindow = useStore(SystemStore.store.$widthWindow);

  const onChangeIsArchive = (e) => {
    FilterStore.events.changeFilterIsArchive(e.target.checked);
  };

  const onChangeSelectStatus = (value) => {
    value === undefined
      ? FilterStore.events.changeFilterStatus("")
      : FilterStore.events.changeFilterStatus(value);
  };

  const onClickSortByName = () => {
    FilterStore.events.toggleSortByName();
  };

  const onClickSortByBirthday = () => {
    FilterStore.events.toggleSortByBirthday();
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
    <FilterSortFormContainer>
      <Select
        placeholder={t("selectRole")}
        allowClear
        onChange={onChangeSelectStatus}
        options={selectOptions}
      />
      <FilterIsArchive>
        <Checkbox onChange={onChangeIsArchive}>{t("inTheArchive")}</Checkbox>
        <Button onClick={onClickDropFilterIsArchive}>
          Сбросить фильтр по архиву
        </Button>
      </FilterIsArchive>

      {mobileFlag && (
        <>
          <Button onClick={onClickSortByBirthday}>
            Сортировать по дате рождения
          </Button>
          <Button onClick={onClickSortByName}>Сортировать по имени</Button>
        </>
      )}

      <Button onClick={onClickNewUser}>Добавить нового пользователя</Button>
    </FilterSortFormContainer>
  );
};
