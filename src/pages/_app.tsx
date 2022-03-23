import 'antd/dist/antd.css';
import '../styles/globals.css'
import { SessionProvider, useSession } from "next-auth/react"
import type { AppProps } from 'next/app'
import { Spin } from 'antd'
import SignIn from '../components/SignIn';

function MyApp({ Component, pageProps }: AppProps) {
	return <SessionProvider session={pageProps.session} >
		<Wrapper >
			<Component {...pageProps} />
		</Wrapper>
	</SessionProvider>
}


function Wrapper({ children }: { children: JSX.Element }) {
	const { data: session, status } = useSession()
	if (status === "loading") return <div className='absolute top-1/2 left-1/2 -translate-y-1/2'>
		<Spin size="large" />
	</div>
	if (status === "unauthenticated" || !session) return <SignIn />
	return children
}

export default MyApp