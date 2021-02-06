import { useState, useEffect } from "react";
import { Row, Col, Button, Tooltip, notification, Spin } from "antd";
import { useRouter } from "next/router";

import App from "../../src/components/layout/app";
import TableSystem from "../../src/components/table";
import Link from "next/link";
import { DeleteTwoTone, EyeTwoTone } from "@ant-design/icons";

import axios from "axios";

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
      width: "25%",
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
      render: (key, record) => {
        switch (record.status) {
          case 0:
            return (<span style={{ color: '#ffc107' }}> Pendiente! </span>)
          case 1:
            return (<span style={{ color: '#4CAF50' }}> Habilitada! </span>)
          default:
            return (<span style={{ color: '#FF5722' }}> Url no aceptable! </span>)
        }
      }
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
    await axios.get("https://insightcron.com/countries/")
      .then( response => {
        if (response && response.data) {
          getWebs(response.data);
        }
      })
      .catch((err) => {
        console.log(err)
      });
  };

  const getWebs = async (countries) => {

    setLoading(true);
    await axios.get("https://insightcron.com/webs")
      .then( response => {
        if (response && response.data) {
          response.data.map((web) => {
            let aux_countries = '';
            let countries_ids = web?.countries_ids?.split(',').map(Number);

            countries_ids.map((country_id) => {
              countries.map((country) => {
                if (country_id == country.id ) {
                  aux_countries += " *" + String(country.name);
                }
              });
            });

            web.country = aux_countries;
          });
          setData(response.data);
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  };

  const deleteWebs = async (id) => {
    await axios.delete(`https://insightcron.com/webs/${id}/`)
      .then( res => {
        if (res) {
          getCountries();
          notification.success({
            message: 'Web  eliminada con exito!!',
            placement: 'bottomRight',
          });
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect( () => {
    getCountries();
  }, []);

  return (
    <App navigation={navigation}>
      <Spin tip="Cargando..." spinning={loading}>
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
        <Row>
          <Col>
            <p>
              <strong>IMPORTANTE: </strong> 
              En esta pantalla usted podrá visualizar y crear las WEBS que fueron configuradas para realizar SCRAPING diariamente.
              <br/>
              La activación de una Nueva WEB creada puede llevar hasta 72 hs.
            </p>
          </Col>
        </Row>
        <TableSystem columns={columns} data={data} />
      </Spin>
    </App>
  );
};

export default WebList;
