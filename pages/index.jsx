import Head from 'next/head'
import styles from '../styles/Home.module.css'

// components
import Nav from '../components/Nav'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Nav />
      </main>
    </div>
  )
}
