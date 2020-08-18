import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import Link from "next/link";

const ContentHeaderApp = (props) => {
	const {
		routes
	} = props

	return (
		<Breadcrumb>
			<Breadcrumb.Item>
				<Link href="/tenders">
					<a>
						<HomeOutlined />
					</a>
				</Link>
			</Breadcrumb.Item>
				{routes.map((route) => {
					return (
						<Breadcrumb.Item>
							<Link href={ route.path }>
								<a>
									{ route.breadcrumbName }
								</a>
							</Link>
						</Breadcrumb.Item>
					);
				})}
		</Breadcrumb>
	);
}

export default ContentHeaderApp;