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
  const [categories, setcategories] = useState([]);
  const [searchSettings, setSearchSettings] = useState([]);

  const routes = [
    {
      key: "1",
      path: "/searchSettings/",
      breadcrumbName: "Configuración de Búsqueda",
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
      title: "Categoría",
      dataIndex: "category",
      key: "category",
      search: true,
    },
    {
      title: "Titulo",
      dataIndex: "name",
      key: "name",
      search: true,
    },
    {
      title: "Descripción",
      dataIndex: "description",
      key: "description",
      search: true,
    },
    {
      title: "Url web",
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
    const payload = await axios
      .get("https://api-insight.tk/countries/")
      .catch((err) => console.log(err));
  };

  const getCategory = async () => {
    const payload = await axios
      .get("https://api-insight.tk/categories")
      .catch((err) => console.log(err));
  };

  const getSearchSettings = async () => {
    // At request level
    let payload = await axios
      .get("https://api-insight.tk/search_settings/")
      .catch((err) => console.log(err));

    if (payload && payload.data) {
      setSearchSettings(payload.data);
    }
  };

  const deleteCategory = async (id) => {
    const payload = await axios
      .delete(`https://api-insight.tk/categories/${id}/`)
      .catch((err) => console.log(err));

    router.reload();
  };

  useEffect(() => {
    getCountry();
    getCategory();
    getSearchSettings();
  }, []);

  return (
    <App routes={routes}>
      <Row gutter={[8, 16]} justify="end">
        <Col>
          <Link href="/searchSettings/add">
            <Button type="primary" size="small">
              NUEVA CONFIGURACIÓN
            </Button>
          </Link>
        </Col>
      </Row>

      <TableSystem columns={columns} data={searchSettings} />
    </App>
  );
};

export default CategoryList;
