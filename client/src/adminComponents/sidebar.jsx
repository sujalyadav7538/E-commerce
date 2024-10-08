/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import add_product from "./../../public/Assets/add_product.png";
import update_product from "./../../public/Assets/update_product.png";
import { FaArrowRight } from "react-icons/fa";
import { useContext } from 'react';
import { UserContext } from "../context/userContext";
const Sidebar = () => {
  const {removeUser}=useContext(UserContext);
  const navigate=useNavigate();
  const handleLogout= async ()=>{
    try {
      const response=await fetch('http://localhost:3000/api/user/logout',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        credentials:'include'
      });
      const data = await response.json();
      if (data.success==false) return ;
      removeUser()
      console.log(data)
      navigate('/shop')
    } catch (error) {
      console.log('Error During Logout',error.message)
    }
  }
  return (
    <div className="w-1/4 bg-slate-200 rounded-xl flex flex-col  pl-3 gap-5 m-0 pr-2 rounded-e-none">
      <div className="flex flex-col justify-end h-[50vh]">
        <div className="flex  items-center">
          <h1 className="text-xl font-semibold pr-5">ADD PRODUCT</h1>
          <FaArrowRight className="h-[18px] w-[18px] " />
          <Link to={`/admin/addProduct`} className="pl-2">
            <img
              src={add_product}
              alt=""
              className="w-[100px] h-[100px] cursor-pointer hover:scale-95 ease-in-out"
            />
          </Link>
        </div>
        <div className="flex items-center ">
          <h1 className="text-xl font-semibold m-0 p-0">UPDATE PRODUCT</h1>
          <FaArrowRight className="h-[20px] w-[20px] " />
          <Link to={`/admin/views`} className="pl-2">
            <img
              src={update_product}
              alt=""
              className="w-[100px] h-[100px] cursor-pointer hover:scale-95 ease-in-out"
            />
          </Link>
        </div>
      </div>
      <div className="flex justify-end flex-col h-[50vh] pb-3 place-items-start">

      <button className="p-2 rounded-lg bg-gradient-to-r from-yellow-300 via-red-300 to-red-400 " onClick={handleLogout}>LOgOut</button>
      </div>
    </div>
  );
};

export default Sidebar;
