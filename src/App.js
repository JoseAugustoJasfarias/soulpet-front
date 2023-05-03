import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Root } from "./pages/Root/Root";
import { Home } from "./pages/Home/Home";
import { NovoCliente } from "./pages/NovoCliente/NovoCliente";
import { Clientes } from "./pages/Clientes/Clientes";
import { EditaCliente } from "./pages/EditaCliente/EditaCliente";
import { Pets } from "./pages/Pets/Pets";
import { Produtos } from "./pages/Produtos/Produtos";
import { NovoProduto } from "./pages/NovoProduto/NovoProduto";
import { NovoPet } from "./pages/NovoPet/NovoPet";
import { EditarPets } from "./pages/EditarPets/EditarPets";
import { Servicos } from "./pages/Servicos/Servicos";
import { NovoServico } from "./pages/NovoServico/NovoServico";
import { EditarServico } from "./pages/EditarServicos/EditarServicos";
import { Pedidos } from "./pages/Pedidos/Pedidos";
import { NovoPedido } from "./pages/NovoPedido/NovoPedido";
import { DashBoard } from "./pages/DashBoard/DashBoard";
import { NovoAgendamento } from "./pages/NovoAgendamento/NovoAgendamento";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="/" element={<Home />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/pets" element={<Pets />} />
          <Route path="/pets/novo" element={<NovoPet />} />
          <Route path="/pet/editar/:id" element={<EditarPets />} />
          <Route path="/clientes/novo" element={<NovoCliente />} />
          <Route path="/servico/novo" element={<NovoServico />} />
          <Route path="/clientes/editar/:id" element={<EditaCliente />} />
          <Route path="/servico/editar/:id" element={<EditarServico />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/produtos/novo" element={<NovoProduto />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/pedidos/novo" element={<NovoPedido />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/agendamentos/novo" element={<NovoAgendamento/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
