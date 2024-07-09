import React, { useEffect, useState } from "react";
import { IMC } from "../models/imc";

const ListarIMCs: React.FC = () => {
  const [imcs, setImcs] = useState<IMC[]>([]);

  useEffect(() => {
    fetch("http://localhost:5050/pages/imc/listar")
      .then((resposta) => resposta.json())
      .then((data: IMC[]) => setImcs(data));
  }, []);

  return (
    <div>
      <h1>Listagem de IMCs</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Data de Nascimento</th>
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
              <td>{imc.aluno.nome}</td>
              <td>{new Date(imc.aluno.dataNascimento).toLocaleDateString()}</td>
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
    </div>
  );
};

export default ListarIMCs;
