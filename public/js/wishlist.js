const { elements } = require("chart.js");

let qtdItems = 0;
const fieldList = document.getElementById("field-list");
const modalItem = document.querySelector('.modal-container-item');
const modalMeta = document.querySelector('.modal-container-meta');
// const divItem = document.querySelector('.item');

let genres = [];

async function carregarGeneros() {
    const resposta = await fetch(`/itens/buscar-generos`);
    genres = await resposta.json();
}

document.addEventListener("DOMContentLoaded", function() {
    updateDateSubtitle();
    carregarGeneros();
    carregarItens();

    const categorySelect = document.getElementById("select_categoria");
    const genreSelect = document.getElementById("select_genero");

    categorySelect.addEventListener("change", () => {
        const selectedCategory = categorySelect.value;

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

function updateDateSubtitle() {
    const date = new Date();
    const month = calculateMonth();
    const year = date.getFullYear();

    if (document.getElementById("subtitle" + month + year) != null) {
        return;
    }

    const newSubtitle = document.createElement("div");
    newSubtitle.setAttribute("id", "subtitle" + month + year);
    newSubtitle.innerHTML = `
        <div class="month-date">
            <span>${month} ${year}</span>
        </div>
    `;

    fieldList.appendChild(newSubtitle);
}

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
       
        console.log(data);
        updateDateSubtitle();
        
        
        /* titulo, status, horas, categoria, genero, cadastrado_em */
        
        
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
                <div class="item" >
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
                        <button class="elipse-btn">
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
    })

}

// divItem.addEventListener('click', () => {
//     const divId = div.getAtribute('data-json');
//     console.log(divId);
// })

// function acessarItem() {
//     // let idItem = 

//     //   {
//     // id: 186,
//     // titulo: 'Human Nature',
//     // status: 'wishlist',
//     // horas: '0.1',
//     // nome_categoria: 'musica',
//     // nome_genero: 'Pop',
//     // dia_criacao: 13,
//     // mes_criacao: 5
//     //   }
// }

