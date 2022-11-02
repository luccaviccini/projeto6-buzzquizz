let info;
//pede o quiz escolhido da api
const iniciar = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/1');
iniciar.then(renderizarquiz);

function renderizarquiz(resposta) {
    info = resposta.data;

    const banner = document.querySelector('.banner');

    banner.innerHTML = '';
    banner.style.backgroundImage = `url(${info.image})`;
    banner.innerHTML += `<p>${info.title}</p>`;

    const quiz = document.querySelector('ul');
    quiz.innerHTML = '';

    for (let i = 0; i < info.questions.length; i++) {
        const perguntas = info.questions[i];
        quiz.innerHTML += ` <li class="caixapergunta">
            <div class="pergunta">
                <h2>${perguntas.title}</h2>
            </div>
            <div id="${i}" class="opçoes">
        </div>
        </li>`
        const opçoes = document.getElementById(i);
        
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
