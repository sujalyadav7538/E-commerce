/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

export const Login = () => {
  const [user, setUserData] = useState({
    useremail: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const handleData = (e) => {
    setUserData((prev) => ({
      ...prev,  
      [e.target.name]: e.target.value,
    }));
  };

  const {currUser,setUser}=useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        credentials: "include" 
      });

      const data = await res.json();
      if (data.success == false) {
        setError(data.message);
        return;
      }
      setError(null);
      setUser(data);
      navigate("/shop");
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[100vh] flex justify-center pt-20 bg-pink-200 shadow-xl mb-50 shadow-pink-200">
      <div className="flex flex-col bg-white max-w-xl h-[75vh] p-10 mb-10 justify-center items-center rounded-md shadow-2xl">
        <form
          className="flex flex-col justify-items-stretch pb-3 gap-12"
          onSubmit={handleSubmit}
        >
          <h1 className="text-3xl font-semibold m-auto font-serif">Login</h1>
          <input
            type="email"
            placeholder="xyz@gmail.com"
            className="w-[450px] p-4 border border-slate-500 border-opacity-90 rounded-lg"
            name="useremail"
            onChange={handleData}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-[450px] p-4 border border-slate-500 border-opacity-90 rounded-lg"
            name="password"
            onChange={handleData}
            required
          />
          <button
            type="submit"
            className={`bg-red-600 text-white w-[450px] p-4 text-xl rounded-lg ${
              loading ? "bg-gray-400 cursor-not-allowed" : "hover:bg-red-700"
            }`}
            disabled={loading}
          >
            {loading ? "logging..." : "Login"}
          </button>
        </form>
        <p>
          Do not have an Account?{" "}
          <span className="text-red-950 font-semibold">
            <Link to={`/singup`}>SingUp</Link>
          </span>
        </p>
        <div className="bg-white w-full pt-3 text-red-600 font-medium text-xl font-serif">
          {error}
        </div>
      </div>
    </div>
  );
};
