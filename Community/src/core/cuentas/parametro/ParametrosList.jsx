import  { useEffect, useState } from 'react'
import { getAllParametros } from '../../../services/cuentas/ParametroService'
import { Table } from 'react-bootstrap';
import './ParametrosStyle.css'
import { Link, Navigate } from 'react-router-dom';
import { GetFromStorage } from '../../../services/StorageService';
const ParametrosList = () => {

  const [listaParametros, setListaParametros] = useState([]);

  useEffect(() => {
    document.title = 'Parametros'
    const roleList = GetFromStorage("roles");
    if (roleList?.length != 0 && (!roleList?.includes("ADMIN") || !roleList?.includes("CONTABLE")) ) {
      //Not an admin, get out!
      Navigate("/dashboard");
    }
    getAllParametros().then(response => {
      setListaParametros(response);
      console.log(response);
    })
    
  }, [])
  
  return (
    <div className='table-container'>
      <Link to="/parametros/crear" className="btn btn-primary">Crear Parametro</Link>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Monto</th>
          <th>Activo</th>
          <th>Vencimiento</th>
          <th>Tipo</th>
        </tr>
      </thead>
      <tbody>
        {listaParametros.map((item, index) => (
          <tr key={index}>
            <td>{item.monto}</td>
            <td>{item.activo ? "Sí" : "No"}</td>
            <td>{item.vencimiento}</td>
            <td>{item.tipo}</td>
          </tr>
        ))}
      </tbody>
    </Table>
    </div>
  )
}

export default ParametrosList