
const horas = new Date();
const horaAtual = horas.getHours();
let mensagem = "";

if (horaAtual < 12) {
    mensagem = "Bom dia, ";
} else if (horaAtual < 18) {
    mensagem = "Boa tarde, ";
} else {
    mensagem = "Boa noite, ";
}

document.getElementById("mensagem-hora").innerText = mensagem;