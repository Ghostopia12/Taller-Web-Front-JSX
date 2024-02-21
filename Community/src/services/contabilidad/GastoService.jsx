import axios from "axios";

export const createGasto = async (gasto) => {
    const response = await axios.post(
      `http://localhost:8080/api/gastos/create?role=${1}`,//role del localStorage
      JSON.stringify({
        gasto
      }),
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
    const response = await axios.get(`http://localhost:8080/api/gastos/all?enabled=false?role=${1}`);
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