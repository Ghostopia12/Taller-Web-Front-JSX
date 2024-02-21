import { Card, Container, Link } from "react-bootstrap";
import Menu from "../../components/Menu";
import { getDeudaByResidenciaId } from "../../services";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { validateLogin } from "../../utilities/TokenUtilities";

export default function DeudasList() {
    const navigate = useNavigate();

    const [deudas, setDeudas] = useState([]);

    let { id } = useParams();

    useEffect(() => {
        const loginValid = validateLogin(navigate);
        if (!loginValid) {
            return;
        }
        if(id){
            loadDeuda(id);
        }
    }, [])


    const loadDeuda = (id) => {
      getDeudaByResidenciaId(id).then((data) => {
            console.log(data);
            setDeudas(data.deudas);
        });
    }

    return (
        <>
            <Menu />
            <Container>
            {deudas.map((deuda) => {
                            return (
                              <><Card className="mt-3">
                                <Card.Body>
                                  <Card.Title>
                                    {deuda.monto} - {deuda.cancelada ? "Cancelada" : "Pendiente"} - {deuda.tipo}
                                  </Card.Title>
                                  <Card.Text>
                                  <p>{deuda.concepto}</p>
                                  <p>Fecha limite {deuda.fecha_limite}</p>
                                  <Link to={'http://127.0.0.1:5173/pagar/'+deuda.id}>
                                    <h1>Pagar</h1>
                                  </Link>
                                  </Card.Text>

                                </Card.Body>
                              </Card></>
                            )
                            })}
            </Container>
        </>
    );
}
