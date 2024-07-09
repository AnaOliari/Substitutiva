import { Aluno } from "./aluno";

export interface IMC {
  id: number;
  alunoId: number;
  altura: number;
  peso: number;
  imc: number;
  classificacao: string;
  dataCriacao: string;
  aluno: Aluno;
}
