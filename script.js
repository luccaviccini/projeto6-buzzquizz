// Definicao de variaveis globais

function editarPergunta(){
    const editar = document.querySelector("#editar-pergunta2");
    editar.classList.toggle("escondido");
    editar.children[1].children[1].scrollIntoView(
      {
        behavior: "smooth",
        block: "center",
        inline: "center",
      }
    );    
}

function criarPerguntas(){
  const criarPerguntas = document.querySelector(".crie-suas-perguntas");
  const comecePeloComeco = document.querySelector(".comece-pelo-comeco");
  comecePeloComeco.classList.toggle("escondido");
  criarPerguntas.classList.toggle("escondido");
}