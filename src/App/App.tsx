import * as React from "react";
import {
  Route,
  Navigate,
  RouterProvider,
  createRoutesFromElements,
  createHashRouter,
} from "react-router-dom";

import { ROUTES } from "config/routes";
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
      router={createHashRouter(
        createRoutesFromElements(
          <Route element={<Main />}>
            <Route path={ROUTES.PRODUCTS.index} element={<Products />} />
            <Route path={ROUTES.PRODUCTS.ID} element={<Product />} />
            <Route path={ROUTES.CATEGORIES} element={<Categories />} />
            <Route path={ROUTES.ABOUT} element={<About />} />
            <Route path={ROUTES.CART} element={<Cart />} />
            <Route path={ROUTES.USER} element={<User />} />
            <Route
              path="*"
              element={<Navigate to={ROUTES.PRODUCTS.index} replace />}
            />
          </Route>
        )
      )}
    />
  );
};

export default App;
