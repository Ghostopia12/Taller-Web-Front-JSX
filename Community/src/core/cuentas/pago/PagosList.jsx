import  { useEffect, useState } from 'react'
import { getAllPagos, getPagoByDeudaIds } from '../../../services/cuentas/PagoService'
import { Table } from 'react-bootstrap';
import './PagosStyle.css'
import { Link } from 'react-router-dom';
import { GetFromStorage } from '../../../services/StorageService';
import { getInmuebleXUsuario } from '../../../services/condominioService/InmueblesService';
import { getDeudaByResidenciaIds } from '../../../services/cuentas/DeudaService';
const PagosList = () => {

  const [listaPagos, setListaPagos] = useState([]);
  const [isContable, setIsContable] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    document.title = 'Pagos'
    const userId = localStorage.getItem("userId");
    const rolesFromStorage = GetFromStorage("roles");
    setIsContable(
      rolesFromStorage?.length !== 0 && rolesFromStorage.includes("CONTABLE")
    );
    setIsAdmin(
      rolesFromStorage?.length !== 0 && rolesFromStorage.includes("ADMIN")
    );
    if (rolesFromStorage?.length != 0 && (!rolesFromStorage?.includes("ADMIN") || !rolesFromStorage?.includes("CONTABLE")) ) {
      getInmuebleXUsuario(userId).then(response => {
        const array = Object.values(response).map(obj => obj.id);
        getDeudaByResidenciaIds(array).then(resp => {
          const array_deudas = Object.values(resp).map(obj => obj.id);
          console.log(array_deudas);
          getPagoByDeudaIds(array_deudas).then(response => {
            setListaPagos(response);
            console.log(response);
          });
        })
      });
    }else{
      getAllPagos().then(response => {
        setListaPagos(response.pagos);
      })
    }
    /* if(isContable || isAdmin){
      getAllPagos().then(response => {
        setListaPagos(response);
        console.log(response);
      })
    }else{//recordatorio tengo que cambiar el metodo para que sea ids de deudas primero obteniendo las deudas por residencia que es reciedencia x usuario
      getInmuebleXUsuario(userId).then(response => {
        const array = Object.values(response).map(obj => obj.id);
        getDeudaByResidenciaIds(array).then(resp => {
          const array_deudas = Object.values(resp).map(obj => obj.id);
          console.log(array_deudas);
          getPagoByDeudaIds(array_deudas).then(response => {
            setListaPagos(response);
            console.log(response);
          });
        })
      });
    } */
  }, [])
  
  return (
    <div className='table-container'>
      {isAdmin &&(
        <Link to="/pagos/listaxpagar" className="btn btn-primary">Crear Pago</Link>
      )}
      {isContable &&(
        <Link to="/pagos/listaxpagar" className="btn btn-primary">Crear Pago</Link>
      )}
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Deuda ID</th>
          <th>ID Contador</th>
          <th>Fecha</th>
          <th>Monto</th>
          <th>Tipo</th>
        </tr>
      </thead>
      <tbody>
        {listaPagos && listaPagos.map((item, index) => (
          <tr key={index}>
            <td>{item.deuda_id}</td>
            <td>{item.contable_id ? item.contable_id : "No"}</td>
            <td>{item.fecha}</td>
            <td>{item.monto}</td>
            <td>{item.tipo}</td>
          </tr>
        ))}
      </tbody>
    </Table>
    </div>
  )
}

export default PagosList