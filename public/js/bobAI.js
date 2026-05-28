
const respostaIA = document.getElementById('resposta-bobia')
let resumo = []
// let resposta = []

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

document.addEventListener("DOMContentLoaded", () => {
    fetch(`/itens/buscar-timeline/${usuarioId}`)
        .then((resposta) => { return resposta.json() })
        .then((data) => { resumo.push(data) })
    
    gerarResposta();
})


// respostaIA.innerHTML = "Opa eu to funcionando"
