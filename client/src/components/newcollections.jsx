/* eslint-disable no-unused-vars */

import Items from './items';
import { useState } from 'react';
import { useEffect } from 'react';
export const Newcollections = () => {
  const [data,setData]=useState(null);

  useEffect(()=>{
    const similarProduct=async()=>{
      const res=await fetch(`http://localhost:3000/api/product/getProduct?category=men&limit=4`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error(`Error fetching product: ${res.statusText}`);
      }

      const data = await res.json();
      setData(data);
    };
    similarProduct();
  },[])
  return (
    <>
    {data && (
    <div className='flex flex-col justify-center items-center'>
        <h1 className='text-3xl flex justify-center p-5'>NEW COLLECTION</h1>
        <hr className='m-auto  bg-black h-[10px] w-[100px] rounded-lg mb-5'/>
        <div className='grid grid-cols-4 gap-11'>
            {data.map((product,index)=>{
                return <Items key={index} id={product.id} item={product}/>
            })}
        </div>

    </div>

    )}
    </>
  )
}
