import { useEffect, useState } from "react";
import { GetFromStorage } from "../../services/StorageService";
import { getDeudaCanceladaByResidenciaIds } from "../../services/cuentas/DeudaService";
import { getInmuebleXUsuario, getListaInmuebles } from "../../services/condominioService/InmueblesService";
import { getListaPersonas } from "../../services/condominioService/PersonasService";
import { getGastoCanceladoByResidenciaIds } from "../../services/cuentas/GastoService";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Dashboard = () => {

  const [listaDeudasPagadas, setListaDeudasPagadas] = useState([]);
  const [listaDeudasPendientes, setListaDeudasPendientes] = useState([]);
  const [listaGastosPendientes, setListaGastosPendientes] = useState([]);
  const [isContable, setIsContable] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPropietario, setIsPropietario] = useState(false);
  



  useEffect(() => {
    document.title = 'Deudas Residencia'
    const rolesFromStorage = GetFromStorage("roles");
    setIsContable(
      rolesFromStorage?.length !== 0 && rolesFromStorage.includes("CONTABLE")
    );
    setIsAdmin(
      rolesFromStorage?.length !== 0 && rolesFromStorage.includes("ADMIN")
    );
    setIsPropietario(
      rolesFromStorage?.length !== 0 && rolesFromStorage.includes("PROPIETARIO")
    );
    const userId = localStorage.getItem("userId");
    if(isContable || isAdmin){
      getListaInmuebles().then(response => {
        const array = Object.values(response).map(obj => obj.id);
        getDeudaCanceladaByResidenciaIds(array, true).then(response => {
          setListaDeudasPagadas(response);
          console.log(response);
        })
        getDeudaCanceladaByResidenciaIds(array, false).then(response => {
          setListaDeudasPendientes(response);
          console.log(response);
        })
      });
      getListaPersonas().then(response => {
        const array = Object.values(response).map(obj => obj.id);
        getGastoCanceladoByResidenciaIds(array, false).then(response => {
          setListaGastosPendientes(response);
          console.log(response);
        })
      });
    }else{
      getInmuebleXUsuario(userId).then(response => {
        const array = Object.values(response).map(obj => obj.id);
        getDeudaCanceladaByResidenciaIds(array, false).then(response => {
          setListaDeudasPendientes(response);
          console.log(response);
        })
      });
    } 
  }, [])

  const totalDeudaPagadas = listaDeudasPagadas.reduce((acc, item) => acc + item.monto, 0);
  const totalDeudaPendiente = listaDeudasPendientes.reduce((acc, item) => acc + item.monto, 0);
  const totalGastoPendiente = listaGastosPendientes.reduce((acc, item) => acc + item.monto, 0);
  const dineroActual = totalDeudaPagadas - totalGastoPendiente;
  
  return (
    <div className='table-container'>
      {isPropietario &&( 
        <>
        <div className="card">
          <div className="card-body">
            <h1 className="card-title">Deudas Pendientes</h1>
            <h2 className="card-subtitle mb-2 text-muted">Total: {totalDeudaPagadas}</h2>
            <Link to="/deudas">
              <Button variant="primary">Ver Detalle</Button>
            </Link>
          </div>
        </div>
          
        </>
      )
      }
      {isAdmin || isContable &&(
        <>
        <div className="card">
          <div className="card-body">
            <h1 className="card-title">Deudas Pendientes</h1>
            <h2 className="card-subtitle mb-2 text-muted">Total: {totalDeudaPagadas}</h2>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <h1 className="card-title">Deudas Pagadas</h1>
            <h2 className="card-subtitle mb-2 text-muted">Total: {totalDeudaPendiente}</h2>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <h1 className="card-title">Gastos Pendientes</h1>
            <h2 className="card-subtitle mb-2 text-muted">Total: {totalGastoPendiente}</h2>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <h1 className="card-title">Dinero Actual</h1>
            <h2 className="card-subtitle mb-2 text-muted">Total: {dineroActual}</h2>
          </div>
        </div>
        </>
      )}
    </div>
  )
}

export default Dashboard