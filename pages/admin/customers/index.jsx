import Adminnav from '../../../components/Adminnav'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import axios from 'axios' 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from 'react-cookie';
import { isExpired, decodeToken } from "react-jwt";
import { useRouter } from 'next/router'


export default function customers() {
	const [cookies, setCookie, removeCookie] = useCookies(['admin']);
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const [customers, setCustomers] = useState([])
	const [stateDB, setStateDB] = useState('Loading..')
	const [hasCustomerInDB, setHasCustomerInDB] = useState(false)


	useEffect(async () => {
		// check auth
		await checkAuth()

		axios.get(process.env.BACKEND_BASEURL + '/admincustomers')
			.then(res => {
					console.log(res.data.result)
					setCustomers(res.data.result)

					// check if there's a product in db, if none, set the message to no item
					if(res.status == 202) {
						setStateDB("No customer registered.")
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

	const dynaUrl = (id) => {
		return `/admin/customers/${id}`
	}



	return (
		<>{loading && (
			<div className="admin_customers">
				<ToastContainer />
				<Adminnav />

				<div className="admin_customers_mainWrapper">
					<div className="admin_customers_header">
						<h3>Customers</h3>
					</div>

					<div className="admin_customers_items">

						{hasCustomerInDB ? 
							(<>
								<div className="admin_customer admin_h">
									<div>Id</div>
									<div>Name</div>
									<div>Email</div>
									<div>View</div>
								</div>

								{customers.map((val, key) => {
								return (
									<div className="admin_customer" key={key}>
										<div className="ad">{val.id}</div>
										<div className="ad">{val.name}</div>
										<div className="ad">{val.email}</div>
										<Link href={{ pathname: "/admin/customers/" + `${val.id}`}} as={`/admin/customers/${val.id}`}><svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#BCCDDF" className="svg cursor-pointer"><path data-v-62b6ea83="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg></Link>
									</div>
								)
							})}</>) : (<div className="stateDB_msg">{ stateDB }</div>)
						}
					</div>
				</div>
			</div>
			)}
		</>
	)
}