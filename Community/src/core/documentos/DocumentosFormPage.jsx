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
import { addDocumento, getDocumento, updateDocumento } from "../../services/comunicacion/DocumentoService";
import { DOCUMENTO_LIST_URL } from "../../routing/CONSTANTS";
import { jwtDecode } from "jwt-decode";




const DocumentosFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [showAlertError, setShowAlertError] = useState(false);
  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("");
 const adminId = jwtDecode(localStorage.getItem("token"))[
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
]

  useEffect(() => {
    if (id !== undefined) {
        getDocumento(id).then((data) => {
          setNombre(data.nombre);
          setMensaje(data.mensaje);
          setTipoDocumento(data.tipoDoc);
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
        createDocumento();
      } else {
        updateDocument();
      }
    }
  };

  const createDocumento = () => {
    setShowAlertError(false);
    addDocumento({
      nombre,
      mensaje,
      tipoDocumento,
      adminId
    })
      .then((data) => {
        if (!data.id) {
          setShowAlertError(true);
          return;
        }
        navigate(DOCUMENTO_LIST_URL);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setShowAlertError(true);
        } else {
          console.log(error);
        }
      });
  };

  const updateDocument = () => {
    setShowAlertError(false);
    updateDocumento(id, {
      nombre,
      mensaje,
      tipoDocumento,
      adminId
    })
      .then((data) => {
        if (!data.id) {
          setShowAlertError(true);
          return;
        }
        navigate(DOCUMENTO_LIST_URL);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setShowAlertError(true);
        } else {
          console.log(error);
        }
      });
  };

  console.log("tipoDocumento", tipoDocumento)
  console.log("mensaje", mensaje)

  return (
    <>
      <Container>
        <Card className="mt-3">
          <Card.Body>
            <Card.Title>Formulario de documentos</Card.Title>
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

                <FormGroup>
                  <label>Mensaje</label>
                  <FormControl
                    value={mensaje}
                    required
                    onChange={(e) => {
                      setMensaje(e.target.value);
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Necesitas un mensaje
                  </Form.Control.Feedback>

                </FormGroup>

                <FormGroup>
                  <label>Tipo de documento</label>
                  <FormControl
                    as="select"
                    value={tipoDocumento}
                    required
                    onChange={(e) => {
                      setTipoDocumento(e.target.value);
                    }}
                  >
                    <option value="">Seleccionar tipo de documento</option>
                    <option value="publico">Público</option>
                    <option value="privado">Privado</option>
                  </FormControl>
                  <Form.Control.Feedback type="invalid">
                    Necesitas seleccionar un tipo de documento
                  </Form.Control.Feedback>
                </FormGroup>


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

                <div className="mt-3">
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

export default DocumentosFormPage;
