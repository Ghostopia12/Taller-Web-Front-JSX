import { useEffect, useState } from "react";
import { NroNotificaciones, getNotificacionByUsuario } from "../../services/comunicacion/NotificacionService";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { Card, Container } from "react-bootstrap";

const NotificacionesUsuario = () => {
  const [listaNotificaciones, setlistaNotificaciones] = useState([]);
  const currentUser = useCurrentUser();

  useEffect(() => {
    loadNotificaciones();
  }, [currentUser?.id]);

  const loadNotificaciones = async () => {
    if (currentUser?.id) {
      try {
        const data = await getNotificacionByUsuario(currentUser?.id);
        setlistaNotificaciones(data);
      } catch (error) {
        console.error("Error al cargar las notificaciones:", error);
      }
    } else {
      console.warn("El usuario no está autenticado o el objeto currentUser es null.");
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

  return (
    <Container style={{ marginTop: '24px' }}>
      {listaNotificaciones.map((notificacion) => (
        <div className="card text-white bg-dark mb-2 p-4" key={notificacion.id}>
          <h2>Catálogo: {notificacion.catalogos.map(catalogo => catalogo.nombre).join(', ')}</h2>
          {notificacion.catalogos.map(catalogo => (
            <div key={catalogo.id}>
              <ul>
                {catalogo.documentos && catalogo.documentos.length > 0 ? (
                  catalogo.documentos.map(documento => (
                    <Card key={documento.id}>
                      <Card.Body>
                        {documento.deshabilitado === false ? (
                          <>
                            <Card.Title>Nombre: {documento.nombre}</Card.Title>
                            <Card.Text>Mensaje: {documento.mensaje}</Card.Text>
                            <Card.Text>Fecha y Hora: {fechaHoraFormateada(documento.fechaHora)}</Card.Text>
                            <Card.Text>Tipo de Documento: {documento.tipoDoc}</Card.Text>
                            
                            <Card.Text>Deshabilitado: {documento.deshabilitado ? 'Sí' : 'No'}</Card.Text>
                          </>
                        ) : (
                          <h3>Documento deshabilitado</h3>
                        )}
                      </Card.Body>
                    </Card>
                  ))
                ) : (
                  <h3>No hay documentos</h3>
                )}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </Container>
  );
};

export default NotificacionesUsuario;
