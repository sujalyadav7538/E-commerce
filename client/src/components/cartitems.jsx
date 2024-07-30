/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { createFactory, useContext, useEffect, useRef, useState } from "react";
import { ShopContext } from "./../context/shopcontext";
import { AiTwotoneDelete } from "react-icons/ai";


export const Cartitems = () => {
    const { cartItems, removeFromCart, alterCartValue } = useContext(ShopContext);
    const [total, setTotal] = useState(0)


    useEffect(() => {
        setTotal(() => {
            let sum = 0
            cartItems.map((item) => {
                sum += item.product.new_price * item.quantity
            })
            return sum;
        })
    }, [cartItems, alterCartValue])




    return (
        <div className="p-4 max-w-7xl m-auto">

            <div className="flex flex-col gap-6 p-6 shadow-xl">
                <div className="grid  grid-flow-col grid-cols-6 mt-10 mx-10  text-2xl font-semibold opacity-90 font-sans  text-slate-900" >
                    <p className="max-w-44">Title</p>
                    <p className="max-w-44">Product</p>
                    <p className="max-w-9">Price</p>
                    <p className="max-w-9">Quantity</p>
                    <p className="max-w-9">Total</p>
                    <p className="max-w-24">Remove</p>
                </div>
                <hr className="border-none h-[1px] bg-slate-500 max-w-full" />
                <div className="flex flex-col gap-5  mx-10">

                    {!(cartItems.length === 0) &&
                        cartItems.map((item) => (
                            <React.Fragment >
                                <div id={item['product']._id} key={item['product']._id} className="grid grid-flow-col grid-cols-6 items-center gap-x-5 text-xl font-medium text-slate-700">
                                    <img src={item['product'].images[0]} alt="" className="h-[90px] rounded-full" />
                                    <p className="text-slate-500 line-clamp-2">{item.name}</p>
                                    <p>${item['product'].new_price}</p>
                                    <select name="Quantity" className="w-16 justify-center bg-slate-100 flex border border-slate-500 items-center rounded-lg" onChange={(e) => alterCartValue(e.target.value, item.product._id)} >
                                        <option value="1" id="1" >1</option>
                                        <option value="2" id="2">2</option>
                                        <option value="3" id="3">3</option>
                                        <option value="4" id="4">4</option>
                                        <option value="#" selected hidden>{item.quantity}</option>
                                    </select>
                                    <p>${Number(item['product'].new_price)*item.quantity}</p>
                                    <AiTwotoneDelete  onClick={()=>removeFromCart(item.cartId)} className="m-3 w-[60px] h-[60x] hover:scale-110 hover:fill-red-500 stroke-2"/>
                                </div>
                                <hr key={`${item['product']._id}-hr`} className="border-1 rounded-md" />
                            </React.Fragment>
                        ))
                    }


                    <div className="flex gap-20 w-[100%]">
                        <div className="flex flex-col gap-5 flex-1">
                            <h1 className="text-4xl font-semibold">Cart Total</h1>
                            <div className="flex flex-col gap-5">
                                <div className="flex gap-2 items-center justify-between font-medium">
                                    <p className="text-xl">SubTotal</p>
                                    <p>${total}</p>
                                </div>
                                <hr />
                                <div className="flex justify-between">
                                    <p>Shipping FEE</p>
                                    <p>FREE</p>
                                </div>
                                <hr />
                                <div className="flex justify-between text-xl font-semibold">
                                    <p>Total</p>
                                    <p>${total}</p>
                                </div>
                            </div>
                            <button className="bg-red-600 max-w-sm text-white p-2 font-medium rounded-lg mt-4">PROCEED TO CHECKOUT</button>
                        </div>
                        <div className="flex flex-col  gap-5 mt-5 pl-10 flex-1">
                            <p className="text-xl text-slate-400">If you have promo code , Enter it here</p>
                            <div className="">
                                <input type="text" placeholder="Promo Code" className="bg-slate-300 p-3 placeholder:text-white" />
                                <button className="bg-black p-3 text-white">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cartitems;
