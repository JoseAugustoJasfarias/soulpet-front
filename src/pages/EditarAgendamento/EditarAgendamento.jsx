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
      .put(`http://localhost:3001/agendamentos/${id}`, data)
      .then((response) => {
        toast.success("Agendamento atualizado", {
          position: "bottom-right",
          duration: 2000,
        });
        navigate("/agendamentos");
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
    axios.get(`http://localhost:3001/agendamentos/${id}`).then((response) => {
      const { dataAgendada, servicoId, petId, realizado } =
        response.data;
      reset({ dataAgendada, servicoId, petId, realizado });
     
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
            className={errors.dataAgendada && "is-invalid"}
            {...register("dataAgendada", { required: "O dataAgendada é obrigatório" })}
          />
          {errors.dataAgendada && (
            <Form.Text className="invalid-feedback">
              {errors.dataAgendada.message}
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Preço</Form.Label>
          <Form.Control
            type="number"
            className={errors.servicoId && "is-invalid"}
            {...register("servicoId", {
              required: "O preço é obrigatório",
              min: { value: 0, message: "O preço não pode ser menor que zero" },
            })}
          />
          {errors.servicoId && (
            <Form.Text className="invalid-feedback">
              {errors.servicoId.message}
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            type="text"
            className={errors.petId && "is-invalid"}
            {...register("petId", {
              required: "A descrição é obrigatória",
              maxLength: { value: 150, message: "Limite de 150 caractéres" },
            })}
          />
          {errors.petId && (
            <Form.Text className="invalid-feedback">
              {errors.petId.message}
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>realizado</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            className={errors.realizado && "is-invalid"}
            {...register("realizado", {
              required: "O realizado é obrigatório",
              min: { value: 0, message: "O realizado não pode ser menor que 0" },
              max: {
                value: 91,
                message: "O realizado não pode ser maior que 1",
              },
            })}
          />
          {errors.realizado && (
            <Form.Text className="invalid-feedback">
              {errors.realizado.message}
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
