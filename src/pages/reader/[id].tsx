import axios from 'axios'
import { useRouter } from 'next/router'
import React from 'react'
import { ReactReader } from 'react-reader'
type Props = {}

function Reader({}: Props) {
  const [location, setLocation] = React.useState(null)
  const [book, setBook] = React.useState<ArrayBuffer | string>()
  const router = useRouter()
  const { id: bookId } = router.query

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
    <div style={{ height: '100vh' }}>
      <ReactReader location={location} locationChanged={locationChanged} url={book} />
    </div>
  )
}

export default Reader
