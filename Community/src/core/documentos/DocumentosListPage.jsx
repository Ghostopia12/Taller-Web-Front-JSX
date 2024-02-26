
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Container, Card, Table } from "react-bootstrap";
import { DOCUMENTO_EDIT_URL } from "../../routing/CONSTANTS";
import { deleteDocumento, deshabilitarDocumento, getListaDocumentos, habilitarDocumento } from "../../services/comunicacion/DocumentoService";
import { useCurrentUser } from "../../hooks/useCurrentUser";


const DocumentosListPage = () => {
  const [listaDocumentos, setListaDocumentos] = useState([]);
  const currentUser = useCurrentUser();

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


  const habDocumento = (id) => {
    if (window.confirm("¿Estas seguro que deseas habilitar este documento?")) {
      habilitarDocumento(id).then(() => {
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
      <Container style={{ marginTop: '24px' }}>
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
                    <td style={{ backgroundColor: documento.deshabilitado ? 'rgba(128, 128, 128, 0.5)' : 'transparent' }}>{documento.id}</td>

                    <td style={{ backgroundColor: documento.deshabilitado ? 'rgba(128, 128, 128, 0.5)' : 'transparent' }}>{documento.nombre}</td>
                    <td style={{ backgroundColor: documento.deshabilitado ? 'rgba(128, 128, 128, 0.5)' : 'transparent' }}>{documento.mensaje}</td>
                    <td style={{ backgroundColor: documento.deshabilitado ? 'rgba(128, 128, 128, 0.5)' : 'transparent' }}>{fechaHoraFormateada(documento.fechaHora)}</td>
                    <td style={{ backgroundColor: documento.deshabilitado ? 'rgba(128, 128, 128, 0.5)' : 'transparent' }}>{documento.tipoDoc}</td>
                    <td style={{ backgroundColor: documento.deshabilitado ? 'rgba(128, 128, 128, 0.5)' : 'transparent' }}>{currentUser.username}</td>
                    <td style={{ backgroundColor: documento.deshabilitado ? 'rgba(128, 128, 128, 0.5)' : 'transparent' }}></td>
                    <td style={{ backgroundColor: documento.deshabilitado ? 'rgba(128, 128, 128, 0.5)' : 'transparent' }}></td>
                    {documento.deshabilitado === false ? (<><td style={{ backgroundColor: documento.deshabilitado ? 'rgba(128, 128, 128, 0.5)' : 'transparent' }}>
                      <Link
                        className="btn btn-primary"
                        to={DOCUMENTO_EDIT_URL + "/" + documento.id}
                      >
                        Editar
                      </Link>
                    </td>
                      <td style={{ backgroundColor: documento.deshabilitado ? 'rgba(128, 128, 128, 0.5)' : 'transparent' }}>
                        <Link
                          className="btn btn-danger"
                          onClick={() => eliminarDocumentos(documento.id)}
                        >
                          Eliminar
                        </Link>
                      </td></>) : null}

                    <td style={{ backgroundColor: documento.deshabilitado ? 'rgba(128, 128, 128, 0.5)' : 'transparent' }}>
                      <Link
                        className={`${documento.deshabilitado ? 'btn btn-success' : 'btn btn-warning'}`}
                        onClick={() => {
                          if (documento.deshabilitado) {
                            habDocumento(documento.id)
                          } else {
                            desDocumento(documento.id)
                          }

                        }}
                      >
                        {documento.deshabilitado ? 'Habilitar' : 'Deshabilitar'}

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
