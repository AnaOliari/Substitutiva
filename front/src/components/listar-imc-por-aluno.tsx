import React, { useEffect, useState } from "react";
import { Aluno } from "../models/aluno";
import { IMC } from "../models/imc";

const ListarIMCsPorAluno: React.FC = () => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [alunoId, setAlunoId] = useState("");
  const [imcs, setImcs] = useState<IMC[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/pages/aluno/listar")
      .then((resposta) => resposta.json())
      .then((data: Aluno[]) => setAlunos(data));
  }, []);

  useEffect(() => {
    if (alunoId) {
      fetch(`http://localhost:5000/pages/imc/listarporaluno/${alunoId}`)
        .then((resposta) => resposta.json())
        .then((data: IMC[]) => setImcs(data));
    }
  }, [alunoId]);

  return (
    <div>
      <h1>Listagem de IMCs por Aluno</h1>
      <label>Aluno:</label>
      <select onChange={(e) => setAlunoId(e.target.value)} required>
        <option value="">Selecione um aluno</option>
        {alunos.map((aluno) => (
          <option value={aluno.id} key={aluno.id}>
            {aluno.nome}
          </option>
        ))}
      </select>
      {imcs.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Altura</th>
              <th>Peso</th>
              <th>IMC</th>
              <th>Classificação</th>
              <th>Data de Criação</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {imcs.map((imc) => (
              <tr key={imc.id}>
                <td>{imc.id}</td>
                <td>{imc.altura}</td>
                <td>{imc.peso}</td>
                <td>{imc.imc.toFixed(2)}</td>
                <td>{imc.classificacao}</td>
                <td>{new Date(imc.dataCriacao).toLocaleDateString()}</td>
                <td>
                  <button>Alterar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListarIMCsPorAluno;
