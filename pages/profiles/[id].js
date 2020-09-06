import { Form, Input, Row, Col, Button } from "antd";
import { useEffect } from "react";
import App from "../../src/components/layout/app";
import axios from "axios";
import { useRouter } from "next/router";

const { TextArea } = Input;

const ProfilesForm = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { id } = router.query;

	const navigation = [
		{
			key: '1',
			path: '/profiles',
			breadcrumbName: 'Perfiles',
		},
		{
			key: '2',
			path: `/profiles/${id}`,
			breadcrumbName: 'Detalles de Perfil',
		},
	];
	
  const onFinish = async (values) => {
    const payload = await axios
      .put(`https://api-insight.tk/profiles/${id}/`, values)
      .catch((err) => console.log(err));

    if (payload && payload.data) {
      router.push("/profiles");
    } else {
      alert("Error guardando");
    }
  };

  const getData = async () => {
    const payload = await axios
      .get(`https://api-insight.tk/profiles/${id}/`)
      .catch((err) => console.log(err));

    if (payload && payload.data) {
      form.setFields([
        {
          name: "name",
          value: payload.data?.name,
        },
        {
          name: "description",
          value: payload.data?.description,
        },
        {
          name: "search_parameters",
          value: payload.data?.search_parameters,
        },
        {
          name: "discard_parameters",
          value: payload.data?.discard_parameters,
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
                  label={'Nombre'}
                  name={'name'}
                  rules={[
                    {
                      required: true,
                      // message: "Por favor ingrese un nombre!",
                    },
                  ]}
                >
                  <Input
                    placeholder={'Nombre'}
                    type={'text'}
                    size="small"
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label={'Descripción'}
                  name={'description'}
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
                    placeholder={"Introduzca una Descripción"}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label={'Parámetros de Búsqueda'}
                  name={'search_parameters'}
                  rules={[
                    {
                      required: true,
                      // message: "Por favor ingrese un nombre!",
                    },
                  ]}
                >
                  <TextArea
                    rows={2}
                    size="small"
                    placeholder={"Introduzca Parámetros de Búsqueda"}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label={'Parámetros de Descarte'}
                  name={'discard_parameters'}
                  rules={[
                    {
                      required: true,
                      // message: "Por favor ingrese un nombre!",
                    },
                  ]}
                >
                  <TextArea
                    rows={2}
                    size="small"
                    placeholder={"Introduzca Parámetros de Descarte"}
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
                  Editar
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </App>
	);
}

export default ProfilesForm;