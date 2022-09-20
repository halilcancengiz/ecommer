/* eslint-disable react-hooks/exhaustive-deps */
import alertify from 'alertifyjs'
import React, { memo, useEffect } from 'react'
import { useBasketContext } from "../../context/BasketContext"
import Loading from "../../components/loading/Loading"
import "./basket.css"

const Basket = () => {
  const { getBasketFromDatabase, currentBasket, clearBasket, deleteProductFromBasket, increaseProductCount, decreaseProductCount } = useBasketContext()

  useEffect(() => {
    getBasketFromDatabase()
  }, [])

  const handleDeleteAllBasket = (myproduct) => {
    alertify.confirm('Sepetteki Tüm Ürünleri Silmek İstediğinize Emin misiniz?',
      function () {
        clearBasket()
        alertify.success('Sepet Temizlendi', 1.5)
      },
      function () {
        alertify.error('Sepet Temizleme İptal Edildi', 1.5)
      });
  }
  const handleDeleteProductFromBasket = (product) => {
    alertify.confirm('Ürünü Sepetten Kaldırmak İstediğinize Emin misiniz?',
      function () {
        deleteProductFromBasket(product)
        alertify.success('Ürün Kaldırıldı.', 1.5)
      },
      function () {
        alertify.error('Ürün Silme İşlemi iptal Edildi.', 1.5)
      });
  }
  const handleDecreaseProductCount = (product) => {
    decreaseProductCount(product)
  }
  const handleIncreaseProductCount = (product) => {
    increaseProductCount(product)
  }
  return (
    <div className='h-100'>
      <div className='bg-transperent mx-auto my-5 container row'>
        <div id='shoppingbasketHeaderContainer' className='d-flex align-items-center justify-content-between bg-white p-2 mb-3 col-12'>
          <h6 className='fs-5 fw-bold p-0 m-0 ms-2' >Shopping Basket</h6>
          <button onClick={handleDeleteAllBasket} className={`${currentBasket.length < 2 ? "d-none" : "d-block me-2 text-danger"}`}>Remove All</button>
        </div>
        <div className='col-12'>
          {currentBasket.length < 0 ? <Loading /> : currentBasket.map(product => (
            <div key={product.id} className="container w-100 p-0">
              <div className="basketProductContainer row mt-3 bg-white ">

                <div className="col-lg-3 col-sm-6 col-xs-10 d-flex align-items-center justify-content-center">
                  <div className='basketProductImageContainer w-75 h-100'>
                    <img className='w-100 h-100 p-2' src={product.url} alt={product.title} />
                  </div>
                </div>

                <div className="basketProductTitleContainer col-lg-3 col-sm-6 col-xs-10 d-flex align-items-center justify-content-center flex-column">

                  <div className='basketProductTitle d-flex align-items-center justify-content-center fs-4 fw-bold'>
                    {product.title}
                  </div>
                  <div className='freeShipping d-flex align-items-center justify-content-center flex-row'>
                    {
                      product.shippingtype === "fast" ? (
                        <div className='bg-primary text-white rounded-pill px-2 py-1'>
                          <i className="fa-solid fa-truck-fast"></i>
                          <span className='ms-2'>Hızlı Kargo</span>
                        </div>
                      ) : product.shippingtype === "free" ? (
                        <div className='bg-dark text-white rounded-pill px-2 py-1'>
                          <i className="fa-solid fa-truck"></i>
                          <span className='ms-2'>Ücretsiz Kargo</span>
                        </div>
                      ) : (
                        <div className='bg-danger text-white rounded-pill px-2 py-1'>
                          <i className="fa-solid fa-circle-xmark"></i>
                          <span className='ms-2'>Ücretli Kargo</span>
                        </div>
                      )
                    }
                  </div>

                </div>

                <div className="col-lg-3 col-sm-6 col-xs-10 d-flex align-items-center justify-content-center">
                  <div className='basketProductQuantity d-flex align-items-center justify-content-center fs-4'>

                    <button onClick={() => handleDecreaseProductCount(product)} className='bg-dark text-white d-flex align-items-center justify-content-center rounded-circle'>-</button>
                    <div className='badge badge-white bg-white text-dark mx-3'>{product.productCount}</div>
                    <button onClick={() => handleIncreaseProductCount(product)} className='bg-dark text-white d-flex align-items-center justify-content-center rounded-circle'>+</button>

                  </div>
                </div>

                <div className="col-lg-3 col-sm-6 col-xs-10 d-flex align-items-center justify-content-center">
                  <div className='basketProductInfoContainer d-flex align-items-center justify-content-center flex-column col-lg-3 col-md-6 h-100 fs-5'>
                    <div className="basketProductPrice fw-bold">
                      {`${product.price} ${product.moneytype}`}
                    </div>
                    <button onClick={() => handleDeleteProductFromBasket(product)} className='basketProductRemoveIcon btn btn-transperent text-danger border-0 '>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))

          }

        </div>


      </div>
    </div>
  )
}
// {
//   currentBasket && currentBasket.map(basket => (
//     <div key={basket.id}>{basket.title}</div>
//   ))
// }
export default memo(Basket)



//




        
//       </div>
//     </div>
//   ))
// }