/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import Dropdown from "./../adminComponents/dropDown";
import { AiOutlineSortAscending } from "react-icons/ai";
import { AiOutlineSortDescending } from "react-icons/ai";
import { RiWomenFill } from "react-icons/ri";
import { PiGenderMaleBold } from "react-icons/pi";
import { GiKidSlide } from "react-icons/gi";
import AdminItems from "../adminComponents/adminItems";
import { MdSpaceDashboard } from "react-icons/md";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import SideBarDropDown from "./../adminComponents/sidebarDropDown";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoAddOutline } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { IoPeople } from "react-icons/io5";
import { GrTransaction } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { MdDone } from "react-icons/md";
import { Link } from 'react-router-dom';



const categoryOptions = [
  { label: "Men", value: "men", logo: <PiGenderMaleBold />, id: "cate" },
  { label: "Women", value: "women", logo: <RiWomenFill />, id: "cate" },
  { label: "Kids", value: "kids", logo: <GiKidSlide />, id: "cate" },
];

const viewTypeOptions = [
  {
    label: "Last Added",
    value: "asc",
    logo: <AiOutlineSortAscending />,
    id: "ord",
  },
  {
    label: "Previous Added",
    value: "desc",
    logo: <AiOutlineSortDescending />,
    id: "ord",
  },
];

const userProductOptions = [
  { label: "Add Product", path: "/admin/addProduct" },
  { label: "Product List", path: "/admin/addProduct" },
  { label: "Categories", path: "/admin/addProduct" },
  { label: "Brands", path: "/admin/addProduct" },
];

export default function Views() {
  const { currUser } = useContext(UserContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState({});
  const [searchQuery, setSearchQuery] = useState(null);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [isSearchTriggered, setIsSearchTriggered] = useState(false);
  const [isDelete,setDelete]=useState(false);
  
  const navigate=useNavigate();


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `https://e-commerce-1-t31g.onrender.com/api/admin/views?${searchQuery}&startIndex=${page}&search=${search}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: currUser._id }),
            credentials: "include",
          }
        );
        const data = await res.json();
        if (data.success == false) {
          return console.log("No Data Found!!!");
        }
        setLoading(false);
        setData(data);

      } catch (error) {
        console.log(error.message);
      } finally {
        setIsSearchTriggered(false);
      }
    };

    fetchProducts();
  }, [currUser, searchQuery, page, isSearchTriggered]);
 
  const handleSelect = (option) => {
    setQuery((prev) => {
      const newQuery = { ...prev, [option.id]: option.value };

      const urlParams = new URLSearchParams();
      Object.keys(newQuery).forEach((param) => {
        urlParams.set(param, newQuery[param]);
      });

      setSearchQuery(urlParams.toString()); // This is your updated query string

      return newQuery;
    });
    setPage(0);
  };

  const handleNextPage = () => {
    setPage((prev) => prev + 11);
    scrollTo(0, 0);
  };

  const handlePreviousPage = () => {
    setPage((prev) => prev - 11);
    scrollTo(0, 0);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      setIsSearchTriggered(true);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch("https://e-commerce-1-t31g.onrender.com/api/admin/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id }),
        credentials: "include",
      });
      const data = await res.json();
      if (data.success === false) {
        return;
      }
      setData((prev) => prev.filter((item) => item._id !== id));
      setDelete(true);
      setInterval(()=>{setDelete(false)},3000)
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex w-full font-serif h-auto">
      {/* Sidebar Dashboard */}
      <div className="w-[20%] drop-shadow-lg border-r-2 ">
        <div className="flex p-7">
          <ol className="flex flex-col gap-5">
            <li className="flex items-center gap-3 p-2 cursor-pointer">
              <MdSpaceDashboard className="text-xl" />
              <h1 className="text-lg font-medium text-slate-700 hover:underline underline-offset-1">
                Dashboard
              </h1>
            </li>
            <li className="flex items-center  cursor-pointer">
              <SideBarDropDown
                logo={<MdOutlineProductionQuantityLimits />}
                text={"Product"}
                option={userProductOptions}
              />
            </li>
            <li className="flex items-center gap-3 p-2 cursor-pointer">
              <IoPeople className="text-xl" />
              <h1 className="text-lg font-medium text-slate-700 hover:underline underline-offset-1">
                Customers
              </h1>
            </li>
            <li className="flex items-center gap-3 p-2 cursor-pointer">
              <FaCartShopping className="text-xl" />
              <h1 className="text-lg font-medium text-slate-700 hover:underline underline-offset-1">
                Orders
              </h1>
            </li>
            <li className="flex items-center gap-3 p-2 cursor-pointer">
              <GrTransaction className="text-xl" />
              <h1 className="text-lg font-medium text-slate-700 hover:underline underline-offset-1">
                Transactions
              </h1>
            </li>
            <li className="flex items-center gap-3 p-2 cursor-pointer">
              <IoSettingsOutline className="text-xl" />
              <h1 className="text-lg font-medium text-slate-700 hover:underline underline-offset-1">
                Settings
              </h1>
            </li>
          </ol>
        </div>
      </div>

      {/* Main Content Bar */}
      <div className="w-[100%] bg-gray-50">
        <div className="flex justify-between px-5 pt-5 m-3">
          <div className="text-xl font-semibold">Products Grid</div>
          <div className="flex gap-3">
            <button className="border-2 border-opacity-45 p-2 rounded-lg flex items-center gap-2 bg-white">
              <FaCloudUploadAlt />
              <p className="font-semibold">Export</p>
            </button>
            <Link to={`/admin/addProduct`}>
            <button className="flex items-center gap-2 bg-blue-600 p-2 rounded-lg">
              <IoAddOutline className="text-white" />
              <p className="font-semibold text-white">Create New</p>
            </button>
            </Link>
          </div>
        </div>
        <div className="flex gap-20 justify-between px-5 w-[95%] m-auto">
          <input
            type="text"
            placeholder="Search"
            className="w-72 h-[40px] my-5 border-2 border-gray-600 shadow-lg rounded-lg p-2 border-opacity-30"
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyPress}
          />
          <div>
            <Dropdown
              options={categoryOptions}
              onSelect={handleSelect}
              banner={"Category"}
            />
            <Dropdown
              options={viewTypeOptions}
              onSelect={handleSelect}
              banner={"Sort By"}
            />
          </div>
        </div>
        {loading ? (
          "Loading...."
        ) : (
          <>
            <div className="grid grid-cols-5 gap-5 w-[95%] m-auto">
              {data &&
                data.map((item, index) => (
                  <AdminItems
                    key={index}
                    product={item}
                    onDelete={handleDelete}
                  />
                ))}
            </div>
            <div className="flex justify-end gap-5 pt-12 w-[95%] m-auto">
              <button
                className="bg-blue-600 p-2 rounded-lg border-2 text-white hover:bg-white hover:text-black hover:border-opacity-35"
                disabled={page === 0}
                onClick={handlePreviousPage}
              >
                Previous Page
              </button>
              <button
                className="bg-blue-600 p-3 rounded-lg text-white border-2 hover:bg-white hover:text-black hover:border-opacity-35"
                onClick={handleNextPage}
                disabled={data && data.length < 10}
              >
                Next Page
              </button>
            </div>
          </>
        )}
      </div>

      {/* Message */}
      {isDelete&&

      <div className="absolute right-0 p-5 rounded-xl z-30 bg-green-800">
        <p className="text-white flex  items-center gap-2"> <MdDone />
        Product Deleted ScuccessFully</p>
      </div>
      }
    </div>
  );
}
