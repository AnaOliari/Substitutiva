import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Aluno } from "../models/aluno";

const CadastrarAluno: React.FC = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const aluno: Omit<Aluno, "id"> = {
      nome,
      dataNascimento,
    };
    const response = await fetch(
      "http://localhost:5050/pages/aluno/cadastrar",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(aluno),
      }
    );
    if (response.ok) {
      alert("Aluno cadastrado com sucesso!");
      setNome("");
      setDataNascimento("");
      navigate("/pages/imc/listar");
    } else {
      alert("Erro ao cadastrar aluno.");
    }
  };

  return (
    <div>
      <h1>Cadastrar Aluno</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Data de Nascimento:</label>
          <input
            type="date"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            required
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastrarAluno;
