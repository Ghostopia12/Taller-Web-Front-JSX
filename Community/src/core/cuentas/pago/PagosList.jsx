import  { useEffect, useState } from 'react'
import { getAllPagos } from '../../../services/cuentas/PagoService'
import { Table } from 'react-bootstrap';
import './PagosStyle.css'
import { Link } from 'react-router-dom';
const PagosList = () => {

  const [listaPagos, setListaPagos] = useState([]);

  useEffect(() => {
    document.title = 'Pagos'
    getAllPagos().then(response => {
      setListaPagos(response);
      console.log(response);
    })
    
  }, [])
  
  return (
    <div className='table-container'>
      <Link to="/pagos/crear" className="btn btn-primary">Crear Pago</Link>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Usuario ID</th>
          <th>Fecha</th>
          <th>Monto</th>
          <th>Tipo</th>
        </tr>
      </thead>
      <tbody>
        {listaPagos.map((item, index) => (
          <tr key={index}>
            <td>{item.usuario_id}</td>
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