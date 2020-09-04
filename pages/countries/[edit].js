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
      path: "/countries",
      breadcrumbName: "Paises",
    },
    {
      key: "2",
      path: "/countries/add",
      breadcrumbName: "Editar Pais",
    },
  ];

  const { edit } = router.query;

  const onFinish = async (values) => {
    const payload = await axios
      .put(`https://api-insight.tk/countries/${edit}/`, values)
      .catch((err) => console.log(err));

    if (payload && payload.data) {
      router.push("/countries");
    } else {
      alert("Error guardando");
    }
  };

  const getData = async (id) => {
    const payload = await axios
      .get(`https://api-insight.tk/countries/${id}/`)
      .catch((err) => console.log(err));

    if (payload && payload.data) {
      form.setFields([
        {
          name: "name",
          value: payload.data?.name,
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
                  label="Pais"
                  name="name"
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
