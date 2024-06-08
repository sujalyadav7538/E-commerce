/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/userContext.jsx";

export  const  Privateroute = () => {
    const {currUser}=useContext(UserContext);
  return currUser? <Outlet /> : <Navigate to='/singup'/>
}
export const Publiceroute = () => {
    const {currUser}=useContext(UserContext);
    return !currUser? <Outlet /> : <Navigate to='/shop'/>
}

