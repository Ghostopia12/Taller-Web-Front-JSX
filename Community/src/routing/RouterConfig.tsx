import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../core/auth/Login";
import Register from "../core/auth/Register";

const RouterConfig = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default RouterConfig;
