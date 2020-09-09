import { Row, Col, Button, Tooltip } from 'antd';
import App from "../../src/components/layout/app";
import { useState, useEffect } from "react";

import TableSystem from '../../src/components/table';
import Link from "next/link";
import {
	DeleteTwoTone,
	EyeTwoTone,
	EditTwoTone
	} from '@ant-design/icons';

import axios from "axios";


const TenderList = () => {
  const [tenders, setTenders] = useState([]);

	const getUsers = async () => {
    const payload = await axios
      .get("https://api-insight.tk/tenders")
      .catch((err) => console.log(err));

    if (payload && payload.data) {
			console.log(payload.data)
      setTenders(payload.data);
		}
  };

	const columns = [
		{
			title: 'Pais',
			dataIndex: 'country',
			key: 'country',
			search: true,
		},
		{
			title: 'Fecha de Plazo',
			dataIndex: 'dates',
			key: 'dates',
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
			dataIndex: 'place_of_execution',
			key: 'place_of_execution',
			search: true,
		},
		// {
		// 	title: 'Fin de Plazo',
		// 	dataIndex: 'closingDate',
		// 	key: 'closingDate',
		// 	search: true,
		// 	width: '10%'
		// },
		{
			title: 'Entidad Adjudicadora',
			dataIndex: 'awarning_authority',
			key: 'awarning_authority',
			search: true,
			width: '20%'
		},
		// {
		// 	title: 'Acción',
		// 	dataIndex: 'key',
		// 	key: 'key',
		// 	search: false,
		// 	width: '10%',
		// 	render: (key) => {
		// 		return (
		// 			<Row gutter={[8, 0]} justify="center">
		// 				<Col>
		// 					<Link href="#" >
		// 						<Tooltip title="Ver Detalle!" color={'cyan'}>
		// 							<EyeTwoTone twoToneColor="#13c2c2" style={{ fontSize: '16px'}}/>
		// 						</Tooltip>
		// 					</Link>
		// 				</Col>
		// 				<Col>
		// 					<Link href="#" >
		// 						<Tooltip title="Editar!" color={'orange'}>
		// 							<EditTwoTone twoToneColor="#fa8c16" style={{ fontSize: '16px'}}/>
		// 						</Tooltip>
		// 					</Link>
		// 				</Col>
		// 				<Col>
		// 					<Link href="#" >
		// 						<Tooltip title="Eliminar!" color={'red'}>
		// 							<DeleteTwoTone twoToneColor="#ff0000" style={{ fontSize: '16px'}}/>
		// 						</Tooltip>
		// 					</Link>
		// 				</Col>
		// 			</Row>
		// 		)
		// 	}
		// },
	];

	useEffect(() => {
    getUsers();
  }, []);

	return (
		<App>
			{/* <Row gutter={[8, 16]}>
				<Col justify="end">
					<Link href="/users/add">
						<Button type="primary" size="small">NUEVO USUARIO</Button>
					</Link>
				</Col>
			</Row> */}
			<TableSystem columns={columns} data={tenders}/>
		</App>
	);

}

export default TenderList;