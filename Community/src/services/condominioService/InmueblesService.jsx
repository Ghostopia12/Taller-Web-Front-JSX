import axios from "axios";
import { BASE_URL_MAQUETACION } from "../CONSTANTS";

export const getListaInmuebles = () => {
    return new Promise((resolve, reject) => {
        axios
        .get(BASE_URL_MAQUETACION + "/webapi/inmuebles/", {
            headers: {
            "Content-Type": "application/json",
            },
        })
        .then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            console.log(error);
            reject(error);
        });
    });
    };

    export const postSaveInmueble = (inmueble) => {
        return new Promise((resolve, reject) => {
            axios
            .post(BASE_URL_MAQUETACION + "/webapi/inmuebles/", inmueble, {
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

    export const patchUpdateInmueble = (id, inmueble) => {
        return new Promise((resolve, reject) => {
            axios
            .patch(`${BASE_URL_MAQUETACION}/webapi/inmuebles/${id}/`, inmueble, {
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
//haz el metodo para cambiar el estado_construccion del inmueble
export const patchUpdateEstadoConstruccion = (id, inmueble) => {
    return new Promise((resolve, reject) => {
        axios
        .patch(`${BASE_URL_MAQUETACION}/webapi/inmuebles/${id}/`, inmueble, {
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

export const getInmuebleXUsuario = async (id) => {
    const response = await axios.get(
      `${BASE_URL_MAQUETACION}/webapi/inmuebles/${id}/residencia-usuario/`, {
        headers: {
        "Content-Type": "application/json",
        },
    });
    return response.data;
};
    

