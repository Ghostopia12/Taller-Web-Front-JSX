import axios from "axios";

// INSERTAR AREA COMUN
export const postAreaComun = (token, areaComun) => {
  return new Promise((resolve, reject) => {
    axios
      .post("https://localhost:7150/api/areaComun/", areaComun, {
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

// EDITAR AREA COMUN
export const putAreaComun = (token, areaComun) => {
  return new Promise((resolve, reject) => {
    axios
      .put("https://localhost:7150/api/areaComun/", areaComun, {
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

// EDITAR AREA COMUN (ESTADO)
export const patchAreaComun = (token, areaComun) => {
  return new Promise((resolve, reject) => {
    axios
      .patch("https://localhost:7150/api/areaComun/", areaComun, {
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


// LISTA DE AREAS COMUNES
export const getListaAreasComunes = (token) => {
  return new Promise((resolve, reject) => {
    axios
      .get("https://localhost:7150/api/areaComun/", {
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

// LISTA DE AREAS COMUNES DISPONIBLES SOLO PARA EL SELECT DE SOLICITUD EDIT PAGE
export const getListaAreasComunesDisponibles = (token) => {
  return new Promise((resolve, reject) => {
    axios
      .get("https://localhost:7150/api/areaComun/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        // Filtrar solo las áreas comunes con estado "Disponible"
        const areasDisponibles = response.data.filter(
          (areaComun) => areaComun.estado === "Disponible"
        );
        resolve(areasDisponibles);
      })
      .catch((error) => {
        reject(error);
      });
  });
};


// LISTA DE TURNOS
export const getListaTurnos = (token) => {
  return new Promise((resolve, reject) => {
    axios
      .get("https://localhost:7150/api/turno/", {
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

// LISTA DE CONDOMINIOS
export const getListaCondominios = (token) => {
  return new Promise((resolve, reject) => {
    axios
      .get("https://localhost:7150/api/condominio/", {
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
