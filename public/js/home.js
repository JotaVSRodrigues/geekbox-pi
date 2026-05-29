
document.addEventListener("DOMContentLoaded", () => {
    buscarItensHome()

    fetch(`/itens/buscar-timeline/${usuarioId}`)
        .then((resposta) => { return resposta.json() })
        .then((data) => { resumo.push(data) })
    
    console.log(resumo)
    gerarResposta();
})

function buscarItensHome() {
    // faz os dois fetches ao mesmo tempo e espera os dois
    Promise.all([
        fetch(`/itens/buscar-item-progresso/${usuarioId}`).then(r => r.json()),
        fetch(`/itens/buscar-item-concluido/${usuarioId}`).then(r => r.json())
    ]).then(([progresso, concluido]) => {
        renderizarCards(progresso, ".progresso-items");
        renderizarCards(concluido, ".concluido-items");
    }).catch(erro => console.error("Erro ao carregar home:", erro));
}


const coresCategoria = {
    jogo:   '#7f77dd',
    livro:  '#1d9e75',
    filme:  '#d85a30',
    serie:  '#e8b86d',
    anime:  '#d4537e',
    manga:  '#378add',
    musica: '#639922'
};

function renderizarCards(data, seletor) {
    const container = document.querySelector(seletor);
    container.innerHTML = "";

    const itens = data.slice(0, 3);

    if (itens.length === 0) {
        container.innerHTML = `<p class="sem-itens">Nenhum item por aqui ainda.</p>`;
        return;
    }

    itens.forEach((item) => {
        const numInteiro = Math.trunc(item.horas);
        const parteDecimal = Math.round((item.horas % 1) * 60);
        const horaFormatada = `${numInteiro}h${parteDecimal}min`;

        const generoFormatado = item.nome_genero    ? item.nome_genero.toLowerCase() : "—";
        const categoriaFormatada = item.nome_categoria ? item.nome_categoria.toUpperCase() : "—";
        const cor = coresCategoria[item.nome_categoria] || '#c9933a';
        const cover = item.url_imagem || '';

        const card = document.createElement("div");
        card.classList.add("home-card");
        card.innerHTML = `
            ${cover ? `<img class="home-card-cover" src="${cover}" alt="">` : ''}
            <div class="home-card-gradient"></div>
            <div class="home-card-bar" style="background:${cor}"></div>
            <div class="home-card-body">
                <span class="home-card-categoria" style="color:${cor}">${categoriaFormatada}</span>
                <span class="home-card-titulo">${item.titulo}</span>
                <span class="home-card-meta">${horaFormatada} · ${generoFormatado}</span>
            </div>
        `;

        container.appendChild(card);
    });
}

const respostaIA = document.getElementById('resposta-bobia')
let resumo = []

const contexto = 
`
    Você é um assistente simpático e animado que sugere entretenimento.
    Com base nos itens que o usuário já consumiu ou está consumindo (LEIA OS DADOS EM JSON): ${resumo}. 

    Identifique as categorias e gêneros que o usuário geralmente consome para fazer essa análise e sugestão.

    Sugira UM novo item que ele ainda não tem na lista, junto com o diretor, artista 
    ou banda que criou aquele entretenimento, de forma curta, alegre e amigável.
    Use frases como "Que tal você assistir X de Y hoje?", "Que tal você ler X do autor Y dessa vez?" ou "Já experimentou jogar X?".
    Responda em português, em no máximo duas frases. Sem explicações longas.

    Indenpentente se os dados em Json vierem ou nao, retorne apenas a linha de sugestao.

    Atente-se ao tipo de item, que DEVE estar dentro de uma das seguintes categorias:
    - Filmes
    - Séries
    - Animes/Desenhos
    - Mangás
    - Livros
    - Jogos de videogame
    - Músicas
`

async function gerarResposta() {
    const pergunta = contexto;

    const response = await fetch('/bobIA/perguntar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pergunta })
    });

    const data = await response.json();
    console.log("Dados da IA DATA.RESULTADO: ", data.resultado)
    console.log("Dados da IA DATA: ", data)

    respostaIA.innerHTML = data.resultado;
}
