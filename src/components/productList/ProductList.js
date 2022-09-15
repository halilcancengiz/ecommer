/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect,memo } from 'react'
import "./productlist.css"
import { useProductContext } from '../../context/ProductContext'
import { useBasketContext } from '../../context/BasketContext'
import Loading from '../loading/Loading'
import alertify from 'alertifyjs'


const ProductList = () => {
    const { allProducts, getProductsFromDatabase } = useProductContext()
    const { addProductToBasket, currentBasket } = useBasketContext()

    const handleAddProductToBasket = async (product) => {
        if (currentBasket.some(basket => basket.id === product.id)) {
            alertify.error("Ürün Sepette Mevcut")
        }
        else {
            await addProductToBasket(product)
            alertify.success("Ürün Sepete Eklendi")
        }
    }

    useEffect(() => {
        getProductsFromDatabase()
    }, [])

    return (
        <main>
            <div className="container d-flex align-items-center flex-wrap justify-content-center my-5">
                {
                    allProducts.length === 0 ? <Loading /> : allProducts.map((product, index) => (
                        <div key={product.id} className="cardContainer mx-4 position-relative my-4">
                            <div className="cardImage w-100">
                                <img className='w-100 h-100' src={product.url} alt="product" />
                            </div>
                            <div className="cardBody d-flex align-items-center flex-column w-100">
                                <div className="cardHeader">
                                    <span>{product.title}</span>
                                </div>
                                <div className='cardDescription'>
                                    <p className='line-clamp4 px-2'>{product.description}</p>
                                </div>
                            </div>
                            <button className='cardFavorite position-absolute'>
                                <i className="fa-solid fa-heart d-flex align-items-center justify-content-center"></i>
                            </button>
                            <div className='cardPrice w-100'>
                                <div className='h-100 d-flex align-items-center px-3 fw-bold'>{product.price} <span className='ms-1'>TL</span></div>
                            </div>
                            <button onClick={() => handleAddProductToBasket(product)} className='w-100 addToBasket'>Sepete Ekle</button>
                        </div>
                    ))
                }
            </div>


        </main>
    )
}

export default memo(ProductList)