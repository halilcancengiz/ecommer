import './App.css';
import { Routes, Route } from 'react-router-dom';
import Register from './components/register/Register';
import Login from './components/login/Login';
import ProductList from './components/productList/ProductList';
import Home from './components/home/Home';
import UserProfile from './components/userprofile/UserProfile';
import NotFound from './components/notfound/NotFound';
import Basket from './components/basket/Basket';
import AddProduct from './components/userprofile/addproduct/AddProduct';
import Orders from './components/userprofile/orders/Orders';
import Settings from './components/userprofile/settings/Settings';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/profile" element={<UserProfile />}>
          <Route path='addproduct' element={<AddProduct />} />
          <Route path='orders' element={<Orders />} />
          <Route path='settings' element={<Settings />} />
        </Route>
        <Route path="/basket" element={<Basket />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </div>
  );
}

export default App;
