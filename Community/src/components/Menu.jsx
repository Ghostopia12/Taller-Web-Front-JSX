import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { HOME_URL } from "../navigation/CONSTANTS";

export default function Menu () {
    //const navigate = useNavigate();



    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh');
        localStorage.removeItem('is_superuser');
        localStorage.removeItem("user");
        window.location.reload()
    }


    return (
        <>
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand to={HOME_URL}>Communtity</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link className="nav-link" to={HOME_URL}>Inicio</Link>
                        <Link onClick={ logout }>
                            Cerrar sesión
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </>
    );
}