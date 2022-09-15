import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import 'alertifyjs/build/css/alertify.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.min.css';
import './index.css';

import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { ProductContextProvider } from './context/ProductContext';
import { BasketContextProvider } from './context/BasketContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <UserProvider>
      <ProductContextProvider>
        <BasketContextProvider>
          <App />
        </BasketContextProvider>
      </ProductContextProvider>
    </UserProvider>
  </BrowserRouter>
);

