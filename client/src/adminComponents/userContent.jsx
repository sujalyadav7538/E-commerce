/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import product_14 from "E:/CODES/AI/client/public/Assets/product_14.png";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./../context/userContext.jsx";
import all_product from './../../public/Assets/all_product';
import ProductInfiniteScroll from "./productInfinitScroll.jsx";

export default function UserContent() {
  const { currUser } = useContext(UserContext);
  useEffect(() => {}, []);
  return (
    <div className="flex w-full justify-evenly items-center bg-gradient-to-tl from-slate-400 via-slate-400 to-purple-500 rounded-xl rounded-s-none">
      <div className="flex flex-col  items-center w-2/6  border-2 shadow-xl shadow-blue-300 rounded-xl h-[80%] bg-slate-100  p-5">
        <img
          src={product_14}
          alt=""
          className="w-[256px] h-[256px] rounded-full object-fill shadow-2xl shadow-slate-300"
        />

        <div className="flex px-4 py-5  items-center w-full">
          <h1 className=" font-semibold text-lg  w-2/4">My Profile:</h1>
          <p className=" text-sm text-slate-600  flex">
            {currUser?.username || "Shopify"}
          </p>
        </div>

        <hr className="w-[350px] h-[2px] " />

        <div className="flex px-4 py-3 items-ceter  w-full ">
          <h1 className="font-semibold text-lg w-2/4">Contact No:</h1>
          <p className=" text-sm text-slate-600  flex">+91 9874562130</p>
        </div>

        <hr className="w-[350px] h-[2px] " />
        <div className="flex px-4 py-3 items-ceter  w-full ">
          <h1 className="font-semibold text-lg w-2/4">Email:</h1>
          <p className=" text-sm text-slate-600  flex">
            {currUser?.useremail || "xyz@gmail.com"}
          </p>
        </div>

        {/* <hr className="w-[350px] h-[2px] bg-gradient-to-r from-yellow-300 via-red-400 to-red-600 " /> */}

        <div>
          <button className="bg-gradient-to-r from-yellow-300 via-red-400 to-red-600  w-28 p-3 m-3 rounded-xl uppercase text-white">
            Update
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-2/6 h-[80%] gap-5 ">
      <ProductInfiniteScroll all_products={all_product} />     
      <div className="flex flex-col items-center bg-slate-100 h-1/2 w-full overflow-hidden font-serif p-3 rounded-2xl shadow-xl shadow-slate-800 ">
      </div>

      </div>
    </div>
  );
}
