let info;//ira armazenar as informaçoes do quiz

//pede o quiz escolhido da api
const iniciar = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/1');
iniciar.then(renderizarquiz);

//imprime o quiz na tela
function renderizarquiz(resposta) {
    info = resposta.data;//atribui as infomaçoes da api a variavel info

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
            opçoes.innerHTML +=
            `<div>
                 <img src="${respostas.image}"/>
                 <p>${respostas.text}</p>
            </div>`
        }
    }
}
