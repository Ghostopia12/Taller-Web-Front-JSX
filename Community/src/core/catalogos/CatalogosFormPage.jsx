import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Container,
  Form,
  FormControl,
  FormGroup,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { CATALOGO_LIST_URL } from "../../routing/CONSTANTS";
import { jwtDecode } from "jwt-decode";
import { addCatalogo, getCatalogo, updateCatalogo } from "../../services/comunicacion/CatalogoService";




const CatalogosFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [showAlertError, setShowAlertError] = useState(false);
  const [nombre, setNombre] = useState("");
  const [documento, setDocumento] = useState("");
 const adminId = jwtDecode(localStorage.getItem("token"))[
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
]

console.log("adminId", adminId)

  useEffect(() => {
    if (id !== undefined) {
        getCatalogo(id).then((data) => {
          setNombre(data.nombre);
          setDocumento(data.documentoId);
        });
    }
  }, [id]);

  const onUserFormSubmit = (e) => {
    const form = e.currentTarget;
    let isValid = form.checkValidity();
    e.preventDefault();
    e.stopPropagation();
    setValidated(true);
    if (isValid === true) {
      if (id === undefined) {
        createCatalogo();
      } else {
        updateCatalog();
      }
    }
  };

  const createCatalogo = () => {
    setShowAlertError(false);
    addCatalogo({
      nombre,
      documento,
      adminId
    })
      .then((data) => {
        if (!data.id) {
          setShowAlertError(true);
          return;
        }
        navigate(CATALOGO_LIST_URL);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setShowAlertError(true);
        } else {
          console.log(error);
        }
      });
  };

  const updateCatalog = () => {
    setShowAlertError(false);
    updateCatalogo(id, {
      nombre,
      documento,
      adminId
    })
      .then((data) => {
        if (!data.id) {
          setShowAlertError(true);
          return;
        }
        navigate(CATALOGO_LIST_URL);
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
            <Card.Title>Formulario de catalogos</Card.Title>
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
                <FormGroup>
                  <label>Nombre</label>
                  <FormControl
                    value={nombre}
                    required
                    onChange={(e) => {
                      setNombre(e.target.value);
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Necesitas un nombre
                  </Form.Control.Feedback>
                </FormGroup>

                {/* <FormGroup>
                  <label>documento</label>
                  <FormControl
                    value={documento}
                    required
                    onChange={(e) => {
                      setDocumento(e.target.value);
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Necesitas un documento
                  </Form.Control.Feedback>

                </FormGroup> */}

                {/* <FormGroup>
                  <label>Documentos</label>
                  <FormControl
                    as="select"
                    value={documento}
                    required
                    onChange={(e) => {
                      setTipoDoc(e.target.value);
                    }}
                  >
                    <option value="">Seleccionar tipo de documento</option>
                    <option value="publico">Público</option>
                    <option value="privado">Privado</option>
                  </FormControl>
                  <Form.Control.Feedback type="invalid">
                    Necesitas seleccionar un tipo de documento
                  </Form.Control.Feedback>
                </FormGroup> */}


                <FormGroup style={{display : "none"}}>
                  <label>Administrador</label>
                  <FormControl
                    value={jwtDecode(localStorage.getItem("token"))[
                      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
                    ]}
                    required
                    readOnly // Hacer que el campo sea de solo lectura
                  />
                  <Form.Control.Feedback type="invalid">
                    Necesitas un administrador
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

export default CatalogosFormPage;
