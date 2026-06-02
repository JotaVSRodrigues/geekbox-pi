let qtdItems = 0;
const fieldList = document.getElementById("field-list");
const modalItem = document.querySelector('.modal-container-item');
const modalMeta = document.querySelector('.modal-container-meta');
const modalFiltro = document.querySelector('.modal-container-filtro')
const divCard = document.getElementById("div-content-selected");
const form = document.getElementById("filter-form");

let allItens = []
let termoBusca = ""

let itemAtual = null
let genres = [];


const inputBusca = document.getElementById("ipt_search_bar")

if (inputBusca) {
    inputBusca.addEventListener('input', (event) => {
        termoBusca = inputBusca.value.toLowerCase().trim()
        console.log(termoBusca)
        const categoria = document.getElementById('select_categoria_filtro').value
        const status = document.getElementById('select_status_filtro').value
        aplicarFiltros(categoria, status)
    })
}

async function carregarGeneros() {
    const resposta = await fetch(`/itens/buscar-generos`);
    genres = await resposta.json();
}

document.addEventListener("DOMContentLoaded", function() {
    // updateDateSubtitle();
    carregarGeneros();
    carregarItens();
    renderizarItens();

});

const categorySelect = document.getElementById("select_categoria");
const genreSelect = document.getElementById("select_genero");

categorySelect.addEventListener("change", () => {
    const selectedCategory = categorySelect.value;

    console.log("Estou carregando!")
    genreSelect.innerHTML = '<option value="" disabled selected hidden>Gênero</option>';

    genres
        .filter(genre => genre.id_categoria == selectedCategory)
        .forEach(genre => {
            const option = document.createElement("option");
            option.value = genre.id;
            option.textContent = genre.nome;
            genreSelect.appendChild(option);
        });
});


form.addEventListener('submit', (event) => {
    event.preventDefault();
    const categoria = document.getElementById('select_categoria_filtro').value;
    const status    = document.getElementById('select_status_filtro').value;
    aplicarFiltros(categoria, status);
});

function calculateMonth() {
    const date = new Date();
    const month = date.getMonth();

    const months = [
        "JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL",
        "MAIO", "JUNHO", "JULHO", "AGOSTO",
        "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"
    ];

    return months[month];
}

// resolver bug dps
// function updateDateSubtitle() {
//     const date = new Date();
//     const month = calculateMonth();
//     const year = date.getFullYear();

//     if (document.getElementById("subtitle" + month + year) != null) {
//         return;
//     }

//     const newSubtitle = document.createElement("div");
//     newSubtitle.setAttribute("id", "subtitle" + month + year);
//     newSubtitle.innerHTML = `
//         <div class="month-date">
//             <span>${month} ${year}</span>
//         </div>
//     `;

//     fieldList.appendChild(newSubtitle);
// }

function createItemCard(modal) {
    modal.classList.remove("closing");
    modal.classList.add("active");
}

function closeItemCard(modal) {
    modal.classList.add("closing");

    setTimeout(() => {
        modal.classList.remove("active");
        modal.classList.remove("closing");
    }, 600);
}

function carregarItens() {
    const usuarioId = sessionStorage.getItem("ID_USUARIO");

    
    fetch(`/itens/buscar-wishlist/${usuarioId}`)
    .then((resposta) => { return resposta.json() })
    .then((data) => {
       
        allItens = data

        console.log(data);
        // updateDateSubtitle();
        renderizarItens(data);
    })
}

function aplicarFiltros(categoria, status) {

    const filtrados = allItens.filter((item) => {
        const passCategoria = !categoria || categoria === '' || item.nome_categoria === categoria
        const passStatus = !status || status === '' || item.status === status
        const passBusca = termoBusca === '' || (item.titulo && item.titulo.toLowerCase().includes(termoBusca));

        return passCategoria && passStatus && passBusca
    });

    renderizarItens(filtrados)
}

function limparFiltro () {
    document.getElementById("select_categoria_filtro").value = ''
    document.getElementById("select_status_filtro").value = ''
    termoBusca = ''

    const inputBusca = document.getElementById('ipt_search_bar').value = ''
    
    setTimeout(() => {
        closeItemCard(modalFiltro)
    }, "1000");
    

    renderizarItens(allItens)
}

function renderizarItens(data) {


    fieldList.innerHTML = ''
    qtdItems = 0
    // updateDateSubtitle()

    data.forEach((item) => {
        const newItem = document.createElement("div");
        newItem.setAttribute("id", "new_item" + qtdItems);
        newItem.classList.add("item-anim");
    
        const firstItem = fieldList.querySelector(".item");
    
        if (firstItem) {
            fieldList.insertBefore(newItem, firstItem.parentNode);
        } else {
            fieldList.appendChild(newItem);
        }

        let num = item.horas;
        let numInteiro = Math.trunc(num);
        let parteDecimal = ((num % 1).toFixed(2) * 60)
        let horaFormatada = `${numInteiro/10}h${parteDecimal}min`
    
        let statusFormatado = item.status.toUpperCase().replace("_", " ")
        let generoFormatado = item.nome_genero.toLowerCase()


        const meses = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"]

        document.getElementById("new_item" + qtdItems).innerHTML = `
            <div class="item" onclick="getItem(${item.id})">
                <div class="information">
                    <h4 class="item-header">${item.titulo}</h4>
                    <div class="information-subtitle">
                        <span id="span-concluido">${statusFormatado}</span>
                        <span>· ${horaFormatada} ·</span>
                        <span> ${item.nome_categoria} ·</span>
                        <span> ${generoFormatado} </span>
                    </div>
                </div>
                <div class="right-information">
                    <span class="right-information-date">${item.dia_criacao} de ${meses[item.mes_criacao - 1]}</span>
                    <button class="elipse-btn" onclick="openMiniModal(${item.id}, this)">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
        `;

        requestAnimationFrame(() => {
            newItem.classList.add("show");
        });

        qtdItems++; 
    })
}

