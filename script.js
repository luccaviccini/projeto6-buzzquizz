// variáveis globais
let numeroPerguntas, numeroNiveis, urlImgQuizz, tituloQuizz;
let objetoQuizz = {};
const apiURLsendQuizz = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";

//simula a criacao de um quizz, no caso aparece quizzes feitos
const criarQuizz = () => {
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
  meuQuizz.style =
    "border: 0px;" +
    "background: white;" +
    "margin: 0 auto;" +
    "margin-bottom:60px;" +
    "height:100%;" +
    "align-items:unset";

  const telaCriarQuizz = document.querySelector(".comece-pelo-comeco");
  const maint3 = document.querySelector(".main-t3");
  telaCriarQuizz.classList.remove("escondido");
  maint3.classList.remove("esconde");
  const tela1 = document.querySelector(".Tela-1");
  tela1.classList.add("esconde");
};

//LUCAS DUAN
let info; //ira armazenar as informaçoes do quiz
let acertos;
let respondidas;
//pede o quiz escolhido da api
function começar(identidade) {
  const apaga = document.querySelector(".corpoquiz");
  apaga.innerHTML = `<ul>
    </ul>`;
  const iniciar = axios.get(
    `https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${identidade}`
  );
  iniciar.then(renderizarquiz);
}
//LUCAS DUAN

let listQuizzes = [];

//carrega os quizzes
function carregarQuizzes(resposta) {
  listQuizzes = resposta.data;
  renderizarQuizzes(listQuizzes);
}

//mostra o erro no console
function tratarErro(erro) {
  console.log(erro.response);
}

const quizzes = axios.get(
  "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes"
);
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
var questionario = "";
function puxarId(Quizz) {
  questionario = Quizz;
  const tela2 = document.getElementById("respondequiz");
  tela2.classList.remove("esconde");
  const tela1 = document.querySelector(".Tela-1");
  tela1.classList.add("esconde");
  começar(questionario);
}

//monta a div do quizz
function QuizzDiv(Quizz) {
  return `
    <div onclick="puxarId(${Quizz.id})" class="quizz">
        <img src="${Quizz.image}">
        <div class="titulo">${Quizz.title}</div>
    </div>
    `;
}

