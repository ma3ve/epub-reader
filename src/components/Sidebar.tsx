import React from 'react'
import { UnorderedListOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { Button } from 'antd'

type Props = {
  children: React.ReactNode
}
function Sidebar({ children }: Props) {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <div className="absolute left-0 top-0 m-4">
        <Button
          icon={<UnorderedListOutlined />}
          size="large"
          type="text"
          onClick={() => setOpen(true)}
        />
      </div>
      <div
        className={`h-screen bg-blue-800 ${
          open ? 'w-60' : 'w-0'
        } absolute left-0 top-0 transition-all overflow-hidden`}
      >
        <div className="flex justify-center ">
          <Button className="m-3 w-full" onClick={() => setOpen(false)}>
            Go Back <ArrowLeftOutlined />
          </Button>
        </div>
        <div className="overflow-y-scroll h-full">{children}</div>
      </div>
    </>
  )
}

export default Sidebar
