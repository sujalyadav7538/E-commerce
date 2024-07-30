/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { FcDeleteColumn } from "react-icons/fc";

/* eslint-disable no-unused-vars */

export default function AdminItems({ product, onDelete }) {
  const handleDelete = (e) => {
    e.preventDefault();
    onDelete(product._id);
  };
  return (
    <div className="flex flex-col overflow-hidden shadow-xl p-2">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.images[0]}
          alt=""
          className="w4 h object-cover rounded-xl"
        />
        <p className="truncate ">{product.name}</p>
        <p>${product.new_price}</p>
        <div className="flex gap-3 p-2">
          <Link to={`/admin/updateproduct/${product._id}`}>
            <button className="flex items-center gap-2 border-2 bg-green-200 p-1 rounded-lg border-opacity-45 hover:text-white hover:bg-green-600 ">
              <CiEdit />
              Edit
            </button>
          </Link>
          <button
            className="flex items-center gap-2 border-2 bg-red-200  p-1 rounded-lg border-opacity-45 hover:text-white hover:bg-red-600"
            onClick={handleDelete}
            type="button"
          >
            <FcDeleteColumn />
            Delete
          </button>
        </div>
      </Link>
    </div>
  );
}
