import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import { useCookies } from 'react-cookie';
import { isExpired, decodeToken } from "react-jwt";
import { motion } from "framer-motion"
import axios from 'axios' 



function account() {
	const [cookies, setCookie, removeCookie] = useCookies(['user']);
	const [ user, setUser ] = useState(cookies.user)
	const router = useRouter()
	const [loading, setLoading] = useState(false)

	// user vars
	const [userorders, setUserOrders] = useState([])

	
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
			} else {
				setLoading(true)
				loadUserOrders()
			}
		}
	}, [cookies])


	const logout = () => {
		removeCookie('user')
		window.location.href = "/account/login"
	}


	const loadUserOrders = () => {
		axios.post(process.env.BACKEND_BASEURL + "/userorderhistory", {
			id: cookies.user.result.id

		}).then(res => {
			console.log(new Date(res.data.result[0].created_at).toLocaleString())
			setUserOrders(res.data.result)
			console.log(res.data.result)

		}).catch(err => {
			console.log(err)
		})
	}

	return (
		<>
		{ loading && (
		<div className="account">
			<Nav />
			<div className="accountWrapper">
				<div className="accountDetails">
				{user && <>
					<h3>Account</h3>
					<div className="ww">
						<svg width="20" height="20" fill="none" stroke="grey" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
						{ user.result.name.replace(/^\w/, (c) => c.toUpperCase()) }
					</div>
					<div className="ww">
						<svg width="20" height="20" fill="none" stroke="grey" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinejoin="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path></svg>
						{ user.result.email }
					</div>	
					<div className="ww">
						<svg width="20" height="20" fill="none" stroke="grey" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
						{ user.result.address }
					</div>	
      		<button onClick={logout}>Logout</button>
      		</>
      	}
				</div>
				
				<div className="orderDetails">
					<h3>Order History <i className="fal fa-dolly"></i></h3>
					<div className="order_his_wrapper">
						{userorders.map((val, key) => {
							return (
								<div className="order_specific" key={key}>
									<i className="aa fal fa-shopping-bag"></i>
									<div className="aa">Order Ref#:  {val.id}</div>
									<div className="aa">Total:  ₱{val.total.toLocaleString()}</div>
									<div className="stat aa">Status: <span>{val.status}</span></div>
									<div className="aa ab">Date: {new Date(val.created_at).toLocaleString()}</div>
								</div>
							)
						})}
					</div>
				</div>
			</div>
			<Footer />
		</div>
		)}
		</>
	)
}


export default account;