/* eslint-disable no-unused-vars */
import { useState } from "react";
import { IoIosRemoveCircle } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";



export const Addproduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    rating: 0,
    discount: false,
    new_price: 0,
    old_price: 0,
    images: [],
    size_available: { S: 0, M: 0, L: 0, "XL'": 0, XXL: 0 },
    tags: [],
    category: "",
  });

  const [localImages, setImages] = useState([]);

  const [discount, setDiscount] = useState(false);

  const [quantity,setQuantity]=useState({});

  const [error,setError]=useState(null);

  const navigate=-useNavigate();

  const handleData = (e) => {
    if (e.target.name === "discount") {
      console.log(e.target.checked, e.target.name);
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.checked,
      }));
    } else if (e.target.name === "tags") {
      setFormData((prev) => {
        const updatedTags = [...prev.tags];
        if (e.target.checked === false) {
          const index = updatedTags.indexOf(e.target.value);
          if (index !== -1) {
            updatedTags.splice(index, 1);
          }
        } else {
          updatedTags.push(e.target.value);
        }
        return { ...prev, tags: updatedTags };
      });
    }else {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleFile = (e) => {
    console.log(e.target.value);
    setImages((prev) => [...prev, ...Array.from(e.target.files)]);
  };

  const uploadImage = async (e) => {
    e.preventDefault();
    const imageUrls = new FormData();
    for (const key in localImages) {
      imageUrls.append("product_image", localImages[key]);
    }
    try {
      console.log("UPLOADING!!!");
      const data = await fetch("http://localhost:3000/api/product/upload", {
        method: "POST",
        body: imageUrls,
      });
      if (data.success === "false") {
        throw new Error("Failed to upload images");
      }

      const responseJson = await data.json();
      setFormData((prev) => ({
        ...prev,
        images: responseJson,
      }));
    } catch (error) {
      console.error("Error uploading images:", error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData['size_available']=quantity;
    console.log(formData);
    try {
      
      const data = await fetch("http://localhost:3000/api/product/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials:'include'
      });
      const res=await data.json();
      if (res.success==false){
        return setError(res.message);
      }
      setError(null);
      navigate(`/product/${res._id}`);
    } catch (error) {
      setError(error);
    }
  };

  const handleSelect = (e) => {
    const value = e.target.value;
    console.log(value);
    
    setQuantity((prev) => ({
      ...prev,
      [value]: 0,
    }));
  };

  const handlesize=(e)=>{
    console.log(e.target.name,e.target.value)
    setQuantity((prev)=>({
      ...prev,
      [e.target.name]:e.target.value,
    }))
  }
  
  const removeSize=(size)=>{
    setQuantity((prev)=>{
      const newQuantity={...prev};
      delete newQuantity[size];
      return newQuantity;
    })
  }

  return (
    <div>

    <div className="border-2 border-slate-800 rounded-lg  max-w-4xl mr-auto ml-auto mt-5 mb-5 shadow-inner font-serif pb-3 bg-slate-200">
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex flex-col m-auto max-w-4xl justify-center items-center"
      >
        <div className="flex flex-col  justify-center p-5 pt-0 m-10  gap-5">
          <h1 className="m-auto pb-3 text-2xl font-semibold underline ">ADD PRODUCT</h1>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold">Product Name: </h1>
            <input
              type="text"
              placeholder="Product Name"
              name="name"
              className="w-[500px] border-2 border-slate-600 p-2 rounded-lg"
              onChange={handleData}
              required
            />
          </div>
          <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold">Description : </h1>
            <textarea
              name="description"
              cols="30"
              rows="2"
              placeholder="About Product"
              minLength="5"
              className="border-2 border-slate-600 p-2 rounded-lg w-[500px]"
              onChange={handleData}
              required
            ></textarea>
          </div>
          <div className="w-[500px] flex justify-start   gap-10">
            <h1 className="text-xl font-semibold">Category : </h1>
            <div className="flex justify-between items-center gap-3">
              <label htmlFor="men">Men</label>
              <input
                type="radio"
                id="men"
                name="category"
                value="men"
                onClick={handleData}
                className=""
                required
              />
            </div>
            <div className="flex justify-center items-center gap-3">
              <label htmlFor="women">Women</label>
              <input
                type="radio"
                id="women"
                name="category"
                value="women"
                onClick={handleData}
                required
              />
            </div>
            <div className="flex justify-center items-center gap-3">
              <label htmlFor="kids">Kids</label>
              <input
                type="radio"
                id="kids"
                name="category"
                value="kids"
                onClick={handleData}
                required
              />
            </div>
          </div>

          <div className="w-[500px] flex flex-col gap-5">
            <div className=" flex gap-3 items-center">
              <input
                type="checkbox"
                name="discount"
                id="old_price"
                onClick={() => setDiscount((prev) => !prev)}
              />{" "}
              <label htmlFor="old_price">Discount Available</label>
              {discount && (
                <input
                  type="number"
                  name="old_price"
                  placeholder="Price"
                  onChange={handleData}
                  className="border-2 border-slate-600 rounded-lg p-2"
                  />
              )}
            </div>
            <div className="flex gap-3 items-baseline">
              <label htmlFor="new_price">Price(IN $)</label>
              <input
                type="number"
                name="new_price"
                id="new_price"
                placeholder="Price"
                onChange={handleData}
                className="border-2 border-slate-600 rounded-lg p-2"
                min={0}
                required
              />
            </div>
          </div>
          <div className="w-[500px] flex ">
            <input
              type="file"
              name="product_image"
              onChange={handleFile}
              className="border-2 placeholder:text-blue-700 p-2"
              required
            />
            <button
              onClick={uploadImage}
              className="border-2 border-l-0 p-2 rounded-e-md bg-gray-500 hover:text-white "
            >
              Upload
            </button>
          </div>
          <div className="w-[500px] flex gap-10  items-center">
            <h1 className="text-xl font-semibold">Tags : </h1>
            <div className="flex gap-3">
              <label htmlFor="latest">Latest</label>
              <input
                type="checkbox"
                name="tags"
                value="latest"
                onClick={handleData}
                id="latest"
                required
                />
            </div>
            <div className="flex gap-3">
              <label htmlFor="modern">Modern</label>
              <input
                type="checkbox"
                name="tags"
                value="modern"
                id="modern"
                onClick={handleData}
                required
              />
            </div>
            <div className="flex gap-3">
              <label htmlFor="classic">Classic</label>
              <input
                type="checkbox"
                name="tags"
                value="classic"
                id="classic"
                onClick={handleData}
                required
              />
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <h1 className="font-semibold text-lg">Size Available : </h1>
            <select name="size_available"  onChange={handleSelect} className="p-2 rounded-lg border-2 border-slate-600" required>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>
          </div>
          <div> 
  <ol type="1" className="list-decimal flex flex-col gap-3 ml-4" >
    {quantity && 
      Object.entries(quantity).map(([size, qty]) => (
        <li key={size} className="pl-3">
          <div className=" max-w-xs border-1 rounded-xl p-2 gap-5 flex shadow-lg shadow-white items-center">
            <label htmlFor={size} className="w-12">{size} : </label>
            <input 
              type="number" 
              name={size} 
              id={size} 
              className="border-2 border-slate-400 rounded-lg p-2" 
              onChange={handlesize} 
              value={qty}
              min='1'
              max='999'
              required
            />
            <button onClick={()=>removeSize(size)}><IoIosRemoveCircle className="hover:text-slate-500"/></button>
          </div>
        </li>
      ))
    }
  </ol>         
</div>

        </div>

        <div>
          <button className="w-[300px] rounded-lg bg-blue-700 p-3 font-semibold hover:bg-blue-500 text-slat"> ADD PRODUCT </button>
        </div>
      </form>

      <p>{error}</p>
    </div>
                </div>
  );
};
