import * as React from "react";
import { createRoot } from "react-dom/client";
import "config/configureMobX";
import "regenerator-runtime";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if (module.hot) {
  module.hot.accept();
}
