import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function NovoAgendamento() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    
    function onSubmit(data) {
        const agendamento = {
            agendamento:[
                data
            ]
        }
        axios.post("http://localhost:3001/agendamentos", agendamento)
        .then(response => {
            toast.success("Agendamento adicionado.", { position: "bottom-right", duration: 2000 });
            navigate("/agendamentos");
        })
        .catch(error => {
            toast.error("Algo deu errado.", { position: "bottom-right", duration: 2000 });
            console.log(error);
        });
    }

    return (
        <div className="container">
            <h1>Novo agendamento</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Label>Data do agendamento</Form.Label>
                    <Form.Control type="date" className={errors.dataAgendada && "is-invalid"} {...register("dataAgendada", { required: "A data do agendamento é obrigatória."})} />
                    {errors.dataAgendada && <Form.Text className="invalid-feedback">{errors.dataAgendada.message}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>ID do serviço à prestar</Form.Label>
                    <Form.Control type="number" className={errors.servicoId && "is-invalid"} {...register("servicoId", { required: "O ID do serviço é obrigatório."})} />
                    {errors.servicoId && <Form.Text className="invalid-feedback">{errors.servicoId.message}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>ID do pet </Form.Label>
                    <Form.Control type="number" className={errors.petId && "is-invalid"} {...register("petId", { required: "O ID do pet é obrigatório."})} />
                    {errors.petId && <Form.Text className="invalid-feedback">{errors.petId.message}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Status</Form.Label>
                    <Form>
                    <Form.Check 
                        type="switch"
                        id="custom-switch"
                        label="Serviço foi cocluído"
                        className={errors.realizado && "is-invalid"} {...register("realizado")}
                    />
                    </Form>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Cadastrar Agendamento
                </Button>
            </Form>
        </div>
    );
}