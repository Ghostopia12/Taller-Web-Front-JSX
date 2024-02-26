import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Container,
  Form,
  FormGroup,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { NOTIFICACION_LIST_URL } from "../../routing/CONSTANTS";
import { getListaCatalogos } from "../../services/comunicacion/CatalogoService";
import { addNotificacion } from "../../services/comunicacion/NotificacionService";
import { GetUsers } from "../../services/UserService";




const NotificacionesFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [showAlertError, setShowAlertError] = useState(false);
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [listaCatalogos, setListaCatalogos] = useState([]);
  const [usuarioId, setUsuarioId] = useState("")
  const [catalogoId, setCatalogoId] = useState("")



  useEffect(() => {
    obtenerListaUsuarios();
    obtenerListaCatalogos();
  }, []);


  const obtenerListaUsuarios = () => {
    GetUsers()
      .then((response) => {
        console.log("Lista de usuarios: ", response)
        setListaUsuarios(response.result);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de Usuarios:", error);
      });
  }

  const obtenerListaCatalogos = () => {
    getListaCatalogos()
      .then((response) => {
        console.log("cats", response);
        setListaCatalogos(response);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de Catalogos:", error);
      });
  }


  const onUserFormSubmit = (e) => {
    const form = e.currentTarget;
    let isValid = form.checkValidity();
    e.preventDefault();
    e.stopPropagation();
    setValidated(true);
    if (isValid === true) {
      if (id === undefined) {
        createNotification();
      } else {
        updateCatalog();
      }
    }
  };

  const createNotification = () => {
    setShowAlertError(false);
    addNotificacion({
      usuarioId,
      catalogoId,
    })
      .then((data) => {
        if (!data.id) {
          setShowAlertError(true);
          return;
        }
        navigate(NOTIFICACION_LIST_URL);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setShowAlertError(true);
        } else {
          console.log(error);
        }
      });
  };



  return (
    <>
      <Container>
        <Card className="mt-3">
          <Card.Body>
            <Card.Title>Formulario de notificaciones</Card.Title>
            <div>
              {showAlertError && (
                <Alert variant="danger">
                  Error al enviar enviar datos, por favor intente nuevamente
                </Alert>
              )}
              <Form
                noValidate
                onSubmit={onUserFormSubmit}
                validated={validated}
              >
                <FormGroup className="mt-3">
                  <Form.Label>Usuario</Form.Label>
                  <Form.Control
                    as="select"
                    value={usuarioId}
                    onChange={(e) => setUsuarioId(e.target.value)}
                  >
                    <option value="">Selecciona un usuario</option>
                    {listaUsuarios.map((usuario) => (
                      <option key={usuario.id} value={usuario.id}>
                        {usuario.username}
                      </option>
                    ))}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Necesitas seleccionar un usuario
                  </Form.Control.Feedback>
                </FormGroup>

                <FormGroup className="mt-3">
                  <Form.Label>Catalogo</Form.Label>
                  <Form.Control
                    as="select"
                    value={catalogoId}
                    onChange={(e) => setCatalogoId(e.target.value)}
                  >
                    <option value="">Selecciona un catalogo</option>
                    {listaCatalogos.map((catalogo) => (
                      <option key={catalogo.id} value={catalogo.id}>
                        {catalogo.nombre}
                      </option>
                    ))}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Necesitas seleccionar un catalogo
                  </Form.Control.Feedback>
                </FormGroup>




                <div className="">
                  <Button type="submit">Guardar</Button>
                </div>
              </Form>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default NotificacionesFormPage;
