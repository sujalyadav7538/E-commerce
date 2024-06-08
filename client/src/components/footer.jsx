import footer_logo from './../../public/Assets/logo_big.png';
import instagram_icon from './../../public/Assets/instagram_icon.png';
import pintester_icon from './../../public/Assets/pintester_icon.png';
import whatsapp_icon from './../../public/Assets/whatsapp_icon.png';
export const Footer = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-10'>
        <div className='flex items-center gap-5'>
            <img src={footer_logo} alt="" />
            <p className='text-3xl font-semibold opacity-90 '>SHOPPER</p>
        </div>
        <ul className='flex gap-6 text-xl'>
            <li>Compnay</li>
            <li>Products</li>
            <li>Offices</li>
            <li>About</li>
            <li>COntact</li>
        </ul>
        <div className='flex gap-10'>
         <img src={instagram_icon} alt="" className='border border-slate-500 p-2 rounded-full shadow-xl cursor-pointer'/>
         <img src={pintester_icon} alt="" className='border border-slate-500 p-2 rounded-full shadow-xl cursor-pointer'/>
         <img src={whatsapp_icon} alt="" className='border border-slate-500 p-2 rounded-full shadow-xl cursor-pointer'/>
        </div>
        <div className='text-xl flex flex-col items-center '>
            <hr className='border-none bg-slate-600 w-[1000px] h-[2px]'/>
            <p className='p-4 pb-10'>Copyright @ 2023 - All Right Reserved.</p>
        </div>
    </div>
  )
}
