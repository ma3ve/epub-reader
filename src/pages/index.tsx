import Header from "../components/Header";
import axios from 'axios'
import UploadBook from "../components/UploadBook";
import { Layout } from 'antd'

function IndexPage() {

	return <>
		<Header />
		<Layout.Content style={{ padding: '10px 50px' }}>
			<div className="flex">
				<div className="flex justify-end w-full">
					<UploadBook />
				</div>
			</div>
		</Layout.Content>
	</>;
}

export default IndexPage;