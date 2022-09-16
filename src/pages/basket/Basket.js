/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import { useBasketContext } from "../../context/BasketContext"

const Basket = () => {
  const { getBasketFromDatabase, currentBasket } = useBasketContext()

  useEffect(() => {
    getBasketFromDatabase()
  }, [])

  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />
      <div>
        {
          currentBasket && currentBasket.map(basket => (
            <div key={basket.id}>{basket.title}</div>
          ))
        }
      </div>
    </div>
  )
}

export default memo(Basket)