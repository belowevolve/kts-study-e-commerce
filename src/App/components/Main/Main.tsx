import * as React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import "./Main.scss";

const Main: React.FC = () => {
  return (
    <div className="app">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Main;
