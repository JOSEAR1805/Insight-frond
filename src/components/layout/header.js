import { Layout, Row, Col, Avatar, Tooltip } from 'antd';
import { UserOutlined, BellOutlined } from '@ant-design/icons';

const { Header} = Layout;

const HeaderApp = () => {
	return (
		<Header>
			 <Row justify="end" gutter={[16, 0]}>
					<Col>
						<Tooltip title="Notificaciones!" color={'gold'}>
							<BellOutlined twoToneColor="#ff0000" style={{ fontSize: '18px', paddingTop: '12px'}}/>
						</Tooltip>
					</Col>
					<Col>
						Administrador
					</Col>
				</Row>
		</Header>
	);
}

export default HeaderApp;