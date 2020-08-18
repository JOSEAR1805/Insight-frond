import { Layout } from 'antd';

import HeaderApp from "./header";
import SiderbarApp from "./sidebar";
import ContentApp from "./content";
import FooterApp from "./footer";

const SiderDemo = (props) => {
	const {
		children,
		routes,
	} = props;

	return (
		<Layout>
			<SiderbarApp/>
			<Layout style={{ minHeight: '100vh' }}>
				<HeaderApp/>
				<Layout >
					<ContentApp routes={routes && routes.length >= 1? routes: []}>
						{ children }
					</ContentApp>

				</Layout>
				<FooterApp/>
			</Layout>
		</Layout>
	);
}

export default SiderDemo;