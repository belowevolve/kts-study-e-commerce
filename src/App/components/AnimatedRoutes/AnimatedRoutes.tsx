import * as React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ROUTES } from "config/routes";
import About from "pages/About";
import Cart from "pages/Cart";
import Categories from "pages/Categories";
import Product from "pages/Product";
import Products from "pages/Products";

import Main from "../Main";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route element={<Main />}>
        <Route path={ROUTES.PRODUCTS.index} element={<Products />} />
        <Route path={ROUTES.PRODUCTS.ID} element={<Product />} />
        <Route path={ROUTES.CATEGORIES} element={<Categories />} />
        <Route path={ROUTES.ABOUT} element={<About />} />
        <Route path={ROUTES.CART} element={<Cart />} />
        <Route
          path="*"
          element={<Navigate to={ROUTES.PRODUCTS.index} replace />}
        />
      </Route>
    </Routes>
  );
};

export default AnimatedRoutes;
