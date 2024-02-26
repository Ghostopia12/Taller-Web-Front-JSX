import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { GetFromStorage } from "../services/StorageService";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import {
  GetListaDuenos,
  getresidencial,
  getListaBloquesId,
} from "../services/InvitacionAreaComunService";
const SisNavbar = () => {
  const [isContable, setIsContable] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isGuardia, setIsGuardia] = useState(false);
  const [isResidente, setIsResidente] = useState(false);
  const [isPropietario, setIsPropietario] = useState(false);
  const [isTrabajador, setIsTrabajador] = useState(false);
  const [roleList, setRoleList] = useState([]);
  const [userId, setUserId] = useState(1);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = GetFromStorage("token");
    console.log(token);
    localStorage.setItem("limite", 4);
    if (token) {
      const id = jwtDecode(localStorage.getItem("token"))[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ];
      setUserId(id);
      localStorage.setItem("id", id);
      console.log(userId);
    }
    obtenerRoles();
    fetchUsersRoles();
  }, []);

  const fetchUsersRoles = () => {
    const rolesFromStorage = GetFromStorage("roles");

    if (rolesFromStorage === null || rolesFromStorage === undefined) return;
    setRoleList(rolesFromStorage);

    setIsContable(
      rolesFromStorage?.length !== 0 && rolesFromStorage.includes("CONTABLE")
    );
    setIsAdmin(
      rolesFromStorage?.length !== 0 && rolesFromStorage.includes("ADMIN")
    );
    setIsGuardia(
      rolesFromStorage?.length !== 0 && rolesFromStorage.includes("GUARDIA")
    );
    setIsResidente(
      rolesFromStorage?.length !== 0 && rolesFromStorage.includes("RESIDENTE")
    );
    setIsPropietario(
      rolesFromStorage?.length !== 0 && rolesFromStorage.includes("PROPIETARIO")
    );
    setIsTrabajador(
      rolesFromStorage?.length !== 0 && rolesFromStorage.includes("TRABAJADOR")
    );

    setIsLoggedIn(rolesFromStorage?.length !== 0);
  };

  const obtenerRoles = () => {
    GetListaDuenos().then((response) => {
      response.forEach((element) => {
        if (parseInt(element.user_id) === parseInt(localStorage.getItem("id"))) {
          console.log(element);
          localStorage.setItem("rol", element.rol_id);
        }
      });
    });
    getresidencial(localStorage.getItem("id")).then((response2) => {
      if (response2[0].manzanaId != null) {
        localStorage.setItem(
          "residencial_id",
          response2[0].manzanaId.condominioId
        );
      } else {
        getListaBloquesId(response2[0].pisoId.bloqueId).then((response3) => {
          localStorage.setItem("residencial_id", response3[0].condominioId.id);
        });
      }
    });
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Mi Sitio</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Inicio</Nav.Link>
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            {isAdmin && (
              <>
                <NavDropdown title="Áreas Comunes" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/crearAreaComun">
                    Crear Área Comun
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/listaAreasComunes">
                    Lista de Áreas Comunes
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/listaSolicitudes">
                    Lista de Solicitudes
                  </NavDropdown.Item>
                </NavDropdown>
                {userId && (
                  <NavDropdown title="Condominios" id="basic-nav-dropdown">
                    <NavDropdown.Item href={`/personas/${userId}`}>
                      Administrar condominio
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
                <NavDropdown title="Invitados casa" id="basic-nav-dropdown">
                  <NavDropdown.Item href={"/listaInvitadosCasa"}>
                    Lista
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown
                  title="Invitados Area Comun"
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item href={"/listaInvitadosAreaComun"}>
                    Lista
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Administracion" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/adminPanel">
                    Panel de administracion
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Documentos" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/listaDocumentos">
                    Lista de Documentos
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/crearDocumento">
                    Crear Documento
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Catalogos" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/listaCatalogos">
                    Lista de Catalogos
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/crearCatalogo">
                    Crear Catalogo
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Notificaciones" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/listaNotificaciones">
                    Lista de Notificaciones
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/crearNotificacion">
                    Crear Notificacion
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
            {isPropietario && (
              <NavDropdown title="Cuentas" id="basic-nav-dropdown">
                <NavDropdown.Item href="/deudas">Deudas</NavDropdown.Item>
                <NavDropdown.Item href="/pagos">Pagos</NavDropdown.Item>
              </NavDropdown>
            )}
            {isContable && (
              <NavDropdown title="Cuentas" id="basic-nav-dropdown">
              <NavDropdown.Item href="/deudas">Deudas</NavDropdown.Item>
              <NavDropdown.Item href="/pagos">Pagos</NavDropdown.Item>
              <NavDropdown.Item href="/gastos">Gastos</NavDropdown.Item>
              <NavDropdown.Item href="/parametros">Parametros</NavDropdown.Item>
            </NavDropdown>
            )}
            {isGuardia && (
              <>
                <Nav.Link href="/guardia">Guardia</Nav.Link>
                <NavDropdown title="Invitados casa" id="basic-nav-dropdown">
                  <NavDropdown.Item href={"/listaInvitadosCasa"}>
                    Lista
                  </NavDropdown.Item>
                  <NavDropdown.Item href={"/invitacionCasa"}>
                    Crear
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown
                  title="Invitados Area Comun"
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item href={"/listaInvitadosAreaComun"}>
                    Lista
                  </NavDropdown.Item>
                  <NavDropdown.Item href={"/invitacionAreaComun"}>
                    Crear
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
            {isResidente && (
              <>
                <Nav.Link href="/residente">Residente</Nav.Link>
                <NavDropdown
                  title="Solicitud de Reserva"
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item href="/listaAreasComunes">
                    Lista de Áreas Comunes
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/listaSolicitudes">
                    Lista de Solicitudes
                  </NavDropdown.Item>
                  <NavDropdown title="Invitados casa" id="basic-nav-dropdown">
                    <NavDropdown.Item href={"/listaInvitadosCasa"}>
                      Lista
                    </NavDropdown.Item>
                    <NavDropdown.Item href={"/invitacionCasa"}>
                      Crear
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown
                    title="Invitados Area Comun"
                    id="basic-nav-dropdown"
                  >
                    <NavDropdown.Item href={"/listaInvitadosAreaComun"}>
                      Lista
                    </NavDropdown.Item>
                    <NavDropdown.Item href={"/invitacionAreaComun"}>
                      Crear
                    </NavDropdown.Item>
                  </NavDropdown>
                </NavDropdown>
              </>
            )}
            {isPropietario && (
              <>
                <Nav.Link href="/propietario">Propietario</Nav.Link>
                <NavDropdown title="Invitados casa" id="basic-nav-dropdown">
                  <NavDropdown.Item href={"/listaInvitadosCasa"}>
                    Lista
                  </NavDropdown.Item>
                  <NavDropdown.Item href={"/invitacionCasa"}>
                    Crear
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown
                  title="Invitados Area Comun"
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item href={"/listaInvitadosAreaComun"}>
                    Lista
                  </NavDropdown.Item>
                  <NavDropdown.Item href={"/invitacionAreaComun"}>
                    Crear
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
            {isTrabajador && <Nav.Link href="/trabajador">Trabajador</Nav.Link>}
          </Nav>
          <Nav>
            {isLoggedIn ? (
              <Nav.Link
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/";
                }}
              >
                Cerrar sesión
              </Nav.Link>
            ) : (
              <Nav.Link href="/login">Iniciar sesión</Nav.Link>
            )}
            {roleList?.length != 0 &&
              (roleList?.includes("ADMIN") ||
                roleList?.includes("PROPIETARIO")) && (
                <Nav.Link href="/register">Registra un usuario</Nav.Link>
              )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default SisNavbar;
