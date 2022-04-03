import {getToken,decode} from 'next-auth/jwt'
import  {google} from  'googleapis';

const handler = async(req, res)=> {
	const secret = process.env.SECRET
	const token = await getToken({ req, secret, raw:true });
	const decodedToken = await decode({token,secret})

}
export default handler