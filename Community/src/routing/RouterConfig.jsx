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
import CrearPago from "../core/cuentas/pago/CrearPago";
import PagosList from "../core/cuentas/pago/PagosList";
import CrearGastos from "../core/cuentas/gasto/CrearGasto";
import GastosList from "../core/cuentas/gasto/GastosList";
import CrearParametro from "../core/cuentas/parametro/CrearParametro";
import ParametrosList from "../core/cuentas/parametro/ParametrosList";
import DocumentosListPage from "../core/documentos/DocumentosListPage";
import DocumentosFormPage from "../core/documentos/DocumentosFormPage";
import CatalogosListPage from "../core/catalogos/CatalogosListPage";
import CatalogosFormPage from "../core/catalogos/CatalogosFormPage";
import PersonaListPage from "../core/condominios/PersonaListPage";
import PersonaFormPage from "../core/condominios/PersonaFormPage";
import CondominioEditPage from "../core/condominios/CondominioEditPage";
import BloqueListPage from "../core/condominios/BloqueListPage";
import BloqueFormPage from "../core/condominios/BloqueFormPage";
import PisoListPage from "../core/condominios/PisoListPage";
import PisoFormPage from "../core/condominios/PisoFormPage";
import DptoListPage from "../core/condominios/DptoListPage";
import DptoFormPage from "../core/condominios/DptoFormPage";
import ManzanaListPage from "../core/condominios/ManzanaListPage";
import ManzanaFormPage from "../core/condominios/ManzanaFormPage";
import LoteListPage from "../core/condominios/LoteListPage";
import LoteFormPage from "../core/condominios/LoteFormPage";
import DeudasResidencia from "../core/cuentas/deuda/DeudasResidencia";
import ListaResidencias from "../core/cuentas/pago/ListaResidencias";
import NotificacionesListPage from "../core/notificaciones/NotificacionesListPage";
import NotificacionesFormPage from "../core/notificaciones/NotificacionesFormPage";

const RouterConfig = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/adminPanel" element={<AdminPanel />} />

      <Route path="/deudas" element={<DeudasList />} />
      <Route path="/deudas/crear" element={<CrearDeuda />} />
      <Route path="/deudas/residencia/:id" element={<DeudasResidencia/>} />
      <Route path="/pago/residencia/:id" element={<CrearPago/>} />
      <Route path="/pagos/listaxpagar" element={<ListaResidencias />} />
      <Route path="/pagos" element={<PagosList />} />
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

      <Route path="/listaNotificaciones" element={<NotificacionesListPage />} />
      <Route path="/crearNotificacion" element={<NotificacionesFormPage />} />


      <Route path="/personas/:id" element={<PersonaListPage/>} />
      <Route path="/personas/create/:id" element={<PersonaFormPage/>} />
      <Route path="/condominio/edit/:id" element={<CondominioEditPage/>} />
      <Route path="/bloque/list/:id" element={<BloqueListPage/>} />
      <Route path="/bloques/create/:id" element={<BloqueFormPage/>} />
      <Route path="/pisos/list/:id" element={<PisoListPage/>} />
      <Route path="/pisos/create/:id" element={<PisoFormPage/>} />
      <Route path="/dpto/list/:id" element={<DptoListPage/>} />
      <Route path="/dpto/create/:id" element={<DptoFormPage/>} />
      <Route path="/manzana/list/:id" element={<ManzanaListPage/>} />
      <Route path="/manzanas/create/:id" element={<ManzanaFormPage/>} />
      <Route path="lote/list/:id" element={<LoteListPage/>} />
      <Route path="lotes/create/:id" element={<LoteFormPage/>} />


    </Routes>
  );
};

export default RouterConfig;
