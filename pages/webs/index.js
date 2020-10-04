import { useState, useEffect } from "react";
import { Row, Col, Button, Tooltip } from "antd";
import { useRouter } from "next/router";

import App from "../../src/components/layout/app";
import TableSystem from "../../src/components/table";
import Link from "next/link";
import { DeleteTwoTone, EyeTwoTone, EditTwoTone } from "@ant-design/icons";

import axios from "axios";

const WebList = () => {
  const router = useRouter();
  const [data, setData] = useState([]);

  const navigation = [
    {
      key: "1",
      path: "/webs/",
      breadcrumbName: "Webs",
    },
  ];

  const columns = [
    {
      title: "Pais",
      dataIndex: "country",
      key: "country",
      search: true,
    },
    {
      title: "Nombre de Institución",
      dataIndex: "name",
      key: "name",
      search: true,
    },
    {
      title: "Url Web",
      dataIndex: "url",
      key: "url",
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
              <Tooltip title="Ver Detalle!" color={"cyan"}>
                <EyeTwoTone
                  twoToneColor="#13c2c2"
                  style={{ fontSize: "16px" }}
                  onClick={() => {
                    router.push("/webs/[id]", `/webs/${record.id}`);
                  }}
                />
              </Tooltip>
            </Col>
            <Col>
              <Tooltip title="Eliminar!" color={"red"}>
                <DeleteTwoTone
                  onClick={() => deleteWebs(record.id)}
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

  const getCountries = async () => {
    await axios.get("https://api-insight.tk/countries/")
      .then( response => {
        if (response && response.data) {
          getWebs(response.data);
        }
      })
      .catch((err) => console.log(err));
  };

  const getWebs = async (countries) => {
    await axios.get("https://api-insight.tk/webs")
      .then( response => {
        if (response && response.data) {
          response.data.map((web) => {
            countries.map((country) => {
              if (web.country == country.id ) {
                web.country = String(country.name);
              }
            });
          });
          setData(response.data);
        }
      })
      .catch((err) => console.log(err));
  };

  const deleteWebs = async (id) => {
    await axios.delete(`https://api-insight.tk/webs/${id}/`)
      .then( res => {
        if (res) {
          getCountries();
          alert("Web eliminada con Exito!");
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect( () => {
    getCountries();
  }, []);

  return (
    <App navigation={navigation}>
      <Row gutter={[8, 16]} justify="end">
        <Col>
          <Link href="/webs/add">
            <a>
              <Button type="primary" size="small">
                NUEVA WEB
              </Button>
            </a>
          </Link>
        </Col>
      </Row>

      <TableSystem columns={columns} data={data} />
    </App>
  );
};

export default WebList;
