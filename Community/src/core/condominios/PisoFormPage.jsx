import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Container,
  Form,
  FormControl,
  FormGroup,
  Modal,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { postSavePiso } from "../../services/condominioService/PisosService";

const PisoFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [validated, setValidated] = useState(false);
  const [showAlertError, setShowAlertError] = useState(false);
  const [showNegativeError, setShowNegativeError] = useState(false);
  const [numero, setNumero] = useState(0);

  useEffect(() => {}, []);

  const onPisoFormSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;
    if (form.checkValidity()) {
      if (parseInt(numero) >= 0) {
        createPiso();
      } else {
        setShowNegativeError(true);
      }
    }
    setValidated(true);
  };

  const createPiso = () => {
    setShowAlertError(false);
    postSavePiso({
      numero,
      bloqueId_id: parseInt(id),
    })
      .then((data) => {
        if (!data.id) {
          setShowAlertError(true);
          return;
        }
        navigate("/pisos/list/" + id);
      })
      .catch((error) => {
        console.error("Error al crear piso:", error);
        setShowAlertError(true);
      });
  };

  return (
    <>
      
      <Container>
        <Card className="mt-3">
          <Card.Body>
            <Card.Title>Agregar Piso a Bloque</Card.Title>
            <div>
              {showAlertError && (
                <Alert variant="danger">
                  Error al enviar los datos. Por favor, inténtalo de nuevo.
                </Alert>
              )}
              <Form noValidate validated={validated} onSubmit={onPisoFormSubmit}>
                <FormGroup>
                  <Form.Label>Numero de piso</Form.Label>
                  <FormControl
                    type="number"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Ingrese la cantidad de pisos.
                  </Form.Control.Feedback>
                </FormGroup>

                <div className="mt-3">
                  <Button type="submit">Crear Piso</Button>
                </div>
              </Form>
            </div>
          </Card.Body>
        </Card>
      </Container>
      {/* Popup para mostrar error de piso negativo */}
      <Modal show={showNegativeError} onHide={() => setShowNegativeError(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          El número de piso no puede ser negativo.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowNegativeError(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PisoFormPage;
