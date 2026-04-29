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
    var nome = req.body.nome;

    if (nome)
}