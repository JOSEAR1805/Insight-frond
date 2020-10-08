import { useState, useEffect } from "react";
import { Row, Col, Button, Tooltip } from "antd";
import { useRouter } from "next/router";

import App from "../../src/components/layout/app";
import TableSystem from "../../src/components/table";
import Link from "next/link";
import { DeleteTwoTone, EyeTwoTone, EditTwoTone } from "@ant-design/icons";

import axios from "axios";

const CategoryList = () => {
  const router = useRouter();
  const [countries, setCountries] = useState([]);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState([]);
  const routes = [
    {
      key: "1",
      path: "/categories/",
      breadcrumbName: "Categorias",
    },
  ];
  const columns = [
    {
      title: "Nombre de Categoría",
      dataIndex: "name",
      key: "name",
      search: true,
    },
    {
      title: "Pais",
      dataIndex: "country",
      key: "country",
      search: true,
    },
    {
      title: "Acción",
      dataIndex: "key",
      key: "key",
      search: false,
      width: "10%",
      render: (text, record) => {
        return (
          <Row gutter={[8, 0]} justify="center">
            <Col>
              <Link href="#">
                <Tooltip title="Editar" color={"orange"}>
                  <Link
                    href="/categories/[edit]"
                    as={`/categories/${record.id}`}
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
                    onClick={() => deleteCategory(record.id)}
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

  const getCountry = async () => {
    // At request level
    const payload = await axios
      .get("https://insightcron.com/countries/")
      .catch((err) => console.log(err));

    // console.log(payload.data);

    if (payload && payload.data) {
      setCountries(payload.data);
      getCategory(payload.data);
    }
  };

  const getCategory = async (aux) => {
    let payload = await axios
      .get("https://insightcron.com/categories")
      .catch((err) => console.log(err));

    if (payload && payload.data) {
      console.log(aux, "------");
      payload.data.map((resp) => {
        aux.map((resp1) => {
          console.log(resp, resp1);

          if (resp1.id === resp.country) {
            resp.country = String(resp1.name);
          }
        });
      });
      setData(payload.data);
    }
  };

  const deleteCategory = async (id) => {
    const payload = await axios
      .delete(`https://insightcron.com/categories/${id}/`)
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
          <Link href="/categories/add">
            <Button type="primary" size="small">
              NUEVA CATEGORÍA
            </Button>
          </Link>
        </Col>
      </Row>

      <TableSystem columns={columns} data={data} />
    </App>
  );
};

export default CategoryList;
