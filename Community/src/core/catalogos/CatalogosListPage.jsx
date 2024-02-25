
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Container, Card, Table } from "react-bootstrap";
import { DOCUMENTO_EDIT_URL } from "../../routing/CONSTANTS";
import { deleteDocumento, deshabilitarDocumento, getlistaCatalogos } from "../../services/comunicacion/DocumentoService";
import { jwtDecode } from "jwt-decode";
import { GetUsers } from "../../services/UserService";
import { deleteCatalogo, deshabilitarCatalogo, getListaCatalogos } from "../../services/comunicacion/CatalogoService";


const CatalogosListPage = () => {
  const [listaCatalogos, setListaCatalogos] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        // Assuming localStorage.getItem("token") is not null or undefined
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
    loadCatalogos();
  }, []);

  const loadCatalogos = () => {
    getListaCatalogos().then((data) => {
      setListaCatalogos(data);
    });
  };

  const eliminarCatalogos = (id) => {
    if (window.confirm("¿Estas seguro que deseas eliminar este catalogo?")) {
      deleteCatalogo(id).then(() => {
        loadCatalogos();
      });
    }
  };

  const desCatalogo = (id) => {
    if (window.confirm("¿Estas seguro que deseas deshabilitar este catalogo?")) {
      deshabilitarCatalogo(id).then(() => {
        loadCatalogos();
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
            <Card.Title>Lista de catalogos</Card.Title>
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Fecha y Hora</th>
                  <th>Documento</th>
                  <th>Administrador</th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {listaCatalogos.map((catalogo) => (
                  <tr key={catalogo.id}>
                    <td>{catalogo.id}</td>
                    <td>{catalogo.nombre}</td>
                    <td>{fechaHoraFormateada(catalogo.fechaHora)}</td>
                    <td>{catalogo.documentoId}</td>
                    <td>{catalogo.adminId}</td>
                    <td></td>
                    <td></td>
                    <td>
                      <Link
                        className="btn btn-primary"
                        to={DOCUMENTO_EDIT_URL + "/" + catalogo.id}
                      >
                        Editar
                      </Link>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => eliminarCatalogos(catalogo.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                    <td>
                    <button
                        className="btn btn-warning"
                        onClick={() => desCatalogo(catalogo.id)}
                      >
                        Deshabilitar
                      </button>
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

export default CatalogosListPage;
