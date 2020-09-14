import { useState, useEffect } from "react";
import { Row, Col, Button, Tooltip } from "antd";
import { useRouter } from "next/router";

import App from "../../src/components/layout/app";
import TableSystem from "../../src/components/table";
import Link from "next/link";
import { DeleteTwoTone, EyeTwoTone, EditTwoTone } from "@ant-design/icons";

import axios from "axios";

const CountryList = () => {
  const router = useRouter();

  const navigation = [
    {
      key: "1",
      path: "/countries/",
      breadcrumbName: "Paises",
    },
  ];

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      search: true,
    },
    {
      title: "Pais",
      dataIndex: "name",
      key: "name",
      search: true,
    },
    {
      title: "Acción",
      dataIndex: "key",
      key: "key",
      search: false,
      width: "10%",
      render: (text, record) => {
        console.log(record);
        return (
          <Row gutter={[8, 0]} justify="center">
            <Col>
              <Link href="/countries/[edit]" as={`/countries/${record.id}`}>
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
                  onClick={() => deleteCountry(record.id)}
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

  const getCountry = async () => {
    const payload = await axios
      .get("https://api-insight.tk/countries/")
      .catch((err) => console.log(err));

    if (payload && payload.data) {
      setData(payload.data);
    }
  };

  const deleteCountry = async (id) => {
    const payload = await axios
      .delete(`https://api-insight.tk/countries/${id}/`)
      .catch((err) => console.log(err));

    router.reload();
  };

  useEffect(() => {
    getCountry();
  }, []);

  return (
    <App navigation={navigation}>
      <Row gutter={[8, 16]} justify="end">
        <Col>
          <Link href="/countries/add">
            <Button type="primary" size="small">
              AGREGAR PAIS
            </Button>
          </Link>
        </Col>
      </Row>

      <TableSystem columns={columns} data={data} />
    </App>
  );
};

export default CountryList;
