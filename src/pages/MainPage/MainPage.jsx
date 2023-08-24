import { FilterSortForm } from "../../components/FilterSortForm";
import { TableUsers } from "../../components/TableUsers";
import { MainContainer, TableContainer } from "../../style/MainPageStyle";
import { CardsUsers } from "../../components/CardsUsers";
import { useStore } from "effector-react";
import { UsersStore } from "../../store/Users/UsersStore";
import { FilterStore } from "../../store/Filter/FilterStore";
import { useNavigate } from "react-router-dom";
import { RedirectToRoutes } from "../../router/Constants";
import { SystemStore } from "../../store/System/SystemStore";

export const MainPage = () => {
  const navigate = useNavigate();
  const flagIsTablet = useStore(SystemStore.store.$flagIsTablet);

  const data = useStore(UsersStore.store.$usersTableData);
  const filterStatus = useStore(FilterStore.store.$filterStatus);
  const filterIsArchive = useStore(FilterStore.store.$filterIsArchive);

  const filteredByStatusData = filterStatus
    ? data.filter((user) => user.role === filterStatus)
    : data;

  const filteredByIsArchiveData =
    filterIsArchive === null
      ? filteredByStatusData
      : filteredByStatusData.filter(
          (user) => user.isArchive === filterIsArchive
        );

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
            dataUsers={filteredByIsArchiveData}
          />
        )}
        {!flagIsTablet && (
          <TableUsers
            handleChange={handleChange}
            handleDelete={handleDelete}
            dataUsers={filteredByIsArchiveData}
          />
        )}
      </TableContainer>
    </MainContainer>
  );
};
