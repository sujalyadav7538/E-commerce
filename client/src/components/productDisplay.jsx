/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import star_icon from "./../../public/Assets/star_icon.png";
import star_dull_icon from "./../../public/Assets/star_dull_icon.png";
import { ShopContext } from './../context/shopcontext';
import { Link } from "react-router-dom";

export const ProductDisplay = ({ product }) => {
  const { cartItems, SetCartItems, addToCart } = useContext(ShopContext);
  const [isInCart, setIsInCart] = useState(false);


  useEffect(() => {
    const IsIncart = cartItems.some(item => item.id === product.id);
    setIsInCart(IsIncart)
  }, [product, cartItems])

  return (
    <div className="flex pt-15 p-6 max-w-7xl m-auto justify-center items-center font-serif h-auto">
      <div className="flex h-[80vh] gap-4 ">
        <div className="flex flex-col gap-8 m-2">
          <img src={product.image} alt="" className="h-1/5 rounded-lg hover:scale-105   " />
          <img src={product.image} alt="" className="h-1/5 rounded-lg hover:scale-105   " />
          <img src={product.image} alt="" className="h-1/5 rounded-lg hover:scale-105   " />
          <img src={product.image} alt="" className="h-1/5 rounded-lg hover:scale-105   " />
        </div>
        <div className="mr-7">
          <img src={product.image} alt="" className="h-full rounded-md" />
        </div>
      </div>
      <div className="flex flex-col gap-4 flex-1">
        <h1 className="text-2xl font-semibold">{product.name}</h1>
        <div className="flex gap-2">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="flex gap-3">
          <div className="line-through opacity-70 font-semibold text-lg">Rs.{product.old_price}</div>
          <div className="text-red-600 font-semibold text-lg">Rs.{product.new_price}</div>
        </div>
        <div className="text-md font-medium opacity-90">
          The ComfortFit Men's Cotton T-Shirt is a versatile wardrobe staple
          that combines comfort and style. Made from 100% premium cotton, this
          t-shirt is soft, breathable, and perfect for everyday wear.
        </div>
        <div>
          <h1 className="text-lg font-semibold opacity-90">Select Size</h1>
          <div className="flex gap-12 p-4">
            <div className="border px-3 py-2 hover:bg-slate-200 border-slate-600 rounded-lg cursor-pointer">S</div>
            <div className="border px-3 py-2 hover:bg-slate-200 border-slate-600 rounded-lg cursor-pointer">M</div>
            <div className="border px-3 py-2 hover:bg-slate-200 border-slate-600 rounded-lg cursor-pointer">L</div>
            <div className="border px-3 py-2 hover:bg-slate-200 border-slate-600 rounded-lg cursor-pointer">XL</div>
            <div className="border px-3 py-2 hover:bg-slate-200 border-slate-600 rounded-lg cursor-pointer">XXL</div>
          </div>
        </div>
        {isInCart ? (
          <Link to={'/cart'} className="bg-green-600 text-white p-4 rounded-xl hover:bg-green-800 flex items-center">
               <button className="m-auto">Go To Cart</button>
          </Link>
        ) : (<button className="bg-red-600 text-white p-4 rounded-xl hover:bg-red-700" onClick={() => addToCart(product)}>ADD TO CART</button>
        )}
        <p>
          <span className="text-lg font-semibold opacity-85">Category:</span> Women , T-shirt , Crop Top
        </p>
        <p>
          <span className="text-lg font-semibold opacity-85">Tags:</span> Latest , Modern
        </p>
      </div>
    </div>
  );
};
