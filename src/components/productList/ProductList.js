/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, memo } from 'react'
import "./productlist.css"
import { useProductContext } from '../../context/ProductContext'
import { useBasketContext } from '../../context/BasketContext'
import { useFavoritesContext } from '../../context/FavoritesContext'
import Loading from '../loading/Loading'
import alertify from 'alertifyjs'
import { useNavigate } from 'react-router-dom';
import { Rate } from 'antd';


const ProductList = () => {
    const { allProducts, getProductsFromDatabase } = useProductContext()
    const { addProductToBasket, currentBasket } = useBasketContext()
    const { addFavorites, userFavorites } = useFavoritesContext()

    const navigate = useNavigate()
    // console.log();
    //* SEPET İŞLEMLERİ
    const handleAddProductToBasket = async (product) => {
        if (currentBasket.some(basket => basket.id === product.id) === true) {
            alertify.error("Ürün Sepette Mevcut", 1.5)
        }
        else {
            await addProductToBasket(product)
            alertify.success("Ürün Sepete Eklendi", 1.5)
        }
        console.log("handleAddProductToBasket rendered");
    }

    //* FAVORİ İŞLEMLERİ
    const handleAddProductToFavorites = async (product) => {
        if (userFavorites.some(favorite => favorite.id === product.id) === true) {
            alertify.error("Mevcut Ürün", 1.5)
        }
        else {
            await addFavorites(product)
            alertify.success("Ürün Favorilere Eklendi", 1.5)
        }
        console.log("handleAddProductToFavorites rendered");
    }

    //* ÜRÜN DETAY SAYFASI İŞLEMLERİ
    const navigatePrivateProduct = (product) => {
        navigate(`products/:${product.id}`, { replace: true });
        console.log("navigatePrivateProduct rendered");
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
                            <div onClick={() => navigatePrivateProduct(product)} className="cardImage w-100">
                                <img className='w-100 h-100' src={product.url} alt="product" />
                            </div>
                            <div className="cardBody d-flex align-items-center flex-column w-100">
                                <div className="cardHeader">
                                    <span>{product.title}</span>
                                </div>
                                <div className='cardDescription'>
                                    <p className='line-clamp3 px-2'>{product.description}</p>
                                </div>
                            </div>
                            <button onClick={() => handleAddProductToFavorites(product)} className='cardFavorite position-absolute'>
                                <i className="fa-solid fa-heart d-flex align-items-center justify-content-center"></i>
                            </button>
                            <div className='cardPrice w-100'>
                                <div className='h-100 d-flex align-items-center px-3 fw-bold'>{new Intl.NumberFormat().format(product.price)} <span className='ms-1'>{product.moneytype}</span></div>
                            </div>
                            <Rate allowHalf disabled value={3.5} className='rate' />
                            <button onClick={() => handleAddProductToBasket(product)} className='w-100 addToBasket'>Sepete Ekle</button>
                        </div>
                    ))
                }
            </div>


        </main>
    )
}

export default memo(ProductList)