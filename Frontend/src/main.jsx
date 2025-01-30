import React from "react";
import { Navigate } from "react-router-dom";
import { ProductsProvider } from "./context/productsContext.jsx";
import { AuthProvider } from "./context/authContext.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Login } from "./pages/Login/Login.jsx";

import { Register } from "./pages/Register/Register.jsx";
import App from "./pages/Main/App.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ProductsProvider>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Navigate to="/Main" />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Main" element={<App />} />
        </Routes>
      </BrowserRouter>
    </ProductsProvider>
  </AuthProvider>
);