const apagar = (seletor) => {
  seletor = seletor.parentNode;
  seletor.parentNode.remove();
};
//LUCAS DUAN
//imprime o quiz na tela
function renderizarquiz(resposta) {
  info = resposta.data; //atribui as infomaçoes da api a variavel info
  acertos = 0;
  respondidas = 0;
  //seleciona a div banner
  const banner = document.querySelector(".banner");

  //cria o banner
  banner.innerHTML = "";
  banner.style.backgroundImage = `url(${info.image})`;
  banner.innerHTML += `<p>${info.title}</p>`;

  //seleciona a tag ul
  const quiz = document.querySelector("ul");
  quiz.innerHTML = "";

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
        </li>`;

    //muda a cor da pergunta
    document.getElementById("cor" + i).style.backgroundColor = perguntas.color;
    const opçoes = document.getElementById(i);
    let aleatorio = perguntas.answers;
    randomiza(aleatorio);

    //cria as respostas
    for (let a = 0; a < perguntas.answers.length; a++) {
      const respostas = aleatorio[a];
      switch (respostas.isCorrectAnswer) {
        case true:
          opçoes.innerHTML += `<div class = "certa caixa${i}" onclick="mudacor(this,${i});verifica(${respostas.isCorrectAnswer})">
                        <input type ="image" src="${respostas.image}"/>
                        <label>${respostas.text}</label>
                    </div>`;
          break;

        default:
          opçoes.innerHTML += `<div class = "caixa${i}" onclick="mudacor(this,${i});verifica(${respostas.isCorrectAnswer})">
                        <input type ="image" src="${respostas.image}"/>
                        <label>${respostas.text}</label>
                    </div>`;
          break;
      }
    }
  }
}
function randomiza(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
function mudacor(clique, classe) {
  let mudar = document.querySelectorAll(".caixa" + classe);
  mudar.forEach((outras) => {
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
  let next = classe + 1;

  setTimeout(() => {
    document.querySelector("#cor" + next).scrollIntoView();
  }, 2000);
}
function verifica(escolha) {
  respondidas++;
  if (escolha === true) {
    acertos++;
  }
  if (respondidas === info.questions.length) {
    resultado();
    setTimeout(() => {
      document.querySelector(".reiniciar").scrollIntoView();
    }, 2000);
  }
}
function resultado() {
  const pontuaçao = Math.round((acertos / respondidas) * 100);
  const result = document.querySelector(".corpoquiz");
  let nivel = [];
  for (let i = 0; i < info.levels.length - 1; i++) {
    nivel = info.levels[i];
    const proximo = info.levels[i + 1].minValue;
    if (pontuaçao < proximo) {
      break;
    }
    nivel = info.levels[i + 1];
  }
  result.innerHTML += ` 
    <section>
        <div class="nivel">
            <h2>${pontuaçao}% de acerto: ${nivel.title}</h2>
        </div>
        <div class="mensagemnivel">
            <img src="${nivel.image}"/>
            <p>${nivel.text}</p>
        </div>
    </section>
    <button class="reiniciar" onclick="começar(questionario)">Reiniciar quiz</button>
    <button class="home" onclick="voltar()">Voltar pra home</button>`;
}
function voltar() {
  const pagina = document.querySelector("#respondequiz");
  pagina.classList.add("esconde");
  const tela1 = document.querySelector(".Tela-1");
  tela1.classList.remove("esconde");
  document.querySelector(".meuQuizz").scrollIntoView();
}
// começar();
//LUCAS DUAN

// Lucca Viccini

function criarPerguntas() {
  const comecePeloComeco = document.querySelector(".comece-pelo-comeco");
  const crieSuasPerguntas = document.querySelector(".crie-suas-perguntas");

  tituloQuizz = document.querySelector("#titulo-quizz").value;
  numeroPerguntas = Number(document.querySelector("#qtd-pgt-quizz").value);
  urlImgQuizz = document.querySelector("#url-img-quizz").value;
  numeroNiveis = document.querySelector("#qtd-niveis-quizz").value;

  if (
    checkTitulo(tituloQuizz) &&
    checkUrl(urlImgQuizz) &&
    checkNumeroPerguntas(numeroPerguntas) &&
    checkNumeroNiveis(numeroNiveis)
  ) {
    objetoQuizz["title"] = tituloQuizz;
    objetoQuizz["image"] = urlImgQuizz;
    console.log("checks ok");
    comecePeloComeco.classList.toggle("escondido");

    crieSuasPerguntas.innerHTML += `
      <h2>Crie suas perguntas</h2>
      <div id="editar-pergunta1" class="editar-pergunta">
          <div class="pergunta-t3">
              <div class="container-h3">
                  <h3>Pergunta 1</h3>
              </div>
              <input id="texto-pergunta1" type="text" placeholder="Texto da pergunta">
              <input id="cor-de-fundo-pergunta1" type="text" placeholder="Cor de fundo da pergunta">
          </div>
          <div class="resposta">
              <div class="container-h3">
                  <h3>Resposta correta</h3>
              </div>
              <input id="resposta-correta" type="text" placeholder="Resposta correta">
              <input id="url-img-resposta-correta" type="text" placeholder="URL da imagem">
          </div>
          <div class="respostas-incorretas">
              <div class="container-h3">
                  <h3>Respostas incorretas</h3>
              </div>
              <div class="container-inputs">
                  <input id="resposta-incorreta-1" type="text" placeholder="Resposta incorreta 1">
                  <input id="url-img-resp-incorreta-1" type="text" placeholder="URL da imagem 3">
              </div>
              <div class="container-inputs">
                  <input id="resposta-incorreta-2" type="text" placeholder="Resposta incorreta 2">
                  <input id="url-img-resp-incorreta-2" type="text" placeholder="URL da imagem 3">
              </div>
              <div class="container-inputs">
                  <input id="resposta-incorreta-3" type="text" placeholder="Resposta incorreta 3">
                  <input id="url-img-resp-incorreta-3" type="text" placeholder="URL da imagem 3">
              </div>
          </div>
      </div> `;

    for (let i = 2; i <= numeroPerguntas; i++) {
      crieSuasPerguntas.innerHTML += `
          <nav class="menu-editar">
              <div class="container-h3">
                  <h3>Pergunta ${i} </h3>
              </div>
              <img  src="./images/edit.svg" alt="edit-logo">
          </nav>
          <div id="editar-pergunta${i}" class="editar-pergunta escondido">
              <div class="pergunta-t3">
                  <input id="texto-pergunta${i}" type="text" placeholder="Texto da Pergunta ${i}">
                  <input id="cor-de-fundo-pergunta${i}" type="text" placeholder="Cor de fundo da pergunta">
              </div>
              <div class="resposta">
                  <div class="container-h3">
                      <h3>Resposta correta</h3>
                  </div>
                  <input id="resposta-correta" type="text" placeholder="Resposta correta">
                  <input id="url-img-resposta-correta" type="text" placeholder="URL da imagem">
              </div>
              <div class="respostas-incorretas">
                  <div class="container-h3">
                      <h3>Respostas incorretas</h3>
                  </div>
              <div class="container-inputs">
                  <input id="resposta-incorreta-1" type="text" placeholder="Resposta incorreta 1">
                  <input id="url-img-resp-incorreta-1" type="text" placeholder="URL da imagem 3">
              </div>
              <div class="container-inputs">
                  <input id="resposta-incorreta-2" type="text" placeholder="Resposta incorreta 2">
                  <input id="url-img-resp-incorreta-2" type="text" placeholder="URL da imagem 3">
              </div>
              <div class="container-inputs">
                  <input id="resposta-incorreta-3" type="text" placeholder="Resposta incorreta 3">
                  <input id="url-img-resp-incorreta-3" type="text" placeholder="URL da imagem 3">
              </div>
              </div>
          </div>

        `;
    }
    crieSuasPerguntas.innerHTML += `
    <button onclick="criarNiveis()" type="submit"> Prosseguir pra criar níveis</button>
    `;

    // selecionando img dentro da nav menu-editar e adicionando onclick
    const img = document.querySelectorAll(".menu-editar>img");
    img.forEach(
      (imagem) =>
        (imagem.onclick = function () {
          editarPergunta(this);
        })
    );
    //img.onclick = function () {editarPergunta(this)};
  } else {
    console.log("checks não ok");
  }

  console.log(objetoQuizz);
}

function editarPergunta(editar_pergunta) {
  const editarPerguntaID = editar_pergunta.parentNode.nextElementSibling.id;
  const editar = document.querySelector(`#${editarPerguntaID}`);
  editar.classList.toggle("escondido");
  editar.children[0].scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "center",
  });
}

