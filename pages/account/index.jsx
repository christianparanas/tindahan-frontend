import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import Nav from '../../components/Nav'
import Footer from '../../components/Footer'


function account() {
	const router = useRouter()
	const [userAuth, setUserAuth] = useState(false)

	useEffect(() => {
		if(!userAuth) {
			router.push("/account/login")
		}
	}, [])

	return (
		<div className="account">
			<Nav />
			<div className="accountWrapper">
				<Link href="/account/login">
					Login here
				</Link>
			</div>
			<Footer />
		</div>
	)
}


export default account;