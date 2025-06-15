/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useState } from "react";
import all_product from './../../public/Assets/all_product';
import { UserContext } from './userContext';

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState([]);
    const { currUser } = useContext(UserContext);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                if (!currUser || !currUser._id) return;

                const response = await fetch('https://e-commerce-1-t31g.onrender.com/api/user/cart/get', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({ userId: currUser._id })
                });

                const data = await response.json();
                
                if (!response.ok) {
                    console.error("Error fetching cart data:", data.message || response.statusText);
                    return;
                }

                if (data.success === false) {
                    console.log("Empty Cart");
                    setCartItems([]);
                } else {
                    setCartItems(data);
                }
            } catch (error) {
                console.error("Error in fetching cart data:", error);
            }
        };

        fetchCart();
    }, [currUser]);

    const alterCartValue = async(quantity, productId) => {
            try {
                const response = await fetch('https://e-commerce-1-t31g.onrender.com/api/user/cart/update', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({ userId: currUser._id ,productId,quantity})
                });
    
                const data = await response.json();
                
                if (!response.ok) {
                    console.error("Error fetching cart data:", data.message || response.statusText);
                }
    
                if (data.success === false) {
                    console.log("Can't Add Item Inside Cart");

                } else {
                    setCartItems(data)
                }
            } catch (error) {
                console.log(error.message)
            }
            
        };
    

    const removeFromCart = async(cartId) => {
        try {
            const response= await fetch('https://e-commerce-1-t31g.onrender.com/api/user/cart/delete',{
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ userId: currUser._id ,cartId})

            })
            const data = await response.json();
            if (!response.ok) {
                console.error("Error fetching cart data:", data.message || response.statusText);
            }

            if (data.success === false) {
                console.log("Can't Add Item Inside Cart");

            } else {
                setCartItems(data)
            }

        } catch (error) {
            console.log(error.message)
        }
    };

    const addToCart = async (productId,quantity) => {
        try {
            const response= await fetch('https://e-commerce-1-t31g.onrender.com/api/user/cart/add',{
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ userId: currUser._id ,productId,quantity})

            })
            const data = await response.json();
            if (!response.ok) {
                console.error("Error fetching cart data:", data.message || response.statusText);
            }

            if (data.success === false) {
                console.log("Can't Add Item Inside Cart");

            } else {
                setCartItems(data)
            }

        } catch (error) {
            console.log(error.message)
        }
    };


    const contextValue = {
        all_product,
        cartItems,
        setCartItems,
        removeFromCart,
        addToCart,
        alterCartValue
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
