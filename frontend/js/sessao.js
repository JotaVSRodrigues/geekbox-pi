
function validarSessao() {
    var nome = sessionStorage.NOME_USUARIO;
    var email = sessionStorage.EMAIL_USUARIO;
    var telefone = sessionStorage.TELEFONE_USUARIO;

    // mostrar nome do usuário na tela
    var b_usuario = document.getElementById("b_usuario");

    if (email != null && nome != null) {
        b_usuario.innerHTML = nome; 
    } else {
        window.location.href = "../login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location.href = "../login.html";
}