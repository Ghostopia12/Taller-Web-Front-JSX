import axios from "axios";

export const createGasto = async (gasto) => {
    const response = await axios.post(
      `http://localhost:8080/api/gastos/create?role=${1}`,//role del localStorage
        gasto
      ,{
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if(response.status == 200){
      console.info("Token obtenido con exito:", response.data.token);
    }
    return response.data;
};

export const updateGasto = async (id) => {
    const response = await axios.post(
      `http://localhost:8080/api/gastos/update/${id}?role=${1}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if(response.status == 200){
      console.info("Token obtenido con exito:", response.data.token);
    }
    return response.data;
};

export const getAllGastos = async () => {
    const response = await axios.get(`http://localhost:8080/api/gastos/all?role=${1}`);
    if(response.status == 200){
      console.info("---- exito ----")
    }
    return response.data;
};

export const getGastoById = async (id) => {
    const response = await axios.get(
      `http://localhost:8080/api/gastos/${id}?role=${1}`
    );
    return response.data;
};

export const getGastoByCondominioId = async (id) => {
  const response = await axios.get(
    `http://localhost:8080/api/gastos/condominio/${id}?role=${1}`
  );
  return response.data;
};

export const getGastoByCondominioIds = async (ids) => {
  try {
    const response = await axios.post(
      'http://localhost:8080/api/gastos/condominio?role=1',
      ids
    );
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};


export const getGastoCanceladoByCondominioIds = async (ids, cancelada) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/gastos/condominio/gastos-canceladas?cancelada=${cancelada}`,
      ids
    );
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};