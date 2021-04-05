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
								<h3>Customer details: </h3>
								<div className="cusDetails">
									<div>Name: {customer[0].name}</div>
									<div>Email: {customer[0].email}</div>
									<div>Joined: {new Date(customer[0].created_at).toLocaleString()}</div>
								</div>
							</div>

							<div className="admin_cusRecords">
								<h3>Transactions: </h3>
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