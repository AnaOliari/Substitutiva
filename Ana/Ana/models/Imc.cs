namespace Ana.Models;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Imc
{
    public int Id { get; set; }
    public int AlunoId { get; set; }
    public double Altura { get; set; }
    public double Peso { get; set; }
    public double IMC { get; set; }
    public string Classificacao { get; set; }
    public string DataNascimento  { get; set;}
    
    
    [ForeignKey("AlunoId")]
    public Aluno Aluno { get; set; }
}