function getItem(itemId) {
    divCard.innerHTML = ""
    console.log("item clicado: ", itemId)

    fetch(`/itens/buscar-item/${itemId}`)
    .then((resposta) => { return resposta.json() })
    .then((data) => {
        console.log("FETCH DO GETITEM() FUNCIONANDO. DADOS=> ", data)
        
        itemAtual = data[0]
        let num = data[0].horas;
        let numInteiro = Math.trunc(num);
        let parteDecimal = ((num % 1).toFixed(2) * 60)
        let horaFormatada = `${numInteiro/10}h${parteDecimal}min`
    
        let statusFormatado = data[0].status.toUpperCase().replace("_", " ")
        let generoFormatado = data[0].nome_genero.toLowerCase()


        const meses = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"]
        
        let campoResenha = data[0].resenha == null ?  
            `<div class="select-card-resenha anim-fade-up anim-d3"> 
                <h3>Escreva sua resenha aqui.</h3>
                <div class="wishlist-content-text">
                    <textarea name="" id="textarea_resenha"></textarea>

                    <div class="btn-cadastro-div">
                        <button onclick="updateResenha(${itemId})" class="btn-cadastro">Salvar Resenha</button>
                    </div>
                </div>
            </div>`
            :
            `<div class="select-card-resenha anim-fade-up anim-d3"> 
                <h3>Sua resenha.</h3>
                <div class="wishlist-content-text">
                    <p>${data[0].resenha}
                    
                    </p>
                    <div class="btn-editar-resenha" onclick="editarResenha(${itemId})">
                        <img class="edit-resenha-btn" src="../assets/images/icons/Edit - 192x192.png" alt="">
                        <span>Editar resenha</span>
                    </div>

                </div>
            </div>`;


        const statusOptions = [
            {
                'status': 'wishlist',
                'statusFormatado': 'Wishlist'
            },
            {
                'status': 'em_progresso',
                'statusFormatado': 'Em Progresso'
            },
            {
                'status': 'concluido',
                'statusFormatado': 'Concluído'
            },
            {
                'status': 'pausado',
                'statusFormatado': 'Pausado'
            },
            {
                'status': 'abandonado',
                'statusFormatado': 'Abandonado'
            },
        ]
            
        const statusOptions2 = ['wishlist', 'em_progresso', 'concluido', 'pausado', 'abandonado'];
        let statusNow = {}

        statusOptions.forEach((element) => {
            if (element.status === data[0].status) {
                statusNow = element
                statusOptions.splice(statusOptions.indexOf(element), 1)
            }
        })

        let campoStatus = `
        <div class="status-row">
            <span>Status: </span>
            <div class="div-card-select">    
                <select name="" id="select_status_item" onchange="updateStatus(${itemId})">
                    <option value="${statusNow.status}">${statusNow.statusFormatado}</option>
                    <option value="${statusOptions[0].status}">${statusOptions[0].statusFormatado}</option>
                    <option value="${statusOptions[1].status}">${statusOptions[1].statusFormatado}</option>
                    <option value="${statusOptions[2].status}">${statusOptions[2].statusFormatado}</option>
                    <option value="${statusOptions[3].status}">${statusOptions[3].statusFormatado}</option>
                </select>
            </div>
        </div>
        `

        divCard.innerHTML =
            `
            <div class="content-selected-header anim-scale-in anim-d1">
                <div class="selected-image anim-fade-up anim-d3">
                    <img id="poster-image-wishlist" src="${data[0].url_imagem}" alt="">
                </div>
                
                <div class="selected-card-information anim-fade-up anim-d3">
                    <h2>${data[0].titulo}</h2>
                    <div class="card-information">
                        <span>Categoria: ${data[0].nome_categoria}</span>
                        <span>Gênero: ${data[0].nome_genero}</span>
                        <span>Duração: ${horaFormatada}</span>
                        ${campoStatus}
                        <span>Cadastro: ${data[0].dia_criacao} de ${meses[data[0].mes_criacao -1]}, ${data[0].ano_criacao}</span>
                        <br>
                        <div class="status-row">
                            <span>Nota: </span>

                            <ul class="avaliacao">
                                <li class="star-icon" data-avaliacao="1"></li>
                                <li class="star-icon" data-avaliacao="2"></li>
                                <li class="star-icon" data-avaliacao="3"></li>
                                <li class="star-icon" data-avaliacao="4"></li>
                                <li class="star-icon" data-avaliacao="5"></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            ${campoResenha}
            `;

            aplicarClassificacaoSalva(data[0].classificacao);
            document.querySelector('.avaliacao').addEventListener('click', function(e) {
                if (!e.target.classList.contains('star-icon')) return;
                changeClassificacao(e, itemId);
            });
    })
}
