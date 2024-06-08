/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import arrow_png from './../../public/Assets/breadcrum_arrow.png';
function Breadcrums({product}) {
  return (
    <div className=' max-w-7xl m-auto p-4 '>
        <div className='flex gap-3 items-center p-4 text-lg font-medium opacity-80 cursor-pointer'>

         Home <img src={arrow_png} alt="" /> shop <img src={arrow_png} alt="" /> {product.category} <img src={arrow_png} alt="" />{product.name}
        </div>
    </div>
  )
}

export default Breadcrums