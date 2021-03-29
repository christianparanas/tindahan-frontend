import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import { useCookies } from 'react-cookie';



function account() {
	const [cookies, setCookie, removeCookie] = useCookies(['user']);
	const router = useRouter()

	
	useEffect(() => {
		if(!cookies.user) {
			router.push("/account/login")
		} else {
			console.log(cookies.user)
		}
	}, [cookies])

 
	const logout = () => {
		removeCookie('user')
	}

	return (
		<div className="account">
			<Nav />
			<div className="accountWrapper">
      			<button onClick={logout}>Sign out</button>
			</div>
			<Footer />
		</div>
	)
}


export default account;