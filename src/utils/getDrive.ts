import { OAuth2Client } from 'google-auth-library'
import {drive_v3, google} from 'googleapis'

export default function getDrive(access_token:string):drive_v3.Drive{
	// const google = new GoogleApis()
	const oAuth2Client = new google.auth.OAuth2(process.env.GOOGLE_ID,process.env.GOOGLE_SECRET)
	oAuth2Client.setCredentials({access_token})
	return google.drive({version:'v3',auth:oAuth2Client})
}