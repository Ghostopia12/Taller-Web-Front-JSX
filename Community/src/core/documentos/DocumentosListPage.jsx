
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Container, Card, Table } from "react-bootstrap";
import { deleteDocumento } from "../../services/comunicacion/DocumentoService";
import { DOCUMENTO_CREATE_URL } from "../../routing/CONSTANTS";


const DocumentosListPage = () => {
  const [listaDocumentos, setListaDocumentos] = useState([]);

  useEffect(() => {
    loadDocumentos();
  }, []);

  const loadDocumentos = () => {
    getListaDocumentos().then((data) => {
      setListaDocumentos(data);
    });
  };

  const eliminarDocumentos = (id) => {
    if (window.confirm("¿Estas seguro que deseas eliminar este servicio?")) {
      deleteDocumento(id).then(() => {
        loadDocumentos();
      });
    }
  };

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

  const id = localStorage.getItem('id');
  console.log("userId",id);

  const username = localStorage.getItem('username');
  console.log("username",username);

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
                    <td>{localStorage.getItem('username')}</td>
                    <td></td>
                    <td></td>
                    <td>
                      <Link
                        className="btn btn-primary"
                        to={DOCUMENTO_CREATE_URL + "/" + documento.id}
                      >
                        Editar
                      </Link>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => eliminarDocumentos(documento.id)}
                      >
                        Eliminar
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

export default DocumentosListPage;