function criarNiveis() {
  numeroNiveis = Number(document.querySelector("#qtd-niveis-quizz").value);
  const perguntas = document.querySelector(".crie-suas-perguntas");
  const niveis = document.querySelector(".decidir-niveis");
  //niveis.classList.toggle("escondido");
  perguntas.classList.toggle("escondido");
  niveis.innerHTML += `
            <div class="nivel-t3">
                <h2>Agora, decida os níveis</h2>
                <div class="container-h3">
                    <h3>Nivel 1</h3>
                </div>
                <input id="titulo-nivel" type="text" placeholder="Título do nível">
                <input id="porcentagem-acerto-minima" type="text" placeholder="% de acerto mínima">
                <input id="url-imagem-nivel" type="text" placeholder="URL da imagem do nível">
                <textarea id="descricao-nivel" type="text" placeholder="Descrição do nível"></textarea>
            </div>`;

  for (let i = 2; i <= numeroNiveis; i++) {
    niveis.innerHTML += `
            <nav class="menu-editar">
                <div class="container-h3">
                    <h3>Nível ${i}</h3>
                </div>
                <img onclick="editarNivel()" src="./images/edit.svg" alt="edit-logo">
            </nav>
            <div id="editar-nivel${i}" class="nivel-t3 escondido">
                <input id="titulo-nivel" type="text" placeholder="Título do nível">
                <input id="porcentagem-acerto-minima" type="text" placeholder="% de acerto mínima">
                <input id="url-imagem-nivel" type="text" placeholder="URL da imagem do nível">
                <textarea id="descricao-nivel" type="text" placeholder="Descrição do nível"></textarea>
            </div>
    `;
  }
  niveis.innerHTML += `
  <button onclick="finalizarQuizz()" type="submit">Finalizar Quizz</button>
  `;

  const img = document.querySelectorAll(".decidir-niveis .menu-editar>img");
  img.forEach(
    (imagem) =>
      (imagem.onclick = function () {
        editarNivel(this);
      })
  );
  niveis.children[0].scrollIntoView({
    behavior: "auto",
    block: "center",
    inline: "center",
  });

  objQuizzPerguntas();
}

