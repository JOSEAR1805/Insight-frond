import { Layout } from 'antd';

const { Content } = Layout;

import ContentHeader from "./contentHeader";

const ContentApp = (props) => {
	
	const {
		children,
		navigation,
	} = props;


	return (
		<Content>
			<ContentHeader navigation={ navigation }/>
			<div className="div-content" >
				{ children }
			</div>
		</Content>
	);
}

export default ContentApp;