
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Container, Card, Table } from "react-bootstrap";
import { DOCUMENTO_EDIT_URL } from "../../routing/CONSTANTS";
import { deleteDocumento, deshabilitarDocumento, getListaDocumentos } from "../../services/comunicacion/DocumentoService";
import { jwtDecode } from "jwt-decode";
import { GetUsers } from "../../services/UserService";


const DocumentosListPage = () => {
  const [listaDocumentos, setListaDocumentos] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        // Assuming localStorage.getItem("token") is not null or undefined
        const decodedToken = jwtDecode(localStorage.getItem("token"));
        const userId = jwtDecode(localStorage.getItem("token"))[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
        ]

        const users = await GetUsers(); // Assuming GetUsers() returns a Promise of user array
        console.log(users.result);

        // Find the current user by ID
        const currentUser = users.result.find(user => user.id === userId);
        console.log("xd",currentUser);

        if (currentUser) {
          console.log("username", currentUser.username);
          setCurrentUser(currentUser); // Store the current user in state
        } else {
          console.log("Usuario no encontrado");
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    loadDocumentos();
  }, []);

  const loadDocumentos = () => {
    getListaDocumentos().then((data) => {
      setListaDocumentos(data);
    });
  };

  const eliminarDocumentos = (id) => {
    if (window.confirm("¿Estas seguro que deseas eliminar este documento?")) {
      deleteDocumento(id).then(() => {
        loadDocumentos();
      });
    }
  };

  const desDocumento = (id) => {
    if (window.confirm("¿Estas seguro que deseas deshabilitar este documento?")) {
      deshabilitarDocumento(id).then(() => {
        loadDocumentos();
      });
    }
  }

  const fechaHoraFormateada = (fechaHora) => {
    const fecha = new Date(fechaHora);
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    return fecha.toLocaleDateString('es-ES', options);
  };

  return (
    <>
      <Container style={{marginTop: '24px'}}>
        <Card>
          <Card.Body>
            <Card.Title>Lista de documentos</Card.Title>
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Mensaje</th>
                  <th>Fecha y Hora</th>
                  <th>Tipo de documento</th>
                  <th>Administrador</th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {listaDocumentos.map((documento) => (
                  <tr key={documento.id}>
                    <td>{documento.id}</td>
                    <td>{documento.nombre}</td>
                    <td>{documento.mensaje}</td>
                    <td>{fechaHoraFormateada(documento.fechaHora)}</td>
                    <td>{documento.tipoDoc}</td>
                    <td>{}</td>
                    <td></td>
                    <td></td>
                    <td>
                      <Link
                        className="btn btn-primary"
                        to={DOCUMENTO_EDIT_URL + "/" + documento.id}
                      >
                        Editar
                      </Link>
                    </td>
                    <td>
                      <Link
                        className="btn btn-danger"
                        onClick={() => eliminarDocumentos(documento.id)}
                      >
                        Eliminar
                      </Link>
                    </td>
                    <td>
                    <Link
                        className="btn btn-warning"
                        onClick={() => desDocumento(documento.id)}
                      >
                        Deshabilitar
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default DocumentosListPage;
