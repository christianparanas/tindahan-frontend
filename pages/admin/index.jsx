import Adminnav from '../../components/Adminnav'

import { useCookies } from 'react-cookie';
import { isExpired, decodeToken } from "react-jwt";
import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios' 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Line, defaults } from 'react-chartjs-2';
import CountUp from 'react-countup';

import Link from 'next/link'

import Cashsvg from '../../components/svg/Cashsvg'
import Creditcard from '../../components/svg/Creditcard'
import Store from '../../components/svg/Store'
import Customersvg from '../../components/svg/Customersvg'


export default function admin() {
	const [cookies, setCookie, removeCookie] = useCookies(['admin']);
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const [counts, setCounts] = useState(false)
	const [totalsales, setTotalSales] = useState(null)
	const [salesArr, setSalesArr] = useState([])




	useEffect( async () => {
		// check if have a user cookie
		if(!cookies.admin) {
			router.push("/admin/auth")
		} else {
			// verify token if valid or not expired
			const isMyTokenExpired = await isExpired(cookies.admin.token);
			console.log(`is token expired? - ${isMyTokenExpired}`)

			// if expired, redirect to login page
			if(isMyTokenExpired == true) {
				window.location.href = "/admin/auth"
			} else {
				setLoading(true)
				countOverview()
			}
		}
	}, [cookies])


	const countOverview = () => {
		axios.get(process.env.BACKEND_BASEURL + "/adminoverview")
			.then(res => {
				console.log(res.data)
				setCounts(res.data)
				setTotalSales(res.data.totalSales.total.toLocaleString())
			}).catch((error) => {
	      if(!error.status) {
	      	// show this toast notif if user have network issue
	      	toast.error("Network Error!", { autoClose: 2000 });
	      }
	      console.log(error.response)
	    })
	}




	return (
		<>
		{ loading && (
		<div className="admin">
			<Adminnav />
			<ToastContainer />
			
			<div className="admin_dashboard">
				<h3>Dashboard</h3>
				<div className="info_containers">
					<Link href="/admin/customers">
						<div className="wrapper one">
						<Customersvg />
							<div className="wrap">
								<svg  width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><title>Payments logo</title><path d="M34.61 11.28a2.56 2.56 0 0 0-1.22-1.04L8.54.2A2.57 2.57 0 0 0 5 2.6V15c0 1.05.64 2 1.61 2.4l6.44 2.6 21.56 8.72c.26-.4.4-.88.39-1.36V12.64c0-.48-.13-.96-.39-1.37z" fill="url(#product-icon-payments-SiteMobileMenu-a)"></path><path d="M34.63 11.28L13.06 20l-6.45 2.6A2.58 2.58 0 0 0 5 25v12.42a2.58 2.58 0 0 0 3.54 2.39L33.4 29.76c.5-.21.93-.57 1.21-1.04.26-.41.4-.88.39-1.36V12.64c0-.48-.12-.95-.37-1.36z" fill="#96F"></path><path d="M34.62 11.28l.1.17c.18.37.28.77.28 1.19v-.03 14.75c0 .48-.13.95-.39 1.36L13.06 20l21.56-8.72z" fill="url(#product-icon-payments-SiteMobileMenu-b)"></path><defs><linearGradient id="product-icon-payments-SiteMobileMenu-a" x1="20" y1="4.13" x2="20" y2="21.13" gradientUnits="userSpaceOnUse"><stop stopColor="#11EFE3"></stop><stop offset="1" stopColor="#21CFE0"></stop></linearGradient><linearGradient id="product-icon-payments-SiteMobileMenu-b" x1="35" y1="11.28" x2="35" y2="28.72" gradientUnits="userSpaceOnUse"><stop stopColor="#0048E5"></stop><stop offset="1" stopColor="#9B66FF"></stop></linearGradient></defs></svg>
								<span>Customers:  {counts.customerCount}</span>
							</div>
						</div>
					</Link>
					<Link href="/admin/products">
						<div className="wrapper two">
						<Store />
							<div className="wrap">
								<svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><title>Terminal logo</title><path d="M36.98 14.05l-6.31 1.36L9.33 20l-7.35 1.58A2.52 2.52 0 0 0 0 24.05v13.42C0 38.87 1.12 40 2.5 40h35c1.38 0 2.5-1.13 2.5-2.53V16.53c0-.77-.34-1.49-.93-1.97a2.48 2.48 0 0 0-2.09-.5z" fill="#9B66FF"></path><path d="M28.59 0H11.58A2.54 2.54 0 0 0 9 2.5v25c0 1.38 1.15 2.5 2.58 2.5h16.84A2.54 2.54 0 0 0 31 27.5v-25A2.5 2.5 0 0 0 28.59 0z" fill="url(#product-icon-terminal-SiteMobileMenu-a)"></path><path d="M31 15.34V27.5c0 1.38-1.15 2.5-2.58 2.5H11.58A2.54 2.54 0 0 1 9 27.5v-7.43l.33-.07 21.34-4.59.33-.07z" fill="url(#product-icon-terminal-SiteMobileMenu-b)"></path><defs><linearGradient id="product-icon-terminal-SiteMobileMenu-a" x1="20" y1="1.97" x2="20" y2="17.6" gradientUnits="userSpaceOnUse"><stop stopColor="#11EFE3"></stop><stop offset=".33" stopColor="#15E8E2"></stop><stop offset=".74" stopColor="#1FD3E0"></stop><stop offset="1" stopColor="#21CFE0"></stop></linearGradient><linearGradient id="product-icon-terminal-SiteMobileMenu-b" x1="31" y1="22.67" x2="5.34" y2="22.67" gradientUnits="userSpaceOnUse"><stop stopColor="#0048E5"></stop><stop offset=".64" stopColor="#625AF5"></stop><stop offset="1" stopColor="#8A62FC"></stop></linearGradient></defs></svg>
								<span>Products:  {counts.productCount}</span>
							</div>
						</div>
					</Link>
					<Link href="/admin/orders">
						<div className="wrapper three">
						<Creditcard />
							<div className="wrap">
								<svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><title>Radar logo</title><path d="M24.87 4.46a1.26 1.26 0 0 0-1.8.2l-4.6 5.82L3.42 29.45c.27.22.54.45.78.7a9.42 9.42 0 0 1 1.13 1.32l.1.13a9.15 9.15 0 0 1 .8 1.43c.29.62.5 1.28.65 1.95a2.5 2.5 0 0 0 2.45 1.93H38.7a1.27 1.27 0 0 0 1.27-1.3 42.43 42.43 0 0 0-15.1-31.15z" fill="#9A66FF"></path><path d="M27.8 21.98A33.82 33.82 0 0 0 5.95 4.28a1.29 1.29 0 0 0-1.56.98L.1 25.4a2.54 2.54 0 0 0 1.4 2.88 9.48 9.48 0 0 1 2.72 1.87l.17.17c.35.36.67.74.96 1.15l.1.13a9.15 9.15 0 0 1 .8 1.43l20.94-9.31a1.29 1.29 0 0 0 .62-1.74z" fill="url(#product-icon-radar-SiteMobileMenu-a)"></path><path d="M18.46 10.48l.47.38a33.82 33.82 0 0 1 8.87 11.12 1.29 1.29 0 0 1-.62 1.74L6.25 33.03a9.15 9.15 0 0 0-.8-1.43l-.1-.13-.23-.3c-.23-.3-.47-.58-.74-.85a9.7 9.7 0 0 0-.95-.86l15.03-18.98z" fill="url(#product-icon-radar-SiteMobileMenu-b)"></path><defs><linearGradient id="product-icon-radar-SiteMobileMenu-a" x1="13.98" y1="4.24" x2="13.98" y2="33.03" gradientUnits="userSpaceOnUse"><stop offset=".26" stopColor="#FF5091"></stop><stop offset=".91" stopColor="#E03071"></stop></linearGradient><linearGradient id="product-icon-radar-SiteMobileMenu-b" x1="15.68" y1="10.48" x2="15.68" y2="33.03" gradientUnits="userSpaceOnUse"><stop stopColor="#6E00F5"></stop><stop offset="1" stopColor="#9860FE"></stop></linearGradient></defs></svg>
								<span>Orders:  {counts.orderCount}</span>
							</div>
						</div>
					</Link>
					<div className="wrapper four">
					<Cashsvg />
						<div className="wrap">
							<svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><title>Atlas logo</title><g clipPath="url(#product-icon-atlas-SiteMobileMenu-a)"><path d="M20.51.3c1 0 1.92.57 2.36 1.47l8.22 16.42 8.65 17.31a2.64 2.64 0 0 1-1.65 3.73l-.17.04c-.12.03-.24.04-.36.05h-.18L20.5 35.99 9.94 18.19l8.2-16.42A2.64 2.64 0 0 1 20.52.3z" fill="#FB0"></path><path d="M20.51.3c1 0 1.92.57 2.36 1.47l8.22 16.42L20.5 35.98 3.65 39.33a2.64 2.64 0 0 1-2.37-3.83l8.66-17.3 8.2-16.43A2.64 2.64 0 0 1 20.52.3z" fill="url(#product-icon-atlas-SiteMobileMenu-b)"></path><path d="M20.51.3c1 0 1.92.57 2.36 1.47l8.22 16.42L20.5 35.98 9.94 18.19l8.2-16.42A2.64 2.64 0 0 1 20.34.3h.18z" fill="url(#product-icon-atlas-SiteMobileMenu-c)"></path></g><defs><linearGradient id="product-icon-atlas-SiteMobileMenu-b" x1="16.03" y1="18.01" x2="15.94" y2="39.33" gradientUnits="userSpaceOnUse"><stop stopColor="#FFD748"></stop><stop offset=".54" stopColor="#FFCD48"></stop><stop offset="1" stopColor="#FFCB48"></stop></linearGradient><linearGradient id="product-icon-atlas-SiteMobileMenu-c" x1="20.51" y1="34.72" x2="20.51" y2="15.01" gradientUnits="userSpaceOnUse"><stop stopColor="#FFAD00"></stop><stop offset="1" stopColor="#FF7600"></stop></linearGradient><clipPath id="product-icon-atlas-SiteMobileMenu-a"><path fill="#fff" d="M0 0h40v40H0z"></path></clipPath></defs></svg>
							<span>Total Sales:  ₱{totalsales}</span>
						</div>
					</div>
				</div>
			</div>
			
		</div>
		)}
		</>
	)
}


