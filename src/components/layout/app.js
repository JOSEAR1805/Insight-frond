import { Layout } from 'antd';

import HeaderApp from "./header";
import SiderbarApp from "./sidebar";
import ContentApp from "./content";
import FooterApp from "./footer";

const SiderDemo = (props) => (
	<Layout style={{ minHeight: '100vh' }}>
		<HeaderApp/>
		<Layout>
			<SiderbarApp/>
			<ContentApp>
				{props.children}
			</ContentApp>
		</Layout>
		<FooterApp/>
	</Layout>
);

export default SiderDemo;