import { createContext, useContext, useState } from 'react';
import { onValue, ref, remove, set, update } from 'firebase/database';
import { db } from '../Firebase';
import { useUserContext } from '../context/UserContext';
import { uuidv4 } from '@firebase/util';
import alertify from 'alertifyjs';

const ProductContext = createContext()

export const ProductContextProvider = ({ children }) => {
    const { userInfo } = useUserContext();

    const currentUid = userInfo.uid; //* Giriş yapan kullanıcının idsini tutan değişken
    const date = `${new Date()}`;
    const [base64Image, setBase64Image] = useState()
    const [allProducts, setAllProducts] = useState([])
    const productID = uuidv4()

    //* Ürün Ekleme
    const addProductToDb = async (title, description, category, price, moneytype, url) => {
        await set(ref(db, "/products/" + productID), {
            id: productID,
            createdAt: date,
            createdWho: currentUid,
            title: title,
            description: description,
            category: category,
            price: price,
            moneytype: moneytype,
            url: url,
        });
    }

    //* Tüm Ürünleri Veritabanından Çekme
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

    //* Ürünü Veritabanından Silme
    const deleteProduct = async (product) => {
        await remove(ref(db, `/products/${product}`))
    }

    //* Image Dosyalarını Base64 Versiyonuna Çevirme
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

    const updateProduct = async (product, title, description, category, price, moneytype, url) => {
        try {
            await update(ref(db, `/products/${product}`), {
                title: title,
                description: description,
                category: category,
                price: price,
                moneytype: moneytype,
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