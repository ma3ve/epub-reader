import { getToken, decode } from 'next-auth/jwt'
import { google } from 'googleapis'
import { NextApiRequest, NextApiResponse } from 'next'
import getDrive from '../../utils/getDrive'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const secret = process.env.SECRET
  const { access_token } = await getToken({ req, secret })
  if (!access_token) return res.status(403).json({ error: 'No access token' })
  const drive = getDrive(access_token as string)
  const books = await drive.files.list()
  return res.json(books.data.files)
}
export default handler
