import { useState, useEffect } from "react";
import { Row, Col, Button, Tooltip, notification, Spin } from "antd";

import App from "../../src/components/layout/app";
import TableSystem from "../../src/components/table";
import Link from "next/link";
import { DeleteTwoTone, EyeTwoTone } from "@ant-design/icons";

import axios from "axios";

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
    // {
    //   title: "Dirección",
    //   dataIndex: "username",
    //   key: "address",
    //   search: true,
    // },
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
      .then(resp => setData(resp.data))
      .catch((err) => console.log(err));

    setLoading(false);
  };

  const deleteUser = async (id) => {
    await axios
      .delete(`https://insightcron.com/users/${id}/`)
      .then( res => {
        if (res) {
          getUsers();
          notification.success({
            message: 'usuario eliminado con exito!!',
            placement: 'bottomRight',
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
      <Spin tip="Cargando..." spinning={loading}>
        <Row gutter={[8, 16]} justify="end">
          <Col>
            <Link href="/users/add">
              <Button type="primary" size="small">
                NUEVO USUARIO
              </Button>
            </Link>
          </Col>
        </Row>

        <TableSystem columns={columns} data={data} />
      </Spin>
    </App>
  );
};

export default UserList;
