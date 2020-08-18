import { Form, Input, Row, Col, Button, Space } from 'antd';

const FormSystem = (props) => {

	const { 
		children,
		items
	} = props;

	const onFinish = values => {
		console.log('Success:', values);
	};

	return (
		<Row justify="center" style={{ 'padding-top': '15px' }}>
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
						{ children && (
							<Row>
								{children}
							</Row>
						) }
					<Row justify="center">
						<Col xs={24} sm={12} md={6}>
							<Button type="primary" block="true" size="small">Guardar</Button>
						</Col>
					</Row>
				</Form>
			</Col>
		</Row>
	);
}

export default FormSystem;