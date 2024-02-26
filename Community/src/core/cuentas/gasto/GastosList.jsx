import  { useEffect, useState } from 'react'
import { getAllGastos, updateGasto } from '../../../services/cuentas/GastoService'
import { Button, Table } from 'react-bootstrap';
import './GastosStyle.css'
import { Link, Navigate } from 'react-router-dom';
import { GetFromStorage } from '../../../services/StorageService';
const GastosList = () => {

  const [listaGastos, setListaGastos] = useState([]);

  useEffect(() => {
    document.title = 'Gastos'
    const roleList = GetFromStorage("roles");
    if (roleList?.length != 0 && (!roleList?.includes("ADMIN") || !roleList?.includes("CONTABLE")) ) {
      //Not an admin, get out!
      Navigate("/dashboard");
    }
    getAllGastos().then(response => {
      setListaGastos(response);
      console.log(response);
    })
    
  }, [])
  
  const actualizar = (id) => {
    updateGasto(id).then(response => {
      console.log(response);
      window.location.reload();
    })
  }
  //                    {/* <Button onClick={actualizar(item.id)} variant="primary">Gasto Cancelado</Button> */}
  return (
    <div className='table-container'>
      <Link to="/gastos/crear" className="btn btn-primary">Crear Gasto</Link>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Condominio ID</th>
          <th>Fecha</th>
          <th>Monto</th>
          <th>Concepto</th>
          <th>Cancelada</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {listaGastos.map((item, index) => (
          <tr key={index}>
            <td>{item.residencia_id}</td>
            <td>{item.fecha}</td>
            <td>{item.monto}</td>
            <td>{item.concepto}</td>
            <td>{item.cancelada ? "Sí" : "No"}</td>
            <td>
                {
                  !item.cancelada && (
                    <Button variant="primary" onClick={() => actualizar(item.id)}>Gasto Cancelado</Button>
                  )
                }
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    </div>
  )
}

export default GastosList