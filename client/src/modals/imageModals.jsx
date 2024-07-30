/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { FaChevronCircleRight } from "react-icons/fa";
import { FaChevronCircleLeft } from "react-icons/fa";
import { CiBookmarkRemove } from "react-icons/ci";


const ImageModals = ({ images, handleImages ,hideModal}) => {
  const [index, setIndex] = useState(3);
  const handleLeft = (e) => {
    const len = images.length;
    setIndex((prev) => {
      let newLen = (prev % len) - 1;
      if (newLen < 0) {
        newLen += len;
      }
      return newLen;
    });
  };
  const handleRight = (e) => {
    const len = images.length;
    setIndex((prev) => {
      let newLen = (prev % len) + 1;
      if (newLen == len) {
        newLen = 0;
      }
      return newLen;
    });
  };

  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])

  return (
    <div className="absolute backdrop-blur-sm w-2/3 h-full z-10 rounded-xl  ">
        <div className="flex justify-end mt-4">

    <CiBookmarkRemove className="text-4xl" onClick={hideModal}/>
        </div>
    <div className="flex flex-col items-center pt-4 gap-3">

      <div className="flex items-center gap-7">
        <FaChevronCircleLeft
          className="text-xl active:scale-105"
          onClick={handleLeft}
        />
        <img
          src={images[index]}
          alt=""
          className="h-[470px] w-[400px] rounded-xl border-2 border-black select-none"
        />
        <FaChevronCircleRight
          className="text-xl active:scale-105"
          onClick={handleRight}
        />
      </div>
      <div>
        <button
          className="w-28 bg-white p-3 text-red-700 font-medium ring-offset-1 rounded-lg border-black border-2 hover:scale-105 hover:shadow-inner hover:shadow-red-300"
          key={index}
          onClick={() => handleImages(index)}
        >
          REMOVE
        </button>
      </div>
    </div>

    </div>
  );
};

export default ImageModals;
