import { Route, Routes } from "react-router-dom";
import Login from "../core/auth/Login";
import Register from "../core/auth/Register";
import Dashboard from "../core/dashboard/Dashboard";
import AdminPanel from "../core/admin/AdminPanel";
import "./CONSTANTS";
import Inicio from "../core/Inicio/Inicio";
import Residente from "../core/residente/Residente";
import Propietario from "../core/propietario/Propietario";
import Trabajador from "../core/trabajador/Trabajador";
import Guard from "../core/guardia/Guard";
import CrearDeuda from "../core/cuentas/deuda/CrearDeuda";
import AreaComunListPage from "../core/areas_comunes/AreaComunListPage";
import AreaComunCreatePage from "../core/areas_comunes/AreaComunCreatePage";
import AreaComunDetailPage from "../core/areas_comunes/AreaComunDetailPage";
import SolicitudListPage from "../core/solicitudes/SolicitudListPage";
import SolicitudCreatePage from "../core/solicitudes/SolicitudCreatePage";
import SolicitudDetailPage from "../core/solicitudes/SolicitudDetailPage";
import DeudasList from "../core/cuentas/deuda/DeudasList";
import CrearPagos from "../core/cuentas/pago/CrearPago";
import PagosList from "../core/cuentas/pago/PagosList";
import CrearGastos from "../core/cuentas/gasto/CrearGasto";
import GastosList from "../core/cuentas/gasto/GastosList";
import CrearParametro from "../core/cuentas/parametro/CrearParametro";
import ParametrosList from "../core/cuentas/parametro/ParametrosList";
import DocumentosListPage from "../core/documentos/DocumentosListPage";
import DocumentosFormPage from "../core/documentos/DocumentosFormPage";
import CatalogosListPage from "../core/catalogos/CatalogosListPage";
import CatalogosFormPage from "../core/catalogos/CatalogosFormPage";

const RouterConfig = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/adminPanel" element={<AdminPanel />} />
      <Route path="/deudas" element={<DeudasList />} />
      <Route path="/deudas/crear" element={<CrearDeuda />} />
      <Route path="/pagos" element={<PagosList />} />
      <Route path="/pagos/crear" element={<CrearPagos />} />
      <Route path="/gastos" element={<GastosList />} />
      <Route path="/gastos/crear" element={<CrearGastos />} />
      <Route path="/parametros" element={<ParametrosList />} />
      <Route path="/parametros/crear" element={<CrearParametro />} />

      <Route path="/listaAreasComunes" element={<AreaComunListPage />} />
      <Route path="/crearAreaComun" element={<AreaComunCreatePage />} />
      <Route path="/detalleAreaComun" element={<AreaComunDetailPage />} />

      <Route path="/listaSolicitudes" element={<SolicitudListPage />} />
      <Route path="/crearSolicitud" element={<SolicitudCreatePage />} />
      <Route path="/detalleSolicitud" element={<SolicitudDetailPage />} />

      <Route path="/guardia" element={<Guard />} />
      <Route path="/residente" element={<Residente />} />
      <Route path="/propietario" element={<Propietario />} />
      <Route path="/trabajador" element={<Trabajador />} />
      <Route path="/" element={<Inicio />} />

      <Route path="/listaDocumentos" element={<DocumentosListPage />} />
      <Route path="/crearDocumento" element={<DocumentosFormPage />} />
      <Route path="/editarDocumento/:id" element={<DocumentosFormPage />} />

      <Route path="/listaCatalogos" element={<CatalogosListPage />} />
      <Route path="/crearCatalogo" element={<CatalogosFormPage />} />
      <Route path="/editarCatalogo/:id" element={<CatalogosFormPage />} />
      
    </Routes>
  );
};

export default RouterConfig;
