import axios from "axios";

export const createPago = async (pago) => {
    const response = await axios.post(
      `http://localhost:8080/api/pagos/create?role=${1}`,//role del localStorage
      JSON.stringify({
        pago
      }),
    );
    if(response.status == 200){
      console.info("Pago creada");
    }
    return response.data;
};

export const getAllPagos = async () => {
    const response = await axios.get(`http://localhost:8080/api/pagos/all?enabled=false?role=${1}`);
    if(response.status == 200){
      console.info("---- exito ----")
    }
    return response.data;
};

export const getPagoById = async (id) => {
    const response = await axios.get(
      `http://localhost:8080/api/pagos/${id}?role=${1}`
    );
    return response.data;
};

export const getPagoByDeudaId = async (id) => {
  const response = await axios.get(
    `http://localhost:8080/api/pagos/deuda/${id}?role=${1}`
  );
  return response.data;
};

export const getPagoByUsuarioId = async (id) => {
  const response = await axios.get(
    `http://localhost:8080/api/pagos/usuario/${id}?role=${1}`
  );
  return response.data;
};

export const getPagoByContableId = async (id) => {
  const response = await axios.get(
    `http://localhost:8080/api/pagos/contable/${id}?role=${1}`
  );
  return response.data;
};