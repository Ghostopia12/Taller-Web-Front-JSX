import { useEffect, useState } from "react";
import { Card, Container, Table, Button, Modal } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getListaPersonas, patchUpdateCondominio } from "../../services/condominioService/PersonasService";

const PersonaListPage = () => {
  const navigate = useNavigate();
  const [listaPersonas, setListaPersonas] = useState([]);
  const [showAlertError, setShowAlertError] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null); // Estado para almacenar el ID del condominio a eliminar
  const { id } = useParams(); // Obtener el ID del usuario por URL

  useEffect(() => {
    loadPersonas();
  }, []);

  const loadPersonas = () => {
    getListaPersonas().then((data) => {
      localStorage.setItem('personaid', id);
      const personasUsuario = data.filter((persona) => persona.creador == id);
      setListaPersonas(personasUsuario);
    });
  };

  const updateCondominio = (id) => {
    setShowAlertError(false);
    patchUpdateCondominio(id, { activo: true })
      .then((data) => {
        if (!data.id) {
          setShowAlertError(true);
          return;
        }
        loadPersonas();
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setShowAlertError(true);
        } else {
          console.log(error);
        }
      });
  };

  const irA = (id, pagina) => {
    if (pagina === 'Manzana') navigate(`/manzana/list/${id}`);
    if (pagina === 'Bloque') navigate(`/bloque/list/${id}`);
  }

  const handleDeleteConfirmation = () => {
    // Lógica para eliminar el condominio
    if (confirmDeleteId) {
      updateCondominio(confirmDeleteId);
      setConfirmDeleteId(null); // Limpiar el ID de confirmación después de eliminar
    }
  };

  // Filtrar solo las personas con estado activo
  const personasActivas = listaPersonas.filter((persona) => !persona.activo);

  return (
    <>
      <Container>
        <Card>
          <Card.Body>
            <Card.Title>Lista de condominios</Card.Title>
            <Link to={`/personas/create/${id}`}>
              <Button variant="primary">Crear condominios</Button>
            </Link>
            <Table>
              <thead>
                <tr>
                  <th>Nombre del condominio</th>
                  <th>Tipo de condominio</th>
                  <th>Tipo de division</th>
                  <th>Longitud</th>
                  <th>Latitud</th>
                  <th>Estacionamientos</th>
                  <th>Editar</th>
                  <th>Divisiones</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {personasActivas.map((persona) => (
                  <tr key={persona.id}>
                    <td>{persona.nombre}</td>
                    <td>{persona.tipoCondominioId.nombre_tipo_condominio}</td>
                    <td>{persona.tipoDivisionId.nombre_division}</td>
                    <td>{persona.longitud}</td>
                    <td>{persona.latitud}</td>
                    <td>{persona.capacidad_estacionamiento}</td>
                    <td>
                      <Link to={`/condominio/edit/${persona.id}`}>
                        <Button variant="primary">Editar</Button>
                      </Link>
                    </td>
                    <td>
                      <Button variant="success" onClick={() => irA(persona.id, persona.tipoDivisionId.nombre_division)}>Ver divisiones</Button>
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => setConfirmDeleteId(persona.id)} // Al hacer clic, establece el ID del condominio a eliminar
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

      {/* Pop-up de confirmación de eliminación */}
      <Modal show={confirmDeleteId !== null} onHide={() => setConfirmDeleteId(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación de eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que quieres eliminar este condominio?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setConfirmDeleteId(null)}>Cancelar</Button>
          <Button variant="danger" onClick={handleDeleteConfirmation}>Eliminar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PersonaListPage;
