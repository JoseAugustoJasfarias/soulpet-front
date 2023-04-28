import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";

export function Pets() {
  const [pets, setPets] = useState([]);

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

  return (
    <div className="clientes container">
      <div className="d-flex justify-content-between align-items-center mt-3">
        <h1>Pets</h1>
        <Button as={Link}>
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
            </tr>
          </thead>
          <tbody>
            {pets.map((pet) => {
              return (
                <tr key={pet.id}>
                  <td>{pet.nome}</td>
                  <td>{pet.tipo}</td>
                  <td>{pet.porte}</td>
                  <td>{pet.dataNasc}</td>
                  <td className="d-flex gap-2 d-flex justify-content-center">
                    <Button>
                      <i className="bi bi-trash-fill"></i>
                    </Button>
                    <Button as={Link} to={`/pet/editar/${pet.id}`}>
                      <i className="bi bi-pencil-fill"></i>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
}
