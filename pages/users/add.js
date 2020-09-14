import { Form, Input, Row, Col, Button, Select } from "antd";
import App from "../../src/components/layout/app";
import axios from "axios";
import { useRouter } from "next/router";

const { Option } = Select;

const UserForm = () => {
  const router = useRouter();
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

  const onFinish = async (values) => {
    const payload = await axios
      .post("https://api-insight.tk/users/", values)
      .catch((err) => console.log(err));

    if (payload && payload.data) {
      router.push("/users");
    } else {
      alert("Error guardando");
    }
  };

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
            onFinish={onFinish}
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
                  <Select size="small" placeholder="seleccionar país">
                    <Option value={true}>Administrador</Option>;
                    <Option value={false}>Usuario</Option>;
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
      {/* <FormSystem items={data} /> */}
    </App>
  );
};

export default UserForm;
