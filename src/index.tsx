import * as React from "react";
import { createRoot } from "react-dom/client";
import "config/configureMobX";
import "regenerator-runtime";
import {
  Route,
  RouterProvider,
  createHashRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <RouterProvider
    router={createHashRouter(
      createRoutesFromElements(<Route path="*" element={<App />} />)
    )}
  />
);

if (module.hot) {
  module.hot.accept();
}
