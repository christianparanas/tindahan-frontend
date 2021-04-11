import Nav from '../components/Nav'

import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from 'axios' 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from 'react-cookie';
import { isExpired, decodeToken } from "react-jwt";
import Link from 'next/link'


export default function cart() {
	const router = useRouter()

	const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [cartItems, setCartItems] = useState([])
	const [hascartItems, setHasCartItems] = useState(false)
  const [incOrDec, setIncOrDec] = useState(null)
  const [subtotal, setSubtotal] = useState(0)
  const [address, setAddress] = useState('')
  const [dbinfo, setDbinfo] = useState('Loading..')



  useEffect(() => {

    if(cookies.user) {
      // get all the cart item of the user
      axios.post(process.env.BACKEND_BASEURL + '/cart', {
        id: cookies.user.result.id
      })
        .then( async res => {
          if(res.status == 200) {
            const cart = await res.data.result
            console.log(res.data.result)
            setCartItems(cart)
            setHasCartItems(true)

            // get user address
            setAddress(res.data.result[0].address)

            // subtotal operations
            setSubtotal(0)
            res.data.result.map((val, key) => {
              setSubtotal(prev => prev + (val.cart_qty * val.cart_p_price))
            })

          } else if(res.status == 202) {
            setHasCartItems(false)
            setDbinfo("Cart is Empty")
          }
        })
    }

    // dependents, re render useEffect if there's no cart item in db
  }, [incOrDec, hascartItems])

  const changeQuan = (qty, id, cart_qty, stock) => {
    // check if increase qty or otherwise
    if(qty == 1) {
      // check if the cart item qty exceed in the stock in the product
      if(cart_qty < stock) {
          axios.post(process.env.BACKEND_BASEURL + '/updatecartqty', {
          order: "add",
          id: id
        })
        .then( async res => {
          if(res.status == 200) {
            console.log(res.data.message)
            // this will re render the cart items
            setIncOrDec(state => ({...incOrDec}))
          }
        })
      } else {
        toast.success("Out of Stock", { autoClose: 2000 });
      }
    } else {
      // check if cart qty greater than 0, else remove the item
      if(cart_qty <= 1) {
        axios.post(process.env.BACKEND_BASEURL + '/delcartitem', {
          id: id
        })
        .then( async res => {
          if(res.status == 200) {
            console.log(res.data.message)
            setIncOrDec(state => ({...incOrDec}))
          }
        })
      } else {
        // if greater than or equal to 1, procced in changing the cart item qty
        axios.post(process.env.BACKEND_BASEURL + '/updatecartqty', {
          order: "reduce",
          id: id
        })
        .then( async res => {
          if(res.status == 200) {
            console.log(res.data.message)
            setIncOrDec(state => ({...incOrDec}))
          }
        })
      }
    }
  }

  const removeCartItem = (id) => {
  	let ans = confirm('Are you sure you want to remove this item?')
  	if(ans) {
	  		axios.post(process.env.BACKEND_BASEURL + '/delcartitem', {
	      id: id
	    })
	    .then( async res => {
	      if(res.status == 200) {
	        console.log(res.data.message)
	        setIncOrDec(state => ({...incOrDec}))
	      }
	    })
  	}
  	
  }


	return (
		<>
			<div className="review_cart">
				<ToastContainer />
				<Nav />

				<div className="review_cartItems">
					{hascartItems ? (
						<div className="bucketWrapper">
            <div className="bucket">
              {cartItems.map((val, key) => {

                return (
                  <div key={key} className="itemCart">
                    <img src={`https://res.cloudinary.com/christianparanas/image/upload/v1617305941/Ecommerce/Products/${val.cart_p_image}`} alt="product image" /> 
                    <div className="itemCart_details">
                      <div className="aa">{ val.cart_p_name }</div>
                      <div className="bb">₱{ val.cart_p_price }</div>

                      <div className="changeRemove">
                      	<div className="changequan">
	                        <div onClick={() => changeQuan(2, val.cart_id, val.cart_qty, val.cart_p_stock)} >
	                          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg>
	                        </div>
	                        <div>{ val.cart_qty }</div>
	                        <div onClick={() => changeQuan(1, val.cart_id, val.cart_qty, val.cart_p_stock)}>
	                          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
	                        </div>
	                      </div>

	                      <div className="remove_item" onClick={() => removeCartItem(val.cart_id)}>
	                      	Remove
	                      </div>
                      </div>
                      
                    </div>
                  </div>
                )
              })}
            </div>
            	<div className="total">
            		<div>TOTAL</div>
            		<div>₱{subtotal}</div>
            	</div>
            	<div className="placeOrder">
            		<div className="place_address">
            			<svg width="18" height="18" fill="none" stroke="grey" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            			<span>{address}</span>
            		</div>
            		<div className="checkout_btn">Check out</div>
            	</div>

            </div>
            ) : (<div className="empty_lbl">{dbinfo}</div>)}

				</div>
			</div>

		</>
	)
}