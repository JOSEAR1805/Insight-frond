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
  const [form] = Form.useForm();
  const router = useRouter();
  const [idUser, setIdUser] = useState(null);
  const [idPrivilegeEdit, setPrivilegeEdit] = useState(null);
  const [isStaff, setIsStaff] = useState(true);
  const [loading, setLoading] = useState(false);

  const [countries, setCountries] = useState([]);
  const [profiles, setProfiles] = useState([]);
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
      path: `/users/${idUser}`,
      breadcrumbName: "Detalles de Usuario",
    },
  ];

  const getDataUser = async (userId) => {
    setLoading(true);
    const payload = await axios
      .get(`https://insightcron.com/users/${userId}/`)
      .catch((err) => console.log(err));

    if (payload && payload.data) {
      setIsStaff(payload.data.is_staff);
      const privilege = await axios
        .get(`https://insightcron.com/privileges/privilege-user/${userId}`)
        .catch((err) => console.log(err));
      // console.log('dasd', atob(privilege.data.image).replace(/\+/g, " "))
      if (privilege?.data) {
        setImageUrl(atob(privilege?.data?.image).replace(" ", /\+/g))
      }
      setPrivilegeEdit(privilege?.data?.id)

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
        {
          name: "privilege_tenders",
          value: privilege?.data?.tenders,
        },
        {
          name: "privilege_webs",
          value: privilege?.data?.webs,
        },
        {
          name: "privilege_profiles",
          value: privilege?.data?.profiles,
        },
        {
          name: "privilege_users",
          value: privilege?.data?.users,
        },
      ]);

      getCountries();
      getProfiles();
      getSearchSettings(userId);
    }
    setTimeout(() => { setLoading(false) }, 100);
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

  const updateUser = async (values) => {
    console.log(values);
    setLoading(true);
    await axios
      .put(`https://insightcron.com/users/${idUser}/`, values)
      .then((resp) => {
        editPrivileges(values, idUser)
        notification.success({
          message: 'Usuario editado con exito!!',
          placement: 'bottomRight',
        });
        setTimeout(() => { 
          setLoading(false) 
          router.push("/users");
        }, 100);
      })
      .catch((err) => {
        notification.error({
          message: 'Error al editar Usuario!!',
          placement: 'bottomRight',
        });
        setTimeout(() => { setLoading(false) }, 100);
      });
  };

  const saveSearchSettings = async (values) => {
    setLoading(true);
    values.user = parseInt(idUser);

    if (searchSettings.length >= 1) {
      let exists = false; 
      searchSettings.map( item => {
        if (item.country == values.country && item.profile == values.profile) {
          exists = true
        }
      })

      if (exists) {
        notification.error({
          message: 'Configuración ya se encuentra agregada!!',
          description: 'Debe seleccionar otros parametros.',
          placement: 'bottomRight',
        });
        setTimeout(() => { setLoading(false) }, 100);
        return;
      } 
    }

    await axios
      .post(`https://insightcron.com/search_settings/`, values)
      .then(() => {
        getSearchSettings(idUser);
        notification.success({
          message: 'Configuración Agregada con exito!!',
          placement: 'bottomRight',
        });
      })
      .catch((err) => console.log(err));
    setTimeout(() => { setLoading(false) }, 100);
  };

  const editPrivileges = async (values) => {
    let values_privileges = {
      profiles: values.privilege_profiles? true: false,
      tenders: values.privilege_tenders? true: false,
      webs: values.privilege_webs? true: false,
      users: values.privilege_users? true: false,
      image: imageUrl? btoa(imageUrl).replace(/\+/g, " "): '',
      user: parseInt(idUser),
    }

    if (idPrivilegeEdit) {
      await axios.put(`https://insightcron.com/privileges/${idPrivilegeEdit}/`, values_privileges)
        .then(console.log())
        .catch((err) => console.log(err));
    } else {
      await axios.post(`https://insightcron.com/privileges/`, values_privileges)
        .then(console.log())
        .catch((err) => console.log(err));
    }
  };

  const deleteSearchSettings = async (id) => {
    setLoading(true);
    await axios
      .delete(`https://insightcron.com/search_settings/${id}/`)
      .then(() => {
        getSearchSettings(idUser);
        notification.success({
          message: 'Configuración de Búsqueda eliminado con exito!!',
          placement: 'bottomRight',
        });
      })
      .catch((err) => console.log(err));
    setTimeout(() => { setLoading(false) }, 100);
  };

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
    setIdUser(router.query?.id);
    getDataUser(router.query?.id);
  }, [router]);

  return (
    <Spin tip="Cargando..." spinning={loading}>
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

              {!isStaff && (
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
                            showSearch
                            allowClear
                            size="small"
                            // onChange={onGenderChange}
                            placeholder="Seleccione un País"
                            filterOption={(value, option) => option.children?.toUpperCase().indexOf(value.toUpperCase()) !== -1}
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
    </Spin>
  );
};

export default UserForm;
