import React from 'react'
import { Modal, Button, Select } from 'antd'
import { SettingOutlined } from '@ant-design/icons'

type Props = {}

function Settings({}: Props) {
  const [open, setOpen] = React.useState(false)
  const [font, setFont] = React.useState('original')
  const [fontSize, setFontSize] = React.useState(20)
  const [theme, setTheme] = React.useState<'white' | 'black' | 'sepia'>('white')

  return (
    <>
      <Button onClick={() => setOpen(true)} icon={<SettingOutlined />} size="large" type="text" />

      <Modal
        title="Settings"
        visible={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        <div className="m-2 mt-4">
          <span>Font:</span>
          {/* <Select
            className="w-full"
            defaultValue="original"
            value={font}
            onChange={(value) => {
              setFont(font)
            }}
          >
            <option value="original">Original</option>
            <option value="serif" className="font-serif">
              Serif
            </option>
            <option value="literate" className="font-sans">
              Sans-Serif
            </option>
            <option value="merriweather" className="font-mono">
              Monospace
            </option>
          </Select> */}
          <div className="flex justify-center">
            <Button className="text-lg m-2" size="large" onClick={() => setFont('original')}>
              A
            </Button>
            <Button
              className="text-lg m-2 font-serif"
              size="large"
              onClick={() => setFont('serif')}
            >
              A
            </Button>
            <Button className="text-lg m-2 font-sans" size="large" onClick={() => setFont('sans')}>
              A
            </Button>
            <Button className="text-lg m-2 font-mono" size="large" onClick={() => setFont('mono')}>
              A
            </Button>
            <Button
              className="text-lg m-2 font-merriweather"
              size="large"
              onClick={() => setFont('merriweather')}
            >
              A
            </Button>
          </div>
        </div>
        <div className="m-2 mt-4">
          <span>Font Size:</span>
          <div className="flex justify-center">
            <Button className="text-xs" size="large" onClick={() => setFontSize(fontSize - 1)}>
              T
            </Button>
            <div className="m-2 ml-3 mr-3">{`${fontSize}px`}</div>
            <Button className="text-lg" size="large" onClick={() => setFontSize(fontSize + 1)}>
              T
            </Button>
          </div>
        </div>
        <div className="m-2 mt-4">
          <span>Tone:</span>
          <div className="flex justify-center">
            <Button
              className="text-xs bg-white text-black m-3 border-black hover:border-black"
              size="large"
              type="text"
              onClick={() => setTheme('white')}
            >
              white
            </Button>
            <Button
              className="text-lg bg-black text-white m-3 hover:bg-black hover:text-white "
              size="large"
              type="text"
              onClick={() => setTheme('black')}
            >
              black
            </Button>
            <Button
              className="text-xs text-black m-3 "
              size="large"
              type="text"
              style={{ background: '#F5DEB3' }}
              onClick={() => setTheme('sepia')}
            >
              sepia
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default Settings
