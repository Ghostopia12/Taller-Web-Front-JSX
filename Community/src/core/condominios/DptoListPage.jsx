import React, { useEffect, useState } from "react";
import { Card, Container, Table, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { getAuthToken } from "../../utilities/TokenUtilities";
import { getListaInmuebles, patchUpdateInmueble } from "../../services/InmueblesService";

const DptoListPage = () => {
  const { id } = useParams(); // Obtener el ID de la manzana de la URL
  const [listaLotes, setListaLotes] = useState([]);
  
  const [showAlertError, setShowAlertError] = useState(false);

  useEffect(() => {
    loadLotes();
  }, [id]); // Volver a cargar los lotes cuando cambie el ID de la manzana

  const loadLotes = () => {
    getListaInmuebles(getAuthToken()).then((data) => {
      // Filtrar los lotes para mostrar solo los de la manzana específica
      const lotesManzana = data && data.filter((lote) => lote.pisoId && lote.pisoId.id === parseInt(id));
      setListaLotes(lotesManzana);
    });
  };

  const updateCondominio = (id) => {
    setShowAlertError(false);
    patchUpdateInmueble( id, { activo: true })
      .then((data) => {
        if (!data.id) {
          setShowAlertError(true);
          return;
        }
        loadLotes();
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setShowAlertError(true);
        } else {
          console.log(error);
        }
      });
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
                      <Link to={`/lote/edit/${lote.id}`}>
                        <Button variant="primary">Editar</Button>
                      </Link>
                    </td>
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
