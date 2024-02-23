import  { useEffect, useState } from 'react'
import { getAllGastos } from '../../../services/cuentas/GastoService'
import { Table } from 'react-bootstrap';
import './GastosStyle.css'
import { Link } from 'react-router-dom';
const GastosList = () => {

  const [listaGastos, setListaGastos] = useState([]);

  useEffect(() => {
    document.title = 'Gastos'
    getAllGastos().then(response => {
      setListaGastos(response);
      console.log(response);
    })
    
  }, [])
  
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
          </tr>
        ))}
      </tbody>
    </Table>
    </div>
  )
}

export default GastosList