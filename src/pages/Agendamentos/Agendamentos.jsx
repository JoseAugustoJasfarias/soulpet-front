import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";

export function Agendamentos() {
    const [agendamentos, setAgendamentos] = useState(null);
    // const [status, setStatus] = useState(null)

    useEffect(() => {
        initializeTable();
    }, []);

    function initializeTable() {
        axios
            .get("http://localhost:3001/agendamentos")
            .then((response) => {
                setAgendamentos(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // function onStatus(status) {
    //     if (status === 1) {
    //         status = "Concluído"
    //     } else {
    //         status = "Não concluído"
    //     }
    // }

    return (
        <div className="servicos container">
            <div className="d-flex justify-content-between align-items-center mt-3">
                <h1>Agendamentos</h1>
                <Button variant="info" as={Link}>
                    <i className="bi bi-plus-lg me-2"></i>Agendamento
                </Button>
            </div>
            {agendamentos === null ? (
                <Loader />
            ) : (
                <div className="table-responsive">
                    <Table striped bordered hover className="text-center">
                        <thead>
                            <tr>
                                <th className="w-25">ID do serviço</th>
                                <th className="w-25">Data do Agendamento</th>
                                <th className="w-25">ID do pet</th>
                                <th className="w-25">Status</th>
                                <th className="w-25">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {agendamentos.map((agendamento) => {
                                console.log(agendamento.realizado)
                                return (
                                    <tr key={agendamento.id}>
                                        <td className="align-middle">{agendamento.servicoId}</td>
                                        <td className="align-middle">{agendamento.dataAgendada}</td>
                                        <td className="align-middle">{agendamento.petId}</td>
                                        <td className="align-middle">{agendamento.realizado ?
                                            <Button variant="outline-success"><i class="bi bi-emoji-sunglasses-fill"> concluído  </i></Button>:
                                            <Button variant="outline-warning"><i class="bi bi-emoji-dizzy-fill"> pendente </i></Button>}</td>
                                        <td className="d-flex gap-2 d-flex justify-content-center">
                                            <Button variant="danger" >
                                                <i className="bi bi-trash-fill"></i>
                                            </Button>
                                            <Button variant="warning">
                                                <i className="bi bi-pencil-fill"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
            )}
        </div>
    );
}