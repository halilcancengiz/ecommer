import { Routes, Route } from 'react-router-dom';
import ProductList from './components/productList/ProductList';
import Home from './pages/home/Home';
import UserLayout from './components/userprofile';
import NotFound from './pages/notfound/NotFound';
import Basket from './pages/basket/Basket';
import AddProduct from './components/userprofile/addproduct/AddProduct';
import Orders from './components/userprofile/orders/Orders';
import Settings from './components/userprofile/settings/Settings';
import Profile from './components/userprofile/profile/Profile';
import MyProducts from './pages/myproducts/MyProducts';
import Favorites from './pages/favorites/Favorites';
import Membership from './pages/membership/Membership';
import ForgotPassword from './components/forgotpassword/ForgotPassword';
import ProductInfo from './pages/productinfo/ProductInfo';
import Payment from './pages/payment/Payment';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:productid" element={<ProductInfo />} />
        <Route path="/profile" element={<UserLayout />}>
          <Route index={true} element={<Profile />} />
          <Route path='addproduct' element={<AddProduct />} />
          <Route path='orders' element={<Orders />} />
          <Route path='settings' element={<Settings />} />
          <Route path='myproducts' element={<MyProducts />} />
          <Route path='favorites' element={<Favorites />} />
          <Route path="basket" element={<Basket />} />
          <Route path="payment" element={<Payment />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
