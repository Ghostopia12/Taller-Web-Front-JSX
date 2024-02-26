import { useEffect, useState } from "react";
import { Card, Container, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getListaInmuebles } from "../../../services/condominioService/InmueblesService";

const ListaResidencias = () => {
  const [listaLotes, setListaLotes] = useState([]);

  useEffect(() => {
    loadLotes();
  });

  const loadLotes = () => {
    getListaInmuebles().then((data) => {
      setListaLotes(data);
    });
  };

  return (
    <>
      
      <Container>
        <Card>
          <Card.Body>
            <Card.Title>Lista de Residencias</Card.Title>
            <Table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Superficie</th>
                  <th>Propietario ID</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {listaLotes.map((lote) => (
                  <tr key={lote.id}>
                    <td>{lote.nombre}</td>
                    <td>{lote.superficie}</td>
                    <td>{lote.residente_id}</td>
                    <td>
                      <Link to={`/deudas/residencia/${lote.id}`}>
                        <Button variant="primary">Pagar</Button>
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

export default ListaResidencias;
