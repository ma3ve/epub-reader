import React, { useState } from 'react'
import { Upload, Button, Modal } from 'antd'
import axios from 'axios'
import { UploadOutlined, InboxOutlined } from '@ant-design/icons'
const { Dragger } = Upload
type Props = {}

function UploadBook({}: Props) {
  const [isOpen, setIsOpen] = useState(false)

  const upload = (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    // 	axios.post('/api/upload', formData, {
    // 		headers: {
    // 			'Content-Type': 'multipart/form-data'
    // 		}
    // 	})
    // 		.then(res => {
    // 			console.log(res)
    // 		})
    // 		.catch(err => {
    // 			console.log(err)
    // 		})
  }

  const props = {
    name: 'file',
    multiple: true,

    onChange(info) {
      const { status } = info.file
      if (status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (status === 'done') {
        console.log(`${info.file.name} file uploaded successfully.`)
      } else if (status === 'error') {
        console.log(`${info.file.name} file upload failed.`)
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files)
    },
  }
  return (
    <>
      <Button icon={<UploadOutlined />} onClick={() => setIsOpen(!isOpen)}>
        Upload a new Book
      </Button>
      <Modal
        title="Upload a new Book"
        visible={isOpen}
        onOk={() => console.log('upload')}
        onCancel={() => setIsOpen(false)}
        okButtonProps={{ type: 'default' }}
        cancelButtonProps={{ danger: true }}
      >
        <Dragger {...props} accept={'application/epub+zip'}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag epub file(s) to this area to upload</p>
        </Dragger>
      </Modal>
    </>
  )
}

export default UploadBook
