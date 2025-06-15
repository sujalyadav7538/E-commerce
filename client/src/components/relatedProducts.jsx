/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Items from './items';

export const RelatedProducts = ({product}) => {

  const [relatedProduct,setRealtedProduct]=useState(null);

  useEffect(()=>{
    const similarProduct=async()=>{
      const res=await fetch(`https://e-commerce-1-t31g.onrender.com/api/product/getProduct?category=${product.category}&limit=4`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        },
         // This ensures cookies are included in requests
      });
      if (!res.ok) {
        throw new Error(`Error fetching product: ${res.statusText}`);
      }

      const data = await res.json();
      setRealtedProduct(data);
    };
    similarProduct();
  },[product])

  return (
    <div className='max-w-6xl m-auto'>
      {
        relatedProduct&&(

        <div className='flex flex-col justify-center items-center gap-4'>
            <h1 className='text-4xl font-semibold  opacity-90'>Related Products</h1>
            <hr className='border-none bg-slate-400 h-2 w-1/4 rounded-lg'/>
            <div className='flex gap-5'>
               {relatedProduct.map((item,index)=>{
                return <Items key={index}  item={item} />
               })}
            </div>
        </div>
        )
      }
    </div>
  )
}
