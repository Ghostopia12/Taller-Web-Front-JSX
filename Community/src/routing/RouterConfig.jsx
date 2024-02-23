import { Route, Routes } from "react-router-dom";
import Login from "../core/auth/Login";
import Register from "../core/auth/Register";
import Dashboard from "../core/dashboard/Dashboard";
import AdminPanel from "../core/admin/AdminPanel";
import "./CONSTANTS";
import DeudasList from "../core/cuentas/deuda/DeudasList";
import Inicio from "../core/Inicio/Inicio";
import Residente from "../core/residente/Residente";
import Propietario from "../core/propietario/Propietario";
import Trabajador from "../core/trabajador/Trabajador";
import Guard from "../core/guardia/Guard";
import CrearDeuda from "../core/cuentas/deuda/CrearDeuda";

const RouterConfig = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/adminPanel" element={<AdminPanel />} />
      <Route path="/deudas" element={<DeudasList />} />
      <Route path="/deudas/crear" element={<CrearDeuda />} />

      <Route path="/guardia" element={<Guard />} />
      <Route path="/residente" element={<Residente />} />
      <Route path="/propietario" element={<Propietario />} />
      <Route path="/trabajador" element={<Trabajador />} />
      <Route path="/" element={<Inicio />} />
      
    </Routes>
  );
};

export default RouterConfig;
