import { Row, Col, Button, Tooltip, notification, Spin } from "antd";
import { useState, useEffect } from "react";

import App from "../../src/components/layout/app";
import TableSystem from "../../src/components/table";
import Link from "next/link";
import { DeleteTwoTone, EyeTwoTone } from "@ant-design/icons";
import axios from "axios";

const ProfileList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigation = [
    {
      key: "1",
      path: "/profiles",
      breadcrumbName: "Perfiles",
    },
  ];

  const columns = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      search: true,
    },
    {
      title: "Descripción",
      dataIndex: "description",
      key: "description",
      search: true,
    },
    {
      title: "Acción",
      dataIndex: "key",
      key: "key",
      search: false,
      width: "10%",
      render: (key, record) => {
        return (
          <Row gutter={[8, 0]} justify="center">
            <Col>
              <Link href="/profiles/[id]" as={`/profiles/${record.id}`}>
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
                  onClick={() => deleteProfile(record.id)}
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

  const getProfile = async () => {
    setLoading(true);

    const payload = await axios
      .get("https://insightcron.com/profiles/")
      .catch((err) => console.log(err));

    if (payload && payload.data) {
      setData(payload.data);
    }
    setLoading(false)

  };

  const deleteProfile = async (id) => {
    await axios
      .delete(`https://insightcron.com/profiles/${id}/`)
      .then(resp => {
        if (resp) {
          getProfile();
          notification.success({
            message: 'Perfil eliminado con exito!!',
            placement: 'bottomRight',
          });
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <App navigation={navigation}>
      <Spin tip="Cargando..." spinning={loading}>
        <Row gutter={[8, 16]} justify="end">
          <Col>
            <Link href="/profiles/add">
              <a>
                <Button type="primary" size="small">
                  NUEVO PERFIL
                </Button>
              </a>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>
              <strong>IMPORTANTE: </strong>
              Aquí podrá crear el PERFIL los cuales funcionarán como filtro de BUSQUEDA programado a los usuarios asociados.
            </p>
          </Col>
        </Row>
        <TableSystem columns={columns} data={data} />
      </Spin>
    </App>
  );
};

export default ProfileList;
