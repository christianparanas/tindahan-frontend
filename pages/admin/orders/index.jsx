import Link from 'next/link'
import { useState, useEffect } from 'react'
import axios from 'axios' 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from 'react-cookie';
import { isExpired, decodeToken } from "react-jwt";
import { useRouter } from 'next/router'

import Adminnav from '../../../components/Adminnav'
import AdminSidebar from '../../../components/AdminSidebar'

export default function orders() {
	const [cookies, setCookie, removeCookie] = useCookies(['admin']);
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const [orders, setOrders] = useState([])
	const [stateDB, setStateDB] = useState('Loading..')
	const [hasordersInDB, setHasOrdersInDB] = useState(false)

	const [rerender, setRerender] = useState('')

	useEffect(async () => {
		// // check auth
		// await checkAuth()

		axios.get(process.env.BACKEND_BASEURL + '/adminorders')
			.then(res => {
					console.log(res.data.result)
					setOrders(res.data.result)

					// check if there's a product in db, if none, set the message to no item
					if(res.status == 202) {
						setStateDB("No orders")
					} else {
						// if there's a product, show the product map function
						setHasOrdersInDB(true)
					}

			}).catch((error) => {
				if(!error.status) {
					toast.error("Network Error!", { autoClose: 2000 });
					setStateDB("Network error, Please check your internet connection.")
				} 
	      console.log(error.response)
	    })
	}, [cookies, rerender])


	const changeOrderStatus = (id, status) => {
		if(status != "Delivered") {
			axios.post(process.env.BACKEND_BASEURL + "/updateorderstatus", {
				id: id

			}).then(res => {
				console.log(res.data)
				setRerender(state => ({...rerender}))
			}).catch(err => {
				console.log(err)
			})
		}
	}

	return (
		<>
			<div className="admin_orders">
				<Adminnav />


				<div className="admin_orders_content">
					

					<div className="orders_wrapper">
					 {hasordersInDB ? 
					 	(<>
					 		<div className="order head">
								<div>Order Id</div>
								<div className="aa">Customer</div>
								<div>Status</div>
							</div>

							{orders.map((val, key) => {
								return (
									<div className="order" key={key}>
										<div>{val.orderId}</div>
										<div className="orderEmail">{val.userEmail}</div>
										<div onClick={() => changeOrderStatus(val.orderId, val.status)} className={`${val.status == "Pending" ? "status" : "status delivered"}`}>{val.status}</div>
									</div>
								)
							})}
					 	</>) : (<div className="stateDB_msg">{ stateDB }</div>)
					 }
						
					</div>
				</div>
			</div>
		</>
	)
}


// <div className="nav_btn_wrapper">
// 	<div className="nav_btn warn"> <i style={{fontSize: "20px", marginRight: "10px"}} className="fal fa-exclamation-circle"></i> Pending Orders</div>
// 	<div className="nav_btn"><i style={{fontSize: "20px", marginRight: "10px"}} className="far fa-truck"></i> Delivered Orders</div>
// </div>