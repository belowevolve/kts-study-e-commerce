import * as React from "react";
import {
  Route,
  Navigate,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import About from "pages/About";
import Cart from "pages/Cart";
import Categories from "pages/Categories";
import Product from "pages/Product";
import Products from "pages/Products";
import User from "pages/User";
import Main from "./components/Main";

const App: React.FC = () => {
  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <Route element={<Main />}>
            <Route path="/products" element={<Products />} />
            <Route path="products/:id" element={<Product />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/user" element={<User />} />
            <Route path="*" element={<Navigate to="/products" replace />} />
          </Route>
        )
      )}
    />
  );
};

export default App;
