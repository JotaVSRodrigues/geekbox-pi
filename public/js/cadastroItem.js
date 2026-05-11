function registerUser() {
    var titulo = ipt_titulo.value
    var idCategoria = select_categoria.value
    var idGenero = select_genero.value
    var status = select_status.value
    var horas = ipt_horas.value
    var minutos = ipt_minutos.value
    var urlImagem = ipt_url_imagem.value

    var horasTotais = horas + (minutos/60)

    if (!titulo || 
        !idCategoria || 
        !idGenero || 
        !status ||
        !horas ||
        !minutos ||
        titulo.trim().length === 0 ||
        idCategoria.trim().length === 0 ||
        idGenero.trim().length === 0 ||
        status.trim().length === 0 ||
        horas.trim().length === 0 ||
        minutos.trim().length === 0
    ) {
        alert(" Preencha todos os campos para cadastrar o item");
        // colocar mensagem amigavel para o usuario (preenchimento de todos os campos)
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
                window.location.href = "../index.html";
            }, "2000");
        } else {
            throw "Houve um erro ao realizar o cadastro!";
        }
    }).catch (function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

    return false;

}