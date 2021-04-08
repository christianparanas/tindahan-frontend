import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from 'axios' 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from 'react-cookie';
import { isExpired, decodeToken } from "react-jwt";
import Link from 'next/link'

import Nav from '../../components/Nav'

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}


export default function products() {
	const router = useRouter()
	const { product } = router.query

	const [cookies, setCookie, removeCookie] = useCookies(['user']);
	const [loading, setLoading] = useState(false)
	const [productArr, setProductArr] = useState([])
	const [stateDB, setStateDB] = useState('Loading..')
	const [hasProductInDB, setHasProductInDB] = useState(false)
	const [noUser, setNoUser] = useState(false)
	const [quan, setQuan] = useState(1)

	useEffect(() => {
		axios.post(process.env.BACKEND_BASEURL + '/specificproduct',  
			{ id: product 

			}).then( async res => {
					console.log(res.data.result)
					setProductArr(res.data.result)
					// check if there's a product in db, if none, set the message to no item
					if(res.status == 202) {
						setNoUser(true)
					} else {
						// if there's a product, show the product map function
						setHasProductInDB(true)
					}
			}).catch((error) => {
				if(!error.status) {
					toast.error("Network Error!", { autoClose: 2000 });
					setStateDB("Network error, Please check your internet connection.")
				} 
	      console.log(error)
	    })

	}, [])


	// change order quantity
	const changeQuan = (num) => {
		if(num == 1) {
			// limmit order quan by the stock
			if(productArr[0].product_quantity > quan) {
				setQuan(prev => prev + 1)
			}
		} else {
			if(quan != 0) {
				setQuan(prev => prev - 1)
			}
		}
	}

	const addToCart = () => {
		// check if login or not, if not you will not be able to add to cart item
		if(cookies.user) {
			// access endpoint and send customer id, item qty and product id
			axios.post(process.env.BACKEND_BASEURL + '/addtocart', {
	      customer_id: cookies.user.result.id,
	      qty: quan,
	     	item_id: product
	    })
	    .then(res => {
	    	// res if item not in the cart and successfully added in the cart
	      if(res.status == 200) {
	      	toast.success("Item added to cart", { autoClose: 2000 });
	      	setTimeout(function(){ window.location.reload(false); }, 1800);

	      	// res if item already in the cart
	      } else if(res.status == 204) {
	      	toast.success("Item already in the cart", { autoClose: 2000 });
	      }
	      
	    }).catch((error) => {
				if(!error.status) {
					toast.error("Network Error!", { autoClose: 2000 });
					setStateDB("Network error, Please check your internet connection.")
				} 
	      console.log(error)
	    })


		} else {
			// res this to inform user to login
			toast.success("Please Login!", { autoClose: 2000 });
		}
	}


	return (
		<>
			<div className="product">
				<ToastContainer />
				<Nav />

				{ hasProductInDB ? (
						<div className="product_contents">
							<img src={`https://res.cloudinary.com/christianparanas/image/upload/v1617305941/Ecommerce/Products/${productArr[0].product_image}`} alt="product image" />				
							<div className="product_details">
								<h2>{ productArr[0].product_name }</h2>
								<div className="sp">
									<div className="product_price">₱{ productArr[0].product_price }</div>
									<div className="stock">STOCK: { productArr[0].product_quantity }</div>
								</div>
								<div className="operate">
									<div className="quanlabel">QUANTITY</div>
									<div className="changequan">
										<div onClick={() => changeQuan(2)} >
											<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg>
										</div>
										<div>{ quan }</div>
										<div onClick={() => changeQuan(1)}>
											<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
										</div>
									</div>
									<div onClick={addToCart} className="addtocart_btn">Add to cart</div>
								</div>
							</div>
						</div>
					) : (<div></div>)}
				
			</div>
		</>
	)
}