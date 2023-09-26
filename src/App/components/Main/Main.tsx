import * as React from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../Navbar";
import "./Main.scss";

const Main: React.FC = () => {
  return (
    <>
      <div className="app">
        <Navbar />
        <Outlet />
      </div>
      <ScrollRestoration />
    </>
  );
};

export default Main;
