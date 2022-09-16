import React, { useState, memo } from 'react'
import "./addproduct.css"
import { useProductContext } from '../../../context/ProductContext';
import alertify from 'alertifyjs';



const AddProduct = () => {
    const { addProductToDb, base64Image, setBase64Image, convertBase64 } = useProductContext();

    const [newProduct, setNewProduct] = useState({
        title: "",
        description: "",
        category: "",
        price: "",
        moneytype: "",
        quantity: "",
        shippingtype: ""
    })

    const handleSubmitProductForm = (e) => {
        e.preventDefault()
        if (newProduct.title !== "" && newProduct.description !== "" && newProduct.category !== "" && newProduct.price !== "" && newProduct.moneytype !== "" && newProduct.url !== "" && newProduct.quantity !== "" && newProduct.shippingtype !== "") {
            addProductToDb(newProduct, base64Image)
            setNewProduct({
                title: "",
                description: "",
                category: "",
                price: "",
                moneytype: "",
                quantity: "",
                shippingtype: "",
                url: ""
            })
            setBase64Image("")
            alertify.success("Ekleme İşlemi Başarılı")
        }
        else {
            alertify.error("Lütfen Tüm Alanları Doldurunuz")
        }

    }

    const uploadImage = async (e) => {
        // console.log(e.target.files);
        const file = e.target.files[0]
        const base64 = await convertBase64(file)
        setBase64Image(base64)
    }

    const handleChangeProductForm = (e) => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
    }

    return (
        <div style={{ marginTop: "30px" }}>
            <h5 className='border-bottom d-inline-block border-dark'>New Product</h5>
            <form onSubmit={handleSubmitProductForm} id='addproductForm' className='row container mx-auto'>
                <label className='d-flex p-0 mb-1' htmlFor="productTitle">Product Name :</label>
                <input onChange={handleChangeProductForm} value={newProduct.title} name="title" className='mb-3' type="text" id="productTitle" placeholder='product Title' />

                <label className='d-flex p-0 mb-1' htmlFor="productDescription">Product Description :</label>
                <input onChange={handleChangeProductForm} value={newProduct.description} name="description" className='mb-3' type="text" id='productDescription' placeholder='Product Description' />

                <label className='d-flex p-0 mb-1' htmlFor="productCategory">Product Category :</label>
                <select onChange={handleChangeProductForm} value={newProduct.category} name="category" className='mb-3' id="productCategory">
                    <option value="" hidden>Select Category</option>
                    <option value="Elektronik">Elektronik</option>
                    <option value="Giyim">Giyim</option>
                    <option value="Otomobil">Otomobil</option>
                    <option value="Aksesuar">Aksesuar</option>
                    <option value="Ev Eşyaları">Ev Eşyaları</option>
                    <option value="Diğer">Diğer</option>
                </select>

                <label className='d-flex p-0 mb-1' htmlFor="productPrice">Product Price :</label>
                <input onChange={handleChangeProductForm} value={newProduct.price} name="price" className='mb-3' id='productPrice' type="number" placeholder='Product Price' />

                <label className='d-flex p-0 mb-1' htmlFor="moneytype">Money Type :</label>
                <select onChange={handleChangeProductForm} value={newProduct.moneytype} name="moneytype" className='mb-3' id="moneytype">
                    <option value="" hidden>Select Money Type</option>
                    <option value="₺">Türk Lirası</option>
                    <option value="€">Euro</option>
                    <option value="$">Dolar</option>
                </select>

                <label className='d-flex p-0 mb-1' htmlFor="quantity">Quantity :</label>
                <input onChange={handleChangeProductForm} value={newProduct.quantity} name="quantity" className='mb-3' id='quantity' type="number" placeholder='Product Quantity' />

                <label className='d-flex p-0 mb-1' htmlFor="shippingtype">Shipping Type :</label>
                <select onChange={handleChangeProductForm} value={newProduct.shippingtype} name="shippingtype" className='mb-3' id="shippingtype">
                    <option value="" hidden>Select Shipping Type</option>
                    <option value="fast">Fast</option>
                    <option value="free">Free</option>
                    <option value="notfree">Not Free</option>
                </select>

                <label className='d-flex p-0 mb-1' htmlFor="productUrl">Product URL :</label>
                <input onChange={(e) => uploadImage(e)} name="url" accept="image/*" className='mb-3' id='productUrl' type="file" />

                <button className="mb-3" id='addProductSubmitButton' type='submit'>Add Product</button>
            </form>
        </div>
    )
}

export default memo(AddProduct)