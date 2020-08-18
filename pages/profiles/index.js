import { Row, Col, Button, Tooltip } from 'antd';
import App from "../../src/components/layout/app";
import TableSystem from '../../src/components/table';
import Link from "next/link";
import {
	DeleteTwoTone,
	EyeTwoTone,
	EditTwoTone
	} from '@ant-design/icons';

const UserList = () => {

	const routes = [
		{
			key: '1',
			path: '/profiles',
			breadcrumbName: 'Perfiles',
		}
	];

	const data = [
		{
			key: '1',
			name: 'Perfil 1',
			description: 'dakl dak  da d asd as dl sal dla sld lkas dllasdl asl dl aslkd ',
		},
		{
			key: '2',
			name: 'Perfil 2',
			description: 'dsfs rew rwepopo f lf slk fls dlf lsd fl sdlflkdsmlf lsd f dslk ',
			
		},
		{
			key: '3',
			name: 'Perfil 3',
			description: 'dsljanflksfksd fñsdmñlfmñsdfñlmsdñlmflñsdmlñfmlñsdmñflmsdñlmflñsdmlñfmlsdmlfmdñs',
			
		},
		
	];

	const columns = [
		{
			title: 'Nombre',
			dataIndex: 'name',
			key: 'name',
			search: true,
		},
		{
			title: 'Descripción',
			dataIndex: 'description',
			key: 'description',
			search: true,
		},
		{
			title: 'Acción',
			dataIndex: 'key',
			key: 'key',
			search: false,
			width: '10%',
			render: (key) => {
				return (
					<Row gutter={[8, 0]} justify="center">
						<Col>
							<Link href="#" >
								<Tooltip title="Ver Detalle!" color={'cyan'}>
									<EyeTwoTone twoToneColor="#13c2c2" style={{ fontSize: '16px'}}/>
								</Tooltip>
							</Link>
						</Col>
						<Col>
							<Link href="#" >
								<Tooltip title="Editar!" color={'orange'}>
									<EditTwoTone twoToneColor="#fa8c16" style={{ fontSize: '16px'}}/>
								</Tooltip>
							</Link>
						</Col>
						<Col>
							<Link href="#" >
								<Tooltip title="Eliminar!" color={'red'}>
									<DeleteTwoTone twoToneColor="#ff0000" style={{ fontSize: '16px'}}/>
								</Tooltip>
							</Link>
						</Col>
					</Row>
				)
			}
		},
	];

	return (
		<App routes={routes}>
			<Row gutter={[8, 16]} justify="end">
				<Col>
					<Link href="/profiles/add">
						<a>
							<Button type="primary" size="small">NUEVO PERFIL</Button>
						</a>
					</Link>
				</Col>
			</Row>
			<TableSystem columns={columns} data={data}/>
		</App>
	);

}

export default UserList;