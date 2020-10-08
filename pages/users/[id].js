import App from "../../src/components/layout/app";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import {
  Form,
  Input,
  Row,
  Col,
  Button,
  Select,
  Divider,
  List,
  Tooltip,
} from "antd";
import { DeleteTwoTone } from "@ant-design/icons";

const { Option } = Select;

const UserForm = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [countries, setCountries] = useState([]);
  const [idUser, setIdUser] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [searchSettings, setSearchSettings] = useState([]);
  const [isStaff, setIsStaff] = useState(true);

  const navigation = [
    {
      key: "1",
      path: "/users",
      breadcrumbName: "Usuarios",
    },
    {
      key: "2",
      path: `/users/${idUser}`,
      breadcrumbName: "Detalles de Usuario",
    },
  ];

  const getDataUser = async (userId) => {
    console.log("getDataUser");
    const payload = await axios
      .get(`https://insightcron.com/users/${userId}/`)
      .catch((err) => console.log(err));

    if (payload && payload.data) {
      setIsStaff(payload.data.is_staff);

      form.setFields([
        {
          name: "username",
          value: payload.data?.username,
        },
        {
          name: "first_name",
          value: payload.data?.first_name,
        },
        {
          name: "last_name",
          value: payload.data?.last_name,
        },
        {
          name: "email",
          value: payload.data?.email,
        },
      ]);

      getCountries();
      getProfiles();
      getSearchSettings(userId);
    }
  };

  const getCountries = async () => {
    const payload = await axios
      .get("https://insightcron.com/countries/")
      .catch((err) => console.log(err));

    if (payload && payload.data) {
      setCountries(payload.data);
    }
  };

  const getProfiles = async () => {
    const payload = await axios
      .get("https://insightcron.com/profiles/")
      .catch((err) => console.log(err));

    if (payload && payload.data) {
      setProfiles(payload.data);
    }
  };

  const getSearchSettings = async (getIdeUser) => {
    const payload = await axios
      .get("https://insightcron.com/search_settings/")
      .catch((err) => console.log(err));

    if (payload && payload.data) {
      setSearchSettings(payload.data.filter((resp) => resp.user == getIdeUser));
    }
  };

  const deleteSearchSettings = async (id) => {
    const payload = await axios
      .delete(`https://insightcron.com/search_settings/${id}/`)
      .catch((err) => console.log(err));

    setSearchSettings(payload.data);
    if (payload && payload.data) {
      console.log(searchSettings);
    }
  };

  const updateUser = async (values) => {
    const payload = await axios
      .put(`https://insightcron.com/users/${idUser}/`, values)
      .catch((err) => console.log(err));

    if (payload && payload.data) {
      router.push("/users");
    } else {
      alert("Error guardando");
    }
  };

  const saveSearchSettings = async (values) => {
    values.user = parseInt(idUser);
    const payload = await axios
      .post(`https://insightcron.com/search_settings/`, values)
      .catch((err) => console.log(err));

    if (payload && payload.data) {
      getSearchSettings(idUser);
      alert("Guardado con exito");
    } else {
      alert("Error guardando");
    }
  };

  useEffect(() => {
    setIdUser(router.query?.id);
    getDataUser(router.query?.id);
  }, [router]);

  return (
    <App navigation={navigation}>
      <Row justify="center" style={{ "padding-top": "15px" }}>
        <Col md={24} lg={16}>
          <Form
            layout="vertical"
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={updateUser}
            form={form}
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={12}>
                <Form.Item
                  label="Nombre"
                  name="first_name"
                  rules={[
                    {
                      required: true,
                      message: "Por favor ingresar Nombre!",
                    },
                  ]}
                >
                  <Input type="text" size="small" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={12}>
                <Form.Item
                  label="Apellido"
                  name="last_name"
                  rules={[
                    {
                      required: true,
                      message: "Por favor ingresar Apellido!",
                    },
                  ]}
                >
                  <Input type="text" size="small" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={12}>
                <Form.Item
                  label="Usuario"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Por favor ingresar Usuario!",
                    },
                  ]}
                >
                  <Input type="text" size="small" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={12}>
                <Form.Item label="Contraseña" name="password">
                  <Input type="password" size="small" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={12}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Por favor ingrese Correo Electrónico!",
                    },
                  ]}
                >
                  <Input type="email" size="small" />
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
                >
                  Editar
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>

      {!isStaff && (

        <Row justify="center" style={{ "padding-top": "15px" }}>
          <Col md={24} lg={16}>
            <Row style={{ padding: "15px", border: "1px solid #bfbfbf" }}>
              <Divider orientation="left" plain>
                Configuración de Búsqueda
              </Divider>

              <Col span={24}>
                <Form
                  layout="vertical"
                  name="basic"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={saveSearchSettings}
                >
                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={10}>
                      <Form.Item
                        label="Pais"
                        name="country"
                        rules={[
                          {
                            required: true,
                            message: "Por favor seleccione un Pais!",
                          },
                        ]}
                      >
                        <Select
                          size="small"
                          // onChange={onGenderChange}
                          placeholder="Seleccione un País"
                        >
                          {countries.map((resp) => {
                            return <Option value={resp.id}>{resp.name}</Option>;
                          })}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={10}>
                      <Form.Item
                        label="Perfil"
                        name="profile"
                        rules={[
                          {
                            required: true,
                            message: "Por favor seleccione un Perfil!",
                          },
                        ]}
                      >
                        <Select
                          size="small"
                          // onChange={onGenderChange}
                          placeholder="Seleccione un Perfil"
                        >
                          {profiles.map((resp) => {
                            return <Option value={resp.id}>{resp.name}</Option>;
                          })}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={4}>
                      <Button
                        type="primary"
                        block="true"
                        htmlType="buttom"
                        size="small"
                        style={{ "margin-top": "20px" }}
                      >
                        Agregar
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>

              <Col span={24}>
                <List
                  size="small"
                  bordered
                  dataSource={searchSettings}
                  renderItem={(searchSetting) => (
                    <List.Item
                      actions={[
                        <Tooltip title="Eliminar!" color={"red"}>
                          <DeleteTwoTone
                            onClick={() => deleteSearchSettings(searchSetting.id)}
                            twoToneColor="#ff0000"
                            style={{ fontSize: "16px" }}
                          />
                        </Tooltip>,
                      ]}
                    >
                      <Col>
                        {
                          countries.filter(
                            (resp) => resp.id === searchSetting.country
                          )[0]?.name
                        }
                      </Col>
                      <Col>
                        {
                          profiles.filter(
                            (resp) => resp.id === searchSetting.profile
                          )[0]?.name
                        }
                      </Col>
                    </List.Item>
                  )}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      )}

    </App>
  );
};

export default UserForm;
