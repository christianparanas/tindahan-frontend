import Head from 'next/head'
import styles from '../styles/Home.module.css'

// components
import Nav from '../components/Nav'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Tindahan</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.mainWrapper}>
        <div className={styles.hero}>
          <Nav />
        </div>

      </main>
    </div>
  )
}
