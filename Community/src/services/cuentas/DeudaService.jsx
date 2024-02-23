import axios from "axios";

export const createDeuda = async (deuda) => {
    const response = await axios.post(
      `http://localhost:8080/api/deudas/create?role=${1}`,//role del localStorage
     deuda
    );
    if(response.status == 200){
      console.info("Deuda creada");
    }
    return response.data;
};

export const getAllDeudas = async () => {
    const response = await axios.get(`http://localhost:8080/api/deudas/all?role=1`);
    return response.data.deudas;
};

export const getDeudaById = async (id) => {
    const response = await axios.get(
      `http://localhost:8080/api/deudas/${id}?role=${1}`
    );
    return response.data;
};

export const getDeudaByResidenciaId = async (id) => {
  const response = await axios.get(
    `http://localhost:8080/api/deudas/residencia/${id}?role=${1}`
  );
  return response.data;
};