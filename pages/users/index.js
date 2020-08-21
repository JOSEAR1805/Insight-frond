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

  const routes = [
    {
      key: "1",
      path: "/users/",
      breadcrumbName: "Usuarios",
    },
  ];

  const data1 = [
    {
      key: "1",
      name: "Alejandro",
      last_name: "Sanchez",
      phone: "+56 53453453",
      email: "alejandrosanchez@test.com",
      address: "Chile",
    },
    {
      key: "2",
      name: "Elver",
      last_name: "Valderrama",
      phone: "+56 942342342",
      email: "elvervalderrama@test.com",
      address: "Chile",
    },
    {
      key: "3",
      name: "José",
      last_name: "Artigas",
      phone: "+58 534534534",
      email: "joseartigas@test.com",
      address: "Venezuela",
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
    // {
    //   title: "Teléfono",
    //   dataIndex: "phone",
    //   key: "phone",
    //   search: true,
    // },
    {
      title: "Correo E.",
      dataIndex: "email",
      key: "email",
      search: true,
    },
    {
      title: "Dirección",
      dataIndex: "username",
      key: "address",
      search: true,
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
              <Link href="#">
                <Tooltip title="Editar" color={"orange"}>
                  <Link href="/users/[edit]" as={`/users/${record.id}`}>
                    <a>
                      <EditTwoTone
                        twoToneColor="#fa8c16"
                        style={{ fontSize: "16px" }}
                      />
                    </a>
                  </Link>
                </Tooltip>
              </Link>
            </Col>
            <Col>
              <Link href="#">
                <Tooltip title="Eliminar!" color={"red"}>
                  <DeleteTwoTone
                    onClick={() => deleteUser(record.id)}
                    twoToneColor="#ff0000"
                    style={{ fontSize: "16px" }}
                  />
                </Tooltip>
              </Link>
            </Col>
          </Row>
        );
      },
    },
  ];

  const [data, setData] = useState([]);

  const getUsers = async () => {
    // At request level
    const agent = new https.Agent({
      rejectUnauthorized: false,
    });

    const payload = await axios
      .get("http://66.97.36.222/users", { httpsAgent: agent })
      .catch((err) => console.log(err));

    setData(payload.data);
  };

  const deleteUser = async (id) => {
    const payload = await axios
      .delete(`http://66.97.36.222/users/${id}/`)
      .catch((err) => console.log(err));

    console.log(payload, "***");
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <App routes={routes}>
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
