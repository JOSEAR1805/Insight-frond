import { useState, useEffect } from "react";
import { Row, Col, Button, Tooltip } from "antd";
import { useRouter } from "next/router";

import App from "../../src/components/layout/app";
import TableSystem from "../../src/components/table";
import Link from "next/link";
import { DeleteTwoTone, EyeTwoTone, EditTwoTone } from "@ant-design/icons";

import axios from "axios";

const UserList = () => {
  const router = useRouter();

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
              <Link href="/users/[edit]" as={`/users/${record.id}`}>
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

  const [data, setData] = useState([]);

  const getUsers = async () => {
    // At request level

    const payload = await axios
      .get("https://insightcron.com/users")
      .catch((err) => console.log(err));

    if (payload && payload.data) {
      setData(payload.data);
    }
  };

  const deleteUser = async (id) => {
    await axios
      .delete(`https://insightcron.com/users/${id}/`)
      .then( res => {
        if (res) {
          getUsers();
          alert("Usuario Eliminado con Exito!");
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <App navigation={navigation}>
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
    </App>
  );
};

export default UserList;
