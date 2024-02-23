import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { createParametro } from "../../../services/cuentas/ParametroService";

const CrearParametro = () => {
  const [formData, setFormData] = useState({
    monto: "",
    vencimiento: "",
    activo: false,
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
    createParametro(datos).then((response) => {
        handleResponse(response);
    });
  };

    const handleResponse = (response) => {
        alert("Parametro creada");
        console.log(response);
    }

    const tiposParametro = ["RESERVA", "MULTA", "OTRO", "EXPENSA"];

  return (
    <Form onSubmit={handleSubmit} className="formParametro" style={{ padding: '20px', margin: '20px' }}>
      <Form.Group controlId="residencia_id">
        <Form.Label>Vencimiento en dias</Form.Label>
        <Form.Control
          type="number"
          name="vencimiento"
          value={formData.vencimiento}
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
      <Form.Group controlId="activo">
        <Form.Check
          type="checkbox"
          name="activo"
          label="Activo"
          checked={formData.activo}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="tipo">
        <Form.Label>Tipo</Form.Label>
        <Form.Select name="tipo" value={formData.tipo} onChange={handleChange} required>
          <option value="">Seleccione un tipo</option>
          {tiposParametro.map((tipo, index) => (
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

export default CrearParametro;
