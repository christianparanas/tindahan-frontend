import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import { useCookies } from 'react-cookie';
import { isExpired, decodeToken } from "react-jwt";
import { motion } from "framer-motion"



function account() {
	const [cookies, setCookie, removeCookie] = useCookies(['user']);
	const [ user, setUser ] = useState(cookies.user)
	const router = useRouter()
	const [loading, setLoading] = useState(false)

	
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
				logout()
				window.location.href = "/account/login"
			} else {
				setLoading(true)
			}
		}
	}, [cookies])


	const logout = () => {
		removeCookie('user')
	}

	return (
		<>
		{ loading && (
		<div className="account">
			<Nav />
			<div className="accountWrapper">
				<div className="accountDetails">
				{user && <>
					<h2>Account</h2>
					<div>{ user.result.name }</div>
					<div>{ user.result.email }</div>		
      		<button onClick={logout}>Log out</button>
      		</>
      	}
				</div>
				
				<div className="orderDetails">
					<h2>Order History</h2>
					<div>You haven't placed any orders yet.</div>
				</div>
			</div>
			<Footer />
		</div>
		)}
		</>
	)
}


export default account;