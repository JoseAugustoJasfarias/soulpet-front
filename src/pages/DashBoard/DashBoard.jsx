import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { Loader } from "../../components/Loader/Loader";
import { Link } from "react-router-dom";


export function DashBoard() {

    const [dados, setDados] = useState(null);

    function obterDados() {
        axios.get("http://localhost:3001/dashboard")
        .then(response => {
            console.log(response.data);
            setDados(response.data);
        }).catch (error => {
            console.log(error);
        })
    }

    useEffect(()=>{
        obterDados();
    },[])

    return(
        <div className="container mt-4">
            <h1 className="mb-2">DashBoard</h1>
            {
                dados === null ? (
                    <Loader/>
                ) : (
                    <div className="d-flex justify-content-evenly align-items-center ">
                        <Table>
                            <Row>
                            {
                                dados.totalAgendamentos !== 0 ? (
                                    <Col className="card me-4 p-4">
                                        <h3><Button variant="secondary" as={Link} to="">
                                                <i class="bi bi-card-list"></i>
                                            </Button>
                                            Agendamentos: 
                                        </h3>
                                        <h3 className="text-center">{dados.totalAgendamentos}</h3>
                                    </Col> 
                                ) : null
                            }
                            {
                                dados.totalClientes !== 0 ? (
                                    <Col className="card me-4 p-4">
                                        <h3> <Button className="me-2" variant="secondary" as={Link} to="../clientes">
                                                <i className="bi bi-person-circle"></i>
                                            </Button> 
                                            Clientes: 
                                        </h3>
                                        <h3 className="text-center">{dados.totalClientes}</h3>
                                    </Col> 
                                ) : null
                            }
                            {
                                dados.totalPets !== 0 ? (
                                    <Col className="card me-4 p-4">
                                        <h3><Button className="me-2" variant="secondary" as={Link} to="../pets">
                                                <i class="bi bi-heart-fill"></i>
                                            </Button>
                                            Pets: 
                                        </h3>
                                        <h3 className="text-center">{dados.totalPets}</h3>
                                    </Col> 
                                ) : null
                            }
                            {
                                dados.totalProdutos !== 0 ? (
                                    <Col className="card me-4 p-4">
                                        <h3><Button className="me-2" variant="secondary" as={Link} to="../produtos">
                                                <i class="bi bi-bag-check"></i>
                                            </Button>
                                            Produtos: 
                                        </h3>
                                        <h3 className="text-center">{dados.totalProdutos}</h3>
                                    </Col> 
                                ) : null
                            }
                            {
                                dados.totalServicos !== 0 ? (
                                    <Col className="card me-4 p-4">
                                        <h3><Button className="me-2" variant="secondary" as={Link} to="../serviços">
                                                <i class="bi bi-bag-check"></i>
                                            </Button>
                                            Serviços: 
                                        </h3>
                                        <h3 className="text-center">{dados.totalServicos}</h3>
                                    </Col> 
                                ) : null
                            }
                            </Row>
                        </Table>
                    </div>
                    )
            }
        </div>
    )
}

