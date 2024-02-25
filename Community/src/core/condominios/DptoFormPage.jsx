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

const DptoFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [validated, setValidated] = useState(false);
  const [showAlertError, setShowAlertError] = useState(false);

  const [nombre, setNombre] = useState("");
  const [superficie, setSuperficie] = useState("");
  const [latitud, setLatitud] = useState("");
  const [longitud, setLongitud] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [residente_id, setResidente_id] = useState("");

  useEffect(() => {}, []);

  const onDptoFormSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;
    if (form.checkValidity()) {
      createDpto();
    }
    setValidated(true);
  };

  const createDpto = () => {
    setShowAlertError(false);
    if (parseInt(superficie) <= 10000) {
      postSaveInmueble({
        nombre,
        superficie: parseInt(superficie),
        latitud: parseFloat(latitud),
        longitud: parseFloat(longitud),
        capacidad: parseInt(capacidad),
        pisoId_id: parseInt(id),
        residente_id: parseInt(residente_id),
      })
        .then((data) => {
          if (!data.id) {
            setShowAlertError(true);
            return;
          }
          navigate(`/dpto/list/${id}`);
        })
        .catch((error) => {
          console.error("Error al crear departamento:", error);
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
            <Card.Title>Agregar Departamento</Card.Title>
            <div>
              {showAlertError && (
                <Alert variant="danger">
                  Error al enviar los datos. Por favor, inténtalo de nuevo.
                </Alert>
              )}
              <Form noValidate validated={validated} onSubmit={onDptoFormSubmit}>
                <FormGroup>
                  <Form.Label>Nombre del departamento</Form.Label>
                  <FormControl
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Ingrese un nombre válido para el departamento.
                  </Form.Control.Feedback>
                </FormGroup>
                <FormGroup>
                  <Form.Label>Superficie del departamento en mts2</Form.Label>
                  <FormControl
                    type="number"
                    value={superficie}
                    onChange={(e) => setSuperficie(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Ingrese la superficie del departamento.
                  </Form.Control.Feedback>
                </FormGroup>
                <FormGroup>
                  <Form.Label>Latitud</Form.Label>
                  <FormControl
                    type="number"
                    value={latitud}
                    onChange={(e) => setLatitud(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Ingrese la latitud del departamento.
                  </Form.Control.Feedback>
                </FormGroup>
                <FormGroup>
                  <Form.Label>Longitud</Form.Label>
                  <FormControl
                    type="number"
                    value={longitud}
                    onChange={(e) => setLongitud(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Ingrese la longitud del departamento.
                  </Form.Control.Feedback>
                </FormGroup>
                <FormGroup>
                  <Form.Label>Capacidad del departamento</Form.Label>
                  <FormControl
                    type="number"
                    value={capacidad}
                    onChange={(e) => setCapacidad(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Ingrese la capacidad del departamento.
                  </Form.Control.Feedback>
                </FormGroup>
                <FormGroup>
                  <Form.Label>Ingrese el id del residente (manual por ahora)</Form.Label>
                  <FormControl
                    type="number"
                    value={residente_id}
                    onChange={(e) => setResidente_id(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Ingrese la capacidad del departamento.
                  </Form.Control.Feedback>
                </FormGroup>
                <div className="mt-3">
                  <Button type="submit">Crear Departamento</Button>
                </div>
              </Form>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default DptoFormPage;
