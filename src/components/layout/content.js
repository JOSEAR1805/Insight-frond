import { Layout, PageHeader } from 'antd';

import { Breadcrumb } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';

const { Content } = Layout;

import ContentHeader from "./contentHeader";

const ContentApp = (props) => {
	
	const {
		children,
		routes,
	} = props;


	return (
		<Content>
			<ContentHeader routes={ routes }/>
			<div className="div-content" >
				{ children }
			</div>
		</Content>
	);
}

export default ContentApp;