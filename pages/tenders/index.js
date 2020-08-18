import { Row, Col, Button, Tooltip } from 'antd';
import App from "../../src/components/layout/app";
import TableSystem from '../../src/components/table';
import Link from "next/link";
import {
	DeleteTwoTone,
	EyeTwoTone,
	EditTwoTone
	} from '@ant-design/icons';

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
			search: true,
		},
		{
			title: 'Fecha',
			dataIndex: 'date',
			key: 'date',
			search: true,
		},
		{
			title: 'Descripción',
			dataIndex: 'description',
			key: 'description',
			search: true,
			width: '20%',
		},
		{
			title: 'Codigo',
			dataIndex: 'code',
			key: 'code',
			search: true,
		},
		{
			title: 'Lugar de Ejecución',
			dataIndex: 'placeOfExecution',
			key: 'placeOfExecution',
			search: true,
		},
		{
			title: 'Fin de Plazo',
			dataIndex: 'closingDate',
			key: 'closingDate',
			search: true,
			width: '10%'
		},
		{
			title: 'Entidad Adjudicadora',
			dataIndex: 'awardingEntity',
			key: 'awardingEntity',
			search: true,
			width: '20%'
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
		<App>
			{/* <Row gutter={[8, 16]}>
				<Col justify="end">
					<Link href="/users/add">
						<Button type="primary" size="small">NUEVO USUARIO</Button>
					</Link>
				</Col>
			</Row> */}
			<TableSystem columns={columns} data={data}/>
		</App>
	);

}

export default TenderList;