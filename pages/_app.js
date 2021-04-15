import '../styles/globals.scss'
import '../styles/login.scss'
import '../styles/account.scss'
import '../styles/Home.scss'
import '../styles/homeProductContainer.scss'
import '../styles/Footer.scss'
import '../styles/products.scss'
import '../styles/adminAuth.scss'
import '../styles/admin.scss'
import '../styles/adminnav.scss'
import '../styles/Nav.scss'
import '../styles/adminProducts.scss'
import '../styles/adminCustomer.scss'
import '../styles/cart.scss'
import '../styles/search.scss'

import { AuthContext } from '../Context/AuthContext'
import { useState } from 'react'
import { CookiesProvider } from 'react-cookie';
import Head from "next/head";


function MyApp({ Component, pageProps }) {

  return (
  	<>
		<Head>
		// Responsive meta tag
		<meta name="viewport" content="width=device-width, initial-scale=1" />

			<link href="https://cdn.jsdelivr.net/gh/hung1001/font-awesome-pro@bf7775b/css/all.css" rel="stylesheet" type="text/css" />
		</Head>

  	<CookiesProvider>
      <Component {...pageProps} />
    </CookiesProvider>
    </>
  )
}

export default MyApp
