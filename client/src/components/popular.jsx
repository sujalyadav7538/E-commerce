/* eslint-disable no-unused-vars */
import Items from './items';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Popular() {
  const [data,setData]=useState(null);

  useEffect(()=>{
    const similarProduct=async()=>{
      const res=await fetch(`http://localhost:3000/api/product/getProduct?category=women&limit=4`, {
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
      <div className=''>
        <h1 className='text-3xl flex justify-center p-5'>POPULAR IN WOMEN</h1>
        <hr className='m-auto  bg-black h-[10px] w-[100px] rounded-lg'/>
        <div className='flex justify-center items-center m-5 gap-4'>
            {data.map((item,index)=>{
              return <Items key={index}  item={item} />
              })}
        </div>

      </div>
      )}
    </>
  )
}
