import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { createPago } from "../../../services/cuentas/PagoService";

const CrearPago = () => {
  const [formData, setFormData] = useState({
    deuda_id: "",
    usuario_id: "",
    contable_id: "",
    fecha: "",
    monto: "",
    tipo: "",
  });

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
      <Form.Group controlId="residencia_id">
        <Form.Label>Residencia ID</Form.Label>
        <Form.Control
          type="number"
          name="residencia_id"
          value={formData.residencia_id}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="usuario_id">
        <Form.Label>Usuario ID</Form.Label>
        <Form.Control
          type="number"
          name="usuario_id"
          value={formData.usuario_id}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="contable_id">
        <Form.Label>Contable ID</Form.Label>
        <Form.Control
          type="number"
          name="contable_id"
          value={formData.contable_id}
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
