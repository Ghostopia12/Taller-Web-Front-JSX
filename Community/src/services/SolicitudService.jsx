import axios from "axios";

export const postReserva = (token, reserva) => {
  return new Promise((resolve, reject) => {
    axios
      .post("https://localhost:7150/api/reserva/", reserva, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const putReserva = (token, reserva) => {
  return new Promise((resolve, reject) => {
    axios
      .put("https://localhost:7150/api/reserva/", reserva, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// LISTA DE SOLICITUDES ADMIN
export const getListaReservas = (token) => {
  return new Promise((resolve, reject) => {
    axios
      .get("https://localhost:7150/api/reserva/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Mi Lista de Reservas Lado Residente
export const getMisReservas = (residenteId) => {
  return new Promise((resolve, reject) => {
    axios
      .get("https://localhost:7150/api/reserva/" + residenteId, {})
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deleteSolicitudReserva = (token, reservaId) => {
  const obj = { reservaId: reservaId }; // Cuerpo de la solicitud
  return new Promise((resolve, reject) => {
    axios
      .delete("https://localhost:7150/api/reserva/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        data: obj, // Incluir el cuerpo en la solicitud DELETE
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};


export const aceptarSolicitudReserva = (token, id) => {
  return new Promise((resolve, reject) => {
    axios
      .put("https://localhost:7150/api/reserva/aceptar", id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const enEsperaSolicitudReserva = (token, id) => {
  return new Promise((resolve, reject) => {
    axios
      .put("https://localhost:7150/api/reserva/espera", id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

