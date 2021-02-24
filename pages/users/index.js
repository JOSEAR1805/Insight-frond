import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

import App from "../../src/components/layout/app";
import TableSystem from "../../src/components/table";

import {
  Row,
  Col,
  Button,
  Tooltip,
  notification,
  PageHeader,
  Typography,
} from "antd";
import {
  DeleteTwoTone,
  EyeTwoTone,
  RedoOutlined,
  SyncOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

const UserList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigation = [
    {
      key: "1",
      path: "/users/",
      breadcrumbName: "Usuarios",
    },
  ];

  const columns = [
    {
      title: "Nombre",
      dataIndex: "first_name",
      key: "first_name",
      search: true,
    },
    {
      title: "Apellido",
      dataIndex: "last_name",
      key: "last_name",
      search: true,
    },
    {
      title: "Correo E.",
      dataIndex: "email",
      key: "email",
      search: true,
    },
    {
      title: "Tipo de usuario",
      dataIndex: "is_staff",
      key: "is_staff",
      search: true,
      render: (text, record) => {
        return text ? "Administrador" : "Estándar";
      },
    },
    {
      title: "Acción",
      dataIndex: "key",
      key: "key",
      search: false,
      width: "10%",
      render: (text, record) => {
        return (
          <Row gutter={[8, 0]} justify="center">
            <Col>
              <Link href="/users/[id]" as={`/users/${record.id}`}>
                <a>
                  <Tooltip title="Ver Detalle!" color={"cyan"}>
                    <EyeTwoTone
                      twoToneColor="#13c2c2"
                      style={{ fontSize: "16px" }}
                    />
                  </Tooltip>
                </a>
              </Link>
            </Col>
            <Col>
              <Tooltip title="Eliminar!" color={"red"}>
                <DeleteTwoTone
                  onClick={() => deleteUser(record.id)}
                  twoToneColor="#ff0000"
                  style={{ fontSize: "16px" }}
                />
              </Tooltip>
            </Col>
          </Row>
        );
      },
    },
  ];

  const getUsers = async () => {
    setLoading(true);
    await axios
      .get("https://insightcron.com/users")
      .then((resp) => setData(resp.data))
      .catch((err) => console.log(err));

    setLoading(false);
  };

  const deleteUser = async (id) => {
    await axios
      .delete(`https://insightcron.com/users/${id}/`)
      .then((res) => {
        if (res) {
          getUsers();
          notification.success({
            message: "usuario eliminado con exito!!",
            placement: "bottomRight",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <App navigation={navigation}>
      <PageHeader
        className="site-page-header"
        title="Lista de Usuarios"
        style={{ paddingTop: "0px" }}
        extra={[
          <Button
            shape="circle"
            type="text"
            icon={<RedoOutlined />}
            onClick={() => getUsers()}
          />,
          <Link href="/users/add">
            <Button type="primary" size="small">
              NUEVO USUARIO
            </Button>
          </Link>,
        ]}
      >
        <Text>
          Usuarios Registrados: {loading ? <SyncOutlined spin /> : data.length}
        </Text>
      </PageHeader>
      <TableSystem columns={columns} data={data} loading={loading} />
    </App>
  );
};

export default UserList;
