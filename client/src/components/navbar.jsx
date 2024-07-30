/* eslint-disable no-unused-vars */
import React, { useContext, useRef } from "react";
import logo from "./../../public/Assets/logo.png";
import cart_icon from "./../../public/Assets/cart_icon.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/shopcontext";
import { UserContext } from "./../context/userContext";
import { IoIosArrowDropdown } from "react-icons/io";
import { FaUser } from "react-icons/fa";

function Navbar() {
  const [menu, setMenu] = useState("shop");
  const { cartItems } = useContext(ShopContext);
  const [toggle, setToggle] = useState(false);
  const { currUser } = useContext(UserContext);

  return (
    <div className="p-2 px-10 border-b-slate-300 border-2 shadow-lg bg-slate-100 max-md:px-0 items-center">
      <div className="flex flex-row justify-between items-center">
        <div className="flex gap-6 items-center md:gap-3 max-md:p-3 ">
          <img
            src={logo}
            alt=""
            className="shadow-emerald-400 max-md:h-[40px] max-md:w-[40px] "
          />
          <p className="text-xl font-semibold  uppercase max-[460px]:text-lg">
            Shopper
          </p>
        </div>
        <IoIosArrowDropdown
          className={`hidden max-md:block  h-[40px] w-[50px] cursor-pointer ${
            toggle ? "-rotate-360" : "-rotate-90"
          } duration-75 max-[460px]:h-[25px]`}
          onClick={() => setToggle((prev) => !prev)}
        />
        <div
          className={`flex list-none gap-10 text-xl font-medium  max-md:text-lg max-lg:gap-5 max-md:${
            toggle ? "visible" : "hidden"
          } max-md:absolute max-md:justify-center max-md:items-center top-[75px] max-md:w-[100%] max-md:bg-slate-100 max-md:h-[80px]`}
        >
          <li
            className="cursor-pointer hover:drop-shadow-3xl "
            onClick={() => {
              setMenu("shop");
            }}
          >
            <Link to={`/shop`}>Shop</Link>
            {menu == "shop" ? (
              <hr className="border-none w-auto h-[2px] bg-red-600" />
            ) : (
              <></>
            )}
          </li>
          <li
            className="cursor-pointer hover:drop-shadow-3xl"
            onClick={() => {
              setMenu("mens");
            }}
          >
            <Link to={`/mens`}>Mens</Link>
            {menu == "mens" ? (
              <hr className="border-none w-auto h-[2px] bg-red-600" />
            ) : (
              <></>
            )}
          </li>
          <li
            className="cursor-pointer hover:drop-shadow-3xl"
            onClick={() => {
              setMenu("womens");
            }}
          >
            <Link to={`/womens`}>Womens</Link>
            {menu == "womens" ? (
              <hr className="border-none w-auto h-[2px] bg-red-600" />
            ) : (
              <></>
            )}
          </li>
          <li
            className="cursor-pointer hover:drop-shadow-3xl"
            onClick={() => {
              setMenu("kids");
            }}
          >
            <Link to={`/kids`}>Kids</Link>
            {menu == "kids" ? (
              <hr className="border-none w-auto h-[2px] bg-red-600" />
            ) : (
              <></>
            )}
          </li>
        </div>

        <div>
          <button>
            {currUser ? (
              <div className="flex gap-10 justify-center items-center">
                <Link to={`/admin/profile`} className="hover:scale-105">
                  <div className="border border-slate-500  rounded-full p-2 hover:shadow-lg">
                    <FaUser  />
                  </div>
                </Link>
                <Link to={`/cart`} className="flex ">
                
                <img
                  src={cart_icon}
                  alt=""
                  className="cursor-pointer max-md:h-[40px]  max-[460px]:h-[25px] max-[460px]:w-[25px] hover:scale-95"
                />
                <div className="w-[22px] h-[22px] flex justify-center items-center -mt-2 -ml-3  font-semibold border rounded-full bg-red-600 text-white z-10">
                  {Object.keys(cartItems).length}
                </div>
                </Link>
              </div>
            ) : (
              <>
                <div className="border borer-2  p-2 border-slate-500 rounded-lg hover:shadow-inner hover:scale-95">
                  <Link to={`/login`} className="hover:underline">
                    Login
                  </Link>
                  <span> / </span>
                  <Link to={`/singup`} className="hover:underline">
                    SingUp
                  </Link>
                </div>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
