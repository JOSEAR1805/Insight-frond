import App from "../../src/components/layout/app";
import { Form, Input, Row, Col, Button, Select } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import TextArea from "antd/lib/input/TextArea";
import { useState, useEffect } from "react";

const { Option } = Select;

const WebForm = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [countries, setCountries] = useState([]);
  const navigation = [
    {
      key: "1",
      path: "/webs",
      breadcrumbName: "Webs",
    },
    {
      key: "2",
      path: "/webs/add",
      breadcrumbName: "Nueva Web",
    },
  ];

  const getCountry = async () => {
    const payload = await axios
      .get("https://insightcron.com/countries/")
      .catch((err) => console.log(err));

    if (payload && payload.data) {
      setCountries(payload.data);
    }
  };

  const onGenderChange = (value) => {
    form.setFieldsValue({ country: value });
  };

  const onFinish = async (values) => {
    const payload = await axios
      .post("https://insightcron.com/webs/", values)
      .catch((err) => console.log(err));

    if (payload && payload.data) {
      router.push("/webs");
    } else {
      alert("Error guardando");
    }
  };

  useEffect(() => {
    getCountry();
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
          >
            <Row gutter={[16, 16]}>

              <Col xs={24} sm={12} md={12}>
                <Form.Item
                  label={'Nombre de Intitución'}
                  name={'name'}
                  rules={[
                    {
                      required: true,
                      // message: "Por favor ingrese un nombre!",
                    },
                  ]}
                >
                  <Input
                    placeholder={'Nombre de Institución'}
                    type={'text'}
                    size="small"
                  />
                </Form.Item>
              </Col>
              
              <Col xs={24} sm={12} md={12}>
                <Form.Item
                  label={'Pais'}
                  name={'country'}
                  rules={[
                    {
                      required: true,
                      // message: "Por favor ingrese un nombre!",
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

              <Col span={24}>
                <Form.Item
                  label={'Url Web'}
                  name={'url'}
                  rules={[
                    {
                      required: true,
                      // message: "Por favor ingrese un nombre!",
                    },
                  ]}
                >
                  <Input
                    placeholder={'Introduzca la url'}
                    type={'text'}
                    size="small"
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label={'Comentario'}
                  name={'comments'}
                  rules={[
                    {
                      required: true,
                      // message: "Por favor ingrese un nombre!",
                    },
                  ]}
                >
                  <TextArea
										rows={1}
										size="small"
										placeholder={"Introduzca Comentarío"}
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

export default WebForm;
