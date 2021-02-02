import {
  Row,
  Col,
  Tooltip,
  notification,
  Spin,
  Select,
  Modal,
  Button,
  Form,
} from "antd";
import App from "../../src/components/layout/app";
import { useState, useEffect } from "react";

import TableSystem from "../../src/components/table";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";

import axios from "axios";

const { Option } = Select;

const TenderList = () => {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(false);

  const [idTender, setIdTender] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);

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
                  onClick={() => { setIdTender(record.id); setIsModalVisible(true); }}
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
      .then((response) => {
        if (response && response.data?.tenders) {
          response.data?.tenders.map((tender) => {
            countries.map((country) => {
              if (tender.country_id == country.id) {
                tender.country = String(country.name);
              }
            });
          });
          setTenders(response.data?.tenders);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const deleteTender = async (id) => {
    await axios
      .delete(`https://insightcron.com/tenders/${id}/`)
      .then((res) => {
        if (res) {
          getCountries();
          notification.success({
            message: "Liquidación eliminada con exito!!",
            placement: "bottomRight",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const getCountries = async () => {
    await axios
      .get("https://insightcron.com/countries/")
      .then((response) => {
        if (response && response.data) {
          getUsers(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateStatusTender = async (value) => {
    if (idTender && value.status != "") {
      value.id= idTender
      await axios
        .post("https://insightcron.com/tenders/update-status/", value)
        .then(() => {
          getCountries();
          notification.success({
            message: "Estado de Licitación Actualizada con exito!!",
            placement: "bottomRight",
          });
          setIsModalVisible(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      notification.error({
        message: "Seleccione un Estado para esta Licitación!!",
        placement: "bottomRight",
      });
    }
  };

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
        onCancel={ () => setIsModalVisible(false) }
        footer={null}
      >
        <Form
          layout="vertical"
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={updateStatusTender}
        >
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item
                label={"Estado"}
                name={"status"}
                rules={[
                  {
                    required: true,
                    message: "Por favor Seleccione un Estado!",
                  },
                ]}
              >
                <Select
                  placeholder="Seleccionar Estado"
                >
                  <Option value="Presentada">Presentada</Option>
                  <Option value="No Presentada">No Presentada</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row justify="center">
            <Col xs={24} sm={12} md={6}>
              <Button
                type="primary"
                block="true"
                htmlType="buttom"
                size="small"
                loading={loading}
              >
                Guardar
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </App>
  );
};

export default TenderList;
