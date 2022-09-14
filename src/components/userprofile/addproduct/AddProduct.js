import React, { useState } from 'react'
import "./addproduct.css"
import { useProductContext } from '../../../context/ProductContext';
import alertify from 'alertifyjs';


const AddProduct = () => {
    const { addProductToDb,base64Image,setBase64Image,convertBase64 } = useProductContext();

    const [newProduct, setNewProduct] = useState({
        name: "",
        description: "",
        category: "",
        price: "",
        image: base64Image
    })

    const handleSubmitProductForm = (e) => {
        e.preventDefault()
        if (newProduct.name !== "" && newProduct.description !== "" && newProduct.category !== "" && newProduct.price !== "") {
            addProductToDb(newProduct.name, newProduct.description, newProduct.category, newProduct.price, base64Image)
            setNewProduct({
                name: "",
                description: "",
                category: "",
                price: "",
                image: ""
            })
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
        <div style={{ marginTop: "30px" }} className='w-100 h-100'>
            <h5 className='border-bottom d-inline-block border-dark'>New Product</h5>
            <form onSubmit={handleSubmitProductForm} id='addproductForm' className='row container mx-auto'>
                <label className='d-flex p-0 mb-1' htmlFor="productName">Product Name :</label>
                <input onChange={handleChangeProductForm} value={newProduct.name} name="name" className='mb-3' type="text" id="productName" placeholder='Product Name' />

                <label className='d-flex p-0 mb-1' htmlFor="productDescription">Product Description :</label>
                <input onChange={handleChangeProductForm} value={newProduct.description} name="description" className='mb-3' type="text" id='productDescription' placeholder='Product Description' />

                <label className='d-flex p-0 mb-1' htmlFor="productCategory">Product Category :</label>
                <select onChange={handleChangeProductForm} value={newProduct.category} name="category" className='mb-3' id="productCategory">
                    <option value="" hidden>Choose here</option>
                    <option value="Elektronik">Elektronik</option>
                    <option value="Giyim">Giyim</option>
                    <option value="Otomobil">Otomobil</option>
                    <option value="Aksesuar">Aksesuar</option>
                    <option value="Ev Eşyaları">Ev Eşyaları</option>
                    <option value="Diğer">Diğer</option>
                </select>

                <label className='d-flex p-0 mb-1' htmlFor="productPrice">Product Price :</label>
                <input onChange={handleChangeProductForm} value={newProduct.price} name="price" className='mb-3' id='productPrice' type="number" placeholder='Product Price' />

                <label className='d-flex p-0 mb-1' htmlFor="productImage">Product Image :</label>
                <input onChange={(e) => uploadImage(e)} name="image" className='mb-3' id='productImage' type="file" />

                <button className='mb-3' id='addProductSubmitButton' type='submit'>Add Product</button>
            </form>
        </div>
    )
}

export default AddProduct