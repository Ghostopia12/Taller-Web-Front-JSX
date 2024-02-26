import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Container, Card, Table
} from "react-bootstrap";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import Modal from 'react-modal';
import { deleteNotificacion, deshabilitarNotificacion, getListaNotificaciones, getNotificacion, habilitarNotificacion } from "../../services/comunicacion/NotificacionService";
import { GetUserById, GetUsers } from "../../services/UserService";

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

const NotificacionesListPage = () => {
  const [docId, setDocId] = useState("");
  const [listaNotificaciones, setlistaNotificaciones] = useState([]);
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [modalIsOpen, setmodalIsOpen] = useState(null);
  const [noti, setNoti] = useState("");


  useEffect(() => {
    loadNotificaciones();
    obtenerListaUsuarios();
  }, []);

  useEffect(() => {
    if (modalIsOpen !== null) {
      getNoti();
    }
  }, [modalIsOpen]);

  const getNoti = async () => {
    try {
      const data = await getNotificacion(modalIsOpen);
      console.log("noti: ", data);
      setNoti(data);
    } catch (error) {
      console.error("Error al cargar los documentos:", error);
    }
  }


  // const getUsername = (id) => {
  //   GetUserById(id)
  //     .then((response) => {
  //       // console.log("Objeto Usuario: ", response.result)
  //       console.log("Username: ", response?.result?.username)
  //       return response?.result?.username;
  //     })
  //     .catch((error) => {
  //       console.error("Error al obtener el objeto usuario:", error);
  //     });
  // }


  const obtenerListaUsuarios = () => {
    GetUsers()
      .then((response) => {
        console.log("Lista de usuarios: ", response)
        setListaUsuarios(response.result);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de Usuarios:", error);
      });
  }


  const loadNotificaciones = () => {
    getListaNotificaciones().then((data) => {
      setlistaNotificaciones(data);
    });
  };




  const eliminarNotificacion = (id) => {
    if (window.confirm("¿Estas seguro que deseas eliminar esta notificacion?")) {
      deleteNotificacion(id).then(() => {
        loadNotificaciones();
      });
    }
  };


  const desNotificacion = (id) => {
    if (window.confirm("¿Estas seguro que deseas deshabilitar esta notificacion?")) {
      deshabilitarNotificacion(id).then(() => {
        loadNotificaciones();
      });
    }
  }

  const habNotificacion = (id) => {
    if (window.confirm("¿Estas seguro que deseas habilitar este notificacion?")) {
      habilitarNotificacion(id).then(() => {
        loadNotificaciones();
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
          onRequestClose={() => { setmodalIsOpen(null); setNoti(""); }}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          {noti && (
            <div className="card text-white bg-dark mb-2 p-4">

              <h2>Catálogo: {noti.catalogos.map(catalogo => catalogo.nombre).join(', ')}</h2>
              {noti.catalogos.map(catalogo => (
                <div key={catalogo.id} >


                  <ul>
                    {catalogo.documentos && catalogo.documentos.length > 0 ? (
                      catalogo.documentos.map(documento => (
                        <div key={documento.id}>
                          {documento.deshabilitado === false ? (
                            <>
                              <li>Nombre: {documento.nombre}</li>
                              <li>Mensaje: {documento.mensaje}</li>
                              <li>Fecha y Hora: {new Date(documento.fechaHora).toLocaleString()}</li>
                              <li>Tipo de Documento: {documento.tipoDoc}</li>
                              <li>Admin ID: {documento.adminId}</li>
                              <li>Deshabilitado: {documento.deshabilitado ? 'Sí' : 'No'}</li>
                            </>
                          ) : (
                            <h3>Documento deshabilitado</h3>
                          )}
                        </div>
                      ))
                    ) : (
                      <h3>No hay documentos</h3>
                    )}


                  </ul>
                </div>
              ))}
            </div>
          )}
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
            <Card.Title>Lista de notificaciones</Card.Title>
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Fecha y Hora</th>
                  <th>Usuario</th>
                  <th>Catalogo</th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {listaNotificaciones.map((notificacion) => (
                  <tr key={notificacion.id}>
                    <td style={{ backgroundColor: notificacion.deshabilitado ? 'rgba(128, 128, 128, 0.5)' : 'transparent' }}>{notificacion.id}</td>
                    <td style={{ backgroundColor: notificacion.deshabilitado ? 'rgba(128, 128, 128, 0.5)' : 'transparent' }}>{fechaHoraFormateada(notificacion.fechaHora)}</td>
                    <td style={{ backgroundColor: notificacion.deshabilitado ? 'rgba(128, 128, 128, 0.5)' : 'transparent' }}>
                      {listaUsuarios.find(usuario => usuario.id === notificacion.usuarioId)?.username || 'Cargando...'}
                    </td>
                    {notificacion.deshabilitado === false ? (<><td style={{ backgroundColor: notificacion.deshabilitado ? 'rgba(128, 128, 128, 0.5)' : 'transparent' }}>
                      <Link className="btn btn-success" onClick={() => setmodalIsOpen(notificacion.id)}>
                        Ver más
                      </Link>
                    </td>
                      <td style={{ backgroundColor: notificacion.deshabilitado ? 'rgba(128, 128, 128, 0.5)' : 'transparent' }}>
                        <Link
                          className="btn btn-danger"
                          onClick={() => eliminarNotificacion(notificacion.id)}
                        >
                          Eliminar
                        </Link>
                      </td></>) : null}
                    <td style={{ backgroundColor: notificacion.deshabilitado ? 'rgba(128, 128, 128, 0.5)' : 'transparent' }}>
                      <Link
                        className={`${notificacion.deshabilitado ? 'btn btn-success' : 'btn btn-warning'}`}
                        onClick={() => {
                          if (notificacion.deshabilitado) {
                            habNotificacion(notificacion.id)
                          } else {
                            desNotificacion(notificacion.id)
                          }
                        }}
                      >
                        {notificacion.deshabilitado ? 'Habilitar' : 'Deshabilitar'}
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

export default NotificacionesListPage;
