import { Layout, PageHeader } from 'antd';
const { Content } = Layout;

const ContentApp = (props) => {
	const routes = [
		{
			path: 'index',
			breadcrumbName: 'Usuarios',
		},
		{
			path: 'first',
			breadcrumbName: 'Lista de Usuarios',
		},
	];

	return (
		<>
			<Content>
				<PageHeader breadcrumb={{ routes }} />
				<div className="div-content" >
					{props.children}
				</div>
			</Content>
		</>
	);
}

export default ContentApp;