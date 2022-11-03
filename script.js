let info;//ira armazenar as informaçoes do quiz
let acertos;
let respondidas;
//pede o quiz escolhido da api
const iniciar = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/1');
iniciar.then(renderizarquiz);

//imprime o quiz na tela
function renderizarquiz(resposta) {
    info = resposta.data;//atribui as infomaçoes da api a variavel info
    acertos = 0;
    respondidas = 0;
    //seleciona a div banner
    const banner = document.querySelector('.banner');

    //cria o banner
    banner.innerHTML = '';
    banner.style.backgroundImage = `url(${info.image})`;
    banner.innerHTML += `<p>${info.title}</p>`;

    //seleciona a tag ul
    const quiz = document.querySelector('ul');
    quiz.innerHTML = '';

    //cria as caixas das perguntas
    for (let i = 0; i < info.questions.length; i++) {
        const perguntas = info.questions[i];
        //cria as caixas e escreve as perguntas
        quiz.innerHTML += ` <li class="caixapergunta">
            <div id = "cor${i}"class="pergunta">
                <h2>${perguntas.title}</h2>
            </div>
            <div id="${i}" class="opçoes">
        </div>
        </li>`

        //muda a cor da pergunta
        document.getElementById('cor' + i).style.backgroundColor = perguntas.color;
        const opçoes = document.getElementById(i);
        
        //cria as respostas
        for (let a = 0; a < perguntas.answers.length; a++) {
            const respostas = perguntas.answers[a];
            switch (respostas.isCorrectAnswer) {
                case true:
                    opçoes.innerHTML +=
                    `<div class = "certa caixa${i}" onclick="mudacor(this,${i});verifica(${respostas.isCorrectAnswer})">
                        <input type ="image" src="${respostas.image}"/>
                        <label>${respostas.text}</label>
                    </div>`
                    break;
            
                default:
                    opçoes.innerHTML +=
                    `<div class = "caixa${i}" onclick="mudacor(this,${i});verifica(${respostas.isCorrectAnswer})">
                        <input type ="image" src="${respostas.image}"/>
                        <label>${respostas.text}</label>
                    </div>`
                    break;
            }
        }
    }
} 
function mudacor(clique, classe) {
    let mudar = document.querySelectorAll(".caixa"+ classe);
    mudar.forEach(outras => {
        let mude = outras.classList;
        mude.add("naoescolhida");
        outras.style.color = "#FF4B4B";
        outras.removeAttribute("onclick");
        if (outras.classList.contains("certa")) {
            outras.style.color = "#009C22";
        }
    });
    let escolhida = clique.classList;
    escolhida.remove("naoescolhida");
}
function verifica(escolha) {
    respondidas++;
    if (escolha === true) {
        acertos++;
    }
    if (respondidas === info.questions.length) {
        resultado();
    }
}
function resultado() {
    const pontuaçao = (acertos/respondidas)*100;
    const result = document.querySelector('section');
    let nivel = [];
    result.innerHTML = '';
    for (let i = 0; i < info.levels.length - 1; i++) {
        nivel = info.levels[i];
        const proximo = info.levels[i+1].minValue;
        if (pontuaçao < proximo) {
            break;
        }
        nivel = info.levels[i + 1];
    }
    result.innerHTML += ` <div class="nivel">
    <h2>${pontuaçao}% de acerto: ${nivel.title}</h2>
</div>
<div class="mensagemnivel">
    <img src="${nivel.image}"/>
    <p>${nivel.text}</p>
</div>`

}

