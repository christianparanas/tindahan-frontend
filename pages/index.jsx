import Head from 'next/head'

import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from 'axios' 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from 'react-cookie';
import { isExpired, decodeToken } from "react-jwt";
import Link from 'next/link'

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';


// components
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import HomeProductContainer from '../components/HomeProductContainer'

export default function Home() {
  const carouselItems = [
    'https://cdn.shopify.com/s/files/1/2282/7539/products/954145-White_1_1800x1800.jpg?v=1615977044',
    'https://cdn.shopify.com/s/files/1/2282/7539/products/957114-Cream_1_1800x1800.jpg?v=1615249502',
    'https://cdn.shopify.com/s/files/1/2282/7539/products/956395-Maroon_1_1800x1800.jpg?v=1615977580',
    'https://cdn.shopify.com/s/files/1/2282/7539/products/954350-Light_Gray_1_1800x1800.jpg?v=1609213493'
  ]

  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [loading, setLoading] = useState(false)
  const [productArr, setProductArr] = useState([])
  const [stateDB, setStateDB] = useState('Loading..')
  const [hasProductInDB, setHasProductInDB] = useState(false)
  const [remainingproductcount, setRemainingproductcount] = useState(false)


  useEffect( async () => {
    checkAuth();

    axios.get(process.env.BACKEND_BASEURL + '/homefourproducts')
      .then( async res => {
          console.log(res.data)
          setProductArr(res.data.resultfour)
          setRemainingproductcount(res.data.resultlength)
          // check if there's a product in db, if none, set the message to no item
          if(res.status == 202) {
            setNoUser(true)
            setStateDB('No products')
          } else {
            // if there's a product, show the product map function
            setHasProductInDB(true)
          }
      }).catch((error) => {
        if(!error.status) {
          toast.error("Network Error!", { autoClose: 2000 });
          setStateDB("Network error, Please check your internet connection.")
        } 
        console.log(error)
      })

  }, [cookies])


  const checkAuth = async () => {
    if(cookies.user) {
      // verify token if valid or not expired
      const isMyTokenExpired = await isExpired(cookies.user.token);
      console.log(`is token expired? - ${isMyTokenExpired}`)

      // if expired, redirect to login page
      if(isMyTokenExpired == true) {
        logout()
      } else {
        setLoading(true)
      }
    }
  }

  const logout = () => {
    removeCookie('user')
  }

  return (
    <div>
      <Head>
        <title>Tindahan</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mainWrapper">
        <div className="hero">
          <Nav />
          <div className="landDesk">
            <img src="/landingDesk.jpg" alt="homeImg" />
          </div>
          <div className="carousel">
            <Carousel 
              autoPlay 
              showArrows={false} 
              showThumbs={false} 
              showStatus={false} 
              infiniteLoop={true}
              swipeable={true}>
              {carouselItems.map((val, key) => {
                return (
                  <div key={key}>
                    <img src={val} alt="cPic" />
                  </div>
                )
              })}  
            </Carousel>
          </div>
        </div>
        <div className="mainContentWrapper">
         <div className="freshDrops_horizontalDisplay">
          <div className="freshDrops">
            <h3>Products</h3>
            <Link href="/products"><h3 className="viewAll">See more</h3></Link>
          </div>
           <div className="itemSlider">
            {hasProductInDB ? (<>
            {productArr.map((val, key) => {
              return (
                <div key={key}>
                  <HomeProductContainer val={val} />
                </div>
              )
            })}
            <div className="FreshDrops_viewAllProducts">
              <Link href="products"><div className="content">View all { remainingproductcount } products</div></Link>
            </div>
            </>) : ( <div>{stateDB}</div> )}
           </div>
         </div>
         <div className="contentSales">
          Banners 
         </div>
        </div>

        <Footer />
      </main>
    </div>
  )
}
