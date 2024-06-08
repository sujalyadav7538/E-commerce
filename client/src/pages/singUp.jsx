/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CheckParams from './../utils/checkParams.jsx';


export default function SingUp() {
  const [user, setUserData] = useState({
    useremail: "",
    username: "",
    password: "",
  });

  const [creating, setCreating] = useState(false);
  const ref = useRef();
  const navigate = useNavigate();
  const [err, setError] = useState(null);

  const handleData = (e) => {
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const registerUser = async (e) => {
    e.preventDefault();
    if (!ref.current.checked) return setError("Agree To terms!");

    setCreating(true);
    try {
      const check = new CheckParams();
      let { status, mssg } = check.checkUsername(user.username);
      if (status === false) return setError(mssg);
      ({ status, mssg } = check.checkEmail(user.useremail));
      if (status === false) return setError(mssg);
      ({ status, mssg } = check.checkPassword(user.password));
      if (status === false) return setError(mssg);
      const res = await fetch("http://localhost:3000/api/user/singup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        credentials: "include" 
      });

      const data = await res.json();
      console.log(data)
      if (data.success == false) {
        setError(data.message);
        return
      }
      setError(null)
      navigate("/cart");
    } catch (err) {
      setError(err)
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="h-[100vh] flex justify-center pt-20 bg-pink-200 shadow-xl mb-50 shadow-pink-200 flex-col items-center">
      <div className="flex flex-col bg-white max-w-xl h-[75vh] p-10  justify-center items-center rounded-md shadow-2xl ">
        <form onSubmit={registerUser} className="flex flex-col gap-5 pb-3">
          <h1 className="text-3xl font-serif font-semibold m-auto">Sign Up</h1>
          <input
            type="text"
            placeholder="Your Name...."
            className="w-[450px] p-4 border border-slate-500 border-opacity-90 rounded-lg"
            name="username"
            onChange={handleData}
            required
          />
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
              creating ? "bg-gray-400 cursor-not-allowed" : "hover:bg-red-700"
            }`}
            disabled={creating}
          >
            {creating ? "Registering..." : "Register"}
          </button>
        </form>
        <p>
          Already have an Account?{" "}
          <span className="text-red-950 font-semibold">
            <Link to={`/login`}>Login</Link>
          </span>
        </p>
        <div className="flex gap-4">
          <input type="checkbox" name="" id="" ref={ref} />
          <p>By continuing, I agree to use terms of use & privacy</p>
        </div>
      <div className="bg-white w-full pt-3 text-red-600 font-medium text-xl font-serif">{err}</div>
      </div>
    </div>
  );
}
