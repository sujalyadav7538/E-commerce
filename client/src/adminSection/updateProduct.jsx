/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosRemoveCircle } from "react-icons/io";
import { useEffect } from "react";
import ImageModals from "../modals/imageModals.jsx";

export const UpdateProduct = () => {
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await fetch(
        `https://e-commerce-1-t31g.onrender.com/api/product/getProduct/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await product.json();
      setFormData(data);
      setDiscount(data.discount);
      setQuantity(formData.size_available)
    };
    fetchProduct();
  }, [id]);

  const [formData, setFormData] = useState(null);

  const [localImages, setImages] = useState([]);

  const [discount, setDiscount] = useState(false);

  const [quantity, setQuantity] = useState(null);

  const [error, setError] = useState(null);

  const [imageUploading, seImageUploading] = useState(false);

  const [creating, setCreating] = useState(false);

  const [customInageMssg, setCustomImageMssg] = useState(null);

  const [showImageModal,setImageModal]=useState(false);

  const navigate = useNavigate();

  const handleSubmit = () => { };

  const handleData = (e) => {
    if (e.target.name === "category") {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
    if (e.target.name === "tags") {
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

  const removeSize=(size)=>{
    setQuantity((prev)=>{
      const newQuantity={...prev};
      delete newQuantity[size];
      return newQuantity;
    })
  }

  const handleSize = () => { };

const uploadImage = async (e) => {
    e.preventDefault();
    const imageUrls = new FormData();
    seImageUploading(true);
    setCustomImageMssg(null)
    for (const key in localImages) {
      imageUrls.append("product_image", localImages[key]);
    }
    try {
      const data = await fetch("http://localhost:3000/api/product/upload", {
        method: "POST",
        body: imageUrls,
      });
      if (data.success === "false") {
        seImageUploading(false)
        return setCustomImageMssg("Failed To Upload Image!!")
      }
      
      const responseJson = await data.json();
      
      setCustomImageMssg('Image Uploaded Successfully!!');
      const newImages=[...formData.images,...responseJson]
      setFormData((prev)=>({...prev,images:newImages}));
      seImageUploading(false)
    } catch (error) {
      seImageUploading(false)
      console.error("Error uploading images:", error.message);
    }
  };

  const handleSelect = (e) => {
    const value = e.target.value;  
    setQuantity((prev) => ({
      ...prev,
      [value]: 0,
    }));
  };
  const handleImageArray=(index)=>{
    const updatedImages=[...formData.images];
    updatedImages.splice(index,1);
    setFormData((prev)=>({
      ...prev,
      images:updatedImages
    }));
    };
  
  const handleModal=()=>{
    setImageModal(prev=>!prev);
  };



  return (
    <>
      { formData && (
      <div className="flex justify-center ">
        {showImageModal&&<ImageModals images={formData.images} handleImages={handleImageArray} hideModal={handleModal}/>}
        <div className="border-2 border-slate-800 rounded-lg flex max-w-4xl mr-auto ml-auto mt-5 mb-5 shadow-inner font-serif pb-3 bg-slate-200">
          <form
            action=""
            onSubmit={handleSubmit}
            className="flex flex-col m-auto max-w-4xl justify-center items-center"
          >
            <div className="flex flex-col  justify-center p-5 pt-0 m-10  gap-5">
              <h1 className="m-auto pb-3 text-2xl font-semibold underline ">
                ADD PRODUCT
              </h1>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-semibold">Product Name: </h1>
                <input
                  type="text"
                  placeholder="Product Name"
                  name="name"
                  className="w-[500px] border-2 border-slate-600 p-2 rounded-lg"
                  onChange={handleData}
                  defaultValue={formData.name}
                  required
                />
              </div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-semibold">Description : </h1>
                <textarea
                  name="description"
                  cols="30"
                  rows="3"
                  placeholder="About Product"
                  minLength="5"
                  className="border-2 border-slate-600 p-2 rounded-lg w-[500px]"
                  onChange={handleData}
                  defaultValue={formData.description}
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
                    checked={formData.category === "men"}
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
                    checked={formData.category === "women"}
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
                    checked={formData.category === "kids"}
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
                    checked={discount}
                    onClick={() => setDiscount((prev) => !prev)}
                  />{" "}
                  <label htmlFor="old_price">Discount Available</label>
                  {discount && (
                    <input
                      type="number"
                      name="new_price"
                      id="new_price"
                      placeholder="Price"
                      onChange={handleData}
                      className="border-2 border-slate-600 rounded-lg p-2"
                      min={0}
                      defaultValue={formData.new_price}
                    />
                  )}
                </div>
                <div className="flex gap-3 items-baseline">
                  <label htmlFor="new_price">Price(IN $)</label>
                  <input
                    type="number"
                    name="old_price"
                    placeholder="Price"
                    onChange={handleData}
                    className="border-2 border-slate-600 rounded-lg p-2"
                    defaultValue={formData.old_price}
                    required
                  />
                </div>
              </div>
              <div className=" flex items-center ">
                <input
                  type="file"
                  name="product_image"
                  onChange={handleFile}
                  className="border-2 placeholder:text-blue-700 p-2 w-[200px]"
                  multiple
                />
                <button
                  onClick={uploadImage}
                  className="border-2 border-l-0 p-2 rounded-e-md bg-gray-500 hover:text-white disabled:bg-slate-200"
                  disabled={imageUploading}
                >
                  {imageUploading ? "Uploading" : "Upload"}
                </button>
                <p className="ml-4 text-green-700 font-medium">
                  {customInageMssg && customInageMssg}
                </p>
              </div>
              <div className="flex gap-5 items-center">
                {formData &&
                  formData.images.map((url, index) => {
                    if (index >= 3) return null
                    return (
                      <div key={index} className="flex">
                        <img
                          src={url}
                          alt="Prosuct image"
                          key={index}
                          className="h-[150px] w-[150px] rounded-lg hover:scale-95"
                        />
                      </div>
                    );
                  })}
                <p className="font-semibold text-sm hover:text-blue-600 hover:ring-offset-2 hover:underline cursor-pointer" onClick={handleModal}>more+</p>
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
                    checked={formData.tags.includes("latest")}

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
                    checked={formData.tags.includes("modern")}

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
                    checked={formData.tags.includes("classic")}
                  />
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <h1 className="font-semibold text-lg">Size Available : </h1>
                <select
                  name="size_available"
                  onChange={handleSelect}
                  className="p-2 rounded-lg border-2 border-slate-600"
                  required
                >
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                </select>
              </div>
              <div>
                <ol type="1" className="list-decimal flex flex-col gap-3 ml-4">
                  {quantity &&
                    Object.entries(quantity).map(([size, qty]) => (
                      <li key={size} className="pl-3">
                        <div className=" max-w-xs border-1 rounded-xl p-2 gap-5 flex shadow-lg shadow-white items-center">
                          <label htmlFor={size} className="w-12">
                            {size} :{" "}
                          </label>
                          <input
                            type="number"
                                  name={size}
                            id={size}
                            className="border-2 border-slate-400 rounded-lg p-2"
                            onChange={handleSize}
                            value={qty}
                            min="1"
                            max="999"
                            required
                          />
                          <button onClick={() => removeSize(size)}>
                            <IoIosRemoveCircle className="hover:text-slate-500" />
                          </button>
                        </div>
                      </li>
                    ))}
                </ol>
              </div>
            </div>

            <div>
              <button
                className="w-[300px] rounded-lg bg-blue-700 p-3 font-semibold hover:bg-blue-500 text-slat disabled:bg-blue-400"
                disabled={imageUploading || creating}
              >
                {" "}
                {creating ? "Creating" : "Create Product"}{" "}
              </button>
            </div>
          </form>

          <p>{error}</p>
        </div>
      </div>
        )}
  </>
    )
};
