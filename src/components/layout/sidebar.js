import { Layout, Menu, Avatar } from 'antd';
import Link from "next/link";
import {
	HomeOutlined,
	TeamOutlined,
	LinkOutlined,
	AreaChartOutlined,
	GlobalOutlined
} from '@ant-design/icons';

const { Sider } = Layout;
const { SubMenu } = Menu;

const sidebarApp = () => {
	return (
		<Sider
			breakpoint="sm"
			collapsedWidth="0"
			onBreakpoint={broken => {
				// console.log(broken);
			}}
			onCollapse={(collapsed, type) => {
				// console.log(collapsed, type);
			}}
		>
			<div className="logo" />
			<Menu theme="dark" defaultSelectedKeys={['0']} mode="inline">
				<Menu.Item key="0" icon={<HomeOutlined />}>
					<Link href="/" title="Inicio">
						<a>Inicio</a>
					</Link>
				</Menu.Item>
				<Menu.Item key="1" icon={<AreaChartOutlined />}>
					<Link href="/tenders/" title="Licitaciones">
						<a>Licitaciones</a>
					</Link>
				</Menu.Item>
				<SubMenu key="sub2" icon={<LinkOutlined />} title="Gestión de Búsqueda">
					<Menu.Item key="21">
						<Link href="/categories">
							<a>Categorias</a>
						</Link>
					</Menu.Item>
					<Menu.Item key="22">
						<Link href="/searchSettings/">
							<a>Configuraciones de Busquedad</a>
						</Link>
					</Menu.Item>
				</SubMenu>
				<Menu.Item key="3" icon={<GlobalOutlined />}>
					<Link href="/countries">
						<a>Gestión de Paises</a>
					</Link>
				</Menu.Item>
				<Menu.Item key="4" icon={<TeamOutlined />}>
					<Link href="/users/">
						<a>Gestión de Usuarios</a>
					</Link>
				</Menu.Item>
			</Menu>
		</Sider>
	);
}

export default sidebarApp;