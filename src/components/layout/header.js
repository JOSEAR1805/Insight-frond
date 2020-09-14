import { Layout, Row, Col, Avatar, Tooltip } from "antd";
import { UserOutlined, BellOutlined, LoginOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const { Header } = Layout;

const HeaderApp = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (process.browser) {
      const user = JSON.parse(localStorage.getItem("user"));
      setUser(user);
    }
  }, []);

  return (
    <Header>
      <Row justify="end" gutter={[16, 0]}>
        <Col>
          <Tooltip title="Notificaciones!" color={"gold"}>
            <BellOutlined
              twoToneColor="#ff0000"
              style={{ fontSize: "18px", paddingTop: "12px" }}
            />
          </Tooltip>
        </Col>
        <Col>
          <Tooltip title="Cerrar sesión" color={"gold"}>
            <LoginOutlined
              twoToneColor="#ff0000"
              onClick={() => {
                if (process.browser) {
                  localStorage.removeItem("user");
                  router.push("/login");
                }
              }}
              style={{ fontSize: "18px", paddingTop: "12px" }}
            />
          </Tooltip>
        </Col>
        <Col>{`${user?.first_name} ${user?.last_name}`}</Col>
      </Row>
    </Header>
  );
};

export default HeaderApp;
