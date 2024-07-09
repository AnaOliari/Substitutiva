import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Aluno } from "../models/aluno";
import { IMC } from "../models/imc";

const CadastrarIMC: React.FC = () => {
  const navigate = useNavigate();
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [alunoId, setAlunoId] = useState("");
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");

  useEffect(() => {
    carregarAlunos();
  }, []);

  function carregarAlunos() {
    fetch("http://localhost:5000/pages/aluno/listar")
      .then((resposta) => resposta.json())
      .then((alunos: Aluno[]) => {
        setAlunos(alunos);
      });
  }

  function cadastrarIMC(e: React.FormEvent) {
    e.preventDefault();
    const imcData: Omit<
      IMC,
      "id" | "imc" | "classificacao" | "dataCriacao" | "aluno"
    > = {
      alunoId: parseInt(alunoId),
      altura: parseFloat(altura),
      peso: parseFloat(peso),
    };

    fetch("http://localhost:5000/pages/imc/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(imcData),
    })
      .then((resposta) => resposta.json())
      .then(() => {
        navigate("/pages/imc/listar");
      });
  }

  return (
    <div>
      <h1>Cadastrar IMC</h1>
      <form onSubmit={cadastrarIMC}>
        <label>Aluno:</label>
        <select onChange={(e) => setAlunoId(e.target.value)} required>
          <option value="">Selecione um aluno</option>
          {alunos.map((aluno) => (
            <option value={aluno.id} key={aluno.id}>
              {aluno.nome}
            </option>
          ))}
        </select>
        <br />
        <label>Altura (m):</label>
        <input
          type="number"
          step="0.01"
          placeholder="Digite a altura"
          onChange={(e) => setAltura(e.target.value)}
          required
        />
        <br />
        <label>Peso (kg):</label>
        <input
          type="number"
          step="0.1"
          placeholder="Digite o peso"
          onChange={(e) => setPeso(e.target.value)}
          required
        />
        <br />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastrarIMC;
