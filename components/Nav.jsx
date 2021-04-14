import { useState, useRef, useEffect } from 'react' 
import Link from 'next/link'
import axios from 'axios'
import { useCookies } from 'react-cookie';
import { isExpired, decodeToken } from "react-jwt";
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// libs
import Icon from "awesome-react-icons";

// components

export default function Nav() {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [cartItems, setCartItems] = useState([])
  const [hascartItems, setHasCartItems] = useState(false)

  const [incOrDec, setIncOrDec] = useState(null)
  const [subtotal, setSubtotal] = useState(0)

  // cart indicator
  const [cartIndi, setCartIndi] = useState('indicator')
  const [itemsCountinCart, setitemsCountinCart] = useState(0)


  // for changing upper nav bg color on scroll
  const [upperNav, setUpperNav] = useState('upper_nav')
  // this is used to focus input on click on the search icon in the home page
  const searchInput = useRef(null);
  const [searchOverlay, setSearchOverlay] = useState('searchWrapper')
  const [navOverlay, setNavOverlay] = useState('navOverlay-sidebar')
  const [cartOverlay, setCartOverlay] = useState('cartOverlay')

  // this is for grey overlay, when you click at it, it will close all the overlay that open
  const [navOverlayClickOutside, setNavOverlayClickOutside] = useState('navOverlay-clickOutside')

  // open overlay for sidebar by adding a css classname, also the grey overlay
  const openOverlay = () => {
    setNavOverlay('navOverlay-sidebar sidebarShow')
    setNavOverlayClickOutside('navOverlay-clickOutside clickOutsideShow')
  }

  // open search overlay when the search icon click, also the grey overlay and set auto focus for the input in the search bar
  const openSearchOverlay = () => {
    setNavOverlayClickOutside('navOverlay-clickOutside clickOutsideShow')
    setSearchOverlay('searchWrapper showSearch')
    searchInput.current.focus();
  }

  // open cart overlay, and also the grey overlay
  const openCartOverlay = () => {
    setNavOverlayClickOutside('navOverlay-clickOutside clickOutsideShow')
    setCartOverlay('cartOverlay showCartOverlay')
  }

    // this will close all the overlay in the nav, I put all the close function here to get rid of duplicate functions
  const closeOverlay = () => {
    setNavOverlay('navOverlay-sidebar')
    setNavOverlayClickOutside('navOverlay-clickOutside')
    setSearchOverlay('searchWrapper')
    setCartOverlay('cartOverlay')
  }

  // change bg color for upper nav if a specific scroll coor met
  const listenScrollEvent = () => {
    window.scrollY > 350
      ? setUpperNav("upper_nav navChangeUpperNavBgOnScroll")
      : setUpperNav("upper_nav")
  }

  // listen first for scroll and put it into a listenScrollEvent
  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent)

    if(cookies.user) {

      // get all the cart item of the user
      axios.post(process.env.BACKEND_BASEURL + '/cart', {
        id: cookies.user.result.id
      })
        .then( async res => {
          if(res.status == 200) {
            const cart = await res.data.result
            setCartItems(cart)
            setHasCartItems(true)

            // subtotal operations
            setSubtotal(0)
            setitemsCountinCart(0)
            res.data.result.map((val, key) => {
              setSubtotal(prev => prev + (val.cart_qty * val.cart_p_price))
              setitemsCountinCart(prev => prev + val.cart_qty)
            })

            setCartIndi('indicator showIndicator')

          } else if(res.status == 202) {
            setHasCartItems(false)
            setCartIndi('indicator')
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


	return (
		<div className="nav">
    <ToastContainer />
			<div className={upperNav}>
				<div className="logo">
          <Link href="/">
            <img src="/logo.png" alt="" />
           </Link>
        </div>
				<div className="upper_nav_svgs">
          <Link href="/account"><svg width="28" height="28" aria-hidden="true" focusable="false" role="presentation" className="icon icon-user" viewBox="0 0 64 64"><defs></defs><path className="cls-1" d="M35 39.84v-2.53c3.3-1.91 6-6.66 6-11.41 0-7.63 0-13.82-9-13.82s-9 6.19-9 13.82c0 4.75 2.7 9.51 6 11.41v2.53c-10.18.85-18 6-18 12.16h42c0-6.19-7.82-11.31-18-12.16z"></path></svg></Link>
					<svg onClick={openSearchOverlay} aria-hidden="true" width="28" height="28" focusable="false" role="presentation" className="icon icon-search" viewBox="0 0 64 64"><defs></defs><path className="cls-1" d="M47.16 28.58A18.58 18.58 0 1 1 28.58 10a18.58 18.58 0 0 1 18.58 18.58zM54 54L41.94 42"></path></svg>
        	<svg onClick={openOverlay} aria-hidden="true" width="28" height="28" focusable="false" role="presentation" className="icon icon-hamburger" viewBox="0 0 64 64"><defs></defs><path className="cls-1" d="M7 15h51M7 32h43M7 49h51"></path></svg>
          <div className="cartIcon">
            <svg onClick={openCartOverlay} aria-hidden="true" width="28" height="28" focusable="false" role="presentation" className="icon icon-cart" viewBox="0 0 64 64"><defs></defs><path className="cls-1" d="M14 17.44h46.79l-7.94 25.61H20.96l-9.65-35.1H3"></path><circle cx="27" cy="53" r="2"></circle><circle cx="47" cy="53" r="2"></circle></svg>
            <div className={cartIndi}></div>
          </div>	
        </div>
			</div>

			<div className="lower_nav">
        <div>
          <Link href="/">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3,13h1v2v5c0,1.103,0.897,2,2,2h12c1.103,0,2-0.897,2-2v-5v-2h1c0.404,0,0.77-0.244,0.924-0.617 c0.155-0.374,0.069-0.804-0.217-1.09l-9-9c-0.391-0.391-1.023-0.391-1.414,0l-9,9c-0.286,0.286-0.372,0.716-0.217,1.09 C2.231,12.756,2.596,13,3,13z M12,4.414l6,6V15l0,0l0.001,5H6v-5v-3v-1.585L12,4.414z"></path><path d="M12,17c2.206,0,4-1.794,4-4s-1.794-4-4-4c-2.206,0-4,1.794-4,4S9.794,17,12,17z M12,11c1.103,0,2,0.897,2,2s-0.897,2-2,2 c-1.103,0-2-0.897-2-2S10.897,11,12,11z"></path></svg>
          </Link>
        </div>
        <div>
        	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20,11V4h-7l2.793,2.793l-4.322,4.322C10.49,10.416,9.294,10,8,10c-3.309,0-6,2.691-6,6s2.691,6,6,6s6-2.691,6-6 c0-1.294-0.416-2.49-1.115-3.471l4.322-4.322L20,11z M8,20c-2.206,0-4-1.794-4-4s1.794-4,4-4s4,1.794,4,4S10.206,20,8,20z"></path></svg>
        </div>
        <div>
        	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12,2C8.691,2,6,4.691,6,8c0,2.967,2.167,5.432,5,5.91V17H8v2h3v2.988h2V19h3v-2h-3v-3.09c2.833-0.479,5-2.943,5-5.91 C18,4.691,15.309,2,12,2z M12,12c-2.206,0-4-1.794-4-4s1.794-4,4-4c2.206,0,4,1.794,4,4S14.206,12,12,12z"></path></svg>
        </div>
        <div>
          <Link href="/account">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle fill="none" cx="12" cy="7" r="3"></circle><path d="M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5S14.757 2 12 2zM12 10c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3S13.654 10 12 10zM21 21v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h2v-1c0-2.757 2.243-5 5-5h4c2.757 0 5 2.243 5 5v1H21z"></path></svg>
          </Link>
        </div>
			</div>

      <div className={searchOverlay}>
        <svg aria-hidden="true" width="28" height="28" focusable="false" role="presentation" className="icon icon-search" viewBox="0 0 64 64"><defs></defs><path className="cls-1" d="M47.16 28.58A18.58 18.58 0 1 1 28.58 10a18.58 18.58 0 0 1 18.58 18.58zM54 54L41.94 42"></path></svg>
        <input type="search" ref={searchInput} id="search" name="search" placeholder="Search our store" />
        <svg onClick={closeOverlay} aria-hidden="true" width="28" height="28" focusable="false" role="presentation" className="icon icon-close" viewBox="0 0 64 64"><defs></defs><path className="cls-1" d="M19 17.61l27.12 27.13m0-27.12L19 44.74"></path></svg>
      </div>

      <div onClick={closeOverlay} className={navOverlayClickOutside}></div>

      <div className={navOverlay}>
        <div onClick={closeOverlay} className="closeNavBtn">
          <svg aria-hidden="true" width="28" height="28" focusable="false" role="presentation" className="icon icon-close" viewBox="0 0 64 64"><defs></defs><path className="cls-1" d="M19 17.61l27.12 27.13m0-27.12L19 44.74"></path></svg>
        </div>
        <div className="navOptions">
          <Link href="/products"><div className="navOp collections">Products</div></Link>
          <div className="navOp men">Categories</div>
          <div className="navOp women">Women</div>
          <div className="navOp innerwear">Men</div>
          <div className="navOp sale">Sale</div>
        </div>
      </div>


      <div className={cartOverlay}>
        <div className="closeCartOverlayBtn">
          Cart
          <svg onClick={closeOverlay} aria-hidden="true" width="28" height="28" focusable="false" role="presentation" className="icon icon-close" viewBox="0 0 64 64"><defs></defs><path className="cls-1" d="M19 17.61l27.12 27.13m0-27.12L19 44.74"></path></svg>
        </div>
        <hr />
        <div className="cartItems">
          {hascartItems ? (
            <div className="bucket">
              {cartItems.map((val, key) => {

                return (
                  <div key={key} className="itemCart">
                    <img src={`https://res.cloudinary.com/christianparanas/image/upload/v1617305941/Ecommerce/Products/${val.cart_p_image}`} alt="product image" /> 
                    <div className="itemCart_details">
                      <div className="aa">{ val.cart_p_name }</div>
                      <div className="aa">₱{ val.cart_p_price }</div>

                      <div className="changequan">
                        <div className="aa" onClick={() => changeQuan(2, val.cart_id, val.cart_qty, val.cart_p_stock)} >
                          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg>
                        </div>
                        <div>{ val.cart_qty }</div>
                        <div className="aa" onClick={() => changeQuan(1, val.cart_id, val.cart_qty, val.cart_p_stock)}>
                          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}

              <div className="review_cart">
                <div className="review_cart_head">
                  <div>TOTAL</div>
                  <div>₱{subtotal}</div>
                  
                </div>
                <Link href="/cart">
                  <div className="review_cartBtn">
                    Review My Cart
                  </div>
                </Link>
              </div>
            </div>

            ) : (<div className="empty_lbl">Cart is empty</div>)}
        </div>
      </div>

      
    </div>
	)
}
