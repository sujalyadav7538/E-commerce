/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useState } from "react";
import all_product from './../../public/Assets/all_product';

export const ShopContext=createContext(null);



const ShopContextProvider=(props)=>{
    const [cartItems,SetCartItems]=useState([]);

    const alterCartValue=(value,id)=>{
        SetCartItems((prev)=>{
            const productLocation=prev.findIndex(item=>item.id===id);
            const products=[...prev];
            products[productLocation]={
                ...products[productLocation],
                cartValue:value
            }

            return products;
        })
    }
    const removeFromCart = (productId) => {
        SetCartItems((prev) => {
            // Find the index of the product to be removed
            const deletedProductIndex = prev.findIndex(item => item.id === productId);
    
            if (deletedProductIndex !== -1) {
                // Create a copy of the previous state
                const updatedCartItems = [...prev];
                // Use splice to remove the product at the found index
                updatedCartItems.splice(deletedProductIndex, 1);
                // Return the updated state
                return updatedCartItems;
            }
    
            // Return the previous state if the product is not found
            return prev;
        });
    };
    
    
    
    const addToCart = async (product) => {
        // console.log("Adding to cart Product is", product.id);
        SetCartItems((prev) => {
            const existingProductIndex = prev.findIndex(item => item.id === product.id);
            if (existingProductIndex !== -1) {
                const updatedCartItems = [...prev];
                updatedCartItems[existingProductIndex] = {
                    ...updatedCartItems[existingProductIndex],
                    cartValue: updatedCartItems[existingProductIndex].cartValue + 1
                };
                return updatedCartItems;
            }
            return [...prev, { ...product, cartValue: 1 }];
        });
    };
    
    const contextValue={all_product,cartItems,SetCartItems,removeFromCart,addToCart,alterCartValue};
    
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;