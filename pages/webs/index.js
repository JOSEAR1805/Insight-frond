import { useState, useEffect } from "react";
import { useRouter } from "next/router";
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

const WebList = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigation = [
    {
      key: "1",
      path: "/webs/",
      breadcrumbName: "Webs",
    },
  ];

  const columns = [
    {
      title: "Pais(es)",
      dataIndex: "country",
      key: "country",
      search: true,
      render: (text) => {
        return (
          <>
            {text.map((res) => (
              <p style={{ margin: "0" }}>{res}</p>
            ))}
          </>
        );
      },
    },
    {
      title: "Nombre de Institución",
      dataIndex: "name",
      key: "name",
      search: true,
      width: "35%",
    },
    {
      title: "Url Web",
      dataIndex: "url",
      key: "url",
      search: true,
      width: "15%",
      render: (text, record) => {
        return (
          <a href={text} target="_blank">
            Ver Url
          </a>
        );
      },
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      search: true,
      width: "15%",
      render: (text, record) => (
        <span style={{ color: text ? "#4CAF50" : "#ff0000" }}>
          {text ? "Habilitada" : "Deshabilitada"}!
        </span>
      ),
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
    await axios
      .get("https://insightcron.com/countries/")
      .then((response) => {
        if (response && response.data) {
          getWebs(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getWebs = async (countries) => {
    setLoading(true);
    await axios
      .get("https://insightcron.com/webs")
      .then((response) => {
        if (response && response.data) {
          response.data.map((web) => {
            let aux_countries = [];
            let countries_ids = web?.countries_ids?.split(",").map(Number);

            countries_ids?.map((country_id) => {
              countries.map((country) => {
                if (country_id == country.id) {
                  aux_countries.push(String(country.name));
                }
              });
            });

            web.country = aux_countries;
          });
          console.log("response.data", response.data);
          setData(response.data);
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  };

  const deleteWebs = async (id) => {
    await axios
      .delete(`https://insightcron.com/webs/${id}/`)
      .then((res) => {
        if (res) {
          getCountries();
          notification.success({
            message: "Web  eliminada con exito!!",
            placement: "bottomRight",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <App navigation={navigation}>
      <PageHeader
        className="site-page-header"
        title="Lista de Webs"
        style={{ paddingTop: "0px" }}
        extra={[
          <Button
            shape="circle"
            type="text"
            icon={<RedoOutlined />}
            onClick={() => getCountries()}
          />,
          <Link href="/webs/add">
            <a>
              <Button type="primary" size="small">
                NUEVA WEB
              </Button>
            </a>
          </Link>,
        ]}
      >
        <Text>
          Webs Registradas: {loading ? <SyncOutlined spin /> : data.length}
        </Text>
      </PageHeader>
      <TableSystem columns={columns} data={data} loading={loading} />
    </App>
  );
};

export default WebList;
