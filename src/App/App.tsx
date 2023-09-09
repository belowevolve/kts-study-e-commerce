import * as React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.scss";

import Navbar from "./components/Navbar";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Categories from "./pages/Categories";
import Products from "./pages/Products";
import User from "./pages/User";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/products" element={<Products />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/user" element={<User />} />
        <Route path="*" element={<Navigate to="/products" replace />} />
        <Route path="/" element={<Navigate to="/products" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
