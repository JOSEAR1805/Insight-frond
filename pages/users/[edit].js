import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import App from "../../src/components/layout/app";
import FormSystem from "../../src/components/form";
import { Form, Input, Row, Col, Button, Space } from "antd";

const UserForm = () => {
  const [form] = Form.useForm();

  const router = useRouter();

  const routes = [
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

  const data = [
    {
      key: "1",
      label: "Nombre",
      name: "first_name",
      type: "text",
      placeholder: "Nombre",
    },
    {
      key: "2",
      label: "Apellido",
      name: "last_name",
      type: "text",
      placeholder: "Apellido",
    },
    {
      key: "3",
      label: "Usuario",
      name: "username",
      type: "text",
      placeholder: "Usuario",
    },
    {
      key: "4",
      label: "Contraseña",
      name: "password",
      type: "password",
      placeholder: "**********",
    },
    {
      key: "5",
      label: "Correo Electronico",
      name: "email",
      type: "email",
      placeholder: "Example@gmail.com",
    },
  ];

  const { edit } = router.query;

  const onFinish = async (values) => {
    const payload = await axios
      .put(`http://127.0.0.1:8000/users/${edit}/`, values)
      .catch((err) => console.log(err));

    if (payload && payload.data) {
      router.push("/users");
    } else {
      alert("Error guardando");
    }
  };

  const getData = async (id) => {
    const payload = await axios
      .get(`http://127.0.0.1:8000/users/${id}/`)
      .catch((err) => console.log(err));

    if (payload && payload.data) {
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
    }
  };

  useEffect(() => {
    getData(edit);
  }, []);

  return (
    <App routes={routes}>
      <Row justify="center" style={{ "padding-top": "15px" }}>
        <Col md={24} lg={16}>
          <Form
            layout="vertical"
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
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
                      // message: "Por favor ingrese un nombre!",
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
                      // message: "Por favor ingrese un nombre!",
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
                      // message: "Por favor ingrese un nombre!",
                    },
                  ]}
                >
                  <Input type="text" size="small" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={12}>
                <Form.Item
                  label="Contraseña"
                  name="password"
                  rules={[
                    {
                      // message: "Por favor ingrese un nombre!",
                    },
                  ]}
                >
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
                      // message: "Por favor ingrese un nombre!",
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
                  Guardar
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </App>
  );
};

export default UserForm;
