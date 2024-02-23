import  { useEffect, useState } from 'react'
import { getAllDeudas } from '../../../services/cuentas/DeudaService'
import { Table } from 'react-bootstrap';
import './DeudasStyle.css'
import { Link } from 'react-router-dom';
const DeudasList = () => {

  const [listaDeudas, setListaDeudas] = useState([]);

  useEffect(() => {
    document.title = 'Deudas'
    getAllDeudas().then(response => {
      setListaDeudas(response);
      console.log(response);
    })
    
  }, [])
  
  return (
    <div className='table-container'>
      <Link to="/deudas/crear" className="btn btn-primary">Crear Deuda</Link>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Residencia ID</th>
          <th>Fecha</th>
          <th>Monto</th>
          <th>Concepto</th>
          <th>Cancelada</th>
          <th>Fecha Limite</th>
          <th>Tipo</th>
        </tr>
      </thead>
      <tbody>
        {listaDeudas.map((item, index) => (
          <tr key={index}>
            <td>{item.residencia_id}</td>
            <td>{item.fecha}</td>
            <td>{item.monto}</td>
            <td>{item.concepto}</td>
            <td>{item.cancelada ? "Sí" : "No"}</td>
            <td>{item.fecha_limite}</td>
            <td>{item.tipo}</td>
          </tr>
        ))}
      </tbody>
    </Table>
    </div>
  )
}

export default DeudasList