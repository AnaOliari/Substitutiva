using Ana.Models;

using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();


var app = builder.Build();

//POST: http://localhost:5050/pages/aluno/cadastrar
app.MapPost("/pages/aluno/cadastrar", async (AppDataContext db, Aluno aluno) =>
{
    if (await db.Alunos.AnyAsync(a => a.Nome == aluno.Nome))
        return Results.BadRequest("Aluno com o mesmo nome já existe.");

    db.Alunos.Add(aluno);
    await db.SaveChangesAsync();
    return Results.Ok(aluno);
});

//POST: http://localhost:5050/pages/imc/cadastrar
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
    return Results.Ok(imc1);
});

//GET: http://localhost:5050/pages/imc/listar
app.MapGet("/pages/imc/listar", async (AppDataContext db) =>
{
    var imc = await db.Imc.Include(i => i.Aluno).ToListAsync();
    return Results.Ok(imc);
});

//GET: http://localhost:5050/pages/imc/listarporaluno/id
app.MapGet("/pages/imc/listarporaluno/{alunoId}", async (AppDataContext db, int alunoId) =>
{
    var imc = await db.Imc.Include(i => i.Aluno).Where(i => i.AlunoId == alunoId).ToListAsync();
    return Results.Ok(imc);
});

//PUT: http://localhost:5050/pages/imc/alterar/id
app.MapPut("/pages/imc/alterar/{id}", async (AppDataContext db, int id, double altura, double peso) =>
{
    var imc = await db.Imc.FindAsync(id);
    if (imc == null) return Results.NotFound("IMC não encontrado.");

    imc.Altura = altura;
    imc.Peso = peso;
    imc.IMC = peso / (altura * altura);
    imc.Classificacao = ClassificarImc(imc.IMC);
    await db.SaveChangesAsync();
    return Results.Ok(imc);
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

