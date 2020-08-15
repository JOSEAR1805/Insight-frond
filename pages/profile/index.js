import { Row, Col } from 'antd';
import App from "../../src/components/layout/app";
import TableSystem from '../../src/components/table';

const UserList = () => {

	const data = [
		{
			key: '1',
			name: 'Perfil 1',
			alert: 'Si',
			key: 'Opciones'
			
		},
		{
			key: '2',
			name: 'Perfil 2',
			alert: 'NO',
			key: 'Opciones'
			
		},
		{
			key: '3',
			name: 'Perfil 3',
			alert: 'Si',
			key: 'Opciones'
			
		},
		
	];

	const columns = [
		{
			title: 'Nombre',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Alerta por Correo',
			dataIndex: 'alert',
			key: 'alert',
		},
		{
			title: 'Opciones',
			dataIndex: 'options',
			key: 'options',
		},
	];

	return (
		<App>
			<Row gutter={[16, 16]}>
					<Col span={12} >
					<h1 style={{margin: '0px'}} >Listado de Usuario</h1>
				</Col>
					<Col span={12} />
			</Row>
			<TableSystem columns={columns} data={data}/>
		</App>
	);

}

export default UserList;