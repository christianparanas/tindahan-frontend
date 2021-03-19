import '../styles/globals.scss'
import '../styles/login.scss'
import '../styles/account.scss'
import '../styles/Home.scss'
import '../styles/homeProductContainer.scss'
import '../styles/Footer.scss'

import { Provider } from 'next-auth/client'

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
