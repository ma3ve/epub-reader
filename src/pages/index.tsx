import Header from '../components/Header'
import axios from 'axios'
import UploadBook from '../components/UploadBook'
import { Layout, Button } from 'antd'

function IndexPage() {
  const test = () => {
    axios.post('/api/drive/book').then((res) => {
      console.log(res.data)
    })
  }
  return (
    <>
      <Header />
      <Layout.Content style={{ padding: '10px 50px' }}>
        <div className="flex">
          <Button onClick={test}>test</Button>
          <div className="flex justify-end w-full">
            <UploadBook />
          </div>
        </div>
      </Layout.Content>
    </>
  )
}

export default IndexPage
