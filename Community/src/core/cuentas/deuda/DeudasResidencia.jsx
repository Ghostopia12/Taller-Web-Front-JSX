import  { useEffect, useState } from 'react'
import { getDeudaByResidenciaIds } from '../../../services/cuentas/DeudaService'
import { Button, Table } from 'react-bootstrap';
import './DeudasStyle.css'
import { Link, Navigate, useParams } from 'react-router-dom';
import { GetFromStorage } from '../../../services/StorageService';
const DeudasResidencia = () => {

  const [listaDeudas, setListaDeudas] = useState([]);
/*   const [isContable, setIsContable] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); */
  const { id } = useParams();//id de la residencia



  useEffect(() => {
    document.title = 'Deudas Residencia'
/*     const rolesFromStorage = GetFromStorage("roles");
    setIsContable(
      rolesFromStorage?.length !== 0 && rolesFromStorage.includes("CONTABLE")
    );
    setIsAdmin(
      rolesFromStorage?.length !== 0 && rolesFromStorage.includes("ADMIN")
    );
    if(isContable || isAdmin){
      const array = [id];
      getDeudaByResidenciaIds(array).then(response => {
        setListaDeudas(response);
        console.log(response);
      })
    }else{
      Navigate("/dashboard");
    } */ 

    const roleList = GetFromStorage("roles");
    if (roleList?.length != 0 && (!roleList?.includes("ADMIN") || !roleList?.includes("CONTABLE")) ) {
      //Not an admin, get out!
      Navigate("/dashboard");
    }else{
      const array = [parseInt(id)];
      getDeudaByResidenciaIds(array).then(response => {
        setListaDeudas(response);
        console.log(response);
      })
    }
  }, [])
  
  return (
    <div className='table-container'>
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
          <th></th>
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
            <td>{/* si ya esta cancelada no deberia aparecer este boton */}
              <Link to={`/pago/residencia/${item.id}`}>
                <Button variant="primary">Pagar</Button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    </div>
  )
}

export default DeudasResidencia