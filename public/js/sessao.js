
document.addEventListener("DOMContentLoaded", function() {

    const usuarioId = sessionStorage.getItem("ID_USUARIO");

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
    
    
    let welcomeSubtitle = `${dias[diaSemana-1]}, ${diaMes} ${meses[mesAtual]} ${anoAtual} `

    const welcomeSub = document.getElementById("welcome-subtitle")
    welcomeSub.innerHTML = welcomeSubtitle

    const welcomeSubSemana = document.getElementById("h4-span")
    
    fetch(`/usuarios/buscar-semanas/${usuarioId}`)
    .then((resposta) => { return resposta.json() })
    .then((data) => {
        
        console.log(data, "dados do novo select")
        let semana = data[0].semanas
        
        welcomeSubSemana.innerHTML = `· Semana ${semana}`
        }    
    )

});

