let qtdItems = 0
// let qtdSubtitles = 0
const fieldList = document.getElementById("field-list");
const modalItem = document.querySelector('.modal-container-item');
const modalMeta = document.querySelector('.modal-container-meta');
const selectCategoria = document.getElementById("select_categoria");
const selectGenero = document.getElementById("select_genero");


document.addEventListener("DOMContentLoaded", function() {
    updateDateSubtitle();
});

function calculateMonth() {
    const date = new Date();
    const month = date.getMonth();

    const months = [
        "JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", 
        "MAIO", "JUNHO", "JULHO", "AGOSTO", 
        "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"];

    for (let i = 0; i < months.length; i++) {
        if (i == month) {
            return months[i]; 
        }
    }
}

function updateDateSubtitle() {
    const date = new Date();
    const month = calculateMonth();
    const year = date.getFullYear();

    if(document.getElementById("id", "subtitle" + month + year) != null) {
        return;
    }

    const newSubtitle = document.createElement("div");
    newSubtitle.setAttribute("id", "subtitle" + month + year);

    fieldList.appendChild(newSubtitle);
    document.getElementById("subtitle" + month + year).innerHTML = 
        `
        <div class="month-date">
            <span>${month} ${year}</span>
        </div>
        `;
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
    // essa funcao fara um insert no banco 
    // essa funcao fara um select no banco e exibira as divs dinamicamente
    /* 
        exibir div, por exemplo, com um array de objetos (json puxado do banco) 
        e fazendo appendChild ou innerHTMl, junto de um arrayObjetos.forEach(() => {
            div.innerHTML ou div.appendChild()+
            })
    */
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
    
    document.getElementById("new_item" + qtdItems).innerHTML = 
    `
        <div class="item">
            <div class="information">
                <h4 class="item-header">Devoradores de Estrelas</h4> 
                <div class="information-subtitle">
                    <span id="span-concluido">CONCLUÍDO</span>
                    <span>· 2h36min ·</span>
                    <span">Cinema</span>
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

const genres = [
    { id: 1, nome: "RPG", categoria: 1 },
    { id: 2, nome: "FPS", categoria: 1 },

    { id: 3, nome: "Fantasia", categoria: 2 },
    { id: 4, nome: "Drama", categoria: 2 },

    { id: 5, nome: "Ação", categoria: 3 },
    { id: 6, nome: "Terror", categoria: 3 },

    { id: 7, nome: "Shounen", categoria: 5 },
    { id: 8, nome: "Seinen", categoria: 5 },

    { id: 9, nome: "Rock", categoria: 7 },
    { id: 10, nome: "Jazz", categoria: 7 },
];

selectCategoria.addEventListener("change", () => {
    const categoriaSelecionada = 
})