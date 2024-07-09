import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IMC } from "../models/imc";

const AlterarIMC: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  const [imcRecord, setImcRecord] = useState<IMC | null>(null);

  useEffect(() => {
    fetch(`http://localhost:5050/pages/imc/listar/${id}`)
      .then((resposta) => resposta.json())
      .then((data: IMC) => {
        setImcRecord(data);
        setAltura(data.altura.toString());
        setPeso(data.peso.toString());
      });
  }, [id]);

  function alterarIMC(e: React.FormEvent) {
    e.preventDefault();
    const updatedData = {
      altura: parseFloat(altura),
      peso: parseFloat(peso),
    };

    fetch(`http://localhost:5050/pages/imc/alterar/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((resposta) => resposta.json())
      .then(() => {
        navigate("/pages/imc/listar");
      });
  }

  return (
    <div>
      <h1>Alterar IMC</h1>
      {imcRecord && (
        <form onSubmit={alterarIMC}>
          <label>Altura (m):</label>
          <input
            type="number"
            step="0.01"
            value={altura}
            onChange={(e) => setAltura(e.target.value)}
            required
          />
          <br />
          <label>Peso (kg):</label>
          <input
            type="number"
            step="0.1"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            required
          />
          <br />
          <button type="submit">Salvar</button>
        </form>
      )}
    </div>
  );
};

export default AlterarIMC;
