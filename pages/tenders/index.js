import { Row, Col, Tooltip, notification, Spin, Select, Modal, Button } from "antd";
import App from "../../src/components/layout/app";
import { useState, useEffect } from "react";

import TableSystem from "../../src/components/table";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";

import axios from "axios";

const { Option } = Select;

const TenderList = () => {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [statusTender, setStatusTender] = useState({id: '', status: ''});

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
      title: "Estado",
      dataIndex: "status",
      key: "status",
      search: true,
    },
    {
      title: "Acción",
      dataIndex: "key",
      key: "key",
      search: false,
      width: "8%",
      render: (text, record) => {
        return (
          <Row gutter={[8, 0]} justify="center">
            <Col>
              <Tooltip title="Editar Estado de Licitación!" color={"orange"}>
                <EditTwoTone
                  onClick={() => modalEditStatus(record.id)}
                  twoToneColor="#fa8c16"
                  style={{ fontSize: "16px" }}
                />
              </Tooltip>
            </Col>
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

  const getUsers = async (countries) => {
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
          response.data?.tenders.map((tender) => {
            countries.map((country) => {
              if (tender.country_id == country.id ) {
                tender.country = String(country.name);
              }
            });
          });
          console.log('tenders', response.data?.tenders)
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

  const getCountries = async () => {
    await axios.get("https://insightcron.com/countries/")
      .then( response => {
        if (response && response.data) {
          getUsers(response.data);
        }
      })
      .catch((err) => {
        console.log(err)
      });
  };

  //MODAL EDITAR STATUS
  const modalEditStatus = (idTender) => {
    statusTender.id = idTender;
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setStatusTender({id: '', status: ''});
    setIsModalVisible(false);
  };

  const updateStatusTender = async () => {
    if (statusTender.id != '' && statusTender.status != '') {
      console.log(statusTender)
      await axios.post("https://insightcron.com/tenders/update-status/", statusTender)
        .then(() => {
          notification.success({
            message: 'Estado de Licitación Actualizada con exito!!',
            placement: 'bottomRight',
          });
          setStatusTender({id: '', status: ''})
          getUsers();
          setIsModalVisible(false);
        })
        .catch((err) => {
          console.log(err)
        });
    } else {
      notification.error({
        message: 'Seleccione un Estado para esta Licitación!!',
        placement: 'bottomRight',
      });
    }
  }

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <App>
      <Spin tip="Cargando..." spinning={loading}>
        <TableSystem columns={columns} data={tenders} />
      </Spin>
      <Modal
        title="Editar Estado de Licitación"
        visible={isModalVisible}
        onCancel={closeModal}
        footer={
          [
            <Button key="submit" type="primary" loading={loading} onClick={updateStatusTender}>
              Editar
            </Button>
          ]
        }
      >
        <Select defaultValue={statusTender.status} onChange={(values) => statusTender.status = values}>
          <Option value="">Seleccione Estado</Option>
          <Option value="Presentada">Presentada</Option>
          <Option value="No Presentada">No Presentada</Option>
        </Select>
      </Modal>
    </App>
  );
};

export default TenderList;
