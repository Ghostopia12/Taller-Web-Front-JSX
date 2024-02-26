import axios from "axios";

export const createParametro = async (parametro) => {
    const response = await axios.post(
      `http://localhost:8080/api/parametros/create?role=${1}`,//role del localStorage
        parametro
    );
    if(response.status == 200){
      console.info("Parametro creada");
    }
    return response.data;
};

export const getAllParametros = async () => {
    const response = await axios.get(`http://localhost:8080/api/parametros/all?role=${1}`);
    if(response.status == 200){
      console.info("---- exito ----")
    }
    return response.data;
};

export const getParametroById = async (id) => {
    const response = await axios.get(
      `http://localhost:8080/api/parametros/${id}?role=${1}`
    );
    return response.data;
};

export const getParametroByTipoId = async (id) => {
  const response = await axios.get(
    `http://localhost:8080/api/parametros/tipo/${id}?role=${1}`
  );
  return response.data;
};

export const getParametroByActivo = async (activo) => {
  const response = await axios.get(
    `http://localhost:8080/api/parametros/activo/${activo}?role=${1}`
  );
  return response.data;
};