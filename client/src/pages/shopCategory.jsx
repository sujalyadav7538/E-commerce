/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import dropdown_icon from "./../../public/Assets/dropdown_icon.png";
import Items from "./../components/items";

export const ShopCategory = ({ banner, category }) => {
  const [error, setError] = useState(null);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const queryCategirocalyProduct = async () => {
      try {
        const res = await fetch(
          `https://e-commerce-1-t31g.onrender.com/api/product/getProduct?category=${category}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        const data = await res.json();
        if (data.success == false) {
          return setError(data.message);
        }

        setProducts(data);
      } catch (error) {
        setError(error);
      }
    };
    queryCategirocalyProduct();
  }, [category]);

  

  return (
    <div className="flex justify-center items-center p-4 ">
      <div className="flex flex-col w-[80%] gap-4">
        <img src={banner} alt="" />
        <div className="flex justify-between p-4 max-md:text-sm items-center">
          <p>
            <span className="font-semibold">Showing 1-12</span> out of 36
            Products
          </p>
          <div className="flex justify-center items-center gap-2 border border-slate-600 rounded-full p-2 max-md:gap-1 max-md:p-1 cursor-pointer">
            Sort by <img src={dropdown_icon} alt="" className="h-[7px] " />
          </div>
        </div>
        {products && (
          <div className="grid max-md:grid-cols-2 gap-10 m-auto pb-6 grid-cols-3 max-sm:grid-cols-1 lg:grid-cols-4">
            {products.map((product, index) => (
                <Items key={index}  item={product} />             
            ))}
          </div>
        )}
        <div className="m-auto p-4 px-5 text-lg rounded-full bg-slate-200 cursor-pointer hover:bg-slate-100">
          Explore More
        </div>
      </div>
    </div>
  );
};
