
document.addEventListener("DOMContentLoaded", function() {
    
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
    } else if (elementoNome) {
        elementoNome.innerText = "visitante!";
    }
    

    const diaSemana = horas.getDay();
    const diaMes = horas.getDate();
    const mesAtual = horas.getMonth();
    const anoAtual = horas.getFullYear();

    const dias = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"]    
    const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    
    let welcomeSubtitle = `${dias[diaSemana]}, ${diaMes} ${meses[mesAtual]} ${anoAtual}`
    
    const welcomeSub = document.getElementById("welcome-subtitle")
    welcomeSub.innerHTML = welcomeSubtitle
    
    // fetch()

    // Segunda, 22 Abr 2026  ·  Semana 17

});

// function validarSessao() {
//     var nome = sessionStorage.NOME_USUARIO;
//     var email = sessionStorage.EMAIL_USUARIO;
//     var telefone = sessionStorage.TELEFONE_USUARIO;

//     // mostrar nome do usuário na tela
//     // var b_usuario = document.getElementById("b_usuario");

//     if (email != null && nome != null) {
//         // b_usuario.innerHTML = nome; 
//     } else {
//         window.location.href = "../login.html";
//     }
// }

// function limparSessao() {
//     sessionStorage.clear();
//     window.location.href = "../login.html";
// }

