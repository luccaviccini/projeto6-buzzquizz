// Definicao de variaveis globais

function criarPerguntas() {
  const criarPerguntas = document.querySelector(".crie-suas-perguntas");
  const comecePeloComeco = document.querySelector(".comece-pelo-comeco");
  criarPerguntas.classList.toggle("escondido");
  comecePeloComeco.classList.toggle("escondido");
  
}

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

function criarNiveis() {
  const perguntas = document.querySelector(".crie-suas-perguntas");
  const niveis = document.querySelector(".decidir-niveis");
  niveis.classList.toggle("escondido");
  perguntas.classList.toggle("escondido");
  niveis.children[0].scrollIntoView({
    behavior: "auto",
    block: "center",
    inline: "center",
  });
}

function editarNivel(){
    const editar = document.querySelector("#editar-nivel2");
    editar.classList.toggle("escondido");
    console.log(editar.children[2]);
    editar.children[2].scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });    
}
