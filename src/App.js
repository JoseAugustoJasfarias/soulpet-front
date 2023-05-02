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
          <Route path="/clientes/editar/:id" element={<EditaCliente />} />
          <Route path="/produtos" element={<Produtos/>} />
          <Route path="/produtos/novo" element={<NovoProduto/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
