
import Nav from '../../components/Nav'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import axios from 'axios' 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from 'react-cookie';
import { isExpired, decodeToken } from "react-jwt";
import { useRouter } from 'next/router'



export default function Search() {
	const [query, setQuery] = useState('')

	const log = () => {
		console.log(query)
	}

	return (
		<>
			<div className="search_page">
				<ToastContainer />
				<Nav />

				<div className="search_main_wrapper">
					<div className="searchInput">
						<h2>Search</h2>
						<div className="searchCon">
							<input type="text" onChange={(e) => setQuery(e.target.value)} />
							<div onClick={() => log()} className="searchIcon">
								<svg aria-hidden="true" width="28" height="28" focusable="false" role="presentation" className="icon icon-search" viewBox="0 0 64 64"><defs></defs><path className="cls-1" d="M47.16 28.58A18.58 18.58 0 1 1 28.58 10a18.58 18.58 0 0 1 18.58 18.58zM54 54L41.94 42"></path></svg>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}