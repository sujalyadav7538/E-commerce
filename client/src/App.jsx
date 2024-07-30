/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Shop from "./pages/Shop";
import { Footer } from "./components/footer";
import { ShopCategory } from "./pages/shopCategory";
import men_banner from "./../public/Assets/banner_mens.png";
import women_banner from "./../public/Assets/banner_women.png";
import kid_banner from "./../public/Assets/banner_kids.png";
import Product from "./pages/product";
import Cart from "./pages/cart";
import { Addproduct } from "./adminSection/addproduct";
import { UpdateProduct } from "./adminSection/updateProduct.jsx";
import { Login } from "./pages/login.jsx";
import SingUp from "./pages/singUp.jsx";
import { Privateroute, Publiceroute } from "./utils/privacy.jsx";
import { useContext, useEffect } from 'react';
import { UserContext } from "./context/userContext.jsx";
import Profile from "./adminSection/profile.jsx";
import Views from './adminSection/views';

function App() {
  const {currUser,removeUser}=useContext(UserContext);
  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/cookie-tester',{credentials:"include"});
        const data = await res.json();
        if (!data || data.success === false) {
          removeUser();
        }
      } catch (error) {
        console.error('Error fetching token:', error);
        removeUser();
      }
    };

    checkToken();

    const intervalId = setInterval(async () => {
      try {
        const res = await fetch('http://localhost:3000/api/cookie-tester',{credentials:"include"});
        const data = await res.json();
        if (!data || data.success === false) {
          removeUser();
        }
      } catch (error) {
        console.error('Error fetching user test:', error);
        removeUser();
      }
    }, 60 * 10 * 1000);

    return () => clearInterval(intervalId);
  }, [removeUser])
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<Privateroute />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/admin/addproduct" element={<Addproduct />} />
            <Route path="/admin/updateproduct/:id" element={<UpdateProduct />} />
            <Route path="/admin/profile" element={<Profile />} />
            <Route path="/admin/views" element={<Views />} />
          </Route>
          <Route element={<Publiceroute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/singup" element={<SingUp />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route
            path="/mens"
            element={<ShopCategory banner={men_banner} category="men" />}
          />
          <Route
            path="/womens"
            element={<ShopCategory banner={women_banner} category="women" />}
          />
          <Route
            path="/kids"
            element={<ShopCategory banner={kid_banner} category="kids" />}
          />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
