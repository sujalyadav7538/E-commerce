/* eslint-disable no-unused-vars */
import React from 'react'
import data_product from './../../public/Assets/data';
import Items from './items';

export const RelatedProducts = () => {
  return (
    <div className='max-w-6xl m-auto'>
        <div className='flex flex-col justify-center items-center gap-4'>
            <h1 className='text-4xl font-semibold  opacity-90'>Related Products</h1>
            <hr className='border-none bg-slate-400 h-2 w-1/4 rounded-lg'/>
            <div className='flex gap-5'>
               {data_product.map((item,index)=>{
                return <Items key={index} id={item.id} item={item} />
               })}
            </div>
        </div>
    </div>
  )
}
