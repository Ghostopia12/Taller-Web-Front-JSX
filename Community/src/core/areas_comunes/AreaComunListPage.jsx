import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../areas_comunes/AreaComunListPage.css";
import {
  AREA_COMUN_DETAIL_URL,
  SOLICITUD_CREATE_URL,
} from "../../routing/CONSTANTS";
import {
  patchAreaComun,
  putAreaComun,
  getListaAreasComunes,
} from "../../services/AreaComunService";

const AreaComunListPage = () => {
  const navigate = useNavigate();
  const [listaAreasComunes, setListaAreasComunes] = useState([]);
  const token = localStorage.getItem("token");
  const roles = JSON.parse(localStorage.getItem("roles"));

  useEffect(() => {
    if (roles.includes("ADMIN") || roles.includes("RESIDENTE")) {
      obtenerListaAreasComunes();
    }
    console.log("ROLES", roles);
  }, []);



  const obtenerListaAreasComunes = () => {
    getListaAreasComunes(token)
      .then((response) => {
        setListaAreasComunes(response);
        console.log("listaAreasComunes", listaAreasComunes);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de Áreas Comunes:", error);
      });
  };

  const inhabilitarAreaComun = (id) => {
    if (
      !window.confirm("¿Estás seguro que deseas inhabilitar esta Área Común?")
    ) {
      return;
    }
    patchAreaComun(token, {
      areaComunId: id,
    })
      .then((response) => {
        console.log("response", response);
        obtenerListaAreasComunes();
      })
      .catch((error) => {
        console.error("Error al inhabilitar el Área Común", error);
      });
  };

  const habilitarAreaComun = (areaComun) => {
    if (
      !window.confirm("¿Estás seguro que deseas habilitar esta Área Común?")
    ) {
      return;
    }
    putAreaComun(token, {
      areaComunId: areaComun.id,
      condominioId: areaComun.condominio.id,
      turnoId: areaComun.turno.id,
      nombre: areaComun.nombre,
      descripcion: areaComun.descripcion,
      capacidadMaxima: parseInt(areaComun.capacidadMaxima),
      estado: "Disponible",
      finCierre: areaComun.finCierre,
    })
      .then((response) => {
        console.log("response", response);
        obtenerListaAreasComunes();
      })
      .catch((error) => {
        console.error("Error al guardar la edición del área común", error);
      });
  };

  const filterByEstado = (estado) => {
    return listaAreasComunes.filter(
      (area_comun) => area_comun.estado === estado
    );
  };

  function formatearFecha(fecha) {
    const opcionesFormato = { day: "2-digit", month: "short", year: "numeric" };
    const fechaObj = new Date(fecha);
    return fechaObj.toLocaleDateString("es-ES", opcionesFormato);
  }

  return (
    <div className="container-wrapper">
      <Container>
        {(roles.includes("ADMIN") || roles.includes("RESIDENTE")) && (
          <div className="mt-3 text-center ">
            <div>
              <h3 className="lista-title">LISTADO DE ÁREAS COMUNES</h3>
            </div>
          </div>
        )}

        {roles.includes("RESIDENTE") && (
          <Container>
            <h3 className="lista-title" style={{ color: "red" }}>
              ÁREAS DISPONIBLES
            </h3>
            <div className="col-8 offset-2 mt-5">
              {filterByEstado("Disponible").map((area_comun) => (
                <Card className="custom-card" key={area_comun.id}>
                  <Row>
                    <Col className="my-auto col-12 card-content">
                      <Card.Title>
                        <strong>
                          {area_comun.condominio.nombre.toUpperCase()} -{" "}
                          {area_comun.nombre.toUpperCase()} (
                          {area_comun.descripcion})
                        </strong>
                      </Card.Title>
                      <Card.Text>
                        CAPACIDAD MAXIMA: {area_comun.capacidadMaxima} Personas
                      </Card.Text>
                      <Card.Text>
                        HORARIO: {area_comun.turno.inicio.substring(0, 5)} -{" "}
                        {area_comun.turno.fin.substring(0, 5)}
                      </Card.Text>
                      <Card.Text>ESTADO: {area_comun.estado}</Card.Text>
                    </Col>
                  </Row>
                  <div className="botones-container">
                    <Button
                      className="solicitar-button btn btn-warning mt-3 text-center d-flex"
                      key={area_comun.id}
                      onClick={() => {
                        navigate(SOLICITUD_CREATE_URL, {
                          state: { areaComunId: area_comun.id },
                        });
                      }}
                    >
                      SOLICITAR
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        )}

        {roles.includes("ADMIN") && (
          <>
            <Container>
              <h3 className="lista-title" style={{ color: "red" }}>
                ÁREAS DISPONIBLES
              </h3>
              <div className="col-8 offset-2 mt-5">
                {filterByEstado("Disponible").map((area_comun) => (
                  <Card className="custom-card" key={area_comun.id}>
                    <Row>
                      <Col className="my-auto col-12 card-content">
                        <Card.Title>
                          <strong>
                            {area_comun.condominio.nombre.toUpperCase()} -{" "}
                            {area_comun.nombre.toUpperCase()} (
                            {area_comun.descripcion})
                          </strong>
                        </Card.Title>
                        <Card.Text>
                          CAPACIDAD MAXIMA: {area_comun.capacidadMaxima}{" "}
                          Personas
                        </Card.Text>
                        <Card.Text>
                          HORARIO: {area_comun.turno.inicio.substring(0, 5)} -{" "}
                          {area_comun.turno.fin.substring(0, 5)}
                        </Card.Text>
                        <Card.Text>ESTADO: {area_comun.estado}</Card.Text>
                      </Col>
                    </Row>
                    <div className="botones-container">
                      <Button
                        className="eliminar-button btn btn-danger mt-3 text-center d-flex"
                        key={area_comun.id}
                        onClick={() => {
                          inhabilitarAreaComun(area_comun.id);
                        }}
                      >
                        INHABILITAR
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </Container>
            
            <Container>
              <h3 className="lista-title" style={{ color: "red" }}>
                ÁREAS NO DISPONIBLES
              </h3>
              <div className="col-8 offset-2 mt-5">
                {filterByEstado("No Disponible").map((area_comun) => (
                  <Card className="custom-card" key={area_comun.id}>
                    <Row>
                      <Col className="my-auto col-12 card-content">
                        <Card.Title>
                          <strong>
                            {area_comun.condominio.nombre.toUpperCase()} -{" "}
                            {area_comun.nombre.toUpperCase()} (
                            {area_comun.descripcion})
                          </strong>
                        </Card.Title>
                        <Card.Text>
                          CAPACIDAD MAXIMA: {area_comun.capacidadMaxima}{" "}
                          Personas
                        </Card.Text>
                        <Card.Text>
                          HORARIO: {area_comun.turno.inicio.substring(0, 5)} -{" "}
                          {area_comun.turno.fin.substring(0, 5)}
                        </Card.Text>
                        <Card.Text>ESTADO: {area_comun.estado}</Card.Text>
                      </Col>
                    </Row>
                    <div className="botones-container">
                      <Button
                        className="editar-button btn btn-success mt-3 text-center d-flex"
                        key={area_comun.id}
                        onClick={() => {
                          navigate(AREA_COMUN_DETAIL_URL, {
                            state: { areaComunId: area_comun },
                          });
                          localStorage.setItem(
                            "condominioId",
                            area_comun.condominio.id
                          );
                          localStorage.setItem("turnoId", area_comun.turno.id);
                        }}
                      >
                        EDITAR
                      </Button>
                      <Button
                        className="eliminar-button btn btn-primary mt-3 text-center d-flex"
                        key={area_comun.id}
                        onClick={() => {
                          habilitarAreaComun(area_comun);
                        }}
                      >
                        HABILITAR
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </Container>

            <Container>
              <h3 className="lista-title" style={{ color: "red" }}>
                ÁREAS EN LIMPIEZA
              </h3>
              <div className="col-8 offset-2 mt-5">
                {filterByEstado("Limpieza").map((area_comun) => (
                  <Card className="custom-card" key={area_comun.id}>
                    <Row>
                      <Col className="my-auto col-12 card-content">
                        <Card.Title>
                          <strong>
                            {area_comun.condominio.nombre.toUpperCase()} -{" "}
                            {area_comun.nombre.toUpperCase()} (
                            {area_comun.descripcion})
                          </strong>
                        </Card.Title>
                        <Card.Text>
                          CAPACIDAD MAXIMA: {area_comun.capacidadMaxima}{" "}
                          Personas
                        </Card.Text>
                        <Card.Text>
                          HORARIO: {area_comun.turno.inicio.substring(0, 5)} -{" "}
                          {area_comun.turno.fin.substring(0, 5)}
                        </Card.Text>
                        <Card.Text>ESTADO: {area_comun.estado}</Card.Text>
                        <Card.Text>
                          FECHA LIMITE DE ENTREGA:{" "}
                          {formatearFecha(
                            area_comun.finCierre.substring(0, 10)
                          ) +
                            " || " +
                            area_comun.finCierre.substring(11, 16) +
                            "hrs."}
                        </Card.Text>
                      </Col>
                    </Row>
                    <div className="botones-container">
                      <Button
                        className="editar-button btn btn-success mt-3 text-center d-flex"
                        key={area_comun.id}
                        onClick={() => {
                          navigate(AREA_COMUN_DETAIL_URL, {
                            state: { areaComunId: area_comun },
                          });
                          localStorage.setItem(
                            "condominioId",
                            area_comun.condominio.id
                          );
                          localStorage.setItem("turnoId", area_comun.turno.id);
                        }}
                      >
                        EDITAR
                      </Button>
                      <Button
                        className="eliminar-button btn btn-primary mt-3 text-center d-flex"
                        key={area_comun.id}
                        onClick={() => {
                          habilitarAreaComun(area_comun);
                        }}
                      >
                        HABILITAR
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </Container>

            <Container>
              <h3 className="lista-title" style={{ color: "red" }}>
                ÁREAS EN REFACCION
              </h3>
              <div className="col-8 offset-2 mt-5">
                {filterByEstado("Refaccion").map((area_comun) => (
                  <Card className="custom-card" key={area_comun.id}>
                    <Row>
                      <Col className="my-auto col-12 card-content">
                        <Card.Title>
                          <strong>
                            {area_comun.condominio.nombre.toUpperCase()} -{" "}
                            {area_comun.nombre.toUpperCase()} (
                            {area_comun.descripcion})
                          </strong>
                        </Card.Title>
                        <Card.Text>
                          CAPACIDAD MAXIMA: {area_comun.capacidadMaxima}{" "}
                          Personas
                        </Card.Text>
                        <Card.Text>
                          HORARIO: {area_comun.turno.inicio.substring(0, 5)} -{" "}
                          {area_comun.turno.fin.substring(0, 5)}
                        </Card.Text>
                        <Card.Text>ESTADO: {area_comun.estado}</Card.Text>
                        <Card.Text>
                          FECHA LIMITE DE ENTREGA:{" "}
                          {formatearFecha(
                            area_comun.finCierre.substring(0, 10)
                          ) +
                            " || " +
                            area_comun.finCierre.substring(11, 16) +
                            "hrs."}
                        </Card.Text>
                      </Col>
                    </Row>
                    <div className="botones-container">
                      <Button
                        className="editar-button btn btn-success mt-3 text-center d-flex"
                        key={area_comun.id}
                        onClick={() => {
                          navigate(AREA_COMUN_DETAIL_URL, {
                            state: { areaComunId: area_comun },
                          });
                          localStorage.setItem(
                            "condominioId",
                            area_comun.condominio.id
                          );
                          localStorage.setItem("turnoId", area_comun.turno.id);
                        }}
                      >
                        EDITAR
                      </Button>
                      <Button
                        className="eliminar-button btn btn-primary mt-3 text-center d-flex"
                        key={area_comun.id}
                        onClick={() => {
                          habilitarAreaComun(area_comun);
                        }}
                      >
                        HABILITAR
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </Container>
          </>
        )}
      </Container>
    </div>
  );
};

export default AreaComunListPage;
