import { Row, Col, Tooltip, notification, Spin } from "antd";
import App from "../../src/components/layout/app";
import { useState, useEffect } from "react";

import TableSystem from "../../src/components/table";
import { DeleteTwoTone } from "@ant-design/icons";

import axios from "axios";

const TenderList = () => {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "Pais",
      dataIndex: "country",
      key: "country",
      search: true,
    },
    {
      title: "F. publicación",
      dataIndex: "publication_date",
      key: "publication_date",
      search: false,
    },
    {
      title: "F. recepción",
      dataIndex: "closing_date",
      key: "closing_date",
      search: false,
    },
    {
      title: "Descripción",
      dataIndex: "description",
      key: "description",
      search: true,
      width: "20%",
    },
    {
      title: "Codigo",
      dataIndex: "code",
      key: "code",
      search: true,
    },
    {
      title: "Link",
      dataIndex: "link",
      key: "link",
      search: false,
      render: (text, record) => {
        return (
          <a href={text} target="_blank">
            Ver licitación
          </a>
        );
      },
    },
    {
      title: "Lugar de Ejecución",
      dataIndex: "place_of_execution",
      key: "place_of_execution",
      search: true,
    },
    {
      title: "Entidad Adjudicadora",
      dataIndex: "awarning_authority",
      key: "awarning_authority",
      search: true,
      width: "20%",
    },
    {
      title: "Acción",
      dataIndex: "key",
      key: "key",
      search: false,
      width: "5%",
      render: (text, record) => {
        return (
          <Row gutter={[8, 0]} justify="center">
            <Col>
              <Tooltip title="Eliminar!" color={"red"}>
                <DeleteTwoTone
                  onClick={() => deleteTender(record.id)}
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
    let userLocal = JSON.parse(localStorage.getItem("user"));

    await axios
      .get("https://insightcron.com/users/tender-users/", {
        headers: {
          Authorization: `Token ${userLocal.token}`,
        },
      })
      .then( response => {
        if (response && response.data?.tenders) {
          setTenders(response.data?.tenders);
        }
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false);
        console.log(err)
      });
  };

  const deleteTender = async (id) => {
    await axios
      .delete(`https://insightcron.com/tenders/${id}/`)
      .then( res => {
        if (res) {
          getUsers();
          notification.success({
            message: 'Liquidación eliminada con exito!!',
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
    <App>
      <Spin tip="Cargando..." spinning={loading}>
        <TableSystem columns={columns} data={tenders} />
      </Spin>
    </App>
  );
};

export default TenderList;
