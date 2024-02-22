import { Navbar, Nav, Container } from 'react-bootstrap';
import { GetFromStorage } from '../services/StorageService';

const SisNavbar = () => {
  
    const roleList = GetFromStorage("roles");
    
    return (
    <Navbar bg="dark" variant="dark" expand="lg">
    <Container>
      <Navbar.Brand href="#home">Mi Sitio</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">Inicio</Nav.Link>
          <Nav.Link href="/deudas   ">Contabilidad</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="/login">Iniciar sesión</Nav.Link>
          {
           roleList?.length!= 0 && roleList?.includes("ADMIN") &&  <Nav.Link href="/register">Registra un usuario</Nav.Link>
          }
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default SisNavbar