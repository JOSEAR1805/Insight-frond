import { useState, useEffect } from "react";
import { Form, Input, Row, Col, Button, Select } from "antd";
import App from "../../src/components/layout/app";
import FormSystem from "../../src/components/form";
import axios from "axios";
import { useRouter } from "next/router";

const { Option } = Select;

const CategoryForm = () => {
  const router = useRouter();
  const [countries, setCountries] = useState([]);
  const [routes, setRoutes] = useState([
    {
      key: "1",
      path: "/categories",
      breadcrumbName: "Categoría",
    },
    {
      key: "2",
      path: "/categories/add",
      breadcrumbName: "Agregar Categoría",
    },
  ]);
  const [form] = Form.useForm();

  // OBTENEMOS PAISES
  const onGenderChange = (value) => {
    form.setFieldsValue({ country: value });
  };

  const getCountry = async () => {
    const payload = await axios
      .get("https://insightcron.com/countries/")
      .catch((err) => console.log(err));

    if (payload && payload.data) {
      setCountries(payload.data);
    }
  };

  const onFinish = async (values) => {
    console.log("Success:", values);

    const payload = await axios
      .post("https://insightcron.com/categories/", values)
      .catch((err) => console.log(err));

    if (payload && payload.data) {
      router.push("/categories");
    } else {
      alert("Error guardando");
    }
  };

  useEffect(() => {
    getCountry();
    console.log(countries);
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
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  label="Nombre Categoria"
                  name="name"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="escribir nombre" size="small" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="País"
                  name="country"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select
                    size="small"
                    onChange={onGenderChange}
                    placeholder="seleccionar país"
                  >
                    {countries.map((resp) => {
                      return <Option value={resp.id}>{resp.name}</Option>;
                    })}
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
    </App>
  );
};

export default CategoryForm;
