import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ShopContextProvider from "./context/shopcontext";
import UserContextProvider from "./context/userContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <ShopContextProvider>
        <App />
      </ShopContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
