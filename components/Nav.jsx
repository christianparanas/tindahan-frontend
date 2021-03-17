import { useState, useRef } from 'react' 

// libs
import Icon from "awesome-react-icons";

// components

export default function Nav() {
  const searchInput = useRef(null);
  const [searchOverlay, setSearchOverlay] = useState('searchWrapper')
  const [navOverlay, setNavOverlay] = useState('navOverlay-sidebar')
  const [cartOverlay, setCartOverlay] = useState('cartOverlay')
  const [navOverlayClickOutside, setNavOverlayClickOutside] = useState('navOverlay-clickOutside')

  const openOverlay = () => {
    setNavOverlay('navOverlay-sidebar sidebarShow')
    setNavOverlayClickOutside('navOverlay-clickOutside clickOutsideShow')
  }

  const closeOverlay = () => {
    setNavOverlay('navOverlay-sidebar')
    setNavOverlayClickOutside('navOverlay-clickOutside')
    setSearchOverlay('searchWrapper')
    setCartOverlay('cartOverlay')
  }

  const openSearchOverlay = () => {
    setNavOverlayClickOutside('navOverlay-clickOutside clickOutsideShow')
    setSearchOverlay('searchWrapper showSearch')
    searchInput.current.focus();
  }

  const openCartOverlay = () => {
    setNavOverlayClickOutside('navOverlay-clickOutside clickOutsideShow')
    setCartOverlay('cartOverlay showCartOverlay')
  }


	return (
		<div className="nav">
			<div className="upper_nav">
				<div className="logo">
          <img className="medium-up--hide" src="//cdn.shopify.com/s/files/1/2282/7539/files/Penshoppe-Logo_5d6ee642-f0b7-410e-a84b-ea40f824b99d_150x.png?v=1609750000" srcSet="//cdn.shopify.com/s/files/1/2282/7539/files/Penshoppe-Logo_5d6ee642-f0b7-410e-a84b-ea40f824b99d_150x.png?v=1609750000 1x, //cdn.shopify.com/s/files/1/2282/7539/files/Penshoppe-Logo_5d6ee642-f0b7-410e-a84b-ea40f824b99d_150x@2x.png?v=1609750000 2x" alt="PENSHOPPE" />
        </div>
				<div className="upper_nav_svgs">
					<svg onClick={openSearchOverlay} aria-hidden="true" width="28" height="28" focusable="false" role="presentation" className="icon icon-search" viewBox="0 0 64 64"><defs></defs><path className="cls-1" d="M47.16 28.58A18.58 18.58 0 1 1 28.58 10a18.58 18.58 0 0 1 18.58 18.58zM54 54L41.94 42"></path></svg>
        	<svg onClick={openOverlay} aria-hidden="true" width="28" height="28" focusable="false" role="presentation" className="icon icon-hamburger" viewBox="0 0 64 64"><defs></defs><path className="cls-1" d="M7 15h51M7 32h43M7 49h51"></path></svg>
        	<svg onClick={openCartOverlay} aria-hidden="true" width="28" height="28" focusable="false" role="presentation" className="icon icon-cart" viewBox="0 0 64 64"><defs></defs><path className="cls-1" d="M14 17.44h46.79l-7.94 25.61H20.96l-9.65-35.1H3"></path><circle cx="27" cy="53" r="2"></circle><circle cx="47" cy="53" r="2"></circle></svg>
				</div>
			</div>

			<div className="lower_nav">
        <div>
        	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3,13h1v2v5c0,1.103,0.897,2,2,2h12c1.103,0,2-0.897,2-2v-5v-2h1c0.404,0,0.77-0.244,0.924-0.617 c0.155-0.374,0.069-0.804-0.217-1.09l-9-9c-0.391-0.391-1.023-0.391-1.414,0l-9,9c-0.286,0.286-0.372,0.716-0.217,1.09 C2.231,12.756,2.596,13,3,13z M12,4.414l6,6V15l0,0l0.001,5H6v-5v-3v-1.585L12,4.414z"></path><path d="M12,17c2.206,0,4-1.794,4-4s-1.794-4-4-4c-2.206,0-4,1.794-4,4S9.794,17,12,17z M12,11c1.103,0,2,0.897,2,2s-0.897,2-2,2 c-1.103,0-2-0.897-2-2S10.897,11,12,11z"></path></svg>
        </div>
        <div>
        	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20,11V4h-7l2.793,2.793l-4.322,4.322C10.49,10.416,9.294,10,8,10c-3.309,0-6,2.691-6,6s2.691,6,6,6s6-2.691,6-6 c0-1.294-0.416-2.49-1.115-3.471l4.322-4.322L20,11z M8,20c-2.206,0-4-1.794-4-4s1.794-4,4-4s4,1.794,4,4S10.206,20,8,20z"></path></svg>
        </div>
        <div>
        	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12,2C8.691,2,6,4.691,6,8c0,2.967,2.167,5.432,5,5.91V17H8v2h3v2.988h2V19h3v-2h-3v-3.09c2.833-0.479,5-2.943,5-5.91 C18,4.691,15.309,2,12,2z M12,12c-2.206,0-4-1.794-4-4s1.794-4,4-4c2.206,0,4,1.794,4,4S14.206,12,12,12z"></path></svg>
        </div>
        <div>
        	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle fill="none" cx="12" cy="7" r="3"></circle><path d="M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5S14.757 2 12 2zM12 10c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3S13.654 10 12 10zM21 21v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h2v-1c0-2.757 2.243-5 5-5h4c2.757 0 5 2.243 5 5v1H21z"></path></svg>
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
          <div className="navOp collections">Collections</div>
          <div className="navOp men">Men</div>
          <div className="navOp women">Women</div>
          <div className="navOp innerwear">Innerwear</div>
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
          <div className="item">
            Your cart is currently empty
          </div>
        </div>
      </div>

      
    </div>
	)
}