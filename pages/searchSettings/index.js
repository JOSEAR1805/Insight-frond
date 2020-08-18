import { Row, Col, Button, Tooltip } from 'antd';
import App from "../../src/components/layout/app";
import TableSystem from '../../src/components/table';
import Link from "next/link";
import {
	DeleteTwoTone,
	EyeTwoTone,
	EditTwoTone
	} from '@ant-design/icons';


const SearchSettingsList = () => {
	const routes = [
		{
			key: '1',
			path: '/searchSettings/',
			breadcrumbName: 'Urls de Búsquedad',
		}
	];

	const data = [
		{
			key: '1',
			country: 'Venezuela',
			pageName: 'Nomdnan dsajhksf j fsd fjs',
		},
		{
			key: '2',
			country: 'Venezuela',
			pageName: 'Nomdnan dsajhksf j fsd fjs',
		},
		{
			key: '3',
			country: 'Venezuela',
			pageName: 'Nomdnan dsajhksf j fsd fjs',
		},
	];

	const columns = [
		{
			title: 'Pais',
			dataIndex: 'country',
			key: 'country',
			search: true,
		},
		{
			title: 'Nombre de Pagina',
			dataIndex: 'pageName',
			key: 'pageName',
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
					<Link href="/searchSettings/add">
						<a>
							<Button type="primary" size="small">NUEVA URL</Button>
						</a>
					</Link>
				</Col>
			</Row>
			<TableSystem columns={columns} data={data}/>
		</App>
	);

}

export default SearchSettingsList;