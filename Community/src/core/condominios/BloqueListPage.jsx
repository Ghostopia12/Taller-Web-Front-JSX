import React, { useEffect, useState } from "react";
import { Card, Container, Table, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { getAuthToken } from "../../utilities/TokenUtilities";
import { getListaBloques } from "../../services/BloquesService";

const BloqueListPage = () => {
  const { id } = useParams(); // Obtener el ID del condominio de la URL
  const [listaBloques, setListaBloques] = useState([]);

  useEffect(() => {
    loadBloques();
  }, [id]); // Volver a cargar los bloques cuando cambie el ID del condominio

  const loadBloques = () => {
    getListaBloques(getAuthToken()).then((data) => {
      // Filtrar los bloques para mostrar solo los del condominio específico
      const bloquesCondominio = data.filter((bloque) => bloque.condominioId.id === parseInt(id));
      setListaBloques(bloquesCondominio);
    });
  };

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>Lista de bloques</Card.Title>
          <Link to={`/bloques/create/${id}`}>
            <Button variant="primary">Crear bloque</Button>
          </Link>
          <Table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Cantidad de pisos</th>
                <th>Condominio</th>
                <th>Ver pisos</th>
              </tr>
            </thead>
            <tbody>
              {listaBloques.map((bloque) => (
                <tr key={bloque.id}>
                  <td>{bloque.nombre}</td>
                  <td>{bloque.cantidad_pisos}</td>
                  <td>{bloque.condominioId.nombre}</td>
                  <td>
                    <Link to={`/pisos/list/${bloque.id}`}>
                      <Button variant="primary">Ver pisos en este bloque</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BloqueListPage;
