import { useState, useEffect } from "react";
import { Row, Col, Button, Tooltip } from "antd";
import { useRouter } from "next/router";

import App from "../../src/components/layout/app";
import TableSystem from "../../src/components/table";
import Link from "next/link";
import { DeleteTwoTone, EyeTwoTone, EditTwoTone } from "@ant-design/icons";

import axios from "axios";

const CountryList = () => {
  const router = useRouter();

  const routes = [
    {
      key: "1",
      path: "/countries/",
      breadcrumbName: "Paises",
    },
  ];

  const columns = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      search: true,
    },
    {
      title: "Acción",
      dataIndex: "key",
      key: "key",
      search: false,
      width: "10%",
      render: (text, record) => {
        console.log(record);
        return (
          <Row gutter={[8, 0]} justify="center">
            <Col>
              <Link href="#">
                <Tooltip>
                  <Link
                    href="/countries/[edit]"
                    as={`/countries/${record.id}`}
                    title="Editar!"
                    color={"orange"}
                  >
                    <a>
                      <EditTwoTone
                        twoToneColor="#fa8c16"
                        style={{ fontSize: "16px" }}
                      />
                    </a>
                  </Link>
                </Tooltip>
              </Link>
            </Col>
            <Col>
              <Link href="#">
                <Tooltip title="Eliminar!" color={"red"}>
                  <DeleteTwoTone
                    onClick={() => deleteCountry(record.id)}
                    twoToneColor="#ff0000"
                    style={{ fontSize: "16px" }}
                  />
                </Tooltip>
              </Link>
            </Col>
          </Row>
        );
      },
    },
  ];

  const [data, setData] = useState([]);

  const getCountry = async () => {
    // At request level

    const payload = await axios
      .get("http://127.0.0.1:8000/countries/")
      .catch((err) => console.log(err));

    if (payload && payload.data) {
      setData(payload.data);
    }
  };

  const deleteCountry = async (id) => {
    const payload = await axios
      .delete(`http://127.0.0.1:8000/countries/${id}/`)
      .catch((err) => console.log(err));

    router.reload();
  };

  useEffect(() => {
    getCountry();
  }, []);

  return (
    <App routes={routes}>
      <Row gutter={[8, 16]} justify="end">
        <Col>
          <Link href="/countries/add">
            <Button type="primary" size="small">
              AGREGAR PAIS
            </Button>
          </Link>
        </Col>
      </Row>

      <TableSystem columns={columns} data={data} />
    </App>
  );
};

export default CountryList;
