import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Container, Card, Table, Form,
  FormControl,
  FormGroup
} from "react-bootstrap";
import { CATALOGO_EDIT_URL } from "../../routing/CONSTANTS";
import { agregarDocumentoToCatalogo, deleteCatalogo, deshabilitarCatalogo, eliminarDocumentoEnCatalogo, getListaCatalogos, habilitarCatalogo, obtenerDocumentosPorCatalogo } from "../../services/comunicacion/CatalogoService";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import Modal from 'react-modal';
import { getListaDocumentos } from "../../services/comunicacion/DocumentoService";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const CatalogosListPage = () => {
  const [docId, setDocId] = useState("");
  const [listaCatalogos, setListaCatalogos] = useState([]);
  const [listaDocumentos, setListaDocumentos] = useState([]);
  const [listDocs, setDocs] = useState([]);
  const [modalIsOpen, setmodalIsOpen] = useState(null);
  const [create, setCreate] = useState(false);
  const currentUser = useCurrentUser();
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    loadCatalogos();
    allDocs();
  }, []);

  useEffect(() => {
    if (modalIsOpen !== null) {
      loadDocumentos();
    }
  }, [modalIsOpen]);

  const onUserFormSubmit = (e) => {
    const form = e.currentTarget;
    let isValid = form.checkValidity();
    e.preventDefault();
    e.stopPropagation();
    setValidated(true);
    if (isValid === true) {
      if (id === undefined) {
        createCatalogo();
      } else {
        updateCatalog();
      }
    }
  };

  const loadCatalogos = () => {
    getListaCatalogos().then((data) => {
      setListaCatalogos(data);
    });
  };

  const allDocs = () => {
    getListaDocumentos().then((data) => {
      setDocs(data);
    });
  };

  const loadDocumentos = async () => {
    try {
      const data = await obtenerDocumentosPorCatalogo(modalIsOpen.id);
      console.log(data);
      setListaDocumentos(data);
    } catch (error) {
      console.error("Error al cargar los documentos:", error);
    }
  };


  const eliminarCatalogos = (id) => {
    if (window.confirm("¿Estas seguro que deseas eliminar este catalogo?")) {
      deleteCatalogo(id).then(() => {
        loadCatalogos();
      });
    }
  };

  const eliminarDocumento = (catalogoId, documentoId) => {
    if (window.confirm("¿Estas seguro que deseas eliminar este documento?")) {
      eliminarDocumentoEnCatalogo(catalogoId, documentoId).then(() => {
        loadDocumentos();
      });
    }
  };

  const agregarDocumento = (catalogoId, documentoId) => {

    agregarDocumentoToCatalogo(catalogoId, documentoId).then(() => {
      loadDocumentos();
    });

  };

  const desCatalogo = (id) => {
    if (window.confirm("¿Estas seguro que deseas deshabilitar este catalogo?")) {
      deshabilitarCatalogo(id).then(() => {
        loadCatalogos();
      });
    }
  }

  const habCatalogo = (id) => {
    if (window.confirm("¿Estas seguro que deseas habilitar este catalogo?")) {
      habilitarCatalogo(id).then(() => {
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

  const my_modal = () => {
    return (
      <div>
        <Modal
          isOpen={modalIsOpen !== null}
          onRequestClose={() => { setmodalIsOpen(null); setCreate(false); }}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          <h2>{modalIsOpen && modalIsOpen.nombre}</h2>
          <Link className="btn btn-success" style={{marginBottom: 12}} onClick={() => setCreate(true)}>
            +
          </Link>
          {create && (
            <Form
              noValidate
              onSubmit={onUserFormSubmit}
              validated={validated}
            >

              <FormGroup>
                <label>Documentos</label>
                <Form.Control
                  as="select"
                  value={docId}
                  onChange={(e) => setDocId(e.target.value)}
                >
                  <option value="">Seleccione un documento</option>
                  {listDocs.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      {doc.nombre}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Necesitas seleccionar un tipo de documento
                </Form.Control.Feedback>
              </FormGroup>
            </Form>

          )}
          {docId && (
            <Link
              className="link-button" style={{marginBottom: 12}}
              onClick={() => {agregarDocumento(modalIsOpen.id, docId); setCreate(false); setDocId(""); } }
            >
              Guardar
            </Link>
          )}
          <div>
            {listaDocumentos && listaDocumentos.length > 0 ? (
              listaDocumentos.map((documento) => (
                <Card key={documento.id} className="text-white bg-dark mb-2" style={{ marginBottom: 24 }}>
                  <Card.Body>
                    <Card.Title>{documento.nombre}</Card.Title>
                    <Card.Text>{documento.mensaje}</Card.Text>
                    <Card.Text>{fechaHoraFormateada(documento.fechaHora)}</Card.Text>
                    <Card.Text>{documento.tipoDoc}</Card.Text>
                    <Card.Link onClick={() => eliminarDocumento(modalIsOpen.id, documento.id)}>
                      Eliminar
                    </Card.Link>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <div>No hay documentos</div>
            )}
          </div>

        </Modal>
      </div>
    );
  };


  return (
    <>
      <Container style={{ marginTop: '24px' }}>
        {my_modal()}
        <Card>
          <Card.Body>
            <Card.Title>Lista de catalogos</Card.Title>
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Fecha y Hora</th>
                  <th>Documentos</th>
                  <th>Administrador</th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {listaCatalogos.map((catalogo) => (
                  <tr key={catalogo.id}>
                    <td style={{ backgroundColor: catalogo.deshabilitado ? 'rgba(128, 128, 128, 0.5)' : 'transparent' }}>{catalogo.id}</td>
                    <td style={{ backgroundColor: catalogo.deshabilitado ? 'rgba(128, 128, 128, 0.5)' : 'transparent' }}>{catalogo.nombre}</td>
                    <td style={{ backgroundColor: catalogo.deshabilitado ? 'rgba(128, 128, 128, 0.5)' : 'transparent' }}>{fechaHoraFormateada(catalogo.fechaHora)}</td>
                    <td style={{ backgroundColor: catalogo.deshabilitado ? 'rgba(128, 128, 128, 0.5)' : 'transparent' }}>
                      <Link className="btn btn-success" onClick={() => setmodalIsOpen(catalogo)}>
                        Ver
                      </Link>
                    </td>
                    <td style={{ backgroundColor: catalogo.deshabilitado ? 'rgba(128, 128, 128, 0.5)' : 'transparent' }}>{currentUser.username}</td>
                    <td style={{ backgroundColor: catalogo.deshabilitado ? 'rgba(128, 128, 128, 0.5)' : 'transparent' }}>
                      <Link
                        className="btn btn-primary"
                        to={CATALOGO_EDIT_URL + "/" + catalogo.id}
                      >
                        Editar
                      </Link>
                    </td>
                    <td style={{ backgroundColor: catalogo.deshabilitado ? 'rgba(128, 128, 128, 0.5)' : 'transparent' }}>
                      <Link
                        className="btn btn-danger"
                        onClick={() => eliminarCatalogos(catalogo.id)}
                      >
                        Eliminar
                      </Link>
                    </td>
                    <td style={{ backgroundColor: catalogo.deshabilitado ? 'rgba(128, 128, 128, 0.5)' : 'transparent' }}>
                    <Link
                        className={`${catalogo.deshabilitado ? 'btn btn-success' : 'btn btn-warning'}`}
                        onClick={() => {
                          if (catalogo.deshabilitado) {
                            habCatalogo(catalogo.id)
                          } else {
                            desCatalogo(catalogo.id)
                          }

                        }}
                      >
                        {catalogo.deshabilitado ? 'Habilitar' : 'Deshabilitar'}

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

export default CatalogosListPage;
