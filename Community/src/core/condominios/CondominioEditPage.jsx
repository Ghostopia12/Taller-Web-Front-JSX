import { Alert, Button, Card, Container, Form, FormControl, FormGroup, FormSelect } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PERSONAS_LIST_URL } from "../../routing/CONSTANTS";
import { getListaTipoCondominio, getListaTipoDivision, getCondominioById, patchUpdateCondominio } from "../../services/condominioService/PersonasService";

const CondominioEditPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [validated, setValidated] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false);

    const [nombre, setNombre] = useState('');
    const [capacidad_estacionamiento, setCapacidadEstacionamiento] = useState('');
    const [tipoCondominioId, setTipoCondominioId] = useState('');
    const [tipoDivisionId, setTipoDivisionId] = useState('');

    const [listaTipoCondominio, setListaTipoCondominio] = useState([]);
    const [listaTipoDivision, setListaTipoDivision] = useState([]);

    useEffect(() => {
        loadTipoCondominio();
        loadTipoDivision();
        loadCondominio();
    }, []);

    const loadTipoCondominio = () => {
        getListaTipoCondominio().then((data) => {
            setListaTipoCondominio(data);
        });
    }

    const loadTipoDivision = () => {
        getListaTipoDivision().then((data) => {
            setListaTipoDivision(data);
        });
    }

    const loadCondominio = () => {
        getCondominioById(id).then((condominio) => {
            setNombre(condominio.nombre);
            setTipoCondominioId(condominio.tipoCondominioId);
            setTipoDivisionId(condominio.tipoDivisionId);
            setCapacidadEstacionamiento(condominio.capacidad_estacionamiento);
        });
    }

    const onCondominioFormSubmit = (e) => {
        const form = e.currentTarget;
        const isValid = form.checkValidity();
        e.preventDefault();
        e.stopPropagation();
        setValidated(true);
        if (!isValid) return;
        updateCondominio();
    }

    const updateCondominio = () => {
        setShowAlertError(false);
        patchUpdateCondominio(id, {
            nombre,
            capacidad_estacionamiento,
        })
        .then((data) => {
            if (!data.id) {
                setShowAlertError(true);
                return;
            }
            navigate(PERSONAS_LIST_URL+  localStorage.getItem('personaid'));
        })
        .catch((error) => {
            if (error.response.status === 401) {
                setShowAlertError(true);
            } else {
                console.log(error);
            }
        });
    }

    return (
        <>
            
            <Container>
                <Card className="mt-3">
                    <Card.Body>
                        <Card.Title>
                            Editar condominio
                        </Card.Title>
                        <div>
                            {showAlertError && <Alert variant="danger">
                                Error al enviar los datos, por favor inténtelo nuevamente
                            </Alert>}
                            <Form noValidate onSubmit={onCondominioFormSubmit} validated={validated}>
                                <FormGroup>
                                    <label>Nombre del condominio</label>
                                    <FormControl 
                                        value={nombre} 
                                        required
                                        onChange={(e) => setNombre(e.target.value)}
                                    />
                                    <Form.Control.Feedback type="invalid">Necesitas un nombre</Form.Control.Feedback>
                                </FormGroup>
                                <FormGroup>
                                    <label>Capacidad de estacionamiento</label>
                                    <FormControl 
                                        value={capacidad_estacionamiento} 
                                        required
                                        onChange={(e) => setCapacidadEstacionamiento(e.target.value)}
                                    />
                                    <Form.Control.Feedback type="invalid">Necesitas un nombre</Form.Control.Feedback>
                                </FormGroup>
                                <div className="mt-3">
                                    <Button type="submit">Guardar cambios</Button>
                                </div>
                            </Form>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

export default CondominioEditPage;
