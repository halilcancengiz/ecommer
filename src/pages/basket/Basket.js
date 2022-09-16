/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect } from 'react'
import { useBasketContext } from "../../context/BasketContext"
import "./basket.css"

const Basket = () => {
  const { getBasketFromDatabase, currentBasket } = useBasketContext()

  useEffect(() => {
    getBasketFromDatabase()
  }, [])

  return (
    <>
      <div className='bg-transperent my-5 container row'>
        <div className='d-flex align-items-center justify-content-between'>
          <h6>Shopping Cart</h6>
          <button className={`${currentBasket.length < 2 ? "d-none" : "btn btn-danger"}`}>Remove All</button>
        </div>
        {
          currentBasket && currentBasket.map(product => (
            <div key={product.id} className='basketProductContainer d-flex align-items-center justify-content-center flex-row bg-white my-2 text-dark border'>

              <div className='basketProductImageContainer col-lg-3 h-100 d-flex align-items-center justify-content-center'>
                <img className='h-75' src={product.url} alt={product.title} />
              </div>

              <div className='basketProductTitleContainer flex-column d-flex align-items-center justify-content-center col-lg-4 h-100'>
                <div className='basketProductTitle d-flex align-items-center justify-content-center fs-4 fw-bold'>
                  {product.title}
                </div>
                <div className='freeShipping d-flex align-items-center justify-content-center flex-row border py-1 px-2 border-dark rounded-pill'>
                  <i className="fa-solid fa-truck"></i>
                  <span className='ms-2'>Ücretsiz Kargo</span>
                </div>
              </div>

              <div className='basketProductQuantity d-flex align-items-center justify-content-center col-lg-2 h-100 fs-4'>
                <div className='px-2 bg-white text-dark rounded-circle'>-</div>
                <div className='badge badge-white bg-white text-dark mx-3'>
                  0
                </div>
                <div className='px-2 bg-white text-dark rounded-circle'>+</div>
              </div>

              <div className='basketProductInfoContainer d-flex align-items-center justify-content-center flex-column col-lg-3 h-100 fs-5'>
                <div className="basketProductPrice">
                  {`${product.price} ${product.moneytype}`}
                </div>
                <button className='basketProductRemoveIcon btn btn-transperent text-danger border-0 '>
                  Remove
                </button>
              </div>

            </div>
          ))
        }

      </div>
    </>
  )
}
// {
//   currentBasket && currentBasket.map(basket => (
//     <div key={basket.id}>{basket.title}</div>
//   ))
// }
export default memo(Basket)