import  { useEffect, useState } from 'react'
import { getAllDeudas, getDeudaByResidenciaIds } from '../../../services/cuentas/DeudaService'
import { Table } from 'react-bootstrap';
import './DeudasStyle.css'
import { Link } from 'react-router-dom';
import { getInmuebleXUsuario } from '../../../services/condominioService/InmueblesService';
import { GetFromStorage } from '../../../services/StorageService';
const DeudasList = () => {

  const [listaDeudas, setListaDeudas] = useState([]);
  const [isContable, setIsContable] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);


  useEffect(() => {
    const rolesFromStorage = GetFromStorage("roles");
    setIsContable(
      rolesFromStorage?.length !== 0 && rolesFromStorage.includes("CONTABLE")
    );
    setIsAdmin(
      rolesFromStorage?.length !== 0 && rolesFromStorage.includes("ADMIN")
    );
    const userId = localStorage.getItem("userId");
    if(isContable || isAdmin){
      getAllDeudas().then(response => {
        setListaDeudas(response.deudas);
        console.log(response);
      })
    }else{
      getInmuebleXUsuario(userId).then(response => {
        const array = Object.values(response).map(obj => obj.id);
        getDeudaByResidenciaIds(array).then(response => {
          setListaDeudas(response);
          console.log(response);
        })
      });
    }
/*     getInmuebleXUsuario(userId).then(response => {
      const array = Object.values(response).map(obj => obj.id);
      console.log(array);
      getDeudaByResidenciaIds(array).then(response => {
        setListaDeudas(response);
        console.log(response);
      })
    }); */
    document.title = 'Deudas'

    
  }, [])
  
  return (
    <div className='table-container'>
      {isAdmin &&(
          <Link to="/deudas/crear" className="btn btn-primary">Crear Deuda</Link>
      )}
      {isContable &&(
          <Link to="/deudas/crear" className="btn btn-primary">Crear Deuda</Link>
      )}
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