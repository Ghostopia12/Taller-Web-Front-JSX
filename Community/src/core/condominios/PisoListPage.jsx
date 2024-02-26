import { useEffect, useState } from "react";
import { Card, Container, Table, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { getListaPisos } from "../../services/condominioService/PisosService";

const PisoListPage = () => {
  const { id } = useParams(); // Obtener el ID del condominio de la URL
  const [listaBloques, setListaBloques] = useState([]);

  useEffect(() => {
    loadBloques();
  }, [id]); // Volver a cargar los bloques cuando cambie el ID del condominio

  const loadBloques = () => {
    getListaPisos().then((data) => {
      // Filtrar los bloques para mostrar solo los del condominio específico
      const bloquesCondominio = data.filter((bloque) => bloque.bloqueId.id === parseInt(id));
      setListaBloques(bloquesCondominio);
    });
  };

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>Pisos en este bloque</Card.Title>
          <Link to={`/pisos/create/${id}`}>
            <Button variant="primary">Agregar piso a este bloque</Button>
          </Link>
          <Table>
            <thead>
              <tr>
                <th>numero</th>
              </tr>
            </thead>
            <tbody>
              {listaBloques.map((bloque) => (
                <tr key={bloque.id}>
                  <td>{bloque.numero}</td>
                  <td>
                    <Link to={`/dpto/list/${bloque.id}`}>
                      <Button variant="primary">Ver departamentos en este piso</Button>
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

export default PisoListPage;