function objQuizzPerguntas() {
  // criando array para armazenar ids com numero de perguntas
  const arrayEditarPerguntasIDs = [];
  for (let j = 0; j < numeroPerguntas; j++) {
    arrayEditarPerguntasIDs.push(`editar-pergunta${j + 1}`);
  }

  console.log(objetoQuizz);
  ///// pergunta 1 ----------------------------------------------------------------------------------


  for (let i=0; i<numeroPerguntas; i++ ){
    if(i===0){
      let editarPergunta = document.querySelector(`#${arrayEditarPerguntasIDs[i]}`);

      let texto = editarPergunta.querySelector(".pergunta-t3").children[1].value;
      let color = editarPergunta.querySelector(".pergunta-t3").children[2].value;
      let respostaCorreta = editarPergunta.querySelector(".resposta").children[1].value;
      let urlImgRespCorreta = editarPergunta.querySelector(".resposta").children[2].value;
      let respostaIncorreta1 = editarPergunta.querySelector(".respostas-incorretas").children[1].children[0].value;
      let urlImgRespIncorreta1 = editarPergunta.querySelector(".respostas-incorretas").children[1].children[1].value;

      objetoQuizz["questions"] = [
        {
          title: texto,
          color: color,
          answers: [{
            text: respostaCorreta,
            image: urlImgRespCorreta,
            isCorrectAnswer: true
          },
          {
            text: respostaIncorreta1,
            image: urlImgRespIncorreta1,
            isCorrectAnswer: false
          }
          ]
      }];

      checkNullRespIncorretas(editarPergunta, i);
       
    } else{
      let editarPergunta = document.querySelector(`#${arrayEditarPerguntasIDs[i]}`);

      let texto = editarPergunta.querySelector(".pergunta-t3").children[0].value;
      let color = editarPergunta.querySelector(".pergunta-t3").children[1].value;
      let respostaCorreta = editarPergunta.querySelector(".resposta").children[1].value;
      let urlImgRespCorreta = editarPergunta.querySelector(".resposta").children[2].value;
      let respostaIncorreta1 = editarPergunta.querySelector(".respostas-incorretas").children[1].children[0].value;
      let urlImgRespIncorreta1 = editarPergunta.querySelector(".respostas-incorretas").children[1].children[1].value;

      objetoQuizz["questions"].push({
        title: texto,
        color: color,
        answers: [
          {
            text: respostaCorreta,
            image: urlImgRespCorreta,
            isCorrectAnswer: true,
          },
          {
            text: respostaIncorreta1,
            image: urlImgRespIncorreta1,
            isCorrectAnswer: false,
          }
        ],
      });

      checkNullRespIncorretas(editarPergunta, i);
  
    }
  }

  function checkNullRespIncorretas(editarPergunta,i){
    //checar respostas incorretas individualmente 
    //se for null, nao adicionar ao objeto
    const resIncorreta2 = editarPergunta.querySelector(".respostas-incorretas").children[2].children[0].value;
    const urlImgRespIncorreta2 = editarPergunta.querySelector(".respostas-incorretas").children[2].children[1].value;
    if(resIncorreta2 != ''){
      objetoQuizz["questions"][i]["answers"].push({
        text: resIncorreta2,
        image: urlImgRespIncorreta2,
        isCorrectAnswer: false,
      });
    }
    // checar resposta 3
    const resIncorreta3 = editarPergunta.querySelector(".respostas-incorretas").children[3].children[0].value;
    const urlImgRespIncorreta3 = editarPergunta.querySelector(".respostas-incorretas").children[3].children[1].value;
    if (resIncorreta3 != "") {
      objetoQuizz["questions"][i]["answers"].push({
        text: resIncorreta3,
        image: urlImgRespIncorreta3,
        isCorrectAnswer: false,
      });
    }
  }

 
}

function editarNivel(editar_nivel) {
  const editarNivelID = editar_nivel.parentNode.nextElementSibling.id;
  const editar = document.querySelector(`#${editarNivelID}`);
  //const editar = document.querySelector("#editar-nivel2");
  editar.classList.toggle("escondido");
  editar.children[2].scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "center",
  });
}

