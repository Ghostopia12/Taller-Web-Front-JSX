import  { useEffect, useState } from 'react'
import { getAllPagos, getPagoByUsuarioId } from '../../../services/cuentas/PagoService'
import { Table } from 'react-bootstrap';
import './PagosStyle.css'
import { Link } from 'react-router-dom';
import { GetFromStorage } from '../../../services/StorageService';
const PagosList = () => {

  const [listaPagos, setListaPagos] = useState([]);
  const [isContable, setIsContable] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    document.title = 'Pagos'

    const rolesFromStorage = GetFromStorage("roles");
    setIsContable(
      rolesFromStorage?.length !== 0 && rolesFromStorage.includes("CONTABLE")
    );
    setIsAdmin(
      rolesFromStorage?.length !== 0 && rolesFromStorage.includes("ADMIN")
    );
    const userId = localStorage.getItem("userId");
    if(isContable || isAdmin){
      getAllPagos().then(response => {
        setListaPagos(response);
        console.log(response);
      })
    }else{
      getPagoByUsuarioId(userId).then(response => {
        setListaPagos(response);
        console.log(response);
      });
    }
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
        {listaPagos.map((item, index) => (
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