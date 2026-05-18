var itemModel = require("../models/itemModel");

function cadastrarItem(req, res) {
    const usuarioId = req.body.usuarioIdServer;
    const categoriaId = req.body.categoriaIdServer;
    const titulo = req.body.tituloServer;
    const status = req.body.statusServer;
    const horas = req.body.horasServer;
    const generoId = req.body.generoIdServer;

    itemModel.cadastrarItem(usuarioId, categoriaId, titulo, status, horas, generoId)
        .then(function(resposta) {
            res.status(200).json(resposta)
        }).catch(function(erro) {

            console.error("Erro no Item Model: ", erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    buscarGeneros,
    cadastrarItem,
    buscarItensWishlist,
    buscarItemSelecionado
};