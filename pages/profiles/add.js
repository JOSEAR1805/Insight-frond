import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import App from "../../src/components/layout/app";
import ButtomLink from "../../src/components/buttomLink";

import { Form, Input, Row, Col, Button, notification, PageHeader } from "antd";

const { TextArea } = Input;

const ProfilesForm = () => {
	const router = useRouter();
  const [loading, setLoading] = useState(false);

	const navigation = [
		{
			key: '1',
			path: '/profiles',
			breadcrumbName: 'Perfiles',
		},
		{
			key: '2',
			path: '/profiles/add',
			breadcrumbName: 'Nuevo Perfil',
		},
	];
	
	const onFinish = async (values) => {
    setLoading(true);

    await axios
			.post("https://insightcron.com/profiles/", values)
			.then(() => {
				notification.success({
					message: 'Perfil creado con exito!!',
					placement: 'bottomRight',
				});
				setTimeout(() => { 
					setLoading(false) 
					router.push("/profiles");
				}, 100);
			})
      .catch((err) => {
        notification.error({
          message: 'Error al guardar Perfil!!',
          placement: 'bottomRight',
        });
        setTimeout(() => { setLoading(false) }, 100);
      });
  };

	return (
		<App navigation={navigation}>
      <PageHeader
        className="site-page-header"
        title="Form. de Perfiles"
        style={{ paddingTop: "0px"}}
      />
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
								<p><strong>NOTA:</strong> Se mostrará solo la licitación que coincida con el(los) parámetro(s) </p>
							</Col>
							<Col span={24}>
								<Form.Item
									label={'Parámetros de Descarte'}
									name={'discard_parameters'}
								>
									<TextArea
										rows={2}
										size="small"
										placeholder={"Introduzca Parámetros de Descarte"}
									/>
								</Form.Item>
							</Col>
							
						</Row>
						<Row gutter={[16, 16]} justify="center">
							<Col xs={24} sm={12} md={6}>
								<ButtomLink type="primary" title="Cancelar" path="/profiles" />
							</Col>
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
}

export default ProfilesForm;