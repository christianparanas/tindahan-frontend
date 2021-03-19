import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import Nav from '../../components/Nav'
import Footer from '../../components/Footer'

import { signIn, signOut, useSession } from 'next-auth/client'


function account() {
	const router = useRouter()
	const [userAuth, setUserAuth] = useState(false)
	const [ session, loading ] = useSession()


	useEffect(() => {
		if(!session) {
			router.push("/account/login")
		}
	}, [])

	return (
		<div className="account">
			<Nav />
			<div className="accountWrapper">
				<button onClick={() => signOut()}>Log out</button>
			</div>
			<Footer />
		</div>
	)
}


export default account;