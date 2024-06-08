/* eslint-disable no-unused-vars */

import new_collections from './../../public/Assets/new_collections';
import Items from './items';
export const Newcollections = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
        <h1 className='text-3xl flex justify-center p-5'>NEW COLLECTION</h1>
        <hr className='m-auto  bg-black h-[10px] w-[100px] rounded-lg mb-5'/>
        <div className='grid grid-cols-4 gap-11'>
            {new_collections.map((product,index)=>{
                return <Items key={index} id={product.id} item={product}/>
            })}
        </div>

    </div>
  )
}
