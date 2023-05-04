import axios from 'axios';
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

export function DetalheClientes() {
  const { id } = useParams();
  const [informacoes, setInformacoes] = useState(null);

  useEffect(() => {
    obterDados().then(setInformacoes);
  }, [id]);

  async function obterDados() {
    const response = await axios.get(`http://localhost:3001/clientes/${id}`);
    const {
      nome,
      email,
      telefone,
      endereco: { cidade, uf, cep, rua, numero }
    } = response.data;

    const informacoes = {
      nome,
      endereco: {
        cidade,
        uf,
        cep,
        rua,
        numero
      }
    };
    console.log(informacoes);

    return (
      <div>
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
            <tr>
              <td>{informacoes.nome}</td>
              <td>{informacoes.email}</td>

              <td>{informacoes.telefone}</td>

              <td>{informacoes}</td>

              <td>{informacoes.nome}</td>

            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}
