import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'
import Home from '../../pages/home/Home'

const NotFound = () => {
    return (
        <div>
            <h1>Aradığınız Sayfa Bulunamadı</h1>
            <p>Ana Sayfaya Dönmek İçin <NavLink to="/" element={<Home />}>tıklayın...</NavLink></p>

        </div>
    )
}

export default memo(NotFound)