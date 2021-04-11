import { useRouter } from 'next/router'
import Adminnav from '../../../components/Adminnav'
import { useState, useEffect } from 'react'
import axios from 'axios' 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from 'react-cookie';
import { isExpired, decodeToken } from "react-jwt";
import Link from 'next/link'

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default function Customer() {
	const router = useRouter()
	const { customerId } = router.query

	const [cookies, setCookie, removeCookie] = useCookies(['admin']);
	const [loading, setLoading] = useState(false)
	const [customer, setCustomer] = useState([])
	const [stateDB, setStateDB] = useState('Loading..')
	const [hasCustomerInDB, setHasCustomerInDB] = useState(false)
	const [noUser, setNoUser] = useState(false)


	useEffect(async () => {
		// check auth
		await checkAuth()
		console.log(customerId)

		axios.post(process.env.BACKEND_BASEURL + '/specificcustomer',  
			{ id: customerId 

			}).then(res => {
					console.log(res.data.result)
					setCustomer(res.data.result)
					// check if there's a product in db, if none, set the message to no item
					if(res.status == 202) {
						setNoUser(true)
					} else {
						// if there's a product, show the product map function
						setHasCustomerInDB(true)
					}
			}).catch((error) => {
				if(!error.status) {
					toast.error("Network Error!", { autoClose: 2000 });
					setStateDB("Network error, Please check your internet connection.")
				} 
	      console.log(error.response)
	    })
	}, [cookies])


	const checkAuth = async () => {
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
			}
		}
	}

	return (
		<>{loading && (
				<div className="admin_customer">
					<ToastContainer />
					<Adminnav />

					{hasCustomerInDB ? 
						(
						<div className="admin_customer_mainWrapper">
							<div className="admin_cusDetails">
								<h3>Customer details </h3>
								<div className="cusDetails">
									<div className="qq">
										<svg width="20" height="20" fill="none" stroke="grey" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
										{customer[0].name}
									</div>
									<div className="qq">
										<svg width="20" height="20" fill="none" stroke="grey" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinejoin="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path></svg>
										{customer[0].email}
									</div>
									<div className="qq">
										<svg width="20" height="20" fill="none" stroke="grey" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
										{customer[0].address}
									</div>
									<div className="qq">
										<svg width="20" height="20" fill="none" stroke="grey" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
										Joined: {new Date(customer[0].created_at).toLocaleString()}
									</div>
								</div>
							</div>

							<div className="admin_cusRecords">
								<h3>Transactions </h3>
								<div className="cusDetails">
									No transactions!
								</div>
							</div>

						</div>
						) : <div className="admin_cusprob">{ noUser ? (<div className="por">Page 404 - <Link href="/admin/customers"><span>Go back</span></Link></div>) : (<div>{ stateDB }</div>)}</div> }
				</div>
				)}
		</>
	)
}