let qtdItems = 0
// let qtdSubtitles = 0
const fieldList = document.getElementById("field-list");
const modal = document.querySelector('.modal-container');
const body = document.getElementById("wishlist-body");
// const dateSubtitle = document.getElementById("date-subtitle");

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

function createItemCard() {
    modal.classList.remove("closing");
    modal.classList.add("active");
    // chamar addItem()
}

function closeItemCard() {
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