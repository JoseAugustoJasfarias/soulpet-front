import { Button, Form, InputGroup, Table } from "react-bootstrap";
import {useState, useEffect} from "react"
import axios from "axios";
import { Loader } from "../../components/Loader/Loader";
import { Link } from "react-router-dom";


export function Produtos() {

    const [produtos, setProdutos] = useState(null)
    const [getNome,setGetNome] = useState("");
    const [getCategoria,setGetCategoria] = useState("");
    const [resultadosBusca, setResultadosBusca] = useState([]);



    function obterNome() {
            axios.get(`http://localhost:3001/produtos/busca?nome=${getNome}`)
            .then(response => {
                console.log(response.data)
                setResultadosBusca(response.data);
            }).catch (error => {
                console.log(error);
            })
        } 

    function obterCategoria() {
            axios.get(`http://localhost:3001/produtos/busca?categoria=${getCategoria}`)
            .then(response => {
                setResultadosBusca(response.data)
            }).catch (error => {
                console.log(error);
            })
    }
    
    useEffect (()=> {
        obterDados();
    },[])

    function obterDados() {
        axios.get("http://localhost:3001/produtos")
        .then(response => {
            setProdutos(response.data);
        }).catch (error => {
            console.log(error);
        })
    };

    

    return(
        <div className="container">
            <div className="d-flex justify-content-center align-items-center mt-4 mb-4">
                <Form className="d-flex flex-row w-50">
                    <div className="d-flex  justify-content-center align-items-center me-2 h-10">
                    <InputGroup>
                        <Form.Control
                        type="text"
                        placeholder="Pesquise por nome"
                        className="me-2"
                        value={getNome}
                        onChange={(event) => setGetNome(event.target.value)}
                        />
                        <Button onClick={obterNome} variant="outline-success">Busca Nome</Button>
                    </InputGroup>
                    </div>
                    
                    <div className="d-flex  justify-content-center align-items-center">
                        <InputGroup>
                            <Form.Control
                            type="text"
                            placeholder="Pesquise por categoria"
                            className="me-2"
                            value={getCategoria}
                            onChange={(event) => setGetCategoria(event.target.value)}
                            />
                            <Button onClick={obterCategoria} variant="outline-success">Busca Categoria</Button>
                        </InputGroup>
                    </div>
                </Form>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-2 mb-1">
                <h1>Produtos</h1>
                <Button as={Link} to="/produtos/novo" className="btn btn-secondary">
                    Adicionar Produtos
                </Button>
            </div>
            <Table striped bordered hover>
                <thead className="p-2 m-2">
                    <th>Nome</th>
                    <th>Preço</th>
                    <th>Descrição</th>
                    <th>Desconto</th>
                    <th>Data Desconto</th>
                    <th>Categoria</th>
                    <th>Ações</th>
                </thead>
                <tbody>
                {
                    produtos !== null && produtos.length > 0 ? (
                        resultadosBusca !== null  && resultadosBusca.length > 0 ? (
                            resultadosBusca.map((produto) => { //Renderizar tabela com resultado pesquisa
                                return (
                                    <tr key={produto.id}>
                                        <td>{produto.nome}</td>
                                        <td>R$ {produto.preco}</td>
                                        <td>{produto.descricao}</td>
                                        <td>{produto.desconto}</td>
                                        <td>{new Date(produto.dataDesconto).toLocaleDateString()}</td>
                                        <td>{produto.categoria}</td>
                                        <td className="d-flex gap-2">
                                            <Button className="btn btn-danger">
                                                <i className="bi bi-trash-fill"></i>
                                            </Button>
                                            <Button as={Link} to={`/produtos/editar/${produto.id}`} className="btn btn-warning">
                                                <i className="bi bi-pencil-fill"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })
                        ) : (
                            produtos.map((produto) => {    //Renderizar tabela com  todos os produtos
                                return (
                                    <tr key={produto.id}>
                                        <td>{produto.nome}</td>
                                        <td>R$ {produto.preco}</td>
                                        <td>{produto.descricao}</td>
                                        <td>{produto.desconto}</td>
                                        <td>{new Date(produto.dataDesconto).toLocaleDateString()}</td>
                                        <td>{produto.categoria}</td>
                                        <td className="d-flex gap-2">
                                            <Button className="btn btn-danger">
                                                <i className="bi bi-trash-fill"></i>
                                            </Button>
                                            <Button as={Link} to={`/produtos/editar/${produto.id}`} className="btn btn-warning">
                                                <i className="bi bi-pencil-fill"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })
                        )
                    ) : (
                        <Loader/>
                    )
                }
                </tbody>
            </Table>
        </div>
    )
}


