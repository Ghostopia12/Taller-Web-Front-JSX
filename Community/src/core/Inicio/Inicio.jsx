import { useEffect, useState } from "react";
import { NroNotificaciones } from "../../services/comunicacion/NotificacionService";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import {
  Card
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { NOTIFICACION_USUARIO_URL } from "../../routing/CONSTANTS";

const Inicio = () => {
  const [number, setNumber] = useState(0);
  const currentUser = useCurrentUser();

  useEffect(() => {
    const getNroNocs = async () => {
      try {
        const data = await NroNotificaciones(currentUser?.id);
        setNumber(data);
      } catch (error) {
        console.error("Error al obtener el número de notificaciones:", error);
      }
    };

    getNroNocs();
  }, [currentUser?.id]);

  const numeroStyle = {
    fontSize: "24px", // Tamaño de la fuente
    textAlign: "center", // Alineación centrada
    marginLeft: "12px",
    marginTop: "36px"
  };

  return (
    <Link to={NOTIFICACION_USUARIO_URL} style={{ textDecoration: "none" }}>
    <Card.Link style={numeroStyle}>
      Número de notificaciones: {number}
    </Card.Link>
  </Link>
  );
};

export default Inicio;
