import React from "react";
import { Row, Col, Card, Form, Input, Button, Layout } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { useRouter } from "next/router";

const { Header, Footer } = Layout;

const Signin = () => {
  const router = useRouter();
  const onFinish = async (values) => {
    console.log(values);

    await axios
      .post("https://insightcron.com/users/login/", values)
      .then( response => {
        if (response.status == "200") {
          if (process.browser) {
            localStorage.setItem("user", JSON.stringify(response.data));
            router.push("/tenders/");
          }
        }
      })
      .catch((err) => alert("Error con los datos"));
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Header></Header>
      <Row justify="center" style={{ height: "100%" }}>
        <Col sm={24} md={8} className="colForm">
          <Card hoverable bordered={false} className="cardForm">
            <img width="100%" height="250px" src="/image/logo.png" alt="my image" />
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Row gutter={[16, 16]} className="input-item">
                <Col span={24}>
                  <p>¡Bienvenido a Insight Intranet!</p>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="email"
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        type: "email",
                        message: "¡Por favor, ingrese su correo electrónico!",
                      },
                    ]}
                  >
                    <Input
                      prefix={<MailOutlined className="site-form-item-icon" />}
                      placeholder="Correo electronico"
                    />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    name="password"
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "¡Por favor, ingrese su contraseña!",
                        min: 4,
                      },
                    ]}
                  >
                    <Input
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      type="password"
                      placeholder="Contraseña"
                    />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item>
                    <Button
                      block
                      type="primary"
                      htmlType="submit"
                      // loading={AuthStore.loading}
                      className="login-form-button"
                    >
                      Iniciar
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
      <Footer>Insight 2020</Footer>
    </Layout>
  );
};

export default Signin;
