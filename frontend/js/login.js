
function loginUser() {
    let emailTemp = "joao@gmail.com"
    let senhaTemp = "12345"

    let emailLogin = ipt_email_login.value
    let senhaLogin = ipt_senha_login.value 


    if (emailLogin == "" || senhaLogin == "") {
        alert("Há algum campo vazio. Preencha para prosseguir")
        return
    }

    if (senhaLogin != senhaTemp || emailLogin != emailTemp) {
        alert("Email ou senha não correspondem")
        return
    } else {
        window.location.href = "index.html";
    }
}

function registerUser() {
    let nomeUser = ipt_nome.value
    let sobrenomeUser = ipt_sobrenome.value
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
        erros.push(" Preencha todos os campos antes de prosseguir")
    }

    if (!validarEmail(emailUser)) {
        erros.push(" Email inválido ")
    }

    if (validarSenha(senhaUser, senhaUserConf).length != 0) {
        validarSenha(senhaUser, senhaUserConf)
        erros.push(" Senha inválida ")
    }

    if (telefoneUser.length != 11) {
        erros.push(" Telefone inválido")
    }

    if (erros.length == 0) {
        alert("Usuário cadastrado com sucesso")
        window.location.href = "index.html"
    } else {
        alert(erros)
        return
    }
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