import { React, useEffect, useState } from "react";
import { MainContainer, TableContainer } from "../MainPage/Style";
import { FilterSortForm } from "../../components/FilterSortForm";
import { TableUsers } from "../../components/TableUsers";

export const MainPage = () => {
  return (
    <MainContainer>
      <FilterSortForm />
      <TableContainer>
        <TableUsers />
      </TableContainer>
    </MainContainer>
  );
};
