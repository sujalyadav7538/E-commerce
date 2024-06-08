/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useState, useEffect } from "react";
import useLocalStorage from "use-local-storage";

export const UserContext = createContext(null);

const UserContextProvider = (props) => {
  const [storage, setStorage] = useLocalStorage('user', null);
  const [currUser, setCurrUser] = useState(storage);

  useEffect(() => {
    if (storage) {
      setCurrUser(storage);
    }
  }, [storage]);

  const setUser = (user) => {
    setCurrUser(user);
    setStorage(user);
  };
  
  const removeUser=()=>{
    setCurrUser(null);
    setStorage(null);
  }
  const contextValue = { currUser, setUser ,removeUser};

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
