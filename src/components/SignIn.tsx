import React from 'react'
import GoogleButton from 'react-google-button'
import { signIn } from 'next-auth/react'
type Props = {}

function SignIn({ }: Props) {
	return (
		<div className='flex flex-col items-center justify-center h-screen text-center '>
			<div className='lg:w-1/2 md:w-4/5 -translate-y-1/2'>
				<h1 className='text-3xl font-bold m-2'>
					Welcome to Epub Reader.
				</h1>
				<h1 className='text-2xl font-bold m-2 '>
					This app uses Google to authenticate and Google Drive to store and access your books. please signIn with Google to continue.
				</h1>
				<div className='w-full justify-center flex m-2 mt-5'>
					<GoogleButton
						onClick={() => signIn("google")}
					/>
				</div>
			</div>
		</div>
	)
}

export default SignIn