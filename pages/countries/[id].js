import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import App from "../../src/components/layout/app";
import { Form, Input, Row, Col, Button, notification, Spin } from "antd";

const CountryForm = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [idUser, setIdUser] = useState();

  const navigation = [
    {
      key: "1",
      path: "/countries",
      breadcrumbName: "Paises",
    },
    {
      key: "2",
      path: `/countries/${idUser}`,
      breadcrumbName: "Detalles de Pais",
    },
  ];

  const onFinish = async (values) => {
    setLoading(true);
    await axios
      .put(`https://insightcron.com/countries/${idUser}/`, values)
      .then(() => {
        notification.success({
          message: 'Pais editado con exito!!',
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

  const getData = async (id) => {
    setLoading(true);
    await axios
      .get(`https://insightcron.com/countries/${id}/`)
      .then(resp => {
        if (resp && resp.data) {
          form.setFields([
            {
              name: "name",
              value: resp.data?.name,
            },
          ]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err)
        setLoading(false);
      });
  };

  useEffect(() => {
    setIdUser(router.query?.id);
    getData(router.query?.id);
  }, [router]);

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
      </Spin>
    </App>
  );
};

export default CountryForm;
