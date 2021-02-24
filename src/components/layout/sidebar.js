import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Layout, Menu, Avatar } from "antd";
import {
  HomeOutlined,
  TeamOutlined,
  LinkOutlined,
  AreaChartOutlined,
  ProfileOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const sidebarApp = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (process.browser) {
      const user = JSON.parse(localStorage.getItem("user"));
      setUser(user);
    }
  }, []);

  return (
    <Sider
      breakpoint="sm"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        // console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        // console.log(collapsed, type);
      }}
    >
      <img className="logo" src="/image/logo_2.png" alt="my image" />
      <Menu theme="dark" defaultSelectedKeys={[router.pathname]} mode="inline">
        <Menu.Item key="/" icon={<HomeOutlined />}>
          <Link href="/">
            <a>Inicio</a>
          </Link>
        </Menu.Item>

        {(user?.is_staff || user?.privilege_tenders) && (
          <Menu.Item key="/tenders" icon={<AreaChartOutlined />}>
            <Link href="/tenders">
              <a>Licitaciones</a>
            </Link>
          </Menu.Item>
        )}

        {(user?.is_staff || user?.privilege_webs) && (
          <Menu.Item key="/webs" icon={<LinkOutlined />}>
            <Link href="/webs">
              <a>Webs</a>
            </Link>
          </Menu.Item>
        )}

        {/* {user?.is_staff || user?.is_staff && (
          <Menu.Item key="3" icon={<GlobalOutlined />}>
            <Link href="/countries">
              <a>Paises</a>
            </Link>
          </Menu.Item>
        )} */}

        {(user?.is_staff || user?.privilege_profiles) && (
          <Menu.Item key="/profiles" icon={<ProfileOutlined />}>
            <Link href="/profiles">
              <a>Perfiles</a>
            </Link>
          </Menu.Item>
        )}

        {(user?.is_staff || user?.privilege_users) && (
          <Menu.Item key="/users" icon={<TeamOutlined />}>
            <Link href="/users">
              <a>Usuarios</a>
            </Link>
          </Menu.Item>
        )}
      </Menu>
    </Sider>
  );
};

export default sidebarApp;
