//simula a criacao de um quizz, no caso aparece quizzes feitos
const criarQuizz = () =>{
    let indicador = document.querySelector(".quizzUsuario");
    indicador.classList.remove("escondido");
    let meuQuizz = document.querySelector(".meuQuizz");
    meuQuizz.innerHTML = "";
    meuQuizz.innerHTML = `
    <div class="quizzes">
        <div class="quizz">
            <div class="edit">
            <ion-icon name="create-outline"></ion-icon>
            <ion-icon onclick="apagar(this)" name="trash-outline"></ion-icon>
            </div>
            <img src="Rectangle 34.png">
            <div class="titulo">Acerte os personagens corretos dos Simpsons e prove seu amor!</div>
        </div>
        <div class="quizz">
        <div class="edit">
            <ion-icon name="create-outline"></ion-icon>
            <ion-icon onclick="apagar(this)" name="trash-outline"></ion-icon>
            </div>
            <img src="Rectangle 34.png">
            <div class="titulo">Acerte os personagens corretos dos Simpsons e prove seu amor!</div>
        </div>
        <div class="quizz">
        <div class="edit">
            <ion-icon name="create-outline"></ion-icon>
            <ion-icon onclick="apagar(this)" name="trash-outline"></ion-icon>
            </div>
            <img src="Rectangle 34.png">
            <div class="titulo">Acerte os personagens corretos dos Simpsons e prove seu amor!</div>
        </div>
        <div class="quizz">
        <div class="edit">
            <ion-icon name="create-outline"></ion-icon>
            <ion-icon onclick="apagar(this)" name="trash-outline"></ion-icon>
            </div>
            <img src="Rectangle 34.png">
            <div class="titulo">Acerte os personagens corretos dos Simpsons e prove seu amor!</div>
        </div>
    </div>
    `;
    meuQuizz.style= 'border: 0px;'+
    'background: white;'+
    'margin: 0 auto;'+
    'margin-bottom:60px;'+
    'height:100%;'+
    'align-items:unset';
}

let listQuizzes=[];

//carrega os quizzes
function carregarQuizzes(resposta) {
    listQuizzes = resposta.data;
    renderizarQuizzes(listQuizzes);
    
}
  
//mostra o erro no console
function tratarErro(erro) {
    console.log(erro.response);
}

const quizzes = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
quizzes.then(carregarQuizzes);
quizzes.catch(tratarErro);

//renderiza todos os quizzes da lista
function renderizarQuizzes(Quizzes) {
    let meuQuizz = document.querySelector(".todosQuizz .quizzes");
    meuQuizz.innerHTML = "";
  
    for (let i = 0; i < Quizzes.length; i++) {
        const Quizz = Quizzes[i];
        meuQuizz.innerHTML += QuizzDiv(Quizz);
    }
}

//monta a div do quizz
function QuizzDiv(Quizz) {
    return `
    <div class="quizz">
        <img src="${Quizz.image}">
        <div class="titulo">${Quizz.title}</div>
    </div>
    `;
}

const apagar = (seletor) =>{
    seletor = seletor.parentNode;
    seletor.parentNode.remove();
}