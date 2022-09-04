import React from 'react'
import "./productlist.css"

const ProductList = () => {
    return (
        <section>
            <div className="row container mx-auto">

                <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 d-flex align-items-center mt-4 justify-content-center">
                    <div className="cardContainer d-flex align-items-center justify-content-center flex-column">
                        <div className="cardImage">
                            <img className='w-100 h-100' src="https://cdn.motor1.com/images/mgl/vEJmQ/s1/bmw-i8-m-rendering.jpg" alt="" />
                        </div>
                        <div className="cardBody d-flex align-items-center flex-column">
                            <div className="cardTitle my-1">
                                <h6 className='mb-0 fw-bold text-uppercase'>Product Title</h6>
                            </div>
                            <div className="cardDescription w-100 my-1">
                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim atque fuga dolore ullam iure praesentium.</p>
                            </div>
                        </div>
                        <div className="cardFooter d-flex align-items-center justify-content-around flex-row text-center w-100 my-2 ">
                            <button >İncele</button>
                            <button >Sepete Ekle</button>
                        </div>
                        <button className="favorite rounded-circle d-flex align-items-center justify-content-center">
                            <i className="fa-solid fa-heart"></i>
                        </button>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default ProductList