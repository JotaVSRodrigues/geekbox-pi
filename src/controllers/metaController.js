var metaModel = require("../models/metaModel");

function cadastrarMeta(req, res) {
    const usuarioId = req.body.usuarioIdServer;
    const categoriaId = req.body.categoriaIdServer;
    const quantidade = req.body.quantidadeServer;
    const ano = req.body.anoServer;
   

    metaModel.cadastrarMeta(usuarioId, categoriaId, quantidade, ano)
        .then(function(resposta) {
            res.status(200).json(resposta)
        }).catch(function(erro) {

            console.error("Erro no Item Model: ", erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    cadastrarMeta
};