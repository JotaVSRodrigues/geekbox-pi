var usuarioModel = require("../models/usuarioModel");

function listar(req, res) {
    usuarioModel.listar().then(function(resultado) {
        // retorno para o front-end com uma resposta json de sucesso
        res.status(200).json(resultado);
    }).catch(function(erro) {
        res.status(500).json(erro.sqlMessage);
    })
}

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var telefone = req.body.telefoneServer;


    if (nome == undefined || email == undefined 
        || senha == undefined || telefone == undefined) {
        res.status(400).send("Algum dado está undefined!");
    }

    usuarioModel.cadastrar(nome, email, senha, telefone).then(function(resposta) {
        res.status(200).send("Usuário criado com sucesso");
    }).catch(function(erro) {
        res.status(500).json(erro.sqlMessage);
    })
}

module.exports = {
    listar, 
    cadastrar
}