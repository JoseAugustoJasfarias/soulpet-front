import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { toast } from "react-hot-toast";

export function Servicos() {
  const [servicos, setservicos] = useState(null);
  const [show, setShow] = useState(false);
  const [idServico, setIdServico] = useState(null);

  const handleClose = () => {
    setIdServico(null);
    setShow(false);
  };
  const handleShow = (id) => {
    setIdServico(id);
    setShow(true);
  };

  useEffect(() => {
    initializeTable();
  }, []);

  function initializeTable() {
    axios
      .get("http://localhost:3001/servicos")
      .then((response) => {
        setservicos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function onDelete() {
    axios
      .delete(`http://localhost:3001/servico/${idServico}`)
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
      <div className="d-flex justify-content-between align-items-center mt-3">
        <h1>Servicos</h1>
        <Button as={Link}>
          <i className="bi bi-plus-lg me-2"></i>Serviço
        </Button>
      </div>
      {servicos === null ? (
        <Loader />
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover className="text-center">
            <thead>
              <tr>
                <th className="w-25">Nome:</th>
                <th className="w-25">Preço:</th>
                <th className="w-25">Ações</th>
              </tr>
            </thead>
            <tbody>
              {servicos.map((cliente) => {
                return (
                  <tr key={cliente.id}>
                    <td className="align-middle">{cliente.nome}</td>
                    <td className="align-middle">{cliente.preco}</td>
                    <td className="d-flex gap-2 d-flex justify-content-center">
                      <Button onClick={() => handleShow(cliente.id)}>
                        <i className="bi bi-trash-fill"></i>
                      </Button>
                      <Button>
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmação</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza que deseja excluir o serviço?</Modal.Body>
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
  );
}
