import { Form, Input, Row, Col, Button, Space } from "antd";
import App from "../../src/components/layout/app";
import FormSystem from "../../src/components/form";
import axios from "axios";
import { useRouter } from "next/router";

const CountryForm = () => {
  const routes = [
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

  const data = [
    {
      key: "1",
      label: "Nombre",
      name: "name",
      type: "text",
      placeholder: "Nombre del Pais",
    },
  ];

  const router = useRouter();

  const onFinish = async (values) => {
    console.log("Success:", values);

    const payload = await axios
      .post("http://127.0.0.1:8000/countries/", values)
      .catch((err) => console.log(err));

    if (payload && payload.data) {
      router.push("/countries");
    } else {
      alert("Error guardando");
    }
  };

  return (
    <App routes={routes}>
      {/* <FormSystem items={data} /> */}
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
              {data.map((response) => {
                return (
                  <Col xs={24} sm={12} md={12}>
                    <Form.Item
                      label={response.label}
                      name={response.name}
                      rules={[
                        {
                          required: true,
                          // message: "Por favor ingrese un nombre!",
                        },
                      ]}
                    >
                      <Input
                        placeholder={response.placeholder}
                        type={response.type}
                        size="small"
                      />
                    </Form.Item>
                  </Col>
                );
              })}
            </Row>
            {/* {children && <Row>{children}</Row>} */}
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
