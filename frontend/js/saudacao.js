
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

var nomeUsuario = sessionStorage.getItem("NOME_USUARIO");
var elementoNome = document.getElementById("h1-span");

if (nomeUsuario && elementoNome) {
    var primeiroNome = nomeUsuario.split(" ")[0];
    elementoNome.innerText = primeiroNome + "!";
}