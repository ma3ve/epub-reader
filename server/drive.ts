import Router, { NextFunction, Request, Response } from 'express'
import { drive_v3 } from 'googleapis'
import { getToken } from 'next-auth/jwt'
import { getDrive } from './utils'
import bodyParser from 'body-parser'
import stream from 'stream'
import multer from 'multer'

const upload = multer()
const router = Router()

const authorize = async (req: Request, res: Response, next: NextFunction) => {
  const secret = process.env.SECRET
  const token = await getToken({ req, secret })
  if (!token) {
    return res.status(401).send('Unauthorized')
  }
  const drive = getDrive(token.access_token as string)
  req.drive = drive
  next()
}
router.use(authorize)
router.use(bodyParser.json())

const getFolder = async (drive: drive_v3.Drive) => {
  const response = await drive.files.list({
    q: `name = '${process.env.GOOGLE_FOLDER}' and mimeType = 'application/vnd.google-apps.folder'`,
    fields: 'files(id, name)',
  })
  let folder = response.data.files[0]
  if (!folder) {
    // create folder
    const folderResponse = await drive.files.create({
      requestBody: {
        name: process.env.GOOGLE_FOLDER,
        mimeType: 'application/vnd.google-apps.folder',
      },
      fields: 'id, name',
    })
    folder = folderResponse.data
  }
  return folder
}

const uploadFile = async (
  fileObject: Express.Multer.File,
  folder: drive_v3.Schema$File,
  drive: drive_v3.Drive
) => {
  const bufferStream = new stream.PassThrough()
  bufferStream.end(fileObject.buffer)
  const { data } = await drive.files.create({
    media: {
      mimeType: fileObject.mimetype,
      body: bufferStream,
    },
    requestBody: {
      name: fileObject.originalname,
      parents: [folder.id],
    },
    fields: 'id,name',
  })
  return data
}

router.get('/books', async (req: Request, res: Response) => {
  const { drive } = req
  const folder = await getFolder(drive)
  const response = await drive.files.list({
    q: `'${folder.id}' in parents and mimeType = 'application/epub+zip'`,
    fields: 'files(id, name, mimeType)',
  })
  res.send(response.data.files)
})

router.post('/book', upload.single('file'), async (req: Request, res: Response) => {
  try {
    const { drive, file } = req
    if (file.mimetype !== 'application/epub+zip') res.status(400).send('Invalid file type')
    const folder = await getFolder(drive)
    const book = await uploadFile(file, folder, drive)
    res.send(book)
  } catch (error) {
    console.log(JSON.stringify(error, null, 2))
    res.status(500).send('something went wrong')
  }
})

router.delete('/book', async (req: Request, res: Response) => {
  try {
    const { drive } = req
    const { id } = req.body
    await drive.files.delete({ fileId: id })
    res.send('ok')
  } catch (error) {
    console.log(JSON.stringify(error, null, 2))
    res.status(500).send('something went wrong')
  }
})

export default router
