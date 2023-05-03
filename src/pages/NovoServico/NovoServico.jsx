import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { isAfter, format } from "date-fns";

export function NovoServico() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  function onSubmit(data) {
    axios
      .post("http://localhost:3001/servico", data)
      .then((response) => {
        toast.success("Serviço adicionado", {
          position: "bottom-right",
          duration: 2000,
        });
        navigate("/servicos");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Algo deu errado", {
          position: "bottom-right",
          duration: 2000,
        });
      });
  }

  return (
    <div className="container mt-4">
      <h1>Novo Serviço</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Nome:</Form.Label>
          <Form.Control
            type="text"
            className={errors.nome && "is-invalid"}
            {...register("nome", { required: "O nome é obrigatório" })}
          />
          {errors.nome && (
            <Form.Text className="invalid-feedback">
              {errors.nome.message}
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Preço:</Form.Label>
          <Form.Control
            type="text"
            className={errors.preco && "is-invalid"}
            {...register("preco", {
              required: "O preço é obrigatório",
              min: { value: 0, message: "O preço não pode ser menor que zero" },
            })}
          />
          {errors.preco && (
            <Form.Text className="invalid-feedback">
              {errors.preco.message}
            </Form.Text>
          )}
        </Form.Group>

        <Button variant="primary" type="submit">
          Cadastrar
        </Button>
      </Form>
    </div>
  );
}
