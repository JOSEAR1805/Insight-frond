import { Form, Input, Row, Col, Button } from 'antd';

const FormSystem = (props) => {

	const { 
		items
	} = props;

	const onFinish = values => {
		console.log('Success:', values);
	};

	return (
			<Form
				layout="vertical"
				name="basic"
				initialValues={{
					remember: true,
				}}
				onFinish={onFinish}
			>
			<Row gutter={[16, 16]}>
				{items.map((response) => {
					return (
						<Col xs={24} sm={12} md={12}>
							<Form.Item
								label={response.label}
								name={response.name}
								rules={[
									{
										required: true,
										message: 'Por favor ingrese un nombre!',
									},
								]}
							>
								<Input placeholder={response.placeholder} size="small" />
							</Form.Item>
						</Col>
					);
				})}
			</Row>
			<Row justify="center">
				<Col xs={24} sm={12} md={6}>
					<Button type="primary" block="true" size="small" shape="round">Guardar</Button>
				</Col>
			</Row>
		</Form>
	);
}

export default FormSystem;