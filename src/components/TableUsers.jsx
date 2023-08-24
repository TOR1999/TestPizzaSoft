import { React, useEffect, useState } from "react";
import { Table, Checkbox, Popconfirm } from "antd";
import { useStore } from "effector-react";
import { UsersStore } from "../store/Users/UsersStore";
import { useNavigate } from "react-router-dom";
import { SystemStore } from "../store/System/SystemStore";
import { FilterStore } from "../store/Filter/FilterStore";
import moment from "moment";
import { PageRoutes, RedirectToRoutes } from "../router/Constants";

export const TableUsers = () => {
  useEffect(() => UsersStore.events.initOptions(), []);
  const navigate = useNavigate();
  const dataUsers = useStore(UsersStore.store.$users);
  const data = useStore(UsersStore.store.$usersTableData);
  const filterStatus = useStore(FilterStore.store.$filterStatus);
  const filterIsArchive = useStore(FilterStore.store.$filterIsArchive);

  const filteredByStatusData = filterStatus
    ? data?.filter((user) => {
        return user.role === filterStatus;
      })
    : data;

  const filteredByIsArchiveData =
    filterIsArchive === null
      ? filteredByStatusData
      : filteredByStatusData.filter(
          (user) => user.isArchive === filterIsArchive
        );

  const handleDelete = (key) => {
    UsersStore.events.deleteUser(key.key);
  };
  const columns = [
    {
      title: "№",
      dataIndex: "numeral",
    },
    {
      title: "Имя",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),

      render: (text) => <a>{text}</a>,
      onCell: (record, rowIndex) => {
        return {
          onClick: (ev) => {
            navigate(RedirectToRoutes.EDIT_PAGE(record.key));
          },
        };
      },
    },
    {
      title: "Статус (в архиве)",
      dataIndex: "isArchive",
      render: (check) => (
        <Checkbox checked={check} disabled>
          В архиве
        </Checkbox>
      ),
    },
    {
      title: "Должность",
      dataIndex: "role",
    },
    {
      title: "Телефон",
      dataIndex: "phone",
    },
    {
      title: "Дата рождения",
      dataIndex: "birthday",
      sorter: (a, b) => {
        return (
          new Date(moment(a.birthday, "DD.MM.YYYY").format("YYYY-MM-DD")) -
          new Date(moment(b.birthday, "DD.MM.YYYY").format("YYYY-MM-DD"))
        );
      },
    },
    {
      title: "",
      dataIndex: "operation",
      render: (_, record) =>
        data.length >= 1 ? (
          <Popconfirm title="Удалить?" onConfirm={() => handleDelete(record)}>
            <a>Удалить</a>
          </Popconfirm>
        ) : null,
    },
  ];

  console.log("dataUsers", dataUsers);

  return (
    <Table bordered columns={columns} dataSource={filteredByIsArchiveData} />
  );
};
