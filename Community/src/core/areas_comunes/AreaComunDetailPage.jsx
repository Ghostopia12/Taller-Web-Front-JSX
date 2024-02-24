import {
  Card,
  Container,
  Form,
  FormControl,
  FormGroup,
  Button,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AREA_COMUN_LIST_URL } from "../../routing/CONSTANTS";
import "../areas_comunes/AreaComunDetailPage.css";
import { getListaCondominios, getListaTurnos, putAreaComun } from "../../services/AreaComunService";

const AreaComunDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [listaTurnos, setListaTurnos] = useState([]);
  const [listaCondominios, setListaCondominios] = useState([]);
  const [condominioSeleccionado, setCondominioSeleccionado] = useState('');
  const [turnoSeleccionado, setTurnoSeleccionado] = useState('');
  const token = localStorage.getItem("token");
  const condominioId = localStorage.getItem("condominioId")
  const turnoId = localStorage.getItem("turnoId")
  const areaComunId = location.state ? location.state.areaComunId : null;
  const [areaComun, setAreaComun] = useState({
    areaComunId: "",
    condominioId: "",
    nombre: "",
    descripcion: "",
    capacidadMaxima: 0,
    turnoId: "",
    estado: "",
    fecha: "",
  });

  useEffect(() => {
    if (areaComunId) {
      console.log("areaComunId:", areaComunId);
      setAreaComun({
        areaComunId: areaComunId.id,
        condominioId: condominioSeleccionado,
        nombre: areaComunId.nombre,
        descripcion: areaComunId.descripcion,
        capacidadMaxima: areaComunId.capacidadMaxima,
        turnoId: turnoSeleccionado,
        estado: areaComunId.estado,
        fecha: areaComunId.fecha,
      });
      console.log("AREA COMUN 123:", areaComun);
    }
    obtenerListaTurnos();
    obtenerListaCondominios();
    console.log("condominioId:", condominioId);
  }, []);

  const obtenerListaTurnos = () => {
    getListaTurnos(token)
      .then((response) => {
        setListaTurnos(response);
        if (response.length > 0) {
          setTurnoSeleccionado(turnoId);
        }
      })
      .catch((error) => {
        console.error("Error al obtener la lista de Turnos:", error);
      });
  };

  const obtenerListaCondominios = () => {
    getListaCondominios(token)
      .then((response) => {
        setListaCondominios(response);
        if (response.length > 0) {
          setCondominioSeleccionado(condominioId);
        }
      })
      .catch((error) => {
        console.error("Error al obtener la lista de Condominios:", error);
      });
  };

  const guardarEdicion = () => {
    putAreaComun(token, {
      areaComunId: areaComun.areaComunId,
      condominioId: condominioSeleccionado,
      turnoId: turnoSeleccionado,
      nombre: areaComun.nombre,
      descripcion: areaComun.descripcion,
      capacidadMaxima: parseInt(areaComun.capacidadMaxima),
      estado: areaComun.estado,
      finCierre: areaComun.fecha,
    })
      .then((response) => {
        console.log("response", response);
        navigate(AREA_COMUN_LIST_URL);
      })
      .catch((error) => {
        console.error("Error al guardar la edición del área común", error);
      });
  };

  const cancelarEdicion = () => {
    navigate(AREA_COMUN_LIST_URL);
  };

  return (
      <Container>
        <Card
          border="dark"
          className="mt-3"
          style={{ maxWidth: "700px", margin: "0 auto" }}
        >
          <Card.Body>
            <Card.Title>Editar Área Común</Card.Title>
            <Form>
              <FormGroup className="mt-3">
                <Form.Label>Condominio</Form.Label>
                <Form.Control
                  as="select"
                  value={condominioSeleccionado}
                  onChange={(e) => setCondominioSeleccionado(e.target.value)}
                  
                >
                  <option value="">Seleccione un Condominio</option>
                  {listaCondominios.map((condominio) => (
                    <option key={condominio.id} value={condominio.id}>
                      {condominio.nombre}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Necesitas seleccionar un Condominio
                </Form.Control.Feedback>
              </FormGroup>

              <FormGroup className="mt-3">
                <Form.Label>Nombre Área Común</Form.Label>
                <FormControl
                  value={areaComun.nombre}
                  required
                  onChange={(e) =>
                    setAreaComun({ ...areaComun, nombre: e.target.value })
                  }
                />
              </FormGroup>

              <FormGroup className="mt-3">
                <Form.Label>Descripción</Form.Label>
                <FormControl
                  value={areaComun.descripcion}
                  required
                  onChange={(e) =>
                    setAreaComun({ ...areaComun, descripcion: e.target.value })
                  }
                />
              </FormGroup>

              <FormGroup className="mt-3">
                <Form.Label>Capacidad Máxima</Form.Label>
                <FormControl
                  value={areaComun.capacidadMaxima}
                  required
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setAreaComun({
                      ...areaComun,
                      capacidadMaxima: newValue !== undefined ? newValue : 0,
                    });
                  }}
                />
              </FormGroup>
              <FormGroup className="mt-3">
                <Form.Label>Turno</Form.Label>
                <Form.Control
                  as="select"
                  value={turnoSeleccionado}
                  onChange={(e) => setTurnoSeleccionado(e.target.value)}
                >
                  <option value="">Seleccione un Turno</option>
                  {listaTurnos.map((turno) => (
                    <option key={turno.id} value={turno.id}>
                      Turno - {turno.inicio} - {turno.fin}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Necesitas seleccionar un turno
                </Form.Control.Feedback>
              </FormGroup>

              <FormGroup className="mt-3">
                <Form.Label>Estado</Form.Label>
                <Form.Control
                  as="select"
                  value={areaComun.estado}
                  onChange={(e) =>
                    setAreaComun({ ...areaComun, estado: e.target.value })
                  }
                >
                  <option value="">Selecciona el Estado</option>
                  <option value="Limpieza">Limpieza</option>
                  <option value="Refaccion">Refaccion</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Necesitas seleccionar un estado
                </Form.Control.Feedback>
              </FormGroup>

              <FormGroup className="mt-3">
                  <Form.Label>Seleccionar un limite de fecha de entrega:</Form.Label>{" "}
                  <Form.Control
                    type="datetime-local"
                    value={areaComun.fecha}
                    onChange={(e) =>
                      setAreaComun({ ...areaComun, fecha: e.target.value })
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

export default AreaComunDetailPage;
