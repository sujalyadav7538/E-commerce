/* eslint-disable no-unused-vars */
import exclusive_image from './../../public/Assets/exclusive_image.png';
export const Offers = () => {
  return (
    <div className='flex justify-center items-center'>

    <div className="bg-gradient-to-r from-pink-200 via-pink-100 to-pink-400 w-[80%] flex rounded-md">
        <div className='gap-4 flex flex-col m-auto'>
            <p className='text-6xl font-semibold opacity-90'>Exclusive</p>
            <p className='text-6xl font-semibold opacity-90'>Offers For You</p>
            <p className='text-xl font-light'>ONLY ON BEST SELLER PRODUCTS</p>
            <button className='bg-red-600 p-3 text-white text-xl rounded-2xl text-center'>Check Now</button>
        </div>
        <div>
            <img src={exclusive_image} alt="" />
        </div>
    </div>
    </div>
  )
}
