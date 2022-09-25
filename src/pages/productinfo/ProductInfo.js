/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import { useProductContext } from '../../context/ProductContext'
import { useBasketContext } from '../../context/BasketContext'
import firstSwiperImage from "../../assets/bernd-dittrich-krhseyzjrYk-unsplash.jpg"
import secondSwiperImage from "../../assets/patrick-campanale-oCsQLKENz34-unsplash.jpg"
import "./productinfo.css"
import alertify from 'alertifyjs'
import { Rate } from 'antd'



const ProductInfo = () => {
    const { getProductsFromDatabase, allProducts } = useProductContext()
    const { currentBasket, addProductToBasket } = useBasketContext()
    const params = useParams()
    const productID = params.productid.slice(1,)
    const filteredSingleProduct = allProducts.filter(x => x.id === productID)
    const mainImageRef = useRef()

    const changeImage = (e) => {
        mainImageRef.current.src = e.target.src
    }
    const handleAddProductToBasket = async (product) => {
        if (currentBasket.some(basket => basket.id === product.id) === true) {
            alertify.error("Ürün Sepette Mevcut", 1.5)
        }
        else {
            await addProductToBasket(product)
            alertify.success("Ürün Sepete Eklendi", 1.5)
        }
    }
    const date = new Date()

    useEffect(() => {
        getProductsFromDatabase()

    }, [productID])


    return (
        <div>
            <Navbar />
            {
                filteredSingleProduct && filteredSingleProduct.map(product => (
                    <div key={product.id} className='container row mx-auto p-0 g-0 mt-5'>
                        <div id='productInfoImageContainer' className="col-lg-5 d-flex flex-column">
                            <div className="productInfoMainImage">
                                <img ref={mainImageRef} className='w-100' src={product.url} alt="" />
                                <div className='d-flex align-items-center justify-content-center fw-semibold text-uppercase'>
                                    {product.shippingtype}
                                </div>
                            </div>
                            <div className='productInfoOtherImages d-flex flex-row align-items-center justify-content-center mt-3'>
                                <div className="otherImage me-1">
                                    <img onClick={changeImage} className='w-100 h-100' src={product.url} alt="" />
                                </div>
                                <div className="otherImage mx-1">
                                    <img onClick={changeImage} className='w-100 h-100' src={firstSwiperImage} alt="" />
                                </div>
                                <div className="otherImage mx-1">
                                    <img onClick={changeImage} className='w-100 h-100' src={secondSwiperImage} alt="" />
                                </div>
                                <div className="otherImage ms-1">
                                    <img onClick={changeImage} className='w-100 h-100' src={firstSwiperImage} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-6 d-flex align-items-start justify-content-start flex-column px-5'>
                            <h3 className='mb-0 fw-bold'>{product.title}</h3>
                            <span className='fs-5 mt-2'>{product.price} {product.moneytype}</span>
                            <p className='text-start fs-6 mt-3'>{product.description}</p>
                            <button onClick={() => handleAddProductToBasket(product)} className='border-0 bg-success text-white px-3 text-uppercase fw-semibold rounded-2'>Add To Cart</button>
                        </div>
                    </div>
                ))
            }
            <div className='productCommentContainer mt-5'>
                <div className="container d-flex flex-column p-0 g-0">
                    <h3 style={{ borderTopRightRadius: "20px", borderBottomLeftRadius: "20px" }} className='text-start softblue text-white p-3'>User Comments</h3>
                    <div className='userCommentContainer mt-5 px-5 py-3'>
                        <div className='d-flex align-items-start flex-column'>
                            <div className='userCommentHeader d-flex align-items-center flex-wrap'>
                                <img className='userAvatar rounded-circle' src={firstSwiperImage} alt="" />
                                <div className='commentCreated'>
                                    <span className='fw-semibold'>Halil Can Cengiz</span>
                                    <span className='text-secondary text-center'>{`${date}`}</span>
                                </div>
                                <Rate className='fs-6' />
                            </div>
                            <div className='userComment mt-3 d-flex align-items-start text-start'>
                                <p className='m-0'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima explicabo nostrum enim cupiditate porro consequuntur perferendis magnam architecto rem itaque totam quos at quas adipisci officia nam, sunt labore deserunt? Nostrum illum, a possimus quisquam placeat repellendus quam iusto cumque et culpa assumenda dolores iure ex neque tenetur dolore eius!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductInfo
