function registerItem() {
    var titulo = ipt_titulo.value
    var idCategoria = select_categoria.value
    var idGenero = select_genero.value
    var status = select_status.value
    var horas = ipt_horas.value
    var minutos = ipt_minutos.value
    var urlImagem = ipt_url_imagem.value

    console.log(ipt_titulo.value)
    console.log(idCategoria)
    console.log(idGenero)

    var horasTotais = horas + (minutos/60).toFixed(2)

    // if (!titulo || 
    //     !idCategoria || 
    //     !idGenero || 
    //     !status ||
    //     !horas ||
    //     !minutos ||
    //     titulo.trim().length === 0 ||
    //     idCategoria.trim().length === 0 ||
    //     idGenero.trim().length === 0 ||
    //     status.trim().length === 0 ||
    //     horas.trim().length === 0     
    // ) {
    //     alert(" Preencha todos os campos para cadastrar o item");
    //     // colocar mensagem amigavel para o usuario (preenchimento de todos os campos)
    //     return false;
    // }

    // enviando o valor da nova input

    fetch("/itens/cadastrar-item", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            tituloServer: titulo,
            categoriaIdServer: idCategoria,
            statusServer: status,
            horasServer: horasTotais,
            generoIdServer: idGenero
        }),
    }).then(function (resposta) {
        console.log("resposta: ", resposta);

        if(resposta.ok) {
            alert("Cadastro de item realizado com sucesso");

            setTimeout(() => {
                addItem();
                window.location.href = "../wishlist.html";
            }, "2000");
        } else {
            throw "Houve um erro ao realizar o cadastro de item!";
        }
    }).catch (function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        return false;
    });

}