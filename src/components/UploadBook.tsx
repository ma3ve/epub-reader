import React, { useState } from 'react'
import { Upload, Button, Modal, message } from 'antd'
import axios from 'axios'
import { UploadOutlined, InboxOutlined } from '@ant-design/icons'
import { UploadRequestOption } from 'rc-upload/lib/interface'
import { DraggerProps } from 'antd/lib/upload'
import { UploadFile } from 'antd/lib/upload/interface'

const { Dragger } = Upload
type Props = {}

function UploadBook({}: Props) {
  const [isOpen, setIsOpen] = useState(false)

  const upload = (options: UploadRequestOption) => {
    const formData = new FormData()
    formData.append('file', options.file)
    axios
      .post('/api/drive/book', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        options.onSuccess(res.data)
      })
      .catch((err) => {
        options.onError(err)
        console.log(err)
      })
  }

  const deleteFile = (file: UploadFile<any>) => {
    axios
      .delete(`/api/drive/book/${file.response.id}`)
      .then((res) => {
        message.success('Book Deleted')
      })
      .catch((err) => {
        message.error('Something went wrong')
      })
  }

  const props: DraggerProps = {
    name: 'file',
    multiple: true,

    onChange(info) {
      const { status } = info.file
      if (status === 'done') {
        console.log(`${info.file.name} file uploaded successfully.`)
      } else if (status === 'error') {
        console.log(`${info.file.name} file upload failed.`)
      }
    },
    beforeUpload(file) {
      const isEpub = file.type === 'application/epub+zip'
      if (!isEpub) {
        message.error(`${file.name} is not a epub file`)
      }
      return isEpub || Upload.LIST_IGNORE
    },
    onRemove: deleteFile,
    customRequest: upload,
  }
  return (
    <>
      <Button icon={<UploadOutlined />} onClick={() => setIsOpen(!isOpen)}>
        Upload a new Book
      </Button>
      <Modal
        title="Upload a new Book"
        visible={isOpen}
        onOk={() => setIsOpen(false)}
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
