import { createContext, useContext, useState } from 'react';
import { onValue, ref, remove, set, update } from 'firebase/database';
import { db } from '../Firebase';
import { useUserContext } from '../context/UserContext';
import alertify from 'alertifyjs';

const ProductContext = createContext()

export const ProductContextProvider = ({ children }) => {
    const { userInfo } = useUserContext();

    const currentUid = userInfo.uid;
    const date = `${new Date()}`;
    const [base64Image, setBase64Image] = useState()
    const [allProducts, setAllProducts] = useState([])
    const productID = allProducts.length


    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result)
            }
            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }

    const addProductToDb = async (title, description, category, price, url) => {
        await set(ref(db, "/products/" + productID), {
            id: productID,
            createdAt: date,
            createdWho: currentUid,
            title: title,
            description: description,
            category: category,
            price: price,
            url: url
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
    const deleteProduct = async (product) => {
        await remove(ref(db, `/products/${product}`))
    }

    const updateProduct = async (product, title, description, category, price, url) => {
        try {
            await update(ref(db, `/products/${product}`), {
                title: title,
                description: description,
                category: category,
                price: price,
                updatedAt: date,
                url: url
            })
            alertify.success("Ürün Başarıyla Güncellendi.")
        } catch (error) {
            console.log(error)
            alertify.error("Ürün Güncelleme İşlemi Başarısız")
        }
    }


    const values = {
        allProducts,
        getProductsFromDatabase,
        addProductToDb,
        deleteProduct,
        updateProduct,
        convertBase64,
        setBase64Image,
        base64Image
    }
    return (
        <ProductContext.Provider value={values}>
            {children}
        </ProductContext.Provider>)
}
export const useProductContext = () => useContext(ProductContext)