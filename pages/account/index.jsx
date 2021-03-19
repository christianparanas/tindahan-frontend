import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import Nav from '../../components/Nav'
import Footer from '../../components/Footer'

import { signIn, signOut, useSession } from 'next-auth/client'


function account() {
	const router = useRouter()
	const [ session, loading ] = useSession()


	useEffect(() => {
		console.log(session)
		if(!session) {
			router.push("/account/login")
		}
	}, [session])

	return (
		<div className="account">
			<Nav />
			<div className="accountWrapper">
				{session && <>
      		Signed in as {session.user.email} <br/>
      		<button onClick={() => signOut()}>Sign out</button>
    		</>}
			</div>
			<Footer />
		</div>
	)
}


export default account;