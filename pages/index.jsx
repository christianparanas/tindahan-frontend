import Head from 'next/head'
import { useEffect, useState } from 'react'

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


  return (
    <div>
      <Head>
        <title>Tindahan</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mainWrapper">
        <div className="hero">
          <Nav />
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
          <h2>Fresh Drops</h2>
           <div className="itemSlider">
            <HomeProductContainer />
            <HomeProductContainer />
            <HomeProductContainer />
            <HomeProductContainer />
            <div className="FreshDrops_viewAllProducts">
              <div className="content">View all 256 products</div>
            </div>
           </div>
         </div>
         <div className="contentSales">
          <img src="https://cdn.shopify.com/s/files/1/2282/7539/files/COLLECTION_PAGE_2380x1000_5a02a576-69c9-4feb-833d-4c4028c8bd27_540x.jpg?v=1615980138" alt="" />
          <img src="https://cdn.shopify.com/s/files/1/2282/7539/files/DOTCOM_COLLECTION_HIGHLIGHT_2380x1000px_TIME_TO_EXPLORE.jpg?v=1613383288" alt="" />
          <img src="https://cdn.shopify.com/s/files/1/2282/7539/files/POSITIVITEES_HOMEPAGE_w_2380_h_1000.jpg?v=1611536283" alt="" />
         </div>
        </div>

        <Footer />
      </main>
    </div>
  )
}
