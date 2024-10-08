import hand_icon from './../../public/Assets/hand_icon.png';
import arrow_icon from './../../public/Assets/arrow.png';
import hero_image from './../../public/Assets/hero_image.png';
function Hero() {
  return (
    <div className='h-[100vh] bg-gradient-to-r from-pink-300 via-pink-200 to-pink-400 flex flex-col lg:flex-row '> 
        <div className='flex flex-col flex-1 justify-center lg:px-60 '>
             <h2 className='lg:text-3xl font-medium my-3'>New Arrivals Only</h2>
             <div className='m-0'>
                <div className='flex gap-5 items-center'>
                    <p className='lg:text-6xl font-semibold uppercase'>new</p>
                    <img src={hand_icon} alt="" className='h-[50px] w-[50px] lg:w-[100px] lg:h-[80px]'/>
                </div>
                <p className='text-lg lg:text-6xl font-semibold uppercase'>Collections</p>
                <p className='text-lg lg:text-6xl font-semibold uppercase '>for everyone</p>
             </div>
             <div className='flex w-[300px] my-6 gap-6 items-center bg-red-700 lg:w-[350px] p-5 text-white rounded-full cursor-pointer hover:bg-red-600 lg:my-10'>
                <div className='sm:text-lg  lg:text-xl font-normal uppercase'>Latest Collections</div>
                <img src={arrow_icon} alt="" />
             </div>
        </div>
        <div className='flex flex-1 justify-center items-center left-0'>
            <img src={hero_image} alt="" className='h-[500px] w-[500px]'/>
        </div>
    </div>
  )
}

export default Hero