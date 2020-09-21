import { Row, Col, Button, Tooltip } from "antd";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import App from "../../src/components/layout/app";
import TableSystem from "../../src/components/table";
import Link from "next/link";
import { DeleteTwoTone, EyeTwoTone, EditTwoTone } from "@ant-design/icons";
import axios from "axios";

const ProfileList = () => {
  const router = useRouter();
  const [data, setData] = useState([]);

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
              <Link href="/profiles/[edit]" as={`/profiles/${record.id}`}>
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
    const payload = await axios
      .get("https://api-insight.tk/profiles/")
      .catch((err) => console.log(err));

    if (payload && payload.data) {
      setData(payload.data);
    }
  };

  const deleteProfile = async (id) => {
    const payload = await axios
      .delete(`https://api-insight.tk/profiles/${id}/`)
      .catch((err) => console.log(err));

    router.reload();
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <App navigation={navigation}>
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
      <TableSystem columns={columns} data={data} />
    </App>
  );
};

export default ProfileList;
