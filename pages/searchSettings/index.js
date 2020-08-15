import { Row, Col, Button } from 'antd';
import App from "../../src/components/layout/app";
import TableSystem from '../../src/components/table';

const SearchSettingsList = () => {

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
		},
		{
			title: 'Nombre de Pagina',
			dataIndex: 'pageName',
			key: 'pageName',
		},
	];

	return (
		<App>
			<Row gutter={[8, 16]}>
				<Col span={12} >
					<h1 style={{margin: '0px'}}>URLs DE BUSQUEDAD</h1>
				</Col>
				<Col span={12} >
					<Row justify="end">
						<Col>
							<Button type="primary" size="small" shape="round">NUEVA URL</Button>
						</Col>
					</Row>
				</Col>
			</Row>
			<TableSystem columns={columns} data={data}/>
		</App>
	);

}

export default SearchSettingsList;