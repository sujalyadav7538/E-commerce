/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import arrow_png from "./../../public/Assets/breadcrum_arrow.png";
import { Link } from "react-router-dom";
function Breadcrums({ product }) {
  return (
    <>
      {product && (
        <div className=" max-w-7xl m-auto p-4 ">
          <div className="flex gap-3 items-center p-4 text-lg font-medium opacity-80 cursor-pointer">
            <Link to={`/home`} className="hover:underline uppercase">Home</Link>
            <img src={arrow_png} alt="" />
            <Link to={`/shop`} className="hover:underline uppercase">Shop</Link> <img src={arrow_png} alt="" />
            <Link to={`/${product.category}s`} className="hover:underline uppercase">{product.category}</Link>{" "}
            <img src={arrow_png} alt="" />
            {product.name}
          </div>
        </div>
      )}
    </>
  );
}

export default Breadcrums;
