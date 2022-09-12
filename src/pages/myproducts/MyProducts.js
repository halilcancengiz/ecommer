/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useProductContext } from '../../context/ProductContext'
import { useUserContext } from '../../context/UserContext'
import { useEffect } from 'react'
import "./myproducts.css"
import alertify from 'alertifyjs';

const MyProducts = () => {

    const { allProducts, getProductsFromDatabase, deleteProduct } = useProductContext()
    const { userInfo } = useUserContext()
    const filteredProduct = allProducts.filter((x) => x.createdWho === userInfo.uid)

    const tableCategoryHeader = [
        { id: 1, value: "Image" },
        { id: 2, value: "name" },
        { id: 3, value: "description" },
        { id: 4, value: "Category" },
        { id: 5, value: "Price" },
        { id: 6, value: "Edit" },
        { id: 7, value: "Delete" },
    ]

    useEffect(() => {
        getProductsFromDatabase()
    }, [])

    const handleDelete = (myproduct) => {
        alertify.confirm('Ürünü Silmek İstediğinize Emin Misiniz ?',
            function () {
                deleteProduct(myproduct.id)
                alertify.success('Silme İşlemi Başarılı', 1.5)
            },
            function () {
                alertify.error('Silme İşlemi İptal Edildi', 1.5)
            });
    }

    return (
        <div>
            <div className="tableContainer mt-5">
                <table >
                    <thead className='bg-dark text-white'>
                        <tr>
                            {
                                tableCategoryHeader && tableCategoryHeader.map(header => (
                                    <th className='text-uppercase' key={header.id}>{header.value}</th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredProduct.length === 0 ? <div className='text-danger'>Hiç Ürününüz Bulunmamaktadır</div> : filteredProduct.map((myproduct, index) => (
                                <tr key={myproduct.id}>
                                    <td> <img width={80} height={80}
                                        className="p-2"
                                        src="https://teknotower.com/wp-content/uploads/2019/10/best-gaming-pc-2020.jpg"
                                        alt={myproduct.title} />
                                    </td>
                                    <td><span className='d-flex align-items-center justify-content-center h-100'>{myproduct.title}</span></td>
                                    <td><span className='d-flex align-items-center justify-content-center h-100'>{`${myproduct.description.slice(0, 10)} ...`}</span></td>
                                    <td><span className='d-flex align-items-center justify-content-center h-100'>{myproduct.category}</span></td>
                                    <td><span className='d-flex align-items-center justify-content-center h-100'>{`${myproduct.price} TL`}</span></td>
                                    <td><span className='d-flex align-items-center justify-content-center h-100'><i className="fa-solid fa-file-pen "></i></span></td>
                                    <td><span className='d-flex align-items-center justify-content-center h-100'><i onClick={() => handleDelete(myproduct)} className="fa-solid fa-trash-can "></i></span></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div >
    )
}

export default MyProducts


