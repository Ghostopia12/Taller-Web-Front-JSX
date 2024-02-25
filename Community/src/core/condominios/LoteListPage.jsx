import React, { useEffect, useState } from "react";
import { Card, Container, Table, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { getAuthToken } from "../../utilities/TokenUtilities";
import {
  getListaInmuebles,
  patchUpdateInmueble,
} from "../../services/InmueblesService";

const LoteListPage = () => {
  const { id } = useParams(); // Obtener el ID de la manzana de la URL
  const [listaLotes, setListaLotes] = useState([]);
  const [showAlertError, setShowAlertError] = useState(false);

  useEffect(() => {
    loadLotes();
  }, [id]); // Volver a cargar los lotes cuando cambie el ID de la manzana

  const loadLotes = () => {
    console.log("manzanaId", id);
    getListaInmuebles(getAuthToken()).then((data) => {
      // Filtrar los lotes para mostrar solo los de la manzana específica
      const lotesManzana =
        data &&
        data.filter(
          (lote) => lote.manzanaId && lote.manzanaId.id === parseInt(id)
        );
      setListaLotes(lotesManzana);
    });
  };

  const updateCondominio = (id) => {
    setShowAlertError(false);
    const currentDate = new Date().toISOString(); // Obtener la fecha actual en formato ISO

    // Confirmar antes de eliminar
    if (window.confirm("¿Estás seguro de que quieres eliminar este lote?")) {
      patchUpdateInmueble(id, { activo: false, fecha_cambio_activo: currentDate })
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

  const toggleConstruccion = (id) => {
    const currentDate = new Date().toISOString(); // Obtener la fecha actual en formato ISO
    // Obtener el inmueble actual por su ID
    const inmuebleToUpdate = listaLotes.find(lote => lote.id == id);
    if (!inmuebleToUpdate) {
      console.log("Inmueble no encontrado");
      return;
    }
  
    // Invertir el valor de construccion
    const nuevoEstadoConstruccion = !inmuebleToUpdate.estado_construccion;
  
    // Confirmar antes de cambiar el estado de construcción
    if (window.confirm("¿Estás seguro de que quieres cambiar el estado de construcción de este lote?")) {
      // Enviar la solicitud PATCH con el nuevo estado de construccion
      patchUpdateInmueble(id, { estado_construccion: nuevoEstadoConstruccion, fecha_cambio_construccion: currentDate })
        .then(() => {
          // Actualizar el estado del lote para reflejar el cambio
          setListaLotes(prevState =>
            prevState.map(lote =>
              lote.id === id ? { ...lote, estado_construccion: nuevoEstadoConstruccion } : lote
            )
          );
        })
        .catch(error => {
          if (error.response.status === 401) {
            setShowAlertError(true);
          } else {
            console.log(error);
          }
        });
    }
  };

  return (
    <>
      
      <Container>
        <Card>
          <Card.Body>
            <Card.Title>Lista de lotes</Card.Title>
            <Link to={`/lotes/create/${id}`}>
              <Button variant="primary">Crear lote</Button>
            </Link>
            <Table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Superficie</th>
                  <th>Latitud</th>
                  <th>Longitud</th>
                  <th>Construccion</th>
                  <th>Capacidad</th>
                  <th>Eliminar</th>
                  <th>Estado de construccion</th>
                </tr>
              </thead>
              <tbody>
                {personasActivas.map((lote) => (
                  <tr key={lote.id}>
                    <td>{lote.nombre}</td>
                    <td>{lote.superficie} mts2</td>
                    <td>{lote.latitud}</td>
                    <td>{lote.longitud}</td>
                    <td>{lote.estado_construccion ? "Sí" : "No"}</td>
                    <td>{lote.capacidad}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => updateCondominio(lote.id)}
                      >
                        Eliminar
                      </Button>
                    </td>
                    <td>
                      <Button variant="primary" onClick={() => toggleConstruccion(lote.id)}>
                        Cambiar
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

export default LoteListPage;
