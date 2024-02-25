import React, { useEffect, useState } from "react";
import { Alert, Button, Card, Container, Form, FormControl, FormGroup, FormSelect } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getAuthToken } from "../../utilities/TokenUtilities";
import { postSaveManzana, postSavePersona } from "../../services";

const ManzanaFormPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [validated, setValidated] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false);

    const [nroManzana, setNroManzana] = useState('');
    const [cantidadLotes, setCantidadLotes] = useState('');
    const [condominioId, setCondominioId] = useState('');

    useEffect(() => {
        // Si necesitas alguna inicialización adicional, aquí puedes hacerla
    }, []);

    const onManzanaFormSubmit = (e) => {
        const form = e.currentTarget;
        let isValid = form.checkValidity();
        e.preventDefault();
        e.stopPropagation();
        setValidated(true);
        if (!isValid) return;

        createManzana();
    }

    const createManzana = () => {
        setShowAlertError(false);

        postSaveManzana(getAuthToken(), {
            condominioId_id: parseInt(id),
            nro_manzana: parseInt(nroManzana),
            cantidad_lotes: cantidadLotes
        })
        .then((data) => {
            if (!data.id) {
                setShowAlertError(true);
                return;
            }
            navigate('/manzana/list/'+id);
        })
        .catch((error) => {
            console.error("Error al crear manzana:", error);
            setShowAlertError(true);
        });
    }
    
    return (
        <>
            
            <Container>
                <Card className="mt-3">
                    <Card.Body>
                        <Card.Title>
                            Agregar Manzana a Condominio
                        </Card.Title>
                        <div>
                            {showAlertError && <Alert variant="danger">
                                Error al enviar los datos. Por favor, inténtalo de nuevo.
                            </Alert>}
                            <Form noValidate onSubmit={onManzanaFormSubmit} validated={validated}>
                                <FormGroup>
                                    <Form.Label>Número de Manzana</Form.Label>
                                    <FormControl 
                                        type="number" 
                                        value={nroManzana} 
                                        onChange={(e) => setNroManzana(e.target.value)} 
                                        required 
                                    />
                                    <Form.Control.Feedback type="invalid">Ingrese un número de manzana válido.</Form.Control.Feedback>
                                </FormGroup>
                                <FormGroup>
                                    <Form.Label>Cantidad de Lotes</Form.Label>
                                    <FormControl 
                                        type="text" 
                                        value={cantidadLotes} 
                                        onChange={(e) => setCantidadLotes(e.target.value)} 
                                        required 
                                    />
                                    <Form.Control.Feedback type="invalid">Ingrese la cantidad de lotes.</Form.Control.Feedback>
                                </FormGroup>
                                
                                <div className="mt-3">
                                    <Button type="submit">Crear Manzana</Button>
                                </div>
                            </Form>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

export default ManzanaFormPage;
