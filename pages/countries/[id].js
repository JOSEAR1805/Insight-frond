import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import App from "../../src/components/layout/app";
import { Form, Input, Row, Col, Button } from "antd";

const CountryForm = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { id } = router.query;

  const navigation = [
    {
      key: "1",
      path: "/countries",
      breadcrumbName: "Paises",
    },
    {
      key: "2",
      path: `/countries/${id}`,
      breadcrumbName: "Detalles de Pais",
    },
  ];

  const onFinish = async (values) => {
    const payload = await axios
      .put(`https://api-insight.tk/countries/${id}/`, values)
      .catch((err) => console.log(err));

    if (payload && payload.data) {
      router.push("/countries");
    } else {
      alert("Error guardando");
    }
  };

  const getData = async () => {
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
    getData();
  }, []);

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
            form={form}
          >
            <Row gutter={[16, 16]}>
              <Col span={24}>
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
                  Editar
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </App>
  );
};

export default CountryForm;
