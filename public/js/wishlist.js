let qtdItems = 0;
const fieldList = document.getElementById("field-list");
const modalItem = document.querySelector('.modal-container-item');
const modalMeta = document.querySelector('.modal-container-meta');

let genres = [];

async function carregarGeneros() {
    const resposta = await fetch(`/itens/buscar-generos`);
    genres = await resposta.json();
}

document.addEventListener("DOMContentLoaded", function() {
    updateDateSubtitle();
    carregarGeneros();

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

function addItem() {
    closeItemCard(modalItem);

    const newItem = document.createElement("div");
    newItem.setAttribute("id", "new_item" + qtdItems);
    newItem.classList.add("item-anim");

    const firstItem = fieldList.querySelector(".item");

    if (firstItem) {
        fieldList.insertBefore(newItem, firstItem.parentNode);
    } else {
        fieldList.appendChild(newItem);
    }

    /* titulo, status, horas, categoria, genero, cadastrado_em */

    

    document.getElementById("new_item" + qtdItems).innerHTML = `
        <div class="item">
            <div class="information">
                <h4 class="item-header">Devoradores de Estrelas</h4>
                <div class="information-subtitle">
                    <span id="span-concluido">CONCLUÍDO</span>
                    <span>· 2h36min ·</span>
                    <span>Sci-fi</span>
                </div>
            </div>
            <div class="right-information">
                <span class="right-information-date">23 dez</span>
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
    console.log(qtdItems);
}