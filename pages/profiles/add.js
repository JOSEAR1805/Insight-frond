import { Form, Input, Row, Col, Button } from "antd";
import App from "../../src/components/layout/app";
import axios from "axios";
import { useRouter } from "next/router";

const { TextArea } = Input;

const ProfilesForm = () => {
  const router = useRouter();

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
    const payload = await axios
      .post("https://api-insight.tk/profiles/", values)
      .catch((err) => console.log(err));

    if (payload && payload.data) {
      router.push("/profiles");
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