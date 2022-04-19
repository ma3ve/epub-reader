import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { EpubView, ReactReader } from 'react-reader'
import { Button, Menu } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Rendition } from 'epubjs'
import Sidebar from '../../components/Sidebar'
import Settings from '../../components/Settings'
type Props = {}

function Reader({}: Props) {
  const [location, setLocation] = React.useState(null)
  const [book, setBook] = React.useState<ArrayBuffer | string>()
  const [rendition, setRendition] = React.useState<Rendition>()
  const [sidebar, setSidebar] = React.useState(false)
  const [toc, setToc] = React.useState<any>()

  const router = useRouter()
  const { id: bookId } = router.query

  console.log({ toc })
  React.useEffect(() => {
    var request = new XMLHttpRequest()
    request.open('GET', `/api/drive/book/${bookId}`, true)
    request.responseType = 'blob'
    request.onload = () => {
      var reader = new FileReader()
      reader.readAsArrayBuffer(request.response)
      reader.onload = (e) => {
        setBook(e.target.result)
      }
    }
    request.send()
  }, [])

  const locationChanged = (epubcifi) => {
    // epubcifi is a internal string used by epubjs to point to a location in an epub. It looks like this: epubcfi(/6/6[titlepage]!/4/2/12[pgepubid00003]/3:0)
    setLocation(epubcifi)
  }
  return (
    <div className="h-screen relative">
      <EpubView
        url={book}
        location={location}
        locationChanged={locationChanged}
        getRendition={(rendition) => setRendition(rendition)}
        tocChanged={(toc) => setToc(toc)}
      />
      {rendition && (
        <>
          <div className="absolute left-0 top-1/2 m-4">
            <Button
              icon={<LeftOutlined />}
              size="large"
              type="text"
              onClick={async () => await rendition.prev()}
            />
          </div>
          <div className="absolute right-0 top-1/2 m-4">
            <Button
              icon={<RightOutlined />}
              size="large"
              type="text"
              onClick={async () => await rendition.next()}
            />
          </div>
          <Sidebar>
            {toc?.map((item, key) => (
              <div className="m-1 text-white mb-2 hover:cursor-pointer">
                <span onClick={() => setLocation(item.href)}>
                  {item.label.replaceAll('\n', '')}
                </span>
              </div>
            ))}
          </Sidebar>
          <div className="absolute right-0 top-0 m-4">
            <Settings />
          </div>
        </>
      )}
    </div>
  )
}

export default Reader
