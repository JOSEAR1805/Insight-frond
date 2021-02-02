import { Form, Input, Row, Col, Button, notification, Spin } from "antd";
import { useEffect, useState } from "react";
import App from "../../src/components/layout/app";
import axios from "axios";
import { useRouter } from "next/router";

const { TextArea } = Input;

const ProfilesForm = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);

  const navigation = [
    {
      key: "1",
      path: "/profiles",
      breadcrumbName: "Perfiles",
    },
    {
      key: "2",
      path: `/profiles/${id}`,
      breadcrumbName: "Detalles de Perfil",
    },
  ];

  const onFinish = async (values) => {
    setLoading(true);
    await axios
      .put(`https://insightcron.com/profiles/${id}/`, values)
      .then((resp) => {
        notification.success({
          message: 'Perfil editado con exito!!',
          placement: 'bottomRight',
        });
        setTimeout(() => { 
          setLoading(false) 
          router.push("/profiles");
        }, 100);
      })
      .catch((err) => {
        notification.error({
          message: 'Error al editar Perfil!!',
          placement: 'bottomRight',
        });
        setTimeout(() => { setLoading(false) }, 100);
      });
  };

  const getData = async () => {
    setLoading(true);
    await axios
      .get(`https://insightcron.com/profiles/${id}/`)
      .then((resp) => {
        if (resp && resp.data) {
          form.setFields([
            {
              name: "name",
              value: resp.data?.name,
            },
            {
              name: "description",
              value: resp.data?.description,
            },
            {
              name: "search_parameters",
              value: resp.data?.search_parameters,
            },
            {
              name: "discard_parameters",
              value: resp.data?.discard_parameters,
            },
          ]);
        }
      })
      .catch((err) => console.log(err));
      setLoading(false)
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <App navigation={navigation}>
      <Spin tip="Cargando..." spinning={loading}>
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
                    label={"Nombre"}
                    name={"name"}
                    rules={[
                      {
                        required: true,
                        // message: "Por favor ingrese un nombre!",
                      },
                    ]}
                  >
                    <Input placeholder={"Nombre"} type={"text"} size="small" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label={"Descripción"}
                    name={"description"}
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
                    label={"Parámetros de Búsqueda"}
                    name={"search_parameters"}
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
                  <p><strong>NOTA:</strong> Se mostrará solo la licitación que coincida con el(los) parámetro(s) </p>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label={"Parámetros de Descarte"}
                    name={"discard_parameters"}
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
      </Spin>
    </App>
  );
};

export default ProfilesForm;
