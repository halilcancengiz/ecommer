/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useState, useCallback } from 'react';
import { useUserContext } from './UserContext';
import { ref, set, onValue, update } from 'firebase/database';
import { db } from '../Firebase';
import { remove } from 'firebase/database';
import alertify from 'alertifyjs';



const BasketContext = createContext()

export const BasketContextProvider = ({ children }) => {
    const { userInfo } = useUserContext()
    const [currentBasket, setCurrentBasket] = useState([])
    const [isClicked, setIsClicked] = useState(false)
    const [isRemove, setIsRemove] = useState(false)
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

    const increaseProductCount = useCallback((product) => {
        if (product.productCount < product.quantity) {
            update(ref(db, `/baskets/${userInfo.uid}/${product.id}`), {
                productCount: product.productCount + 1
            })
        } else {
            alertify.error(`Bu ürün için en fazla ${product.quantity} sipariş verebilirsiniz.`)
        }

    }, [productCount])


    const decreaseProductCount = useCallback((product) => {
        if (product.productCount > 1) {
            update(ref(db, `/baskets/${userInfo.uid}/${product.id}`), {
                productCount: product.productCount - 1
            })
        }
        else {
            alertify.confirm('Ürünü Kaldırmak İstediğinize Emin Misiniz ?',
                function () {
                    deleteProductFromBasket(product)
                    alertify.success('Ürün Sepetten Kaldırıldı', 1.5)
                    setIsRemove(!isRemove)
                },
                function () {
                    alertify.error('Ürün Kaldırma İşlemi İptal Edildi', 1.5)
                });
        }
    }, [productCount])



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

    const getBasketFromDatabase = () => {
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
        decreaseProductCount,
        productCount,
        isClicked,
        setIsClicked,
        isRemove,
        setIsRemove
    }


    return (
        <BasketContext.Provider value={values}>
            {children}
        </BasketContext.Provider>)
}

export const useBasketContext = () => useContext(BasketContext)