/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useState, useEffect } from 'react';
import { useUserContext } from './UserContext';
import { ref, set, onValue, update } from 'firebase/database';
import { db } from '../Firebase';
import { remove } from 'firebase/database';
import alertify from 'alertifyjs';



const BasketContext = createContext()

export const BasketContextProvider = ({ children }) => {
    const { userInfo } = useUserContext()
    const [basket, setBasket] = useState()
    const [currentBasket, setCurrentBasket] = useState([])
    const productCount = 1

    const addProductToBasket = async (product) => {
        await set(ref(db, `/baskets/${userInfo.uid}/${product.id}`), {
            id: product.id,
            createdAt: product.createdAt,
            createdWho: product.createdWho,
            title: product.title,
            description: product.description,
            category: product.category,
            price: product.price,
            moneytype: product.moneytype,
            quantity: product.quantity,
            shippingtype: product.shippingtype,
            url: product.url,
            addingToCardBy: userInfo.uid,
            productCount
        });
    }

    const increaseProductCount = async (product) => {
        if (product.productCount < product.quantity) {
            await update(ref(db, `/baskets/${userInfo.uid}/${product.id}`), {
                productCount: product.productCount + 1
            })
        } else {
            alertify.error(`Bu ürün için en fazla ${product.quantity} sipariş verebilirsiniz.`)
        }

    }
    const decreaseProductCount = async (product) => {
        if (product.productCount > 1) {
            await update(ref(db, `/baskets/${userInfo.uid}/${product.id}`), {
                productCount: product.productCount - 1
            })
        }

        else {
            alertify.confirm('Ürünü Kaldırmak İstediğinize Emin Misiniz ?',
                function () {
                    deleteProductFromBasket(product)
                    alertify.success('Ürün Sepetten Kaldırıldı', 1.5)
                },
                function () {
                    alertify.error('Ürün Kaldırma İşlemi İptal Edildi', 1.5)
                });
        }


    }

    const clearBasket = async () => {
        try {
            await remove(ref(db, `baskets/${userInfo.uid}`))
        } catch (error) {
            console.log(error);
        }

    }
    const deleteProductFromBasket = async (product) => {
        try {
            await remove(ref(db, `baskets/${userInfo.uid}/${product.id}`))
        } catch (error) {
            console.log(error);
        }
    }

    const getBasketFromDatabase = async () => {
        onValue(ref(db, `baskets/${userInfo.uid}`), (snapshot) => {
            const data = snapshot.val()
            let dataList = [];
            if (data !== null && data !== undefined) {
                dataList = Object.values(data);
            }
            setCurrentBasket(dataList)
        })
    }


    const values = {
        addProductToBasket,
        getBasketFromDatabase,
        currentBasket,
        clearBasket,
        deleteProductFromBasket,
        increaseProductCount,
        decreaseProductCount
    }


    return (
        <BasketContext.Provider value={values}>
            {children}
        </BasketContext.Provider>)
}

export const useBasketContext = () => useContext(BasketContext)