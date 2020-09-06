import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import Link from "next/link";

const ContentHeaderApp = (props) => {
	const {
		navigation
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
				{navigation.map((item) => {
					return (
						<Breadcrumb.Item>
							<Link href={ item.path }>
								<a>
									{ item.breadcrumbName }
								</a>
							</Link>
						</Breadcrumb.Item>
					);
				})}
		</Breadcrumb>
	);
}

export default ContentHeaderApp;