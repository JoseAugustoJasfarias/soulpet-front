import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { toast } from "react-hot-toast";

export function Agendamentos() {
  const [agendamentos, setAgendamentos] = useState(null);
  const [show, setShow] = useState(false);
  const [idAgendamento, setIdAgendamento] = useState(null);

  const handleClose = () => {
    setIdAgendamento(null);
    setShow(false);
  };
  const handleShow = (id) => {
    setIdAgendamento(id);
    setShow(true);
  };

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
  function onDelete() {
    axios
      .delete(`http://localhost:3001/agendamento/${idAgendamento}`)
      .then((response) => {
        toast.success(response.data.message, {
          position: "bottom-right",
          duration: 2000,
        });
        initializeTable();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message, {
          position: "bottom-right",
          duration: 2000,
        });
      });
    handleClose();
  }

  return (
    <div className="servicos container">
      <div className="d-flex justify-content-between align-items-center mt-3 mb-2">
        <h1>Agendamentos</h1>
        <Button variant="primary" as={Link} to="/agendamentos/novo">
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
                return (
                  <tr key={agendamento.id}>
                    <td className="align-middle">{agendamento.servicoId}</td>
                    <td className="align-middle">{agendamento.dataAgendada}</td>
                    <td className="align-middle">{agendamento.petId}</td>
                    <td className="align-middle">
                      {agendamento.realizado ? (
                        <Button variant="outline-success">
                          <i class="bi bi-emoji-sunglasses-fill"> concluído </i>
                        </Button>
                      ) : (
                        <Button variant="outline-warning">
                          <i class="bi bi-emoji-dizzy-fill"> pendente </i>
                        </Button>
                      )}
                    </td>
                    <td className="d-flex gap-2 d-flex justify-content-center">
                      <Button
                        variant="danger"
                        onClick={() => handleShow(agendamento.id)}
                      >
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
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Confirmação</Modal.Title>
            </Modal.Header>
            <Modal.Body>Tem certeza que deseja excluir o cliente?</Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleClose}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={onDelete}>
                Excluir
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </div>
  );
}
