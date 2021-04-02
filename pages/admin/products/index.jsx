
import Adminnav from '../../../components/Adminnav'
import Link from 'next/link'

import { useState, useEffect } from 'react'
import axios from 'axios' 


export default function Products() {
	const [products, setProducts] = useState([])

	useEffect(() => {
		axios.get(process.env.BACKEND_BASEURL + '/adminproducts')
			.then(res => {
					console.log(res.data.result)
					setProducts(res.data.result)

			}).catch((error) => {
	      console.log(error.response)
	    })

	}, [])

	return (
		<>
			<div className="admin_products">
				<Adminnav />

				<div className="admin_headers">
					<h3>PRODUCTS</h3>
					<Link href="/admin/products/newproduct/"><div className="addNew"><svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div></Link>
				</div>
				
				<div className="admin_products_wrapper">

				{products.map((val, key) => {
				  return (
				   <div className="admin_product" key={key}>
				 			
				 			<img src={`https://res.cloudinary.com/christianparanas/image/upload/v1617305941/Ecommerce/Products/${val.product_image}`} alt="" />
				 			<div className="p_details">
				 				<div>ID: {val.product_id}</div>
					 			<div>Name: {val.product_name}</div>
					 			<div>Price: ₱{val.product_price}</div>
					 			<div>Quantity: {val.product_quantity}</div>
					 			<div className="p_details_op">
					 				<div>
						 				<svg  width="24" height="24" fill="none" stroke="skyblue" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
						 			</div>
						 			<div>
						 				<svg width="24" height="24" fill="none" stroke="red" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
						 			</div>
					 			</div>
				 			</div>
				 		</div>
				 	)
				})}
				</div>

			</div>
		</>
	)
}



