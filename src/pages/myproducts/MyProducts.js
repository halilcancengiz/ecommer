import React, { useState } from 'react'
import { useProductContext } from '../../context/ProductContext'
import UserProfile from '../../components/userprofile'
import { useUserContext } from '../../context/UserContext'
import { useEffect } from 'react'

const MyProducts = () => {

    const { allProducts, getProductsFromDatabase } = useProductContext()
    const { userInfo } = useUserContext()
    const { uid } = userInfo;
    console.log(allProducts);

    let filteredProduct = allProducts.filter((x) => x.createdWho === uid)


    useEffect(() => {
        getProductsFromDatabase()
    }, [])
    return (
        <div>
            <table className="table table-striped mt-5">
                <thead>
                    <tr>
                        <th scope="col">Product IMAGE</th>
                        <th scope="col">Product NAME</th>
                        <th scope="col">Product DESCRIPTION</th>
                        <th scope="col">Product PRICE</th>
                        <th scope="col">EDIT</th>
                        <th scope="col">DELETE</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredProduct.map((myproduct, index) => (
                            <tr key={myproduct.id}>
                                <th> <img width={100} height={100} src="https://www.incehesap.com/resim/urun/202203/62444be1298060.28822987_lmhkpfjgqneoi_500.jpg" alt={myproduct.title} /></th>
                                <td className='my-auto'>{myproduct.title}</td>
                                <td className=''>{`${myproduct.description.slice(0, 10)} ...`}</td>
                                <td className=''>{`${myproduct.price} TL`}</td>
                                <td className=''><i className="fa-solid fa-file-pen"></i></td>
                                <td className=''><i className="fa-solid fa-trash-can"></i></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default MyProducts


