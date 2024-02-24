import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../areas_comunes/AreaComunListPage.css";
import { SOLICITUD_DETAIL_URL } from "../../routing/CONSTANTS";
import {
  aceptarSolicitudReserva,
  deleteSolicitudReserva,
  enEsperaSolicitudReserva,
  getListaReservas,
  getMisReservas,
} from "../../services/SolicitudService";

const SolicitudListPage = () => {
  const navigate = useNavigate();
  const [listaSolicitudes, setListaSolicitudes] = useState([]);
  const [listaMisSolicitudes, setListaMisSolicitudes] = useState([]);
  const id = localStorage.getItem("residenteId");
  const roles = localStorage.getItem("roles");
  const token = localStorage.getItem("token");

  useEffect(() => {
    obtenerListaReservas();
  }, []);

  const obtenerListaReservas = () => {
    if (roles.includes("ADMIN")) {
      getListaReservas()
        .then((response) => {
          setListaSolicitudes(response);
        })
        .catch((error) => {
          console.error("Error al obtener la lista de reservas:", error);
        });
    } else if (roles.includes("RESIDENTE")) {
      getMisReservas(id)
        .then((response) => {
          setListaMisSolicitudes(response);
        })
        .catch((error) => {
          console.error("Error al obtener la lista de mis reservas:", error);
        });
    }
  };

  function calcularDiferenciaDias(fechaInicio, fechaFin) {
    const fechaInicioObj = new Date(fechaInicio);
    const fechaFinObj = new Date(fechaFin);

    // Calcula la diferencia en milisegundos
    const diferenciaMilisegundos = fechaFinObj - fechaInicioObj;

    // Calcula la diferencia en días
    const diferenciaDias = Math.ceil(
      diferenciaMilisegundos / (1000 * 60 * 60 * 24)
    );

    return diferenciaDias;
  }

  function eliminarSolicitudReserva(id) {
    if (
      !window.confirm(
        "¿Estás seguro que deseas eliminar tu solicitud de reserva?"
      )
    ) {
      return;
    }
    deleteSolicitudReserva(token, id)
      .then((response) => {
        console.log("response", response);
        obtenerListaReservas();
      })
      .catch((error) => {
        console.error("Error al eliminar la reserva:", error);
      });
  }

  function aceptarReserva(id) {
    if (
      !window.confirm(
        "¿Estás seguro que deseas aceptar esta solicitud de reserva?"
      )
    ) {
      return;
    }
    aceptarSolicitudReserva(token, { reservaId: id })
      .then((response) => {
        console.log("response", response);
        obtenerListaReservas();
      })
      .catch((error) => {
        console.error("Error al aceptar la reserva:", error);
      });
  }

  function ponerEnEsperaReserva(id) {
    if (
      !window.confirm(
        "¿Estás seguro que deseas poner en espera esta solicitud de reserva?"
      )
    ) {
      return;
    }
    enEsperaSolicitudReserva(token, { reservaId: id })
      .then((response) => {
        console.log("response", response);
        obtenerListaReservas();
      })
      .catch((error) => {
        console.error("Error al poner en espera la reserva:", error);
      });
  }

  // const filterByEstado = () => {
  //   return listaMisSolicitudes.filter(
  //     (solicitudes) => solicitudes.eliminado === false
  //   );
  // };

  const filterByEstadoReserva = (estado) => {
    return listaSolicitudes.filter(
      (solicitudes) => solicitudes.estado === estado
    );
  };

  const filterByEstadoAceptado = () => {
    return listaMisSolicitudes.filter(
      (solicitudes) =>
        solicitudes.estado === "Aceptado" && !solicitudes.eliminado
    );
  };

  const filterByEstadoEspera = () => {
    return listaMisSolicitudes.filter(
      (solicitudes) => solicitudes.estado === "Espera" && !solicitudes.eliminado
    );
  };

  const filterByEstadoSolicitado = () => {
    return listaMisSolicitudes.filter(
      (solicitudes) =>
        solicitudes.estado === "Solicitado" && !solicitudes.eliminado
    );
  };

  return (
    <div className="container-wrapper">
      <Container>
        {(roles.includes("ADMIN") || roles.includes("RESIDENTE")) && (
          <div className="mt-3 text-center ">
            <div>
              <h3 className="lista-title">LISTA DE SOLICITUDES</h3>
            </div>
          </div>
        )}

        {/* Lista de Solicitudes de los Usuarios (LADO ADMIN)*/}
        {roles.includes("RESIDENTE") && (
          <>
            <Container>
              <h3 className="lista-title" style={{ color: "red" }}>
                LISTA DE RESERVAS SOLICITADAS
              </h3>
              <div className="col-8 offset-2 mt-5">
                {filterByEstadoReserva("Solicitado").map((solicitudes) => (
                  <Card className="custom-card" key={solicitudes.id}>
                    <Row>
                      <Col className="my-auto col-12 card-content">
                        <Card.Title>
                          <strong>
                            {solicitudes.areaComun.condominio.nombre.toUpperCase()}{" "}
                            - {solicitudes.areaComun.nombre.toUpperCase()} (
                            {solicitudes.areaComun.descripcion}){" "}
                            {solicitudes.areaComun.turno.inicio}-
                            {solicitudes.areaComun.turno.fin}
                          </strong>
                        </Card.Title>
                        <Card.Text>
                          FECHA DE LA RESERVA:{" "}
                          {solicitudes.inicio.substring(0, 10)} -{" "}
                          {solicitudes.fin.substring(0, 10)} (
                          {calcularDiferenciaDias(
                            solicitudes.inicio.substring(0, 10),
                            solicitudes.fin.substring(0, 10)
                          )}{" "}
                          Dias)
                        </Card.Text>
                        <Card.Text>
                          HORARIO DE LA RESERVA:{" "}
                          {solicitudes.inicio.substring(11, 16)} -{" "}
                          {solicitudes.fin.substring(11, 16)}
                        </Card.Text>
                        <Card.Text>
                          SOLICITANTE: {solicitudes.residente.nombre}
                        </Card.Text>
                      </Col>
                    </Row>
                    <div className="botones-container">
                      <Button
                        className="solicitar-button btn btn-warning mt-3 text-center d-flex"
                        key={solicitudes.id}
                        onClick={() => {
                          aceptarReserva(solicitudes.id);
                        }}
                      >
                        ACEPTAR SOLICITUD
                      </Button>

                      <Button
                        className="eliminar-button btn btn-danger mt-3 text-center d-flex"
                        key={solicitudes.id}
                        onClick={() => {
                          ponerEnEsperaReserva(solicitudes.id);
                        }}
                      >
                        EN ESPERA
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </Container>

            <Container>
              <h3 className="lista-title" style={{ color: "red" }}>
                LISTA DE RESERVAS EN ESPERA
              </h3>
              <div className="col-8 offset-2 mt-5">
                {filterByEstadoReserva("Espera").map((solicitudes) => (
                  <Card className="custom-card" key={solicitudes.id}>
                    <Row>
                      <Col className="my-auto col-12 card-content">
                        <Card.Title>
                          <strong>
                            {solicitudes.areaComun.condominio.nombre.toUpperCase()}{" "}
                            - {solicitudes.areaComun.nombre.toUpperCase()} (
                            {solicitudes.areaComun.descripcion}){" "}
                            {solicitudes.areaComun.turno.inicio}-
                            {solicitudes.areaComun.turno.fin}
                          </strong>
                        </Card.Title>
                        <Card.Text>
                          FECHA DE LA RESERVA:{" "}
                          {solicitudes.inicio.substring(0, 10)} -{" "}
                          {solicitudes.fin.substring(0, 10)} (
                          {calcularDiferenciaDias(
                            solicitudes.inicio.substring(0, 10),
                            solicitudes.fin.substring(0, 10)
                          )}{" "}
                          Dias)
                        </Card.Text>
                        <Card.Text>
                          HORARIO DE LA RESERVA:{" "}
                          {solicitudes.inicio.substring(11, 16)} -{" "}
                          {solicitudes.fin.substring(11, 16)}
                        </Card.Text>
                        <Card.Text>
                          SOLICITANTE: {solicitudes.residente.nombre}
                        </Card.Text>
                      </Col>
                    </Row>
                    <div className="botones-container">
                      <Button
                        className="solicitar-button btn btn-warning mt-3 text-center d-flex"
                        key={solicitudes.id}
                        onClick={() => {
                          aceptarReserva(solicitudes.id);
                        }}
                      >
                        ACEPTAR SOLICITUD
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </Container>

            <Container>
              <h3 className="lista-title" style={{ color: "red" }}>
                LISTA DE RESERVAS ACEPTADAS
              </h3>
              <div className="col-8 offset-2 mt-5">
                {filterByEstadoReserva("Aceptado").map((solicitudes) => (
                  <Card className="custom-card" key={solicitudes.id}>
                    <Row>
                      <Col className="my-auto col-12 card-content">
                        <Card.Title>
                          <strong>
                            {solicitudes.areaComun.condominio.nombre.toUpperCase()}{" "}
                            - {solicitudes.areaComun.nombre.toUpperCase()} (
                            {solicitudes.areaComun.descripcion}){" "}
                            {solicitudes.areaComun.turno.inicio}-
                            {solicitudes.areaComun.turno.fin}
                          </strong>
                        </Card.Title>
                        <Card.Text>
                          FECHA DE LA RESERVA:{" "}
                          {solicitudes.inicio.substring(0, 10)} -{" "}
                          {solicitudes.fin.substring(0, 10)} (
                          {calcularDiferenciaDias(
                            solicitudes.inicio.substring(0, 10),
                            solicitudes.fin.substring(0, 10)
                          )}{" "}
                          Dias)
                        </Card.Text>
                        <Card.Text>
                          HORARIO DE LA RESERVA:{" "}
                          {solicitudes.inicio.substring(11, 16)} -{" "}
                          {solicitudes.fin.substring(11, 16)}
                        </Card.Text>
                        <Card.Text>
                          SOLICITANTE: {solicitudes.residente.nombre}
                        </Card.Text>
                      </Col>
                    </Row>
                  </Card>
                ))}
              </div>
            </Container>
          </>
        )}
        {/* // LISTA DE MIS RESERVAS SOLICITADAS (LADO RESIDENTE) */}
        {roles.includes("RESIDENTE") && (
          <Container>
            <h3 className="lista-title" style={{ color: "red" }}>
              MIS RESERVAS SOLICITADAS
            </h3>
            <div className="col-8 offset-2 mt-5">
              {filterByEstadoSolicitado().map((solicitudes) => (
                <Card className="custom-card" key={solicitudes.id}>
                  <Row>
                    <Col className="my-auto col-12 card-content">
                      <Card.Title>
                        <strong>
                          {solicitudes.areaComun.condominio.nombre.toUpperCase()}{" "}
                          - {solicitudes.areaComun.nombre.toUpperCase()} (
                          {solicitudes.areaComun.descripcion}){" "}
                          {solicitudes.areaComun.turno.inicio}-
                          {solicitudes.areaComun.turno.fin}
                        </strong>
                      </Card.Title>
                      <Card.Text>
                        FECHA DE LA RESERVA:{" "}
                        {solicitudes.inicio.substring(0, 10)} -{" "}
                        {solicitudes.fin.substring(0, 10)} (
                        {calcularDiferenciaDias(
                          solicitudes.inicio.substring(0, 10),
                          solicitudes.fin.substring(0, 10)
                        )}
                        {"  "}
                        Dias)
                      </Card.Text>
                      <Card.Text>
                        HORARIO DE LA RESERVA:{" "}
                        {solicitudes.inicio.substring(11, 16)} -{" "}
                        {solicitudes.fin.substring(11, 16)}
                      </Card.Text>
                    </Col>
                  </Row>
                  <div className="botones-container">
                    <Button
                      className="solicitar-button btn btn-success mt-3 text-center d-flex"
                      key={solicitudes.id}
                      onClick={() => {
                        navigate(SOLICITUD_DETAIL_URL, {
                          state: { solicitudId: solicitudes },
                        });
                        localStorage.setItem(
                          "areaComunId",
                          solicitudes.areaComun.id
                        );
                        localStorage.setItem(
                          "residenteId",
                          solicitudes.residente.id
                        );
                        localStorage.setItem("reservaId", solicitudes.id);
                        localStorage.setItem("inicio", solicitudes.inicio);
                        localStorage.setItem("fin", solicitudes.fin);
                      }}
                    >
                      EDITAR
                    </Button>

                    <Button
                      className="eliminar-button btn btn-danger mt-3 text-center d-flex"
                      key={solicitudes.id}
                      onClick={() => {
                        eliminarSolicitudReserva(solicitudes.id);
                      }}
                    >
                      ELIMINAR
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        )}
        {/* // LISTA DE MIS RESERVAS ACEPTADAS (LADO RESIDENTE) */}
        {roles.includes("RESIDENTE") && (
          <Container>
            <h3 className="lista-title" style={{ color: "red" }}>
              MIS RESERVAS ACEPTADAS
            </h3>
            <div className="col-8 offset-2 mt-5">
              {filterByEstadoAceptado().map((solicitudes) => (
                <Card className="custom-card" key={solicitudes.id}>
                  <Row>
                    <Col className="my-auto col-12 card-content">
                      <Card.Title>
                        <strong>
                          {solicitudes.areaComun.condominio.nombre.toUpperCase()}{" "}
                          - {solicitudes.areaComun.nombre.toUpperCase()} (
                          {solicitudes.areaComun.descripcion}){" "}
                          {solicitudes.areaComun.turno.inicio}-
                          {solicitudes.areaComun.turno.fin}
                        </strong>
                      </Card.Title>
                      <Card.Text>
                        FECHA DE LA RESERVA:{" "}
                        {solicitudes.inicio.substring(0, 10)} -{" "}
                        {solicitudes.fin.substring(0, 10)} (
                        {calcularDiferenciaDias(
                          solicitudes.inicio.substring(0, 10),
                          solicitudes.fin.substring(0, 10)
                        )}{" "}
                        Dias)
                      </Card.Text>
                      <Card.Text>
                        HORARIO DE LA RESERVA:{" "}
                        {solicitudes.inicio.substring(11, 16)} -{" "}
                        {solicitudes.fin.substring(11, 16)}
                      </Card.Text>
                    </Col>
                  </Row>
                  <div className="botones-container">
                    <Button
                      className="eliminar-button btn btn-danger mt-3 text-center d-flex"
                      key={solicitudes.id}
                      onClick={() => {
                        eliminarSolicitudReserva(solicitudes.id);
                      }}
                    >
                      ELIMINAR
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        )}

        {/* // LISTA DE MIS RESERVAS EN ESPERA (LADO RESIDENTE) */}
        {roles.includes("RESIDENTE") && (
          <Container>
            <h3 className="lista-title" style={{ color: "red" }}>
              MIS RESERVAS EN ESPERA
            </h3>
            <div className="col-8 offset-2 mt-5">
              {filterByEstadoEspera().map((solicitudes) => (
                <Card className="custom-card" key={solicitudes.id}>
                  <Row>
                    <Col className="my-auto col-12 card-content">
                      <Card.Title>
                        <strong>
                          {solicitudes.areaComun.condominio.nombre.toUpperCase()}{" "}
                          - {solicitudes.areaComun.nombre.toUpperCase()} (
                          {solicitudes.areaComun.descripcion}){" "}
                          {solicitudes.areaComun.turno.inicio}-
                          {solicitudes.areaComun.turno.fin}
                        </strong>
                      </Card.Title>
                      <Card.Text>
                        FECHA DE LA RESERVA:{" "}
                        {solicitudes.inicio.substring(0, 10)} -{" "}
                        {solicitudes.fin.substring(0, 10)} (
                        {calcularDiferenciaDias(
                          solicitudes.inicio.substring(0, 10),
                          solicitudes.fin.substring(0, 10)
                        )}{" "}
                        Dias)
                      </Card.Text>
                      <Card.Text>
                        HORARIO DE LA RESERVA:{" "}
                        {solicitudes.inicio.substring(11, 16)} -{" "}
                        {solicitudes.fin.substring(11, 16)}
                      </Card.Text>
                    </Col>
                  </Row>
                  <div className="botones-container">
                    <Button
                      className="eliminar-button btn btn-danger mt-3 text-center d-flex"
                      key={solicitudes.id}
                      onClick={() => {
                        eliminarSolicitudReserva(solicitudes.id);
                      }}
                    >
                      ELIMINAR
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        )}
      </Container>
    </div>
  );
};
export default SolicitudListPage;
