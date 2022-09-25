import { createContext, useContext, useState } from 'react';
import { useUserContext } from './UserContext';
import { db } from '../Firebase';
import { set, ref, remove,onValue } from 'firebase/database';


const FavoritesContext = createContext()


export const FavoritesContextProvider = ({ children }) => {

    const { userInfo } = useUserContext()
    const [userFavorites, setUserFavorites] = useState([])

    //* Favorilere Ürün Ekleme
    const addFavorites = (product) => {
        set(ref(db, `favorites/${userInfo.uid}/${product.id}`), {
            id: product.id,
            title: product.title,
            description: product.description,
            moneytype: product.moneytype,
            price: product.price,
            quantity: product.quantity,
            shippingtype: product.shippingtype,
            url: product.url
        })
    }

    //* Kullanıcıya ait Favorileri Getirme
    const getFavoritesFromDatabase = () => {
        onValue(ref(db, `favorites/${userInfo.uid}`), (snapshot) => {
            const data = snapshot.val()
            let dataList = [];
            if (data !== null && data !== undefined) {
                dataList = Object.values(data);
            }
            setUserFavorites(dataList)
        })
        console.log("userFavorites rendered"); 
    }
    //* Favorilerden ürün silme (TEK)
    const removeProductFromFavorites = (product) => {
        remove(ref(db, `favorites/${userInfo.uid}/${product.id}`))
        console.log("removeProductFromFavorites rendered"); 
    }

    //* Favorilerden TÜM ürünleri silme
    const removeAllProductsFromFavorites = () => {
        remove(ref(db, `favorites/${userInfo.uid}`))
        console.log("removeAllProductsFromFavorites rendered"); 
        
    }
    const values = {
        addFavorites,
        getFavoritesFromDatabase,
        removeProductFromFavorites,
        removeAllProductsFromFavorites,
        userFavorites
    }


    return (
        <FavoritesContext.Provider value={values}>
            {children}
        </FavoritesContext.Provider>)
}

export const useFavoritesContext = () => useContext(FavoritesContext)