import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { createParametro, getParametroById } from "../../../services/cuentas/ParametroService";
import { GetFromStorage } from "../../../services/StorageService";
import { Navigate, useParams } from "react-router-dom";

const FormParametro = () => {
  const [formData, setFormData] = useState({
    monto: "",
    vencimiento: "",
    activo: false,
    tipo: "",
  });

  let { id } = useParams();


  useEffect(() => {
    const roleList = GetFromStorage("roles");
    if (roleList?.length != 0 && (!roleList?.includes("ADMIN") || !roleList?.includes("CONTABLE")) ) {
      //Not an admin, get out!
      Navigate("/dashboard");
    }
    if(id){
        loadParametro(id);
    }
  }, []);

  const loadParametro = (id) => {
    getParametroById(id).then((data) => {
        console.log(data);
        setFormData(data);
/*             getJuegoParticipants(getAuthToken(),data.id).then((data) => {
            setParticipantesJuego(data);
        }); */
    });
}

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
        Guardar
      </Button>
    </Form>
  );
};

export default FormParametro;
