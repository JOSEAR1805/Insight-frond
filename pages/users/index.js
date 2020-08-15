import { Row, Col, Button } from 'antd';
import App from "../../src/components/layout/app";
import TableSystem from '../../src/components/table';

const UserList = () => {

	const data = [
		{
			key: '1',
			name: 'Alejandro',
			last_name: 'Sanchez',
			phone: '+56 53453453',
			email: 'alejandrosanchez@test.com',
			address: 'Chile',
		},
		{
			key: '2',
			name: 'Elver',
			last_name: 'Valderrama',
			phone: '+56 942342342',
			email: 'elvervalderrama@test.com',
			address: 'Chile',
		},
		{
			key: '3',
			name: 'José',
			last_name: 'Artigas',
			phone: '+58 534534534',
			email: 'joseartigas@test.com',
			address: 'Venezuela',
		},
	];

	const columns = [
		{
			title: 'Nombre',
			dataIndex: 'name',
			key: 'name',
			search: true,
			// ...getColumnSearchProps('name'),
		},
		{
			title: 'Apellido',
			dataIndex: 'last_name',
			key: 'last_name',
			search: true,
		},
		{
			title: 'Teléfono',
			dataIndex: 'phone',
			key: 'phone',
			search: true,
		},
		{
			title: 'Correo E.',
			dataIndex: 'email',
			key: 'email',
			search: true,
		},
		{
			title: 'Dirección',
			dataIndex: 'address',
			key: 'address',
			search: true,
		},
		{
			title: 'Action',
			dataIndex: 'key',
			key: 'key',
			search: false,
			render: (key) => {
				// console.log('dasdas', key)

				return (
					<>
						<a>VER</a>
						<a>DELETE</a>
					</>
			)}
				
		},
	];

	return (
		<App>
			<Row gutter={[16, 16]}>
				<Col span={12} >
					<h1 style={{margin: '0px'}}>USUARIOS</h1>
				</Col>
				<Col span={12} >
					<Row justify="end">
						<Col>
							<Button type="primary" size="small" shape="round">NUEVO USUARIO</Button>
						</Col>
					</Row>
				</Col>
			</Row>
			<TableSystem columns={columns} data={data}/>
		</App>
	);

}

export default UserList;