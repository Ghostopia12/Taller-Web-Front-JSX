import {
  Card,
  Container,
  Form,
  FormGroup,
  Button,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SOLICITUD_LIST_URL } from "../../routing/CONSTANTS";
import "../areas_comunes/AreaComunDetailPage.css";
import { putReserva } from "../../services/SolicitudService";

const SolicitudDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const areaComunId = localStorage.getItem("areaComunId");
  const residenteId = localStorage.getItem("residenteId");
  const reservaId = localStorage.getItem("reservaId");
  const inicio = localStorage.getItem("inicio");
  const fin = localStorage.getItem("fin");
  const solicitudId = location.state ? location.state.solicitudId : null;
  const [solicitud, setSolicitud] = useState({
    reservaId: "",
    areaComunId: "",
    residenteId: "",
    inicio: "",
    fin: "",
  });

  useEffect(() => {
    if (solicitudId) {
      setSolicitud({
        reservaId: solicitudId.id,
        areaComunId: areaComunId,
        residenteId: solicitudId.residenteId,
        inicio: inicio,
        fin: fin,
      });
    }
    console.log("SOLICITUD", solicitud);
  }, [solicitudId]);

  const guardarEdicion = () => {
    putReserva(token, {
      reservaId: reservaId,
      areaComunId: areaComunId,
      residenteId: residenteId,
      inicio: solicitud.inicio,
      fin: solicitud.fin,
    })
      .then((response) => {
        console.log("response", response);
        navigate(SOLICITUD_LIST_URL);
      })
      .catch((error) => {
        console.error("Error al guardar la edición de solicitud", error);
      });
  };

  const cancelarEdicion = () => {
    navigate(SOLICITUD_LIST_URL);
  };

  return (
    <Container>
      <Card
        border="dark"
        className="mt-3"
        style={{ maxWidth: "700px", margin: "0 auto" }}
      >
        <Card.Body>
          <Card.Title>Editar Mi Reserva - Área Común: ({solicitudId.areaComun.nombre})</Card.Title>
          <Form>
            
            <FormGroup className="mt-3">
              <Form.Label>Seleccionar una Fecha y Hora de Inicio:</Form.Label>{" "}
              <Form.Control
                type="datetime-local"
                value={solicitud.inicio}
                onChange={(e) =>
                  setSolicitud({ ...solicitud, inicio: e.target.value })
                }
              />
            </FormGroup>

            <FormGroup className="mt-3">
              <Form.Label>Seleccionar una Fecha y Hora de Fin:</Form.Label>{" "}
              <Form.Control
                type="datetime-local"
                value={solicitud.fin}
                onChange={(e) =>
                  setSolicitud({ ...solicitud, fin: e.target.value })
                }
              />
            </FormGroup>
          </Form>

          <div className="botones-container">
            <Button className="mt-3" onClick={guardarEdicion}>
              GUARDAR
            </Button>
            <Button
              className="mt-3"
              variant="secondary"
              onClick={cancelarEdicion}
            >
              CANCELAR
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SolicitudDetailPage;
