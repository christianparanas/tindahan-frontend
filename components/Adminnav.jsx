import { useState, useRef, useEffect } from 'react' 
import Link from 'next/link'

// libs
import Icon from "awesome-react-icons";
import { useCookies } from 'react-cookie';


export default function adminNav() {
	const [cookies, setCookie, removeCookie] = useCookies(['admin']);
	
	const [navOverlay, setNavOverlay] = useState('navOverlay-sidebar')
	const [navOverlayClickOutside, setNavOverlayClickOutside] = useState('navOverlay-clickOutside')

	const openOverlay = () => {
    setNavOverlay('navOverlay-sidebar sidebarShow')
    setNavOverlayClickOutside('navOverlay-clickOutside clickOutsideShow')
  }

   const closeOverlay = () => {
    setNavOverlay('navOverlay-sidebar')
    setNavOverlayClickOutside('navOverlay-clickOutside')
  }

  const logout = () => {
		removeCookie('admin')
	}

	return (
		<div className="admin_nav">
			<div className="icon_container">
				<div className="logo">
          <Link href="/admin">
            <h3>Admin Panel</h3>
           </Link>
        </div>
        <svg onClick={openOverlay} aria-hidden="true" width="28" height="28" focusable="false" role="presentation" className="icon icon-hamburger" viewBox="0 0 64 64"><defs></defs><path className="cls-1" d="M7 15h51M7 32h43M7 49h51"></path></svg>
			</div>

			<div onClick={closeOverlay} className={navOverlayClickOutside}></div>
      <div className={navOverlay}>
        <div onClick={closeOverlay} className="closeNavBtn">
          <svg aria-hidden="true" width="28" height="28" focusable="false" role="presentation" className="icon icon-close" viewBox="0 0 64 64"><defs></defs><path className="cls-1" d="M19 17.61l27.12 27.13m0-27.12L19 44.74"></path></svg>
        </div>
        <div className="navOptions">
          <Link href="/admin"><div className="navOp">Dashboard</div></Link>
          <Link href="/admin/customers/"><div className="navOp">Customers</div></Link>
          <Link href="/admin/products/"><div className="navOp">Products</div></Link>
          <Link href="/admin/orders/"><div className="navOp">Transactions</div></Link>
          <div className="navOp">Admin</div>
        </div>
        <div onClick={logout} className="admin_logout"><i className="fad fa-sign-out-alt"></i> Logout</div>
      </div>
		</div>
	)
}