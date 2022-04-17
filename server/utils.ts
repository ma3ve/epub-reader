import { google } from 'googleapis'

export const getDrive = (access_token: string) => {
  // const google = new GoogleApis()
  const oAuth2Client = new google.auth.OAuth2(process.env.GOOGLE_ID, process.env.GOOGLE_SECRET)
  oAuth2Client.setCredentials({ access_token })
  return google.drive({ version: 'v3', auth: oAuth2Client })
}
