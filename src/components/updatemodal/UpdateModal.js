import React, { useState } from 'react'
import { useProductContext } from '../../context/ProductContext'
import "./updatemodal.css"
import MyProducts from './../../pages/myproducts/MyProducts';
import  alertify  from 'alertifyjs';

const UpdateModal = ({ myproduct }) => {
    const { updateProduct } = useProductContext()
    const [isEdit, setIsEdit] = useState(false)
    const [updateProductInputValue, setUpdateProductInputValue] = useState({
        title: myproduct.title,
        description: myproduct.description,
        category: myproduct.category,
        price: myproduct.price,
    })

    const openUpdateModal = (e) => {
        setIsEdit(true)
        e.preventDefault()
    }
    const closeUpdateModal = (e) => {
        setIsEdit(false)
        alertify.error("Ürün Güncelleme İşlemi İptal Edildi.")
        e.preventDefault()
    }
    const handleChangeUpdatedProduct = (e) => {
        setUpdateProductInputValue({ ...updateProductInputValue, [e.target.name]: e.target.value })
    }
    const handleUpdateSubmit = async (e, myproduct) => {
        updateProduct(myproduct, updateProductInputValue.title, updateProductInputValue.description, updateProductInputValue.category, updateProductInputValue.price)
        setIsEdit(false)
        e.preventDefault()
    }
    return (
        <div>
            <button className='border-0 bg-info text-white px-3 py-1 rounded-pill' onClick={openUpdateModal}>
                <i className="fa-solid fa-file-pen"></i>
            </button>
            <div className={`${isEdit === false ? "d-none" : "w-100 h-100 updateModal"}`}>
                <div className="container-fluid row d-flex align-items-center justify-content-center h-100 p-0 g-0">
                    <form onSubmit={(e) => handleUpdateSubmit(e, myproduct.id)} className="updateModalForm d-flex align-items-center justify-content-center col-lg-4 col-md-6 col-sm-8 col-xs-8 bg-white flex-column">
                        <h4 className='text-uppercase'>Update Product</h4>
                        <input onChange={handleChangeUpdatedProduct} value={updateProductInputValue.title} className='mt-3' type="text" name='title' placeholder={myproduct.title} />
                        <input onChange={handleChangeUpdatedProduct} value={updateProductInputValue.description} className='mt-3' type="text" name='description' placeholder={myproduct.description} />
                        <select onChange={handleChangeUpdatedProduct} value={updateProductInputValue.category} name="category" className='mt-3'>
                            <option value={myproduct.category} hidden>{myproduct.category}</option>
                            <option value="Elektronik">Elektronik</option>
                            <option value="Giyim">Giyim</option>
                            <option value="Otomobil">Otomobil</option>
                            <option value="Aksesuar">Aksesuar</option>
                            <option value="Ev Eşyaları">Ev Eşyaları</option>
                            <option value="Diğer">Diğer</option>
                        </select>
                        <input onChange={handleChangeUpdatedProduct} value={updateProductInputValue.price} className='mt-3' type="text" name='price' placeholder={myproduct.price} />
                        <button onClick={closeUpdateModal} id='closeUpdateModalButton'>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                        <div id='updateFormButtonGroup' className='d-flex align-items-center justify-content-end w-75'>
                            <button type="submit" className='mt-3 py-1 px-2 ms-4 bg-white'>
                                Update
                            </button>
                            <button onClick={closeUpdateModal} className='mt-3 py-1 px-2 ms-4 bg-white'>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div >
    )
}

export default UpdateModal