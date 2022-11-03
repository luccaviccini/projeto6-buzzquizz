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