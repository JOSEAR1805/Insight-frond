import { useState } from "react";
import { Form, Input, Row, Col, Button, notification, Spin } from "antd";
import App from "../../src/components/layout/app";
import FormSystem from "../../src/components/form";
import axios from "axios";
import { useRouter } from "next/router";

const CountryForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    await axios
      .post("https://insightcron.com/countries/", values)
      .then(() => {
        notification.success({
          message: 'Pais creado con exito!!',
          placement: 'bottomRight',
        });
        setTimeout(() => { 
          setLoading(false) 
          router.push("/countries");
        }, 100);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err)
      });
  };

  return (
    <App navigation={navigation}>
      <Spin tip="Cargando..." spinning={loading}>
        <Row justify="center" style={{ paddingTop: "15px" }}>
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
      </Spin>
    </App>
  );
};

export default CountryForm;
