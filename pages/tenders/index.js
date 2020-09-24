import { Row, Col, Button, Tooltip } from "antd";
import App from "../../src/components/layout/app";
import { useState, useEffect } from "react";

import TableSystem from "../../src/components/table";
import Link from "next/link";
import { DeleteTwoTone, EyeTwoTone, EditTwoTone } from "@ant-design/icons";

import axios from "axios";

const TenderList = () => {
  const [tenders, setTenders] = useState([]);

  const getUsers = async () => {
    let userLocal = JSON.parse(localStorage.getItem("user"));

    const payload = await axios
      .get("https://api-insight.tk/users/tender-users/", {
        headers: {
          Authorization: `Token ${userLocal.token}`,
        },
      })
      .catch((err) => console.log(err));

    console.log(payload, "**");

    if (payload && payload.data?.tenders) {
      setTenders(payload.data?.tenders);
    }
  };

  const columns = [
    {
      title: "Pais",
      dataIndex: "country",
      key: "country",
      search: true,
    },
    {
      title: "F. publicación",
      dataIndex: "publication_date",
      key: "publication_date",
      search: false,
    },
    {
      title: "F. recepción",
      dataIndex: "closing_date",
      key: "closing_date",
      search: false,
    },
    {
      title: "Descripción",
      dataIndex: "description",
      key: "description",
      search: true,
      width: "20%",
    },
    {
      title: "Codigo",
      dataIndex: "code",
      key: "code",
      search: true,
    },
    {
      title: "Link",
      dataIndex: "link",
      key: "link",
      search: false,
      render: (text, record) => {
        return (
          <a href={text} target="_blank">
            Ver licitación
          </a>
        );
      },
    },
    {
      title: "Lugar de Ejecución",
      dataIndex: "place_of_execution",
      key: "place_of_execution",
      search: true,
    },
    {
      title: "Entidad Adjudicadora",
      dataIndex: "awarning_authority",
      key: "awarning_authority",
      search: true,
      width: "20%",
    },
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
      <TableSystem columns={columns} data={tenders} />
    </App>
  );
};

export default TenderList;
