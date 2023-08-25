import { Table, Checkbox, Popconfirm } from "antd";
import moment from "moment";
import { useTranslation } from "react-i18next";

export const TableUsers = ({ handleChange, handleDelete, dataUsers }) => {
  const { t } = useTranslation();

  const columns = [
    {
      title: t("numeral"),
      dataIndex: "numeral",
    },
    {
      title: t("name"),
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),

      render: (text) => <a>{text}</a>,
      onCell: (record) => ({
        onClick: handleChange(record),
      }),
    },
    {
      title: t("isArchive"),
      dataIndex: "isArchive",
      render: (check) => (
        <Checkbox checked={check} disabled>
          {t("inTheArchive")}
        </Checkbox>
      ),
    },
    {
      title: t("role"),
      dataIndex: "role",
      render: (role) => t(role),
    },
    {
      title: t("phone"),
      dataIndex: "phone",
    },
    {
      title: t("birthday"),
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
      render: (_, record) => (
        <Popconfirm title={`${t("delete")}?`} onConfirm={handleDelete(record)}>
          <a>{t("delete")}</a>
        </Popconfirm>
      ),
    },
  ];

  return <Table bordered columns={columns} dataSource={dataUsers} />;
};
