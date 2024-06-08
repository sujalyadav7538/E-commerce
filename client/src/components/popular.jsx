/* eslint-disable no-unused-vars */
import data from './../../public/Assets/data';
import Items from './items';

export default function Popular() {
  return (
    <div className=''>
        <h1 className='text-3xl flex justify-center p-5'>POPULAR IN WOMEN</h1>
        <hr className='m-auto  bg-black h-[10px] w-[100px] rounded-lg'/>
        <div className='flex justify-center items-center m-5 gap-4'>
            {data.map((item,index)=>{
                return <Items key={index} id={item.id} item={item} />
            })}
        </div>
    </div>
  )
}
