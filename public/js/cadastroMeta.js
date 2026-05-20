function registerMeta() {
    console.log(usuarioId)

    var idCategoria = select_categoria_meta.value
    var anoMeta = ipt_ano_meta.value
    var quantidade = ipt_quantidade.value

    if (!anoMeta || 
        !idCategoria || 
        !quantidade || 
       
        anoMeta === 0 ||
        idCategoria === 0 ||
        quantidade === 0  
    ) {
        alert("Preencha todos os campos para cadastrar a meta");
        // colocar mensagem amigavel para o usuario (preenchimento de todos os campos)
        return false;
    }

    // enviando o valor da nova input

    fetch("/metas/cadastrar-meta", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            usuarioIdServer: usuarioId,
            categoriaIdServer: idCategoria,
            quantidadeServer: quantidade,
            anoServer: anoMeta
        }),
    }).then(function (resposta) {
        console.log("resposta: ", resposta);

        if(resposta.ok) {
            alert("Cadastro de meta realizado com sucesso");
            setTimeout(() => {
                closeItemCard(modalMeta);
            }, "600");
        } else {
            throw "Houve um erro ao realizar o cadastro de item!";
        }
    }).catch (function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        return false;
    });

}
