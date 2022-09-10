import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import ProductList from '../../components/productList/ProductList'


const Home = () => {
  return (
    <div style={{ minHeight: "100vh" }} className='homeContainer'>
      <Navbar />
      <div className='mx-auto w-75 my-auto h-100'>
        <ProductList />
      </div>
    </div>
  )
}

export default Home