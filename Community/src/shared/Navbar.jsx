import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { GetFromStorage } from "../services/StorageService";
import { useEffect, useState } from "react";

const SisNavbar = () => {
  const [isContable, setIsContable] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isGuardia, setIsGuardia] = useState(false);
  const [isResidente, setIsResidente] = useState(false);
  const [isPropietario, setIsPropietario] = useState(false);
  const [isTrabajador, setIsTrabajador] = useState(false);
  const [roleList, setRoleList] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
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

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Mi Sitio</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Inicio</Nav.Link>
            {isContable && <Nav.Link href="/deudas">Deudas</Nav.Link>}
            {isAdmin && (
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
            )}

            {isGuardia && <Nav.Link href="/guardia">Guardia</Nav.Link>}

            {isResidente && (
              <>
                <Nav.Link href="/residente">Residente</Nav.Link>
                <NavDropdown title="Solicitud de Reserva" id="basic-nav-dropdown">
                <NavDropdown.Item href="/listaAreasComunes">
                    Lista de Áreas Comunes
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/listaSolicitudes">
                    Lista de Solicitudes
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}

            {isPropietario && (
              <Nav.Link href="/propietario">Propietario</Nav.Link>
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
            {roleList?.length != 0 && roleList?.includes("ADMIN") && (
              <Nav.Link href="/register">Registra un usuario</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default SisNavbar;
