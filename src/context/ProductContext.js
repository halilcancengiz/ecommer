import { createContext, useContext, useState } from 'react';
import { onValue, ref, set } from 'firebase/database';
import { db } from '../Firebase';
import { useUserContext } from '../context/UserContext';

const ProductContext = createContext()

export const ProductContextProvider = ({ children }) => {
    const { userInfo } = useUserContext();

    const currentUid = userInfo.uid;
    const date = `${new Date()}`;

    const [allProducts, setAllProducts] = useState([])
    const productID = allProducts.length


    const addProductToDb = async (name, description, category, price) => {
        await set(ref(db, "/products/" + productID), {
            id: productID,
            createdAt: date,
            createdWho: currentUid,
            title: name,
            description: description,
            category: category,
            price: price
        });
    }

    const getProductsFromDatabase = async () => {
        await onValue(ref(db, "products"), (snapshot) => {
            const data = snapshot.val()
            let dataList = [];
            if (data !== null && data !== undefined) {
                dataList = Object.values(data);
            }
            setAllProducts(dataList)
        })
    }

    const values = {
        allProducts,
        getProductsFromDatabase,
        addProductToDb
    }
    return (
        <ProductContext.Provider value={values}>
            {children}
        </ProductContext.Provider>)
}
export const useProductContext = () => useContext(ProductContext)