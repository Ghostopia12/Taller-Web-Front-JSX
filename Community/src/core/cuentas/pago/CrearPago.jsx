import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { createPago } from "../../../services/cuentas/PagoService";
import { GetFromStorage } from "../../../services/StorageService";
import { Navigate, useParams } from "react-router-dom";

const CrearPago = () => {
  const { id } = useParams();//id de la deuda
  const [formData, setFormData] = useState({
    deuda_id: parseInt(id),
    contable_id: parseInt(localStorage.getItem("userId")),
    fecha: new Date().toISOString(),
    monto: "",
    tipo: "",
  });


  useEffect(() => {
    const roleList = GetFromStorage("roles");
    if (roleList?.length != 0 && (!roleList?.includes("ADMIN") || !roleList?.includes("CONTABLE")) ) {
      //Not an admin, get out!
      Navigate("/dashboard");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    console.log(formData);
    e.preventDefault();
    var datos = JSON.stringify(formData);
    createPago(datos).then((response) => {
        handleResponse(response);
    });
  };

    const handleResponse = (response) => {
        alert("Pago creada");
        console.log(response);
    }

    const tiposPago = ["QR", "EFECTIVO", "TRANSFERENCIA", "CHEQUE", "OTRO"];

  return (
    <Form onSubmit={handleSubmit} className="formPago" style={{ padding: '20px', margin: '20px' }}>
      <Form.Group controlId="tipo">
        <Form.Label>Tipo</Form.Label>
        <Form.Select name="tipo" value={formData.tipo} onChange={handleChange} required>
          <option value="">Seleccione un tipo</option>
          {tiposPago.map((tipo, index) => (
            <option key={index} value={tipo}>{tipo}</option>
          ))}
        </Form.Select>
      </Form.Group>
      <Button variant="primary" type="submit">
        Crear
      </Button>
    </Form>
  );
};

export default CrearPago;
