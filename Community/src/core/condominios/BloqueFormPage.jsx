import React, { useEffect, useState } from "react";
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
import { getAuthToken } from "../../utilities/TokenUtilities";
import { postSaveBloque } from "../../services";

const BloqueFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [validated, setValidated] = useState(false);
  const [showAlertError, setShowAlertError] = useState(false);

  const [nombre, setNombre] = useState("");
  const [cantidadPisos, setCantidadPisos] = useState("");

  useEffect(() => {}, []);

  const onBloqueFormSubmit = (e) => {
    const form = e.currentTarget;
    let isValid = form.checkValidity();
    e.preventDefault();
    e.stopPropagation();
    setValidated(true);
    if (!isValid) return;

    createBloque();
  };

  const createBloque = () => {
    setShowAlertError(false);
    if (parseInt(cantidadPisos) <= 100) {
      postSaveBloque({
        condominioId_id: parseInt(id),
        cantidad_pisos: parseInt(cantidadPisos),
        nombre: nombre,
      })
        .then((data) => {
          if (!data.id) {
            setShowAlertError(true);
            return;
          }
          navigate("/bloque/list/" + id);
        })
        .catch((error) => {
          console.error("Error al crear bloque:", error);
          setShowAlertError(true);
        });
    }else
    {
      alert("La cantidad de pisos no puede ser mayor a 100");
    }
  };

  return (
    <>
      
      <Container>
        <Card className="mt-3">
          <Card.Body>
            <Card.Title>Agregar Bloque a Condominio</Card.Title>
            <div>
              {showAlertError && (
                <Alert variant="danger">
                  Error al enviar los datos. Por favor, inténtalo de nuevo.
                </Alert>
              )}
              <Form
                noValidate
                onSubmit={onBloqueFormSubmit}
                validated={validated}
              >
                <FormGroup>
                  <Form.Label>Nombre del Bloque</Form.Label>
                  <FormControl
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Ingrese un nombre válido para el bloque.
                  </Form.Control.Feedback>
                </FormGroup>
                <FormGroup>
                  <Form.Label>Cantidad de Pisos</Form.Label>
                  <FormControl
                    type="number"
                    value={cantidadPisos}
                    onChange={(e) => setCantidadPisos(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Ingrese la cantidad de pisos.
                  </Form.Control.Feedback>
                </FormGroup>

                <div className="mt-3">
                  <Button type="submit">Crear Bloque</Button>
                </div>
              </Form>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default BloqueFormPage;
