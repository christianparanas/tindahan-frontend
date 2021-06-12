import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function sidebar( props ) {
	const [currentPage, setCurrentPage] = useState('')

	useEffect(() => {
		setCurrentPage(props.page)
		console.log(props)

	}, [])

	return (
				<div className="sidebar">
					<div className="sidebar_logo">
						<img src="/tindahan.png" alt="sidebar logo" />
					</div>
					<Link href="/">
						<div className="go_store logout_sidebar">
							<i className="fad fa-sign-out"></i>
							<h3>Logout</h3>
						</div>
					</Link>
					<Link href="/">
						<div className="go_store">
							<i className="fad fa-store"></i>
							<h3>Store</h3>
						</div>
					</Link>
					<div className="sidebar_options">
						<Link href="/admin">
								<div className={`s_op ${currentPage == 1 ? "cur_page" : "" }`}>
								<i className="far fa-home-lg"></i>
									Home
								</div>
						</Link>
						<Link href="/admin/customers/">
							<div className={`s_op ${currentPage == 2 ? "cur_page" : "" }`}>
								<i className="far fa-users"></i>
								Customers
							</div>
						</Link>
						<Link href="/admin/products/">
							<div className={`s_op ${currentPage == 3 ? "cur_page" : "" }`}>
								<i className="far fa-tshirt"></i>
								Products
							</div>
						</Link>
						<Link href="/admin/orders/">
							<div className={`s_op ${currentPage == 4 ? "cur_page" : "" }`}>
								<i className="far fa-credit-card-front"></i>
								Orders
						</div>
						</Link>
						<Link href="/admin/">
							<div className={`s_op ${currentPage == 5 ? "cur_page" : "" }`}>
								<i className="far fa-user-cog"></i>
								Admin
							</div>
						</Link>
					</div>
				</div>
	)
}