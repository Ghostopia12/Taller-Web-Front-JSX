import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { createGasto } from "../../../services/cuentas/GastoService";
import { GetFromStorage } from "../../../services/StorageService";
import { Navigate } from "react-router-dom";

const CrearGasto = () => {
  const [formData, setFormData] = useState({
    condominio_id: "",
    fecha: "",
    monto: "",
    concepto: "",
    cancelada: false,
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
    e.preventDefault();
    var datos = JSON.stringify(formData);
    createGasto(datos).then((response) => {
        handleResponse(response);
    });
  };

    const handleResponse = (response) => {
        alert("Gasto creada");
        console.log(response);
    }


  return (
    <Form onSubmit={handleSubmit} className="formGasto" style={{ padding: '20px', margin: '20px' }}>
      <Form.Group controlId="condominio_id">
        <Form.Label>Condominio ID</Form.Label>
        <Form.Control
          type="number"
          name="condominio_id"
          value={formData.condominio_id}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="fecha">
        <Form.Label>Fecha</Form.Label>
        <Form.Control
          type="datetime-local"
          name="fecha"
          value={formData.fecha}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="monto">
        <Form.Label>Monto</Form.Label>
        <Form.Control
          type="number"
          name="monto"
          value={formData.monto}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="concepto">
        <Form.Label>Concepto</Form.Label>
        <Form.Control
          type="text"
          name="concepto"
          value={formData.concepto}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="cancelada">
        <Form.Check
          type="checkbox"
          name="cancelada"
          label="Cancelada"
          checked={formData.cancelada}
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Crear
      </Button>
    </Form>
  );
};

export default CrearGasto;
