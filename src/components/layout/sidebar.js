import { useState } from 'react';
import { Layout, Menu  } from 'antd';
import { HomeOutlined, DesktopOutlined, TeamOutlined } from '@ant-design/icons';
import Link from "next/link";

const { Sider } = Layout;
const { SubMenu } = Menu;

const sidebarApp = () => {
	const [ collapsed, setCollapsed ] = useState();

	return (
		<Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)} >
			<Menu theme="dark" defaultSelectedKeys={['0']} mode="inline">
				<Menu.Item key="0" icon={<HomeOutlined />}>
					<Link href="/">
						<a>Inicio</a>
					</Link>
				</Menu.Item>
				<SubMenu key="sub1" icon={<DesktopOutlined />} title="Licitaciones">
					<Menu.Item key="11">
						<Link href="/tenders/">
							<a>Gestión de Licitaciones</a>
						</Link>
					</Menu.Item>
					<Menu.Item key="12">
						<Link href="/searchSettings/">
							<a>Configurar Busquedad</a>
						</Link>
					</Menu.Item>
				</SubMenu>
				<SubMenu key="sub2" icon={<TeamOutlined />} title="Usuarios">
					<Menu.Item key="21">
						<Link href="/users/">
              				<a >Gestión de Usuarios</a>
            			</Link>
					</Menu.Item>
					<Menu.Item key="22">
						<Link href="/profile/">
              				<a>Gestión de Perfil</a>
            			</Link>
					</Menu.Item>
				</SubMenu>
			</Menu>
		</Sider>
	);
}

export default sidebarApp;