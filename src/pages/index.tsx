import Header from "../components/Header";
import { Button } from 'antd'
import axios from 'axios'
function IndexPage() {
	const test = () => {
		axios.get('/api/getRawToken').then(res => {
			console.log(res.data)
		})
	}
	return <>
		<Header />
		<Button onClick={test} >test</Button>
	</>;
}

export default IndexPage;