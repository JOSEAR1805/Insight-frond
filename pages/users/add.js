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
  Checkbox,
  Upload, 
  message,
} from "antd";
import { DeleteTwoTone, LoadingOutlined, PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("Sólo puedes subir un archivo JPG/PNG!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("La imagen debe ser menor de 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

const UserForm = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [profiles, setProfiles] = useState([]);
  
  const [rol, setRol] = useState();
  const [selectCountry, setSelectCountry] = useState();
  const [selectProfile, setSelectProfile] = useState();
  const [searchSettings, setSearchSettings] = useState([]);

  const [loadingImg, setLoadingImg] = useState(false);
  const [imageUrl, setImageUrl] = useState();

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
    // console.log('******getCountries*******')
    const payload = await axios
      .get("https://insightcron.com/countries/")
      .catch((err) => console.log(err));

    if (payload && payload.data) {
      setCountries(payload.data);
    }

  };

  const getProfiles = async () => {
    // console.log('******getProfiles*******')
    const payload = await axios
      .get("https://insightcron.com/profiles/")
      .catch((err) => console.log(err));

    if (payload && payload.data) {
      setProfiles(payload.data);
    }
  };

  const saveUser = async (values) => {
    console.log('enviar', values)
    // console.log('enviar', imageUrl)
    // const decodedData = atob(imageUrl); // decode the string
    // console.log('dasda', btoa(imageUrl).replace(/\+/g, " "))

    setLoading(true);
    await axios
      .post("https://insightcron.com/users/", values)
      .then( resp => {
        if (resp && resp.data) {
          // saveSearchSettings(resp.data.id);
          savePrivileges(values, resp.data.id)
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
        console.log(err)
        notification.error({
          message: 'Error al guardar Usuario!!',
          placement: 'bottomRight',
        });
        setTimeout(() => { setLoading(false) }, 100);
      });
  };

  // const saveSearchSettings = async (idUser) => {
  //   if (searchSettings.length >= 1) {
  //     searchSettings.map( item => {
  //       item.user = parseInt(idUser);
  //       axios.post(`https://insightcron.com/search_settings/`, item)
  //         .then(console.log())
  //         .catch((err) => console.log(err));
  //     })
  //   }
  // };

  const savePrivileges = async (values, idUser) => {
    let values_privileges = {
      profiles: values.is_staff? true: values.privilege_profiles? true: false,
      tenders: values.is_staff? true: values.privilege_tenders? true: false,
      webs: values.is_staff? true: values.privilege_webs? true: false,
      users: values.is_staff? true: values.privilege_users? true: false,
      image: imageUrl? btoa(imageUrl).replace(/\+/g, " "): '',
      profiles_ids: values.is_staff? '' : values.profile.join(', '),
      countries_ids: values.is_staff? '' : values.country.join(', '),
      user: parseInt(idUser),

    }
    axios.post(`https://insightcron.com/privileges/`, values_privileges)
      .then(console.log())
      .catch((err) => console.log(err));
  };

  // const addSearchSettings = () => {
  //   setLoading(true)
  //   let value = {
  //     'profile': selectProfile,
  //     'country': selectCountry,
  //   }
    
  //   if (searchSettings.length == 0) {
  //     setSearchSettings([value]);
  //     notification.success({
  //       message: 'Configuración Agregada con exito!!',
  //       placement: 'bottomRight',
  //     });
  //   } else {
  //     let exists = false; 
  //     searchSettings.map( item => {
  //       if (item.country == value.country && item.profile == value.profile) {
  //         exists = true
  //       }
  //     })

  //     if (exists) {
  //       notification.error({
  //         message: 'Configuración ya se encuentra agregada!!',
  //         description: 'Debe seleccionar otros parametros.',
  //         placement: 'bottomRight',
  //       });
  //     } else {
  //       searchSettings.push(value);
  //       // setSearchSettings(list)

  //       notification.success({
  //         message: 'Configuración Agregada con exito!!',
  //         placement: 'bottomRight',
  //       });
  //     }
  //   }
    
  //   setTimeout(() => { setLoading(false) }, 250);
  // };

  // const deleteSearchSettings = (value) => {
  //   setLoading(true);
  //   searchSettings.splice(searchSettings.indexOf(value), 1)
  //   setTimeout(() => { setLoading(false) }, 250);
  // };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoadingImg(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setLoadingImg(false);
        setImageUrl(imageUrl);
      });
    }
  };

  const uploadButton = (
    <div>
      {loadingImg ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Subir Image</div>
    </div>
  );

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

                {rol != undefined && !rol && (
                  <Col span={24}>
                    <Form.Item
                      label="Pais(es)"
                      name="country"
                      rules={[
                        {
                          required: true,
                          message: "Por favor seleccione un Pais!",
                        },
                      ]}
                    >
                      <Select
                        mode="multiple"
                        showSearch
                        allowClear
                        size="small"
                        onChange={value => {console.log(value); setSelectCountry(value)}}
                        value={selectCountry}
                        placeholder="Seleccione un País"
                        filterOption={(value, option) => option.children?.toUpperCase().indexOf(value.toUpperCase()) !== -1}
                      >
                        {countries.map((resp) => {
                          return <Option value={resp.id} key={resp.id}>{resp.name}</Option>;
                        })}
                      </Select>
                    </Form.Item>
                  </Col>
                )}
                {rol != undefined && !rol && (
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Perfil"
                      name="profile"
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: "Por favor seleccione un Perfil!",
                      //   },
                      // ]}
                    >
                      <Select
                        mode="multiple"
                        showSearch
                        allowClear
                        size="small"
                        onChange={value => {setSelectProfile(value)}}
                        value={selectProfile}
                        placeholder="Seleccione un Perfil"
                        filterOption={(value, option) => option.children?.toUpperCase().indexOf(value.toUpperCase()) !== -1}
                      >
                        {profiles.map((resp) => {
                          return <Option value={resp.id} key={resp.id}>{resp.name}</Option>;
                        })}
                      </Select>
                      {/* <Select
                        size="small"
                        onChange={value => setSelectProfile(value)}
                        value={selectProfile}
                        placeholder="Seleccione un Perfil"
                      >
                        {profiles.map((resp) => {
                          return <Option value={resp.id} key={resp.id}>{resp.name}</Option>;
                        })}
                      </Select> */}
                    </Form.Item>
                  </Col>
                )}

                <Col span={24}>
                  <Form.Item
                    label={"Foto"}
                    name={"image"}
                  >
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                  >
                    {imageUrl ? (
                      <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                  </Form.Item>

                </Col>
              </Row>

              {rol != undefined && !rol && (
              <Row>
                <Col span={24}>
                  <Row style={{ padding: "15px", border: "1px solid #bfbfbf", marginBottom: "15px" }}>
                    <Divider orientation="left" plain style={{ margin: "0px"}}>
                      Privilegios para gestionar
                    </Divider>

                    <Col xs={24} sm={12} md={6}>
                      <Form.Item  name="privilege_tenders" valuePropName="checked">
                        <Checkbox>Licitaciones</Checkbox>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                      <Form.Item  name="privilege_webs" valuePropName="checked">
                        <Checkbox>Webs</Checkbox>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                      <Form.Item  name="privilege_profiles" valuePropName="checked">
                        <Checkbox>Perfiles</Checkbox>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                      <Form.Item  name="privilege_users" valuePropName="checked">
                        <Checkbox>Usuarios</Checkbox>
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
                {/* <Col span={24}>
                  <Row style={{ padding: "15px", border: "1px solid #bfbfbf", marginBottom: "15px" }}>
                    <Divider orientation="left" plain style={{ margin: "0px"}}>
                      Configuración de Búsqueda
                    </Divider>

                    <Col span={24}>
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
                                showSearch
                                allowClear
                                size="small"
                                onChange={value => setSelectCountry(value)}
                                value={selectCountry}
                                placeholder="Seleccione un País"
                                filterOption={(value, option) => option.children?.toUpperCase().indexOf(value.toUpperCase()) !== -1}
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
                              size="small"
                              style={{ "marginTop": "15px" }}
                              onClick={addSearchSettings}
                            >
                              Agregar
                            </Button>
                          </Col>
                        </Row>
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
                </Col> */}
              </Row>
              )}

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
        
      </Spin>
    </App>
  );
};

export default UserForm;
