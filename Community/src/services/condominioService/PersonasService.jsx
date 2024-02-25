import axios from "axios"
import { BASE_URL_MAQUETACION } from "../CONSTANTS";

export const getListaPersonas = () => {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL_MAQUETACION + "/webapi/condominios/", {
            headers: {
                "Content-Type": "application/json",
                
            },
        })
            .then((response) => {
                console.log(response);
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}

export const postSavePersona = (persona) => {
    return new Promise((resolve, reject) => {
        axios.post(BASE_URL_MAQUETACION + "/webapi/condominios/", persona, {
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then((response) => {
                console.log(response);
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}

export const deletePersona = (token, id) => {
    return new Promise((resolve, reject) => {
      axios.delete(`${BASE_URL_MAQUETACION}/webapi/condominios/${id}/`, {
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then((response) => {
          console.log(response);
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }

export const getListaTipoCondominio = () => {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL_MAQUETACION + "/webapi/tipo_condominios/", {
            headers: {
                "Content-Type": "application/json",
                
            },
        })
            .then((response) => {
                console.log(response);
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}

export const getListaTipoDivision = () => {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL_MAQUETACION + "/webapi/tipo_divisiones/", {
            headers: {
                "Content-Type": "application/json",
                
            },
        })
            .then((response) => {
                console.log(response);
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}

export const getCondominioById = (id) => {
    return new Promise((resolve, reject) => {
        axios.get(`${BASE_URL_MAQUETACION}/webapi/condominios/${id}/`, {
            headers: {
                "Content-Type": "application/json",
                
            },
        })
            .then((response) => {
                console.log(response);
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}

export const patchUpdateCondominio = (id, condominio) => {
    return new Promise((resolve, reject) => {
        axios.patch(`${BASE_URL_MAQUETACION}/webapi/condominios/${id}/`, condominio, {
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then((response) => {
                console.log(response);
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}
