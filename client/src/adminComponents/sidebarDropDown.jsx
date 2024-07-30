/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link } from 'react-router-dom';

const SideBarDropDown = ({ logo, text, option }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick=(e)=>{
    setIsOpen(prev=>!prev)
  }
  return (
    <div>
      <button className={`flex items-center gap-3 text-xl ${isOpen ? 'bg-slate-100':'bg-none'} pl-2`} onClick={handleClick}>
        <p className="text-xl">{logo}</p>
        <h1 className="text-lg font-medium text-slate-700">{text}</h1>
        <IoMdArrowDropdown />
      </button>

     {isOpen&&( <div className="flex flex-col ml-5 p-2">
        {option.map((option,index)=>(
          <>
          <Link to={option.path} key={index}>
            <div key={index} className="p-1 text-md hover:underline underline-offset-1">{option.label}</div>
          </Link>
          </>
        ))}
      </div>)}
    </div>
  );
};

export default SideBarDropDown;