function finalizarQuizz() {
  const niveis = document.querySelector(".decidir-niveis");
  const finalizar = document.querySelector(".finalizar");
  finalizar.classList.toggle("escondido");
  niveis.classList.toggle("escondido");

  

  finalizar.innerHTML += `
            <h2>Seu quizz está pronto! </h2>
            
            <div class="container-img-fim">
                <img src="${urlImgQuizz}" alt="hogwarts">
                <p> ${tituloQuizz} </p>
                
            </div>
            
            <button onclick="" type="submit"> Acessar Quizz</button>
            <button onclick="voltarHome()" class="voltar-home">Voltar para home</button>
  `;

  objQuizzNivel();
  SendQuizz();
}

function objQuizzNivel(){
  const arrayEditarNivelIDs = [];
  for (let j = 0; j < numeroNiveis; j++) {
    arrayEditarNivelIDs.push(`editar-nivel${j + 2}`);
  }

  for (let i=0; i<numeroNiveis; i++){
    

    if(i==0){
      let editarNivel = document.querySelector('.nivel-t3');
      let tituloNivel = editarNivel.children[2].value;
      let urlImgNivel = editarNivel.children[4].value;
      let descricao = editarNivel.children[5].value;
      let porcentagem = editarNivel.children[3].value;

      objetoQuizz["levels"] = [{
        title: tituloNivel,
        image: urlImgNivel,
        text: descricao,
        minValue: porcentagem,
      }
      ]  
  } else {
    let editarNivel = document.querySelector(`#editar-nivel${i+1}`);
    let tituloNivel = editarNivel.children[0].value;
    let urlImgNivel = editarNivel.children[2].value;
    let descricao = editarNivel.children[3].value;
    let porcentagem = editarNivel.children[1].value;

    objetoQuizz["levels"].push({
      title: tituloNivel,
      image: urlImgNivel,
      text: descricao,
      minValue: porcentagem,
    });
    };
  };
  console.log(objetoQuizz);
}

function SendQuizz(){
  const promisse = axios(
    {
      method: "POST",
      url: apiURLsendQuizz,
      data: objetoQuizz
    }
  )
  promisse.then( (response) => {console.log(response)})
  promisse.catch( (error) => {console.log(error)})
}

function voltarHome() {
  // reiniciar a pagina
  //ira carregar a pagina 1
  window.location.reload();
}

// funcao para chechar se todos os campos foram preenchidos
function checkTitulo(titulo) {
  const tamanhoTitulo = titulo.length;
  if (titulo != "" && tamanhoTitulo >= 20 && tamanhoTitulo <= 65) {
    return true;
  } else {
    if (titulo == "") {
      alert("O campo titulo não pode estar vazio");
      return false;
    } else {
      if (tamanhoTitulo < 20) {
        alert("O titulo deve ter no minimo 20 caracteres");
        return false;
      } else if (tamanhoTitulo > 65) {
        alert("O titulo deve ter no maximo 65 caracteres");
        return false;
      }
    }
  }
}

function checkUrl(url) {
  try {
    new URL(String(url));
    return true;
  } catch (err) {
    alert("URL invalida");
    return false;
  }
}

function checkNumeroPerguntas(numPerguntas) {
  if (numPerguntas == "") {
    alert("O campo numero de perguntas não pode estar vazio");
    return false;
  } else {
    if (numPerguntas < 3) {
      alert("O numero de perguntas deve ser no minimo 3");
      return false;
    } else {
      return true;
    }
  }
}

function checkNumeroNiveis(numeroNiveis) {
  if (numeroNiveis == "") {
    alert("O campo numero de niveis não pode estar vazio");
    return false;
  } else {
    if (numeroNiveis < 2) {
      alert("O numero de niveis deve ser no minimo 2");
      return false;
    } else {
      return true;
    }
  }
}

function checkHex(numeroHex) {
  const reg = /^#[0-9A-F]{6}$/i;
  if (reg.test(numeroHex)) {
    return true;
  } else {
    return false;
  }
}

function checkTexto(texto) {
  const tamanhoTexto = texto.length;
  if (texto != "" && tamanhoTexto >= 20) {
    return true;
  } else {
    if (texto == "") {
      alert("O campo texto não pode estar vazio");
      return false;
    } else {
      if (tamanhoTexto < 20) {
        alert("O texto deve ter no minimo 20 caracteres");
        return false;
      }
    }
  }
}

function checkVazio(box) {
  if (box == "") {
    alert("O campo não pode estar vazio");
    return false;
  } else {
    return true;
  }
}

function checkRespostaCorreta(resposta) {
  if (resposta == "") {
    alert("O campo resposta correta não pode estar vazio");
    return false;
  } else {
    return true;
  }
}


