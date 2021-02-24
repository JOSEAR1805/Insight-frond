import { useState, useEffect } from "react";
import axios from "axios";

import { Statistic, Row, Col, Spin } from 'antd';

import App from "../src/components/layout/app";

const Home = () => {
	const [loading, setLoading] = useState(false);
  const [webs, setWebs] = useState(0);
  const [profiles, setProfiles] = useState(0);
  const [tenders, setTenders] = useState(0);
	const [users, setUsers] = useState(0);
	
	const getWebs = async () => {
		setLoading(true);
    await axios
      .get("https://insightcron.com/webs")
      .then( response => {
				setWebs(response.data.length)
      })
			.catch((err) => { console.log(err) });
			setLoading(false);
	};

	const getProfiles = async () => {
		setLoading(true);
    await axios
      .get("https://insightcron.com/profiles")
      .then( response => {
				setProfiles(response.data.length)
      })
			.catch((err) => { console.log(err) });
			setLoading(false);
	};

	const getTenders = async () => {
		setLoading(true);
    await axios
      .get("https://insightcron.com/tenders")
      .then( response => {
				setTenders(response.data.length)
      })
			.catch((err) => { console.log(err) });
			setLoading(false);
	};

	const getUsers = async () => {
		setLoading(true);
    await axios
      .get("https://insightcron.com/users")
      .then( response => {
				setUsers(response.data.length)
      })
			.catch((err) => { console.log(err) });
			setLoading(false);
	};
		
	useEffect(() => {
		getWebs();
		getProfiles();
		getTenders();
		getUsers();
  }, []);

	return (
		<App>
      <Spin tip="Cargando..." spinning={loading}>
				<Row gutter={[16, 16]}>
					<Col span={12} className={'card-home'}>
						<Statistic title="Total de Webs" value={webs}/>
					</Col>
					<Col span={12} className={'card-home'}>
						<Statistic title="Total de Prerfiles" value={profiles}/>
					</Col>
					<Col span={12} className={'card-home'}>
						<Statistic title="Total de Liquidaciones" value={tenders}/>
					</Col>
					<Col span={12} className={'card-home'}>
						<Statistic title="Total de Usuarios" value={users}/>
					</Col>
				</Row>
			</Spin>
		</App>
	);
}

export default Home;
