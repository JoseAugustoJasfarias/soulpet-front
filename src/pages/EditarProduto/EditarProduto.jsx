import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { isAfter, format } from "date-fns";
import { useEffect, useState } from "react";

export function EditarProduto() {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  function onSubmit(data) {
    axios
      .put(`http://localhost:3001/produtos/${id}`, data)
      .then((response) => {
        toast.success("Produto atualizado", {
          position: "bottom-right",
          duration: 2000,
        });
        navigate("/produtos");
      })
      .catch((error) => {
        toast.error("Algo deu errado", {
          position: "bottom-right",
          duration: 2000,
        });
      });
  }

  function validateDate(value) {
    const today = new Date();
    const selectedDate = new Date(value);
    if (!isAfter(selectedDate, today)) {
      return `A data deve ser posterior a ${format(today, "dd/MM/yyyy")}`;
    }
    return true;
  }

  useEffect(() => {
    axios.get(`http://localhost:3001/produtos/${id}`).then((response) => {
      const { nome, preco, descricao, desconto, dataDesconto, categoria } =
        response.data;
      reset({ nome, preco, descricao, desconto, dataDesconto, categoria });
      setData(format(new Date(response.data.dataDesconto), "yyyy-MM-dd"));
      console.log(data);
    });
  }, [id, reset, data]);

  return (
    <div className="container mt-4">
      <h1>Editar Produto</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Nome</Form.Label>
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
          <Form.Label>Preço</Form.Label>
          <Form.Control
            type="number"
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
        <Form.Group className="mb-3">
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            type="text"
            className={errors.descricao && "is-invalid"}
            {...register("descricao", {
              required: "A descrição é obrigatória",
              maxLength: { value: 150, message: "Limite de 150 caractéres" },
            })}
          />
          {errors.descricao && (
            <Form.Text className="invalid-feedback">
              {errors.descricao.message}
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Desconto</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            className={errors.desconto && "is-invalid"}
            {...register("desconto", {
              required: "O desconto é obrigatório",
              min: { value: 0, message: "O desconto não pode ser menor que 0" },
              max: {
                value: 91,
                message: "O desconto não pode ser maior que 1",
              },
            })}
          />
          {errors.desconto && (
            <Form.Text className="invalid-feedback">
              {errors.desconto.message}
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          {}
          <Form.Label>Data Desconto</Form.Label>
          <Form.Control
            type="date"
            className={errors.dataDesconto && "is-invalid"}
            {...register("dataDesconto", {
              required: "A data do desconto é obrigatória",
              validate: validateDate,
            })}
            defaultValue={data}
          />
          {errors.dataDesconto && (
            <Form.Text className="invalid-feedback">
              {errors.dataDesconto.message}
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Categoria</Form.Label>
          <Form.Select
            aria-label="Default select example"
            className={errors.categoria && "is-invalid"}
            {...register("categoria", {
              required: "A categoria é obrigatória",
            })}
          >
            <option value="Higiene">Higiene</option>
            <option value="Brinquedos">Brinquedos</option>
            <option value="Conforto">Conforto</option>
          </Form.Select>
          {errors.categoria && (
            <Form.Text className="invalid-feedback">
              {errors.categoria.message}
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
