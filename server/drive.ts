import Router, { NextFunction, Request, Response } from 'express'
import { drive_v3 } from 'googleapis'
import { getToken } from 'next-auth/jwt'
import { getDrive } from './utils'
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

router.get('/books', async (req: Request, res: Response) => {
  const { drive } = req
  const books = await drive.files.list()
  res.send(books.data.files)
})

router.post('/book', async (req: Request, res: Response) => {
  try {
    const { drive } = req
    const folder = await getFolder(drive)
    res.send({ folder })
  } catch (error) {
    console.log(error.response.data.error)
  }
})

export default router
