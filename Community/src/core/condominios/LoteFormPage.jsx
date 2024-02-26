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
import { postSaveInmueble } from "../../services/condominioService/InmueblesService";

const LoteFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [validated, setValidated] = useState(false);
  const [showAlertError, setShowAlertError] = useState(false);

  const [nombre, setNombre] = useState("");
  const [superficie, setSuperficie] = useState("");
  const [latitud, setLatitud] = useState(""); // Nueva
  const [longitud, setLongitud] = useState(""); // Nueva
  const [capacidad, setCapacidad] = useState("");
  const [residente_id, setResidente_id] = useState("");

  useEffect(() => {}, []);

  const onLoteFormSubmit = (e) => {
    const form = e.currentTarget;
    let isValid = form.checkValidity();
    e.preventDefault();
    e.stopPropagation();
    setValidated(true);
    if (!isValid) return;

    createLote();
  };

  const createLote = () => {
    setShowAlertError(false);
    if (parseInt(superficie) <= 10000) {
      postSaveInmueble({
        nombre,
        superficie: parseInt(superficie),
        latitud: parseFloat(latitud), // Nueva
        longitud: parseFloat(longitud), // Nueva
        manzanaId_id: parseInt(id),
        capacidad: parseInt(capacidad),
        residente_id: parseInt(residente_id),
      })
        .then((data) => {
          if (!data.id) {
            setShowAlertError(true);
            return;
          }
          navigate(`/lote/list/${id}`);
        })
        .catch((error) => {
          console.error("Error al crear lote:", error);
          setShowAlertError(true);
        });
    } else {  
      alert("La superficie no puede ser mayor a 10000");
    }
    
  };

  return (
    <>
      <Container>
        <Card className="mt-3">
          <Card.Body>
            <Card.Title>Agregar Lote a Manzana</Card.Title>
            <div>
              {showAlertError && (
                <Alert variant="danger">
                  Error al enviar los datos. Por favor, inténtalo de nuevo.
                </Alert>
              )}
              <Form
                noValidate
                onSubmit={onLoteFormSubmit}
                validated={validated}
              >
                <FormGroup>
                  <Form.Label>Nombre del Lote</Form.Label>
                  <FormControl
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Ingrese un nombre válido para el lote.
                  </Form.Control.Feedback>
                </FormGroup>
                <FormGroup>
                  <Form.Label>Superficie del Lote</Form.Label>
                  <FormControl
                    type="number"
                    value={superficie}
                    onChange={(e) => setSuperficie(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Ingrese la superficie del lote.
                  </Form.Control.Feedback>
                </FormGroup>
                <FormGroup>
                  <Form.Label>Latitud</Form.Label> {/* Nueva */}
                  <FormControl
                    type="number"
                    value={latitud}
                    onChange={(e) => setLatitud(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Ingrese la latitud.
                  </Form.Control.Feedback>
                </FormGroup>
                <FormGroup>
                  <Form.Label>Longitud</Form.Label> {/* Nueva */}
                  <FormControl
                    type="number"
                    value={longitud}
                    onChange={(e) => setLongitud(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Ingrese la longitud.
                  </Form.Control.Feedback>
                </FormGroup>
                <FormGroup>
                  <Form.Label>Capacidad</Form.Label>
                  <FormControl
                    type="number"
                    value={capacidad}
                    onChange={(e) => setCapacidad(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Ingrese la superficie del lote.
                  </Form.Control.Feedback>
                </FormGroup>
                <FormGroup>
                  <Form.Label>Residente ID</Form.Label>
                  <FormControl
                    type="number"
                    value={residente_id}
                    onChange={(e) => setResidente_id(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Ingrese la superficie del residente.
                  </Form.Control.Feedback>
                </FormGroup>
                <div className="mt-3">
                  <Button type="submit">Crear Lote</Button>
                </div>
              </Form>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default LoteFormPage;
