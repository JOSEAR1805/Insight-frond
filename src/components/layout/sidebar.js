import { Layout, Menu, Avatar  } from 'antd';
import Link from "next/link";
import { 
	HomeOutlined, 
	DesktopOutlined, 
	TeamOutlined } from '@ant-design/icons';

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
				<Menu.Item key="3" icon={<DesktopOutlined />}>
					<Link href="/countries">
						<a>Paises</a>
					</Link>
				</Menu.Item>
				<Menu.Item key="4" icon={<HomeOutlined />}>
					<Link href="/categories">
						<a>Categorias</a>
					</Link>
				</Menu.Item>
				<SubMenu key="sub2" icon={<TeamOutlined />} title="Usuarios">
					<Menu.Item key="21">
						<Link href="/users/">
              <a>Gestión de Usuarios</a>
						</Link>
					</Menu.Item>
					<Menu.Item key="22">
						<Link href="/profiles/">
              <a>Gestión de Perfil</a>
            </Link>
					</Menu.Item>
				</SubMenu>
			</Menu>
    </Sider>
	);
}

export default sidebarApp;