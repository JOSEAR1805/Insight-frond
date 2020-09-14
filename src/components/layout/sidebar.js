import { Layout, Menu, Avatar } from "antd";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  HomeOutlined,
  TeamOutlined,
  LinkOutlined,
  AreaChartOutlined,
  GlobalOutlined,
  ProfileOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;
const { SubMenu } = Menu;

const sidebarApp = () => {
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
      <div className="logo" />
      <Menu theme="dark" defaultSelectedKeys={["0"]} mode="inline">
        <Menu.Item key="0" icon={<HomeOutlined />}>
          <Link href="/" title="Inicio">
            <a>Inicio</a>
          </Link>
        </Menu.Item>

        {!user?.is_staff && (
          <Menu.Item key="1" icon={<AreaChartOutlined />}>
            <Link href="/tenders/" title="Licitaciones">
              <a>Licitaciones</a>
            </Link>
          </Menu.Item>
        )}

        {user?.is_staff && (
          <Menu.Item key="1" icon={<AreaChartOutlined />}>
            <Link href="/tenders/" title="Licitaciones">
              <a>Licitaciones</a>
            </Link>
          </Menu.Item>
        )}

        {user?.is_staff && (
          <Menu.Item key="2" icon={<LinkOutlined />}>
            <Link href="/webs/" title="Webs">
              <a>Webs</a>
            </Link>
          </Menu.Item>
        )}

        {user?.is_staff && (
          <Menu.Item key="3" icon={<GlobalOutlined />}>
            <Link href="/countries">
              <a>Paises</a>
            </Link>
          </Menu.Item>
        )}

        {user?.is_staff && (
          <Menu.Item key="4" icon={<ProfileOutlined />}>
            <Link href="/profiles/" title="Perfiles">
              <a>Perfiles</a>
            </Link>
          </Menu.Item>
        )}

        {user?.is_staff && (
          <Menu.Item key="5" icon={<TeamOutlined />}>
            <Link href="/users/">
              <a>Usuarios</a>
            </Link>
          </Menu.Item>
        )}
      </Menu>
    </Sider>
  );
};

export default sidebarApp;
