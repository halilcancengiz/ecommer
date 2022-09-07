import React from 'react'
import Navbar from '../navbar/Navbar'
import ProductList from '../productList/ProductList'

const Home = () => {
  return (
    <div className='homeContainer'>
      <Navbar />
      <div className='mx-auto w-75'>
        <ProductList />
      </div>
    </div>
  )
}

export default Home