import { Route, Routes } from "react-router-dom";
import Login from "../core/auth/Login";
import Register from "../core/auth/Register";
import Dashboard from "../core/dashboard/Dashboard";
import AdminPanel from "../core/admin/AdminPanel";
import "./CONSTANTS";
import DeudasList from "../core/contabilidad/deuda/DeudasList";

const RouterConfig = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/adminPanel" element={<AdminPanel />} />
      <Route path="/deudas" element={<DeudasList />} />
    </Routes>
  );
};

export default RouterConfig;
