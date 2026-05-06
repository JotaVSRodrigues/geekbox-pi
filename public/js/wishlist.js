let qtdItems = 0
// let qtdSubtitles = 0
const fieldList = document.getElementById("field-list");
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

function addItem() {    
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