import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { createDeuda } from "../../../services/cuentas/DeudaService";

const CrearDeuda = () => {
  const [formData, setFormData] = useState({
    residencia_id: "",
    fecha: "",
    monto: "",
    concepto: "",
    cancelada: false,
    fecha_limite: "",
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
    createDeuda(datos).then((response) => {
        handleResponse(response);
    });
  };

    const handleResponse = (response) => {
        alert("Deuda creada");
        console.log(response);
    }

    const tiposDeuda = ["RESERVA", "MULTA", "OTRO", "EXPENSA"];

  return (
    <Form onSubmit={handleSubmit} className="formDeuda" style={{ padding: '20px', margin: '20px' }}>
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
      <Form.Group controlId="fecha_limite">
        <Form.Label>Fecha Límite</Form.Label>
        <Form.Control
          type="datetime-local"
          name="fecha_limite"
          value={formData.fecha_limite}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="tipo">
        <Form.Label>Tipo</Form.Label>
        <Form.Select name="tipo" value={formData.tipo} onChange={handleChange} required>
          <option value="">Seleccione un tipo</option>
          {tiposDeuda.map((tipo, index) => (
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

export default CrearDeuda;
