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
  const [data, setData] = useState([]);

  const navigation = [
    {
      key: "1",
      path: "/countries/",
      breadcrumbName: "Paises",
    },
  ];

  const columns = [
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

  const getCountry = async () => {
    await axios
      .get("https://api-insight.tk/countries/")
      .then(res => {
        if (res && res.data) {
          setData(res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCountry();
  }, []);

  const deleteCountry = async (id) => {
    await axios
      .delete(`https://api-insight.tk/countries/${id}/`)
      .then(() => {
        getCountry();
        alert("Pais eliminado con Exito!");
      })
      .catch((err) => console.log(err));
  };

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
