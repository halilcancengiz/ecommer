import React, { useState } from 'react'
import "./addproduct.css"

const AddProduct = () => {

    const [newProduct, setNewProduct] = useState({
        name: "",
        description: "",
        category: "",
        price: "",
        image: ""
    })

    const handleAddProductForm = (e) => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
    }
    return (
        <div style={{ marginTop: "30px" }} className='w-100 h-100'>
            <form id='addproductForm' className='row container mx-auto'>
                <label className='d-flex p-0 mb-1' htmlFor="productName">Product Name :</label>
                <input onChange={handleAddProductForm} value={newProduct.name} name="name" className='mb-3' type="text" id="productName" placeholder='Product Name' />

                <label className='d-flex p-0 mb-1' htmlFor="productDescription">Product Description :</label>
                <input onChange={handleAddProductForm} value={newProduct.description} name="description" className='mb-3' type="text" id='productDescription' placeholder='Product Description' />

                <label className='d-flex p-0 mb-1' htmlFor="productCategory">Product Category :</label>
                <select onChange={handleAddProductForm} value={newProduct.category} name="category" className='mb-3' id="productCategory">
                    <option value="Elektronik">Elektronik</option>
                    <option value="Giyim">Giyim</option>
                    <option value="Otomobil">Otomobil</option>
                    <option value="Aksesuar">Aksesuar</option>
                    <option value="Ev Eşyaları">Ev Eşyaları</option>
                    <option value="Diğer">Diğer</option>
                </select>

                <label className='d-flex p-0 mb-1' htmlFor="productPrice">Product Price :</label>
                <input onChange={handleAddProductForm} value={newProduct.price} name="price" className='mb-3' id='productPrice' type="number" placeholder='Product Price' />

                <label className='d-flex p-0 mb-1' htmlFor="productImage">Product Image :</label>
                <input onChange={handleAddProductForm} value={newProduct.image} name="image" className='mb-3' id='productImage' type="file" />

                <button id='addProductSubmitButton' type='submit'>Add Product</button>
            </form>
        </div>
    )
}

export default AddProduct