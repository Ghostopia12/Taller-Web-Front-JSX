import axios from "axios"
import { BASE_URL_MAQUETACION } from "../CONSTANTS";

export const getListaBloques = () => {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL_MAQUETACION + "/webapi/tipo_division_bloque/", {
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


export const postSaveBloque = (bloque) => {
    return new Promise((resolve, reject) => {
        axios.post(BASE_URL_MAQUETACION + "/webapi/tipo_division_bloque/", bloque, {
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
