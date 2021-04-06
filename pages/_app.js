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


import { AuthContext } from '../Context/AuthContext'
import { useState } from 'react'
import { CookiesProvider } from 'react-cookie';


function MyApp({ Component, pageProps }) {

  return (
  	<CookiesProvider>
      <Component {...pageProps} />
    </CookiesProvider>
  )
}

export default MyApp
