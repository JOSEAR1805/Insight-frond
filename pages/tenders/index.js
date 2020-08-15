import { Row, Col } from 'antd';
import App from "../../src/components/layout/app";
import TableSystem from '../../src/components/table';

const TenderList = () => {

	const data = [
		{
			key: '1',
			country: 'Venezuela',
			date: '32/32/4324',
			description: 'Contratación de consultor para impartir 2 eventos de capacitacion en alianza y enfoque de mercado por 2 meses ',
			code: '53453453',
			placeOfExecution: 'sdfsdfsdfs',
			closingDate: '27/09/20202',
			awardingEntity: 'GRACCS - Gobierno Regional Autónomo de la Costa Caribe Sur.'
		},
		{
			key: '2',
			country: 'Venezuela',
			date: '32/32/4324',
			description: 'Contratación de consultor para impartir 2 eventos de capacitacion en alianza y enfoque de mercado por 2 meses ',
			code: '53453453',
			placeOfExecution: 'sdfsdfsdfs',
			closingDate: '27/09/20202',
			awardingEntity: 'GRACCS - Gobierno Regional Autónomo de la Costa Caribe Sur.'
		},
		{
			key: '3',
			country: 'Venezuela',
			date: '32/32/4324',
			description: 'Contratación de consultor para impartir 2 eventos de capacitacion en alianza y enfoque de mercado por 2 meses ',
			code: '53453453',
			placeOfExecution: 'sdfsdfsdfs',
			closingDate: '27/09/20202',
			awardingEntity: 'GRACCS - Gobierno Regional Autónomo de la Costa Caribe Sur.'
		},
	];

	const columns = [
		{
			title: 'Pais',
			dataIndex: 'country',
			key: 'country',
		},
		{
			title: 'Fecha',
			dataIndex: 'date',
			key: 'date',
		},
		{
			title: 'Link',
			dataIndex: 'description',
			key: 'description',
		},
		{
			title: 'Codigo',
			dataIndex: 'code',
			key: 'code',
		},
		{
			title: 'Lugar de Ejecución',
			dataIndex: 'placeOfExecution',
			key: 'placeOfExecution',
		},
		{
			title: 'Fin de Plazo',
			dataIndex: 'closingDate',
			key: 'closingDate',
		},
		{
			title: 'Entidad Adjudicadora',
			dataIndex: 'awardingEntity',
			key: 'awardingEntity',
		},
	];

	return (
		<App>
			<Row gutter={[16, 16]}>
					<Col span={12} >
					<h1 style={{margin: '0px'}} >Listado de Licitaciones</h1>
				</Col>
					<Col span={12} />
			</Row>
			<TableSystem columns={columns} data={data}/>
		</App>
	);

}

export default TenderList;