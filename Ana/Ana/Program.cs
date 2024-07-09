using Ana.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDataContext>(options =>
    options.UseSqlite($"Data Source=imcapp_{Environment.UserName}.db"));

builder.Services.AddCors(options =>
{
    options.AddPolicy("Acesso Total",
        policy => policy
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod());
});

var app = builder.Build();

app.UseCors("Acesso Total");

app.MapGet("/pages/aluno/listar", async (AppDataContext db) =>
{
    var alunos = await db.Alunos.ToListAsync();
    return Results.Json(alunos);
});

app.MapPost("/pages/aluno/cadastrar", async (AppDataContext db, Aluno aluno) =>
{
    if (await db.Alunos.AnyAsync(a => a.Nome == aluno.Nome))
        return Results.BadRequest("Aluno com o mesmo nome já existe.");

    db.Alunos.Add(aluno);
    await db.SaveChangesAsync();
    return Results.Json(aluno);
});

app.MapPost("/pages/imc/cadastrar", async (AppDataContext db, int alunoId, double altura, double peso) =>
{
    var aluno = await db.Alunos.FindAsync(alunoId);
    if (aluno == null) return Results.NotFound("Aluno não encontrado.");

    double imc = peso / (altura * altura);
    string classificacao = ClassificarImc(imc);

    var imc1 = new Imc
    {
        AlunoId = alunoId,
        Altura = altura,
        Peso = peso,
        IMC = imc,
        Classificacao = classificacao
    };

    db.Imc.Add(imc1);
    await db.SaveChangesAsync();
    return Results.Json(imc1);
});

app.MapGet("/pages/imc/listar", async (AppDataContext db) =>
{
    var imc = await db.Imc.Include(i => i.Aluno).ToListAsync();
    return Results.Json(imc);
});

app.MapGet("/pages/imc/listarporaluno/{alunoId}", async (AppDataContext db, int alunoId) =>
{
    var imc = await db.Imc.Include(i => i.Aluno).Where(i => i.AlunoId == alunoId).ToListAsync();
    return Results.Json(imc);
});

app.MapPut("/pages/imc/alterar/{id}", async (AppDataContext db, int id, double altura, double peso) =>
{
    var imc = await db.Imc.FindAsync(id);
    if (imc == null) return Results.NotFound("IMC não encontrado.");

    imc.Altura = altura;
    imc.Peso = peso;
    imc.IMC = peso / (altura * altura);
    imc.Classificacao = ClassificarImc(imc.IMC);
    await db.SaveChangesAsync();
    return Results.Json(imc);
});

app.Run();

static string ClassificarImc(double imc)
{
    if (imc < 18.5) return "Abaixo do peso";
    if (imc < 24.9) return "Peso normal";
    if (imc < 29.9) return "Sobrepeso";
    if (imc < 34.9) return "Obesidade grau 1";
    if (imc < 39.9) return "Obesidade grau 2";
    return "Obesidade grau 3";
}
