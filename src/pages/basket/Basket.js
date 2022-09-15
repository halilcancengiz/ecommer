import React,{memo} from 'react'
import Navbar from '../../components/navbar/Navbar'

const Basket = () => {
  return (
    <div style={{minHeight:"100vh"}}>
        <Navbar/>
        <h3>Basket Page</h3>
    </div>
  )
}

export default memo(Basket)