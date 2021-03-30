import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import { useCookies } from 'react-cookie';
import { isExpired, decodeToken } from "react-jwt";



function account() {
	const [cookies, setCookie, removeCookie] = useCookies(['user']);
	const [ user, setUser ] = useState(cookies.user)
	const router = useRouter()

	
	useEffect( async () => {
		// check if have a user cookie
		if(!cookies.user) {
			router.push("/account/login")
		} else {
			// verify token if valid or not expired
			const isMyTokenExpired = await isExpired(cookies.user.token);
			console.log(`is token expired? - ${isMyTokenExpired}`)
			console.log(user)

			// if expired, redirect to login page
			if(isMyTokenExpired == true) {
				window.location.href = "/account/login"
			}
		}
	}, [cookies])


	const logout = () => {
		removeCookie('user')
	}

	return (
		<div className="account">
			<Nav />
			<div className="accountWrapper">
			{user && 
				<div className="accountDetails">
					<h1>Account</h1>
					<div>{ user.result.name }</div>
					<div>{ user.result.email }</div>		
      		<button onClick={logout}>Log out</button>
				</div>
			}
			</div>
			<Footer />
		</div>
	)
}


export default account;