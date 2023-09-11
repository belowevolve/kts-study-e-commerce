import * as React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import "./App.scss";

import Navbar from "./components/Navbar";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Categories from "./pages/Categories";
import Product from "./pages/Product";
import Products from "./pages/Products";
import User from "./pages/User";

const Main: React.FC = () => {
  return (
    <div className="app">
      <Navbar />
      <Outlet />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="/products" element={<Products />} />
          <Route path="products/:id" element={<Product />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/user" element={<User />} />
          <Route path="*" element={<Navigate to="/products" replace />} />
          <Route path="/" element={<Navigate to="/products" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
