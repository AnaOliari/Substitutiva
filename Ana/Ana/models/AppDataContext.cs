using Microsoft.EntityFrameworkCore;

namespace Ana.Models;
public class AppDataContext : DbContext
{
    public DbSet<Aluno> Alunos { get; set; }
    public DbSet<Imc> Imc { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=ana.db");
    }

}