import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { toast } from "react-hot-toast";

export function Pets() {
  const [pets, setPets] = useState([]);
  const [show, setShow] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [idPet, setIdPet] = useState(null);
  const [petModal, setpetModal] = useState();

  const handleClose = () => {
    setIdPet(null);
    setShow(false);
  };
  const handleShow = (id) => {
    setIdPet(id);
    setShow(true);
  };
  const handleCloseInfo = () => {
    setIdPet(null);
    setShowInfo(false);
  };
  const handleShowInfo = (id, pet) => {
    setIdPet(id);
    setShowInfo(true);
    setpetModal(pet);
  };

  useEffect(() => {
    initializeTable();
  }, []);

  function initializeTable() {
    axios
      .get("http://localhost:3001/pets")
      .then((response) => {
        setPets(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function onDelete() {
    axios
      .delete(`http://localhost:3001/pets/${idPet}`)
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
    <div className="clientes container">
      <div className="d-flex justify-content-between align-items-center mt-3">
        <h1>Pets</h1>
        <Button as={Link} to="/pets/novo">
          <i className="bi bi-plus-lg me-2"></i>Pet
        </Button>
      </div>
      {Pets === null ? (
        <Loader />
      ) : (
        <Table striped bordered hover className="text-center">
          <thead>
            <tr>
              <th>Nome do Pet</th>
              <th>Tipo</th>
              <th>Porte</th>
              <th>Data de Nascimento</th>
              <th>ID do Cliente</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pets.map((pet) => {
              return (
                <tr key={pet.id}>
                  <td className="align-middle">{pet.nome}</td>
                  <td className="align-middle">{pet.tipo}</td>
                  <td className="align-middle">{pet.porte}</td>
                  <td className="align-middle">{pet.dataNasc}</td>
                  <td className="align-middle">{pet.clienteId}</td>
                  <td className="align-middle d-flex gap-2 justify-content-center">
                    <Button variant="danger" onClick={() => handleShow(pet.id)}>
                      <i className="bi bi-trash-fill"></i>
                    </Button>
                    <Button variant="warning" as={Link} to={`/pet/editar/${pet.id}`}>
                      <i className="bi bi-pencil-fill"></i>
                    </Button>
                    <Button onClick={() => handleShowInfo(pet.id, pet)}>
                      <i className="bi bi-info-circle"></i>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
      <Modal show={showInfo} onHide={handleCloseInfo}>
        <Modal.Header closeButton>
          <Modal.Title>Informações do Pet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {petModal ? (
            <div>
              <p>
                <strong>Nome</strong>: {petModal.nome}
              </p>
              <p>
                <strong>Tipo</strong>: {petModal.tipo}
              </p>
              <p>
                <strong>Porte</strong>: {petModal.porte}
              </p>
              <p>
                <strong>Data de Nascimento</strong>: {petModal.dataNasc}
              </p>
              <p>
                <strong>ID do cliente</strong>: {petModal.clienteId}
              </p>
            </div>
          ) : (
            <Loader />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleCloseInfo}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmação</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza que deseja excluir o pet?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={onDelete}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
