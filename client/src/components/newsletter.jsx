
export const Newsletter = () => {
    return (
        <div className="flex justify-center p-10 ">

            <div className="flex justify-center items-center flex-col bg-gradient-to-b from-pink-200 via-pink-100 to-pink-300 w-[80%] gap-10 py-10 rounded-lg">
                <h1 className="text-6xl font-semibold opacity-90 pt-10 px-10">Get Exculsive Offer On Your Email</h1>
                <p className="text-2xl font-medium opacity-80">Subscribe to our newsletter and gets updated</p>
                <div className="flex ">
                    <input type="email" placeholder="Your Email Id" className=" placeholder:text-slate-800 placeholder:text-lg bg-transparent w-[500px] font-semibold border border-slate-500 border-e-0 rounded-s-full px-10 border-opacity-85 " />
                    <button className="w-[190px] h-16 rounded-full cursor-pointer bg-black text-white font-semibold relative">Subscribe</button>
                </div>
            </div>
        </div>
    )
}
