
function registerUser() {
    let nomeUser = ipt_nome.value
    let sobrenomeUser = ipt_sobrenome.value
    let nomeCompletoUser = nomeUser + " " + sobrenomeUser

    let emailUser = ipt_email.value
    let senhaUser = ipt_senha.value
    let senhaUserConf = ipt_senha_conf.value
    let telefoneUser = ipt_telefone.value

    let erros = []

    if (!nomeUser || 
        !sobrenomeUser || 
        !telefoneUser || 
        nomeUser.trim().length === 0 ||
        sobrenomeUser.trim().length === 0 ||
        telefoneUser.trim().length === 0
    ) {
        alert(" Preencha todos os campos antes de prosseguir");
        return false;
    }

    if (!validarEmail(emailUser)) {
        alert("Email inválido ");
        return false;
    }

    if (validarSenha(senhaUser, senhaUserConf).length != 0) {
        validarSenha(senhaUser, senhaUserConf)
        alert("Senha inválida");
        return false;
    }

    if (telefoneUser.length != 11) {
        alert("Telefone inválido");
        return false;
    }

    // enviando o valor da nova input

fetch("/usuarios/cadastrar", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        nomeServer: nomeCompletoUser,
        emailServer: emailUser,
        senhaServer: senhaUser,
        telefoneServer: telefoneUser
    }),
}).then(function (resposta) {
    console.log("resposta: ", resposta);

    if(resposta.ok) {
        alert("Cadastro realizado com sucesso");

        setTimeout(() => {
            window.location.href = "index.html"
        }, "2000");
    } else {
        throw "Houve um erro ao realizar o cadastro!";
    }
}).catch (function (resposta) {
    console.log(`#ERRO: ${resposta}`);
});

return false;

}


function validarEmail (email) {
    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return regex.test(email)
}

function validarSenha (senha, senhaConfirmacao) {
    let erros = []

    if (senha.length < 8) {
        erros.push("Mínimo de 8 caracteres")
    }

    if (!/[A-Z]/.test(senha)) {
        erros.push("Pelo menos uma letra maiúscula")
    }

    if (!/[a-z]/.test(senha)) {
        erros.push("Pelo menos uma letra minúscula");
    }
    if (!/[0-9]/.test(senha)) {
        erros.push("Pelo menos um número");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(senha)) {
        erros.push("Pelo menos um caractere especial");
    }

    if (senha != senhaConfirmacao) {
        erros.push("As senhas não coincidem")
    }

    return erros;
}