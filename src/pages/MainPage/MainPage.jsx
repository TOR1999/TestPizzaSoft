import { FilterSortForm } from "../../components/FilterSortForm";
import { TableUsers } from "../../components/TableUsers";
import { MainContainer, TableContainer } from "../../style/MainPageStyle";
import { CardsUsers } from "../../components/CardsUsers";
import { useStore } from "effector-react";
import { UsersStore } from "../../store/Users/UsersStore";
import { FilterStore, SortTypes } from "../../store/Filter/FilterStore";
import { useNavigate } from "react-router-dom";
import { RedirectToRoutes } from "../../router/Constants";
import { SystemStore } from "../../store/System/SystemStore";
import moment from "moment";

export const MainPage = () => {
  const navigate = useNavigate();
  const flagIsTablet = useStore(SystemStore.store.$flagIsTablet);

  const data = useStore(UsersStore.store.$usersTableData);
  const filterStatus = useStore(FilterStore.store.$filterStatus);
  const filterIsArchive = useStore(FilterStore.store.$filterIsArchive);
  const typeOfSortByName = useStore(FilterStore.store.$typeOfSortByName);
  const typeOfSortByBirthday = useStore(
    FilterStore.store.$typeOfSortByBirthday
  );

  const filteredByStatusData = filterStatus
    ? data.filter((user) => user.role === filterStatus)
    : data;

  const filteredByIsArchiveData =
    filterIsArchive === null
      ? filteredByStatusData
      : filteredByStatusData.filter(
          (user) => user.isArchive === filterIsArchive
        );

  const sortedByNameData =
    typeOfSortByName === SortTypes.NONE
      ? filteredByIsArchiveData
      : [...filteredByStatusData].sort((a, b) => {
          if (typeOfSortByName === SortTypes.ASCENDING)
            return a.name.localeCompare(b.name);

          return b.name.localeCompare(a.name);
        });

  const sortedByBirthdayData =
    typeOfSortByBirthday === SortTypes.NONE
      ? sortedByNameData
      : [...sortedByNameData].sort((a, b) => {
          const birtdayA = new Date(
            moment(a.birthday, "DD.MM.YYYY").format("YYYY-MM-DD")
          );
          const birtdayB = new Date(
            moment(b.birthday, "DD.MM.YYYY").format("YYYY-MM-DD")
          );
          if (typeOfSortByBirthday === SortTypes.ASCENDING)
            return birtdayA - birtdayB;

          return birtdayB - birtdayA;
        });

  const handleDelete = (record) => (e) => {
    e.stopPropagation();
    UsersStore.events.deleteUser(record.key);
  };

  const handleChange = (record) => () => {
    navigate(RedirectToRoutes.EDIT_PAGE(record.key));
  };

  return (
    <MainContainer>
      <FilterSortForm />
      <TableContainer>
        {flagIsTablet && (
          <CardsUsers
            handleChange={handleChange}
            handleDelete={handleDelete}
            dataUsers={sortedByBirthdayData}
          />
        )}
        {!flagIsTablet && (
          <TableUsers
            handleChange={handleChange}
            handleDelete={handleDelete}
            dataUsers={sortedByBirthdayData}
          />
        )}
      </TableContainer>
    </MainContainer>
  );
};
