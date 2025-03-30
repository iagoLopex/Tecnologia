/* app.js */

// Array para armazenar os alunos cadastrados
let alunos = [];

// Classe Aluno para representar cada registro
class Aluno {
  constructor(nome, idade, curso, notaFinal) {
    this.nome = nome;
    this.idade = idade;
    this.curso = curso;
    this.notaFinal = notaFinal;
  }
  
  // Retorna true se o aluno estiver aprovado (nota >= 7)
  isAprovado() {
    return this.notaFinal >= 7;
  }
  
  // Retorna uma string formatada com os dados do aluno
  toString() {
    return `Nome: ${this.nome}, Idade: ${this.idade}, Curso: ${this.curso}, Nota Final: ${this.notaFinal}`;
  }
}

// Função para renderizar a tabela de alunos
function renderizarTabela() {
  const tbody = document.getElementById("tabelaAlunos");
  tbody.innerHTML = ""; // Limpa o conteúdo anterior
  
  alunos.forEach((aluno, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${aluno.nome}</td>
      <td>${aluno.idade}</td>
      <td>${aluno.curso}</td>
      <td>${aluno.notaFinal}</td>
      <td>
        <button onclick="editarAluno(${index})">Editar</button>
        <button onclick="excluirAluno(${index})">Excluir</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Função para cadastrar um novo aluno
function cadastrarAluno(event) {
  event.preventDefault(); // Evita o envio do formulário

  const nome = document.getElementById("nome").value;
  const idade = parseInt(document.getElementById("idade").value);
  const curso = document.getElementById("curso").value;
  const notaFinal = parseFloat(document.getElementById("notaFinal").value);

  const aluno = new Aluno(nome, idade, curso, notaFinal);
  alunos.push(aluno);
  console.log("Aluno cadastrado:", aluno.toString());
  alert("Aluno cadastrado com sucesso!");

  // Limpa os campos do formulário
  document.getElementById("formAluno").reset();

  renderizarTabela();
}

// Função para excluir um aluno
function excluirAluno(index) {
  if (confirm("Deseja realmente excluir este aluno?")) {
    alunos.splice(index, 1);
    console.log("Aluno excluído!");
    alert("Aluno excluído com sucesso!");
    renderizarTabela();
  }
}

// Função para editar um aluno
function editarAluno(index) {
  const aluno = alunos[index];

  // Preenche o formulário com os dados do aluno a ser editado
  document.getElementById("nome").value = aluno.nome;
  document.getElementById("idade").value = aluno.idade;
  document.getElementById("curso").value = aluno.curso;
  document.getElementById("notaFinal").value = aluno.notaFinal;

  // Altera o botão para "Atualizar"
  const btnCadastrar = document.getElementById("btnCadastrar");
  btnCadastrar.textContent = "Atualizar";

  // Remove o evento de cadastro e adiciona o evento de atualização
  btnCadastrar.removeEventListener("click", cadastrarAluno);
  btnCadastrar.addEventListener("click", function atualizar(event) {
    event.preventDefault();
    aluno.nome = document.getElementById("nome").value;
    aluno.idade = parseInt(document.getElementById("idade").value);
    aluno.curso = document.getElementById("curso").value;
    aluno.notaFinal = parseFloat(document.getElementById("notaFinal").value);

    console.log("Aluno atualizado:", aluno.toString());
    alert("Aluno atualizado com sucesso!");
    renderizarTabela();

    // Volta o botão para "Cadastrar" e redefine o evento
    btnCadastrar.textContent = "Cadastrar";
    btnCadastrar.removeEventListener("click", atualizar);
    btnCadastrar.addEventListener("click", cadastrarAluno);

    // Limpa o formulário
    document.getElementById("formAluno").reset();
  }, { once: true });
}

// Relatório: Lista de alunos aprovados
function relatorioAprovados() {
  const aprovados = alunos.filter(aluno => aluno.isAprovado());
  let html = "<h3>Alunos Aprovados:</h3>";
  if (aprovados.length > 0) {
    html += aprovados.map(a => a.toString()).join("<br>");
  } else {
    html += "Nenhum aluno aprovado.";
  }
  document.getElementById("relatorios").innerHTML = html;
}

// Relatório: Média das notas
function mediaNotas() {
  if (alunos.length === 0) {
    document.getElementById("relatorios").innerHTML = "<h3>Média das Notas:</h3> Nenhum aluno cadastrado.";
    return;
  }
  const somaNotas = alunos.reduce((total, aluno) => total + aluno.notaFinal, 0);
  const media = somaNotas / alunos.length;
  document.getElementById("relatorios").innerHTML = `<h3>Média das Notas:</h3> ${media.toFixed(2)}`;
}

// Relatório: Média das idades
function mediaIdades() {
  if (alunos.length === 0) {
    document.getElementById("relatorios").innerHTML = "<h3>Média das Idades:</h3> Nenhum aluno cadastrado.";
    return;
  }
  const somaIdades = alunos.reduce((total, aluno) => total + aluno.idade, 0);
  const media = somaIdades / alunos.length;
  document.getElementById("relatorios").innerHTML = `<h3>Média das Idades:</h3> ${media.toFixed(2)}`;
}

// Relatório: Nomes em ordem alfabética
function ordemAlfabetica() {
  if (alunos.length === 0) {
    document.getElementById("relatorios").innerHTML = "<h3>Nomes em Ordem Alfabética:</h3> Nenhum aluno cadastrado.";
    return;
  }
  const nomesOrdenados = alunos.map(a => a.nome).sort();
  document.getElementById("relatorios").innerHTML = `<h3>Nomes em Ordem Alfabética:</h3> ${nomesOrdenados.join(", ")}`;
}

// Relatório: Contagem de alunos por curso
function contagemPorCurso() {
  if (alunos.length === 0) {
    document.getElementById("relatorios").innerHTML = "<h3>Contagem por Curso:</h3> Nenhum aluno cadastrado.";
    return;
  }
  const contagem = alunos.reduce((acc, aluno) => {
    acc[aluno.curso] = (acc[aluno.curso] || 0) + 1;
    return acc;
  }, {});
  
  let html = "<h3>Contagem por Curso:</h3>";
  for (let curso in contagem) {
    html += `${curso}: ${contagem[curso]} aluno(s)<br>`;
  }
  document.getElementById("relatorios").innerHTML = html;
}

// Eventos de clique para cadastro e relatórios
document.getElementById("btnCadastrar").addEventListener("click", cadastrarAluno);
document.getElementById("btnRelatorioAprovados").addEventListener("click", relatorioAprovados);
document.getElementById("btnMediaNotas").addEventListener("click", mediaNotas);
document.getElementById("btnMediaIdades").addEventListener("click", mediaIdades);
document.getElementById("btnOrdemAlfabetica").addEventListener("click", ordemAlfabetica);
document.getElementById("btnContagemCursos").addEventListener("click", contagemPorCurso);
