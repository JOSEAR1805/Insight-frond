import { useState, useEffect } from "react";
import App from "../../src/components/layout/app";
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
  notification,
  Spin,
} from "antd";
import { DeleteTwoTone } from "@ant-design/icons";

const { Option } = Select;

const UserForm = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [profiles, setProfiles] = useState([]);
  
  const [rol, setRol] = useState();
  const [selectCountry, setSelectCountry] = useState();
  const [selectProfile, setSelectProfile] = useState();
  const [searchSettings, setSearchSettings] = useState([]);

  const navigation = [
    {
      key: "1",
      path: "/users",
      breadcrumbName: "Usuarios",
    },
    {
      key: "2",
      path: "/users/add",
      breadcrumbName: "Nuevo Usuario",
    },
  ];

  const getCountries = async () => {
    console.log('******getCountries*******')
    const payload = await axios
      .get("https://insightcron.com/countries/")
      .catch((err) => console.log(err));

    if (payload && payload.data) {
      console.log(payload.data)
      setCountries(payload.data);
    }

  };

  const getProfiles = async () => {
    console.log('******getProfiles*******')
    const payload = await axios
      .get("https://insightcron.com/profiles/")
      .catch((err) => console.log(err));

    if (payload && payload.data) {
      setProfiles(payload.data);
    }
  };

  const saveUser = async (values) => {
    setLoading(true);
    console.log('enviar', values)
    await axios
      .post("https://insightcron.com/users/", values)
      .then( resp => {
        if (resp && resp.data) {
          saveSearchSettings(resp.data.id);
          notification.success({
            message: 'usuario creado con exito!!',
            placement: 'bottomRight',
          });
          setTimeout(() => { 
            setLoading(false) 
            router.push("/users");
          }, 100);
        } 
      })
      .catch((err) => {
        notification.error({
          message: 'Error al guardar Usuario!!',
          placement: 'bottomRight',
        });
        setTimeout(() => { setLoading(false) }, 100);
      });
  };

  const saveSearchSettings = async (idUser) => {
    if (searchSettings.length >= 1) {
      searchSettings.map( item => {
        item.user = parseInt(idUser);
        axios.post(`https://insightcron.com/search_settings/`, item)
          .then(console.log())
          .catch((err) => console.log(err));
      })
    }
  };

  const addSearchSettings = () => {
    setLoading(true)
    let value = {
      'profile': selectProfile,
      'country': selectCountry,
    }
    
    if (searchSettings.length == 0) {
      setSearchSettings([value]);
      notification.success({
        message: 'Configuración Agregada con exito!!',
        placement: 'bottomRight',
      });
    } else {
      let exists = false; 
      searchSettings.map( item => {
        if (item.country == value.country && item.profile == value.profile) {
          exists = true
        }
      })

      if (exists) {
        notification.error({
          message: 'Configuración ya se encuentra agregada!!',
          description: 'Debe seleccionar otros parametros.',
          placement: 'bottomRight',
        });
      } else {
        searchSettings.push(value);
        // setSearchSettings(list)

        notification.success({
          message: 'Configuración Agregada con exito!!',
          placement: 'bottomRight',
        });
      }
    }
    
    setTimeout(() => { setLoading(false) }, 250);
  };

  const deleteSearchSettings = (value) => {
    setLoading(true);
    searchSettings.splice(searchSettings.indexOf(value), 1)
    setTimeout(() => { setLoading(false) }, 250);
  };

  useEffect(() => {
    getCountries();
    getProfiles();
  }, []);

  return (
    <App navigation={navigation}>
      <Spin tip="Cargando..." spinning={loading}>
        <Row justify="center" style={{ "paddingTop": "15px" }}>
          <Col md={24} lg={16}>
            <Form
              layout="vertical"
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={saveUser}
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={12}>
                  <Form.Item
                    label={"Nombre"}
                    name={"first_name"}
                    rules={[
                      {
                        required: true,
                        // message: "Por favor ingrese un nombre!",
                      },
                    ]}
                  >
                    <Input placeholder={"Nombre"} type={"text"} size="small" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12}>
                  <Form.Item
                    label={"Apellido"}
                    name={"last_name"}
                    rules={[
                      {
                        required: true,
                        // message: "Por favor ingrese un nombre!",
                      },
                    ]}
                  >
                    <Input placeholder={"Apellido"} type={"text"} size="small" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12}>
                  <Form.Item
                    label={"Usuario"}
                    name={"username"}
                    rules={[
                      {
                        required: true,
                        // message: "Por favor ingrese un nombre!",
                      },
                    ]}
                  >
                    <Input placeholder={"Usuario"} type={"text"} size="small" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12}>
                  <Form.Item
                    label={"Contraseña"}
                    name={"password"}
                    rules={[
                      {
                        required: true,
                        // message: "Por favor ingrese un nombre!",
                      },
                    ]}
                  >
                    <Input
                      placeholder={"**********"}
                      type={"password"}
                      size="small"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12}>
                  <Form.Item
                    label={"Correo Electronico"}
                    name={"email"}
                    rules={[
                      {
                        required: true,
                        // message: "Por favor ingrese un nombre!",
                      },
                    ]}
                  >
                    <Input
                      placeholder={"example@apreciasoft.com"}
                      type={"email"}
                      size="small"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12}>
                  <Form.Item
                    label={"Rol"}
                    name={"is_staff"}
                    rules={[
                      {
                        required: true,
                        // message: "Por favor ingrese un nombre!",
                      },
                    ]}
                  >
                    <Select size="small" placeholder="seleccionar país" value={rol} onChange={value => setRol(value)}>
                      <Option value={true}>Administrador</Option>;
                      <Option value={false}>Estándar</Option>;
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
                  >
                    Guardar
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        {rol != undefined && !rol && (
        <Row justify="center" style={{ "paddingTop": "15px" }}>
          <Col md={24} lg={16}>
            <Row style={{ padding: "15px", border: "1px solid #bfbfbf" }}>
              <Divider orientation="left" plain>
                Configuración de Búsqueda
              </Divider>

              <Col span={24}>
                <Form>
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
                          onChange={value => setSelectCountry(value)}
                          value={selectCountry}
                          placeholder="Seleccione un País"
                        >
                          {countries.map((resp) => {
                            return <Option value={resp.id} key={resp.id}>{resp.name}</Option>;
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
                          onChange={value => setSelectProfile(value)}
                          value={selectProfile}
                          placeholder="Seleccione un Perfil"
                        >
                          {profiles.map((resp) => {
                            return <Option value={resp.id} key={resp.id}>{resp.name}</Option>;
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
                        style={{ "marginTop": "3px" }}
                        onClick={addSearchSettings}
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
                            onClick={() => deleteSearchSettings(searchSetting)}
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
      </Spin>
    </App>
  );
};

export default UserForm;
