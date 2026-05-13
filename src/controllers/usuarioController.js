var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    const email = req.body.emailServer;
    const senha = req.body.senhaServer;
    
    if (email == undefined) {
        return res.status(400).send("Seu email está undefined!");
    } 
    
    if (senha == undefined) {
        return res.status(400).send("Sua senha está indefinida!");
    } 

    usuarioModel.autenticar(email, senha)
        .then(
            function (resultadoAutenticar) {
                console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                if (resultadoAutenticar.length == 1) {
                    console.log(resultadoAutenticar);
                    return res.status(200).json(resultadoAutenticar[0]);
                } else if (resultadoAutenticar.length == 0) {
                    res.status(403).send("Email e/ou senha inválido(s)");
                    // colocar mensagem amigavel para o usuario
                } else {
                    res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var telefone = req.body.telefoneServer;

    
    console.log("NOME DA REQUISIÇÃO: ", req.body.nomeServer);

    if (nome == undefined || email == undefined 
        || senha == undefined || telefone == undefined) {
        res.status(400).send("Algum dado está undefined!");
    } else {
        usuarioModel.cadastrar(nome, email, senha, telefone).
            // ENTÃO
            then(function(resposta) {   
            res.status(200).send("Usuário criado com sucesso");
        }).catch(function(erro) {
            console.error("Erro no Usuario Model", erro)
            // colocar mensagem amigavel para o usuario (erro de duplicate entry para o email)

            res.status(500).json(erro.sqlMessage);
        }) 
    }
}

module.exports = {
    autenticar, 
    cadastrar
}