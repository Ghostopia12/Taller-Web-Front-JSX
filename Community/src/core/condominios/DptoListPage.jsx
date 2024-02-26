import { useEffect, useState } from "react";
import { Card, Container, Table, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { getListaInmuebles, patchUpdateInmueble } from "../../services/condominioService/InmueblesService";

const DptoListPage = () => {
  const { id } = useParams(); // Obtener el ID de la manzana de la URL
  const [listaLotes, setListaLotes] = useState([]);
  const [showAlertError, setShowAlertError] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null); // Estado para almacenar el ID del departamento a eliminar

  useEffect(() => {
    loadLotes();
  }, [id]); // Volver a cargar los departamentos cuando cambie el ID de la manzana

  const loadLotes = () => {
    getListaInmuebles().then((data) => {
      // Filtrar los departamentos para mostrar solo los de la manzana específica
      const departamentosManzana = data && data.filter((lote) => lote.pisoId && lote.pisoId.id === parseInt(id));
      setListaLotes(departamentosManzana);
    });
  };


  const updateCondominio = (id) => {
    setShowAlertError(false);
    const currentDate = new Date().toISOString(); // Obtener la fecha actual en formato ISO

    // Confirmar antes de eliminar
    if (window.confirm("¿Estás seguro de que quieres eliminar este departamento?")) {
      patchUpdateInmueble(id, { activo: true, fecha_cambio_activo: currentDate })
        .then(() => {
          // Filtrar los lotes para mostrar solo los lotes activos
          setListaLotes((prevState) =>
            prevState.filter((lote) => lote.id !== id)
          );
        })
        .catch((error) => {
          if (error.response.status === 401) {
            setShowAlertError(true);
          } else {
            console.log(error);
          }
        });
    }
  };


  const personasActivas = listaLotes.filter((persona) => !persona.activo);


  return (
    <>
      <Container>
        <Card>
          <Card.Body>
            <Card.Title>Lista de departamentos en este piso</Card.Title>
            <Link to={`/dpto/create/${id}`}>
              <Button variant="primary">Crear departamento en este piso</Button>
            </Link>
            <Table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Superficie</th>
                  <th>Latitud</th>
                  <th>Longitud</th>
                  <th>Capacidad del departamento</th>
                  <th>Residente ID</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {personasActivas.map((lote) => (
                  <tr key={lote.id}>
                    <td>{lote.nombre}</td>
                    <td>{lote.superficie} mts2</td>
                    <td>{lote.latitud} </td>
                    <td>{lote.longitud} </td>
                    <td>{lote.capacidad} personas</td>
                    <td>{lote.residente_id}</td>
                    <td>
                    <Button
                        variant="danger"
                        onClick={() => updateCondominio(lote.id)}
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default DptoListPage;
