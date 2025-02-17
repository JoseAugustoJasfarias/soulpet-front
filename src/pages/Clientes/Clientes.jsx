import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Loader } from '../../components/Loader/Loader';
import { toast } from 'react-hot-toast';

export function Clientes() {
  const [clientes, setClientes] = useState(null);
  const [show, setShow] = useState(false);
  const [idCliente, setIdCliente] = useState(null);

  const handleClose = () => {
    setIdCliente(null);
    setShow(false);
  };
  const handleShow = id => {
    setIdCliente(id);
    setShow(true);
  };

  useEffect(() => {
    initializeTable();
  }, []);

  function initializeTable() {
    axios
      .get('http://localhost:3001/clientes')
      .then(response => {
        setClientes(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  function onDelete() {
    axios
      .delete(`http://localhost:3001/clientes/${idCliente}`)
      .then(response => {
        toast.success(response.data.message, {
          position: 'bottom-right',
          duration: 2000
        });
        initializeTable();
      })
      .catch(error => {
        console.log(error);
        toast.error(error.response.data.message, {
          position: 'bottom-right',
          duration: 2000
        });
      });
    handleClose();
  }

  return (
    <div className="clientes container">
      <div className="d-flex justify-content-between align-items-center mt-3">
        <h1>Clientes</h1>
        <Button as={Link} to="/clientes/novo">
          <i className="bi bi-plus-lg me-2"></i>Cliente
        </Button>
      </div>
      {clientes === null ? (
        <Loader />
      ) : (
        <Table striped bordered hover className="text-center">
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Telefone</th>
              <th>ID do Cliente</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map(cliente => {
              return (
                <tr key={cliente.id}>
                  <td className="align-middle">{cliente.nome}</td>
                  <td className="align-middle">{cliente.email}</td>
                  <td className="align-middle">{cliente.telefone}</td>
                  <td className="align-middle">{cliente.id}</td>
                  <td className="d-flex gap-2 d-flex justify-content-center">
                    <Button
                      variant="danger"
                      onClick={() => handleShow(cliente.id)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </Button>
                    <Button
                      variant="warning"
                      as={Link}
                      to={`/clientes/editar/${cliente.id}`}
                    >
                      <i className="bi bi-pencil-fill"></i>
                    </Button>
                    <Button as={Link}  to={`/clientes/detalhes/${cliente.id}`}
                     >
                      <i className="bi bi-info-circle"></i>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
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
      <div className="d-flex justify-content-end">
        <Button
          onClick={() => window.open('http://localhost:3001/relatorio')}
          className=""
        >
          <i class="bi bi-filetype-pdf"></i> Relatório
        </Button>
      </div>
    </div>
  );
}
