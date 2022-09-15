/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useState, useEffect } from 'react';
import { useUserContext } from './UserContext';
import { ref, set, onValue } from 'firebase/database';
import { db } from '../Firebase';


const BasketContext = createContext()

export const BasketContextProvider = ({ children }) => {
    const { userInfo } = useUserContext()

    const [basket, setBasket] = useState()
    const [currentBasket, setCurrentBasket] = useState([])
    const basketID = currentBasket.length

    const addProductToBasket = async (product) => {
        await set(ref(db, `/baskets/${userInfo.uid}/` + basketID), {
            id: product.id,
            createdAt: product.createdAt,
            createdWho: product.createdWho,
            title: product.title,
            description: product.description,
            category: product.category,
            price: product.price,
            url: product.url,
            addingToCardBy: userInfo.uid
        });
    }


    const getBasketFromDatabase = async () => {
        await onValue(ref(db, `baskets/${userInfo.uid}`), (snapshot) => {
            const data = snapshot.val()
            let dataList = [];
            if (data !== null && data !== undefined) {
                dataList = Object.values(data);
            }
            setCurrentBasket(dataList)
        })
    }

    useEffect(() => {
        getBasketFromDatabase()
    }, [])

    const values = {
        addProductToBasket,
        getBasketFromDatabase,
        currentBasket
    }


    return (
        <BasketContext.Provider value={values}>
            {children}
        </BasketContext.Provider>)
}

export const useBasketContext = () => useContext(BasketContext)