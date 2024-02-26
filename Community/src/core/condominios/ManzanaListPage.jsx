import  { useEffect, useState } from "react";
import { Card, Container, Table, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { getListaManzanas } from "../../services/condominioService/ManzanasService";

const ManzanaListPage = () => {
  const { id } = useParams(); // Obtener el ID del condominio de la URL
  const [listaManzanas, setListaManzanas] = useState([]);

  useEffect(() => {
    loadManzanas();
  }, [id]); // Volver a cargar las manzanas cuando cambie el ID del condominio

  const loadManzanas = () => {
    getListaManzanas().then((data) => {
      // Filtrar las manzanas para mostrar solo las del condominio específico
      const manzanasCondominio = data.filter(
        (manzana) => manzana.condominioId.id === parseInt(id)
      );
      setListaManzanas(manzanasCondominio);
    });
  };

  return (
    <>
    
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>Lista de manzanas</Card.Title>
          <Link to={`/manzanas/create/${id}`}>
            <Button variant="primary">Crear manzana</Button>
          </Link>
          <Table>
            <thead>
              <tr>
                <th>Numero de manzana</th>
                <th>Cantidad de lotes</th>
                <th>Condominio</th>
                <th>Ver lotes</th>
              </tr>
            </thead>
            <tbody>
              {listaManzanas.map((manzana) => (
                <tr key={manzana.id}>
                  <td>{manzana.nro_manzana}</td>
                  <td>{manzana.cantidad_lotes}</td>
                  <td>{manzana.condominioId.nombre}</td>

                  <td>
                    <Link to={`/lote/list/${manzana.id}`}>
                      <Button variant="primary">Ver lotes</Button>
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

export default ManzanaListPage;
