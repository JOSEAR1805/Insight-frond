import { useState, useEffect } from "react";
import { Row, Col, Button, Tooltip } from "antd";
import { useRouter } from "next/router";

import App from "../../src/components/layout/app";
import TableSystem from "../../src/components/table";
import Link from "next/link";
import { DeleteTwoTone, EyeTwoTone, EditTwoTone } from "@ant-design/icons";

import axios from "axios";

const WebList = () => {
  const router = useRouter();
  const [countries, setCountries] = useState([]);

  const navigation = [
    {
      key: "1",
      path: "/webs/",
      breadcrumbName: "Webs",
    },
  ];

  const columns = [
    {
      title: "Pais",
      dataIndex: "country",
      key: "country",
      search: true,
    },
    {
      title: "Nombre de Institución",
      dataIndex: "name",
      key: "name",
      search: true,
    },
    {
      title: "Url Web",
      dataIndex: "url",
      key: "url",
      search: true,
    },
    {
      title: "Acción",
      dataIndex: "key",
      key: "key",
      search: false,
      width: "10%",
      render: (key, record) => {
        return (
          <Row gutter={[8, 0]} justify="center">
						<Col>
              <Link href="/webs/[edit]" as={`/webs/${record.id}`}>
								<a>
									<Tooltip title="Ver Detalle!" color={'cyan'}>
										<EyeTwoTone twoToneColor="#13c2c2" style={{ fontSize: '16px'}}/>
									</Tooltip>
								</a>
              </Link>
            </Col>
            <Col>
							<Tooltip title="Eliminar!" color={"red"}>
								<DeleteTwoTone
									onClick={() => deleteWebs(record.id)}
									twoToneColor="#ff0000"
									style={{ fontSize: "16px" }}
								/>
							</Tooltip>
            </Col>
					</Row>
        );
      },
    },
  ];

  const [data, setData] = useState([]);

  const getCountries = async () => {
    const payload = await axios
      .get("https://api-insight.tk/countries/")
      .catch((err) => console.log(err));

    if (payload && payload.data) {
      setCountries(payload.data);
      getWebs();
    }
  };

  const getWebs = async () => {
    const payload = await axios
      .get("https://api-insight.tk/webs")
      .catch((err) => console.log(err));

    if (payload && payload.data) {
      payload.data.map((item) => {
        countries.map((country) => {
          if (country.id === item.country) {
            item.country = String(country.name);
          }
        });
      });
      setData(payload.data);
    }
  };

  const deleteWebs = async (id) => {
    const payload = await axios
      .delete(`https://api-insight.tk/webs/${id}/`)
      .catch((err) => console.log(err));

    router.reload();
  };

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <App navigation={navigation}>
      <Row gutter={[8, 16]} justify="end">
        <Col>
          <Link href="/webs/add">
            <a>
              <Button type="primary" size="small">
                NUEVA WEB
              </Button>
            </a>
          </Link>
        </Col>
      </Row>

      <TableSystem columns={columns} data={data} />
    </App>
  );
};

export default WebList;
