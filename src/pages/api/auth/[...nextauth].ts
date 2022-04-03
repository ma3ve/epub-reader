import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import jwt from 'next-auth/jwt'
const secret = process.env.SECRET

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization:{
        params:{
          scope:"openid https://www.googleapis.com/auth/drive.file"
        }
      }
    }),
  ],
  secret: process.env.SECRET,
  callbacks: {
    jwt: ({token, account })=> {
      if (account?.access_token) {
        token.access_token = account.access_token;
      }
      return token;
    },
  },
});
