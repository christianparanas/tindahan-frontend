
import Nav from '../components/Nav'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import axios from 'axios' 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from 'react-cookie';
import { isExpired, decodeToken } from "react-jwt";
import Router, { useRouter } from 'next/router'
import HomeProductContainer from '../components/HomeProductContainer'



export default function Search() {
	const router = useRouter()
	const [query, setQuery] = useState(router.query.search)
	const [queryKey, setQueryKey] = useState(router.query.search)

	const [productArr, setProductArr] = useState([])
  const [stateDB, setStateDB] = useState('Loading..')
  const [hasProductInDB, setHasProductInDB] = useState(false)


	const sendQuery = async () => {
		if(router.query.search != undefined) {
			setQuery(router.query.search)

			axios.post(process.env.BACKEND_BASEURL + "/searchitem", {
				query: await router.query.search,

			}).then(res => {
				console.log(res.data)

				if(res.status == 202) {
          setStateDB('No Item(s) found')
          setHasProductInDB(false)
        } else {
          // if there's a product, show the product map function
          setHasProductInDB(true)
          setProductArr(res.data.result)
        }

			}).catch((error) => {
        if(!error.status) {
          toast.error("Network Error!", { autoClose: 2000 });
          setStateDB("Network error, Please check your internet connection.")
        } 
        console.log(error)
      })
		}
	}

	// search btn in the search page
	const log = () => {
		if(query != "") {
			Router.push({
	        pathname: '/search',
	        query: { search: `${query}`},
	    })
			sendQuery()
		}
	}

	// run a search query if user input in the nav search bar
	useEffect(async () => {

		// call the send query function
		await sendQuery()
		console.log(router.query.search)
	}, [router.query])


	return (
		<>
			<div className="search_page">
				<ToastContainer />
				<Nav />

				<div className="search_main_wrapper">
					<div className="searchInput">
						<h2>Search</h2>
						<div className="searchCon">
							<input type="search" value={query || ""} onChange={(e) => setQuery(e.target.value)} />
							<div onClick={() => log()} className="searchIcon">
								<svg aria-hidden="true" width="28" height="28" focusable="false" role="presentation" className="icon icon-search" viewBox="0 0 64 64"><defs></defs><path className="cls-1" d="M47.16 28.58A18.58 18.58 0 1 1 28.58 10a18.58 18.58 0 0 1 18.58 18.58zM54 54L41.94 42"></path></svg>
							</div>
						</div>
					</div>

					{hasProductInDB && (<h3 className="resultCount">{productArr.length} {productArr.length > 1 ? "Results" : "Result"}</h3>)}
					<div className="search_results">
						{hasProductInDB ? (<>
            {productArr.map((val, key) => {
              return (
                <div key={key}>
                  <HomeProductContainer val={val} />
                </div>
              )
            })}
            </>) : ( <div className="state">{stateDB}</div> )}
					</div>
				</div>
			</div>
		</>
	)
}
