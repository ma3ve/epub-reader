import Header from '../components/Header'
import axios from 'axios'
import UploadBook from '../components/UploadBook'
import { Layout, Button } from 'antd'
import { useEffect } from 'react'
import BookList from '../components/BookList'

function IndexPage() {
  useEffect(() => {
    axios.get('/api/drive/books').then((res) => {
      console.log(res.data)
    })
  }, [])

  return (
    <>
      <Header />
      <Layout.Content style={{ padding: '10px 50px' }}>
        <div className="flex">
          <div className="flex justify-end w-full">
            <UploadBook />
          </div>
        </div>
        <div className="w-full">
          <BookList />
        </div>
      </Layout.Content>
    </>
  )
}

export default IndexPage
