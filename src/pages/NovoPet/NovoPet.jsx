import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function NovoPet() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  function onSubmit(data) {
    console.log(data);
    axios
      .post("http://localhost:3001/pets", data)
      .then((response) => {
        toast.success("Pet adicionado.", {
          position: "bottom-right",
          duration: 2000,
        });
        navigate("/pets");
        console.log(data);
      })
      .catch((error) => {
        toast.error("Algo deu errado.", {
          position: "bottom-right",
          duration: 2000,
        });
        console.log(error);
      });
  }

  return (
    <div className="container">
      <h1 className="mt-3">Novo Pet</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Nome:</Form.Label>
          <Form.Control
            type="text"
            className={errors.nome && "is-invalid"}
            {...register("nome", {
              required: "O nome é obrigatório.",
              maxLength: { value: 130, message: "Limite de 130 caracteres." },
            })}
          />
          {errors.nome && (
            <Form.Text className="invalid-feedback">
              {errors.nome.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Tipo:</Form.Label>
          <Form.Control
            type="text"
            className={errors.tipo && "is-invalid"}
            {...register("tipo", {
              required: "O tipo é obrigatório.",
              maxLength: { value: 255, message: "Limite de 255 caracteres." },
            })}
          />
          {errors.tipo && (
            <Form.Text className="invalid-feedback">
              {errors.tipo.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Porte:</Form.Label>
          <Form.Control
            type="text"
            className={errors.porte && "is-invalid"}
            {...register("porte", {
              required: "O porte é obrigatório.",
              maxLength: { value: 255, message: "Limite de 255 caracteres." },
            })}
          />
          {errors.porte && (
            <Form.Text className="invalid-feedback">
              {errors.porte.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Data de Nascimento:</Form.Label>
          <Form.Control
            type="date"
            className={errors.dataNasc && "is-invalid"}
            {...register("dataNasc", {
              required: "A data de nascimento é obrigatória.",
              pattern: {
                value: /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/,
                message: "Insira uma data válida no formato AAAA-MM-DD.",
              },
              min: {
                value: "1980-01-01",
                message: "Insira uma data posterior a 1000-01-01.",
              },
            })}
          />
          {errors.dataNasc && (
            <Form.Text className="invalid-feedback">
              {errors.dataNasc.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Client ID:</Form.Label>
          <Form.Control
            type="text"
            className={errors.clienteId && "is-invalid"}
            {...register("clienteId", {
              required: "O ID do cliente é obrigatório.",
              maxLength: { value: 255, message: "Limite de 255 caracteres." },
            })}
          />
          {errors.clienteId && (
            <Form.Text className="invalid-feedback">
              {errors.clienteId.message}
            </Form.Text>
          )}
        </Form.Group>

        <Button variant="primary" type="submit">
          Cadastrar Pet
        </Button>
      </Form>
    </div>
  );
}
