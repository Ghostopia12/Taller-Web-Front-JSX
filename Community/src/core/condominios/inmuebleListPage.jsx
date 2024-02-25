import React, { useEffect, useState } from "react";
import { Card, Container, Table, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { getAuthToken } from "../../utilities/TokenUtilities";
import { getListaInmuebles } from "../../services/InmueblesService";

const LoteListPage = () => {
  const { id } = useParams(); // Obtener el ID de la manzana de la URL
  const [listaLotes, setListaLotes] = useState([]);

  useEffect(() => {
    loadLotes();
  }, [id]); // Volver a cargar los lotes cuando cambie el ID de la manzana

  const loadLotes = () => {
    console.log("manzanaId", id);
    getListaInmuebles(getAuthToken()).then((data) => {
      // Filtrar los lotes para mostrar solo los de la manzana específica
      const lotesManzana = data.filter(
        (lote) => lote.manzanaId.id === parseInt(id)
      );
      setListaLotes(lotesManzana);
    });
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
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {listaLotes.map((lote) => (
                  <tr key={lote.id}>
                    <td>{lote.nombre}</td>
                    <td>{lote.superficie}</td>
                    <td>
                      <Link to={`/lote/edit/${lote.id}`}>
                        <Button variant="primary">Editar</Button>
                      </Link>
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
