import { Alert, Card, Container, Form, FormGroup } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { AREA_COMUN_LIST_URL } from "../../routing/CONSTANTS";
import "../areas_comunes/AreaComunCreatePage.css";
import { postReserva } from "../../services/SolicitudService";
// import { getByIdResidente } from "../../services/AuthService";

const SolicitudCreatePage = () => {
  const navigate = useNavigate();

  const [showAlertError, setShowAlertError] = useState(false);
  const [inicio, setInicio] = useState("");
  const [fin, setFin] = useState("");
  const location = useLocation();
  const areaComunId = location.state ? location.state.areaComunId : null;
  const token = localStorage.getItem("token");
  // const username = localStorage.getItem("username");
  const id = localStorage.getItem("id");

  useEffect(() => {
    // obtenerUsuario();
  }, []);

  // const obtenerUsuario = () => {
  //   console.log(username)
  //   getByIdResidente(username)
  //     .then((response) => {
  //       setId(response[0].id);
  //     })
  //     .catch((error) => {
  //       console.error("Error al obtener el Residente:", error);
  //     });
  // };
  const crearSolicitud = () => {
    postReserva(token, {
      areaComunId: areaComunId,
      residenteId: id,
      inicio: inicio + ":00.000Z",
      fin: fin + ":00.000Z",
    })
      .then((response) => {
        console.log("Solicitud creada:", response);
        navigate(AREA_COMUN_LIST_URL);
      })
      .catch((error) => {
        console.log("Error al crear Solicitud:", error);
        setShowAlertError(true);
      });
  };

  return (
    <>
      <Container>
        <Card
          border="dark"
          className="mt-5"
          style={{ maxWidth: "700px", margin: "0 auto" }}
        >
          <Card.Body>
            <Card.Title>Formulario Crear Solicitud de Reserva</Card.Title>
            <div>
              {showAlertError && (
                <Alert variant="danger">
                  Error al enviar enviar datos, por favor ingrese datos válidos
                </Alert>
              )}

              <Form>
                <FormGroup className="mt-3">
                  <Form.Label>Selecciona una Fecha de Inicio:</Form.Label>{" "}
                  <Form.Control
                    type="datetime-local"
                    value={inicio}
                    onChange={(e) => setInicio(e.target.value)}
                  />
                </FormGroup>

                <FormGroup className="mt-3">
                  <Form.Label>Selecciona una Fecha de Fin:</Form.Label>{" "}
                  <Form.Control
                    type="datetime-local"
                    value={fin}
                    onChange={(e) => setFin(e.target.value)}
                  />
                </FormGroup>

                <div className="d-flex justify-content-center mt-3">
                  <Link
                    className="link-button"
                    onClick={() => crearSolicitud()}
                  >
                    CREAR SOLICITUD
                  </Link>
                </div>
              </Form>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default SolicitudCreatePage;
