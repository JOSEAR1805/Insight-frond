import { Form, Input, Row, Col, Button, Space } from "antd";
import App from "../../src/components/layout/app";
import FormSystem from "../../src/components/form";
import axios from "axios";
import { useRouter } from "next/router";

const CountryForm = () => {
  const router = useRouter();

  const navigation = [
    {
      key: "1",
      path: "/countries",
      breadcrumbName: "Paises",
    },
    {
      key: "2",
      path: "/countries/add",
      breadcrumbName: "Agregar Pais",
    },
  ];

  const onFinish = async (values) => {
    const payload = await axios
      .post("https://api-insight.tk/countries/", values)
      .catch((err) => console.log(err));

    if (payload && payload.data) {
      router.push("/countries");
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
                  label={'Pais'}
                  name={'name'}
                  rules={[
                    {
                      required: true,
                      // message: "Por favor ingrese un nombre!",
                    },
                  ]}
                >
                  <Input
                    placeholder={'Introduzca un Pais'}
                    type={'text'}
                    size="small"
                  />
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

export default CountryForm;
