import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import CadastrarAluno from "./components/cadastrar-aluno";
import CadastrarIMC from "./components/cadastrar-imc";
import ListarIMCs from "./components/listar-imc";
import ListarIMCsPorAluno from "./components/listar-imc-por-aluno";
import AlterarIMC from "./components/alterar-imc";

function App() {
  return (
    <div>
      <div>
        <BrowserRouter>
          <nav>
            <ul>
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/pages/aluno/cadastrar"}>Cadastrar Aluno</Link>
              </li>
              <li>
                <Link to={"/pages/imc/cadastrar"}>Cadastrar IMC</Link>
              </li>
              <li>
                <Link to={"/pages/imc/listar"}>Listar IMCs</Link>
              </li>
              <li>
                <Link to={"/pages/imc/listarporaluno"}>
                  Listar IMCs por Aluno
                </Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<ListarIMCs />} />
            <Route path="/pages/aluno/cadastrar" element={<CadastrarAluno />} />
            <Route path="/pages/imc/cadastrar" element={<CadastrarIMC />} />
            <Route path="/pages/imc/listar" element={<ListarIMCs />} />
            <Route
              path="/pages/imc/listarporaluno"
              element={<ListarIMCsPorAluno />}
            />
            <Route path="/pages/imc/alterar/:id" element={<AlterarIMC />} />
          </Routes>
          <footer>
            <p>Desenvolvido por Ana Carolina</p>
          </footer>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
