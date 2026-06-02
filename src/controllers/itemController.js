var itemModel = require("../models/itemModel");

function buscarGeneros(req, res) {  
    itemModel.buscarGeneros()
        .then(function(resposta) {
            res.status(200).json(resposta);
        })
        .catch(function(erro) {
            res.status(500).json(erro.sqlMessage);
        });
}

function cadastrarItem(req, res) {
    const usuarioId = req.body.usuarioIdServer;
    const categoriaId = req.body.categoriaIdServer;
    const titulo = req.body.tituloServer;
    const status = req.body.statusServer;
    const horas = req.body.horasServer;
    const generoId = req.body.generoIdServer;
    const urlImagem = req.body.urlImagemServer;

    itemModel.cadastrarItem(usuarioId, categoriaId, titulo, status, horas, generoId, urlImagem)
        .then(function(resposta) {
            res.status(200).json(resposta)
        }).catch(function(erro) {

            console.error("Erro no Item Model: ", erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarItensWishlist(req, res) {
    const usuarioId = req.params.id;
    const categoriaId = req.params.categoria
    // const status = req.params.status
    // , categoriaId, status
    console.log(usuarioId)

    itemModel.buscarItensWishlist(usuarioId)
        .then((resposta) => {
            res.status(200).json(resposta)
        }).catch((erro) => {
            res.status(500).json(erro.sqlMessage)
        })
}

function buscarItensTimeline(req, res) {
    const usuarioId = req.params.id;
    console.log(usuarioId)

    itemModel.buscarItensTimeline(usuarioId)
        .then((resposta) => {
            res.status(200).json(resposta)
        }).catch((erro) => {
            res.status(500).json(erro.sqlMessage)
        })
}

function buscarItemSelecionado(req, res) {
    const itemId = req.params.itemId;
    console.log("ITEM ID NO ITEM CONTROLLR: ", itemId)

    itemModel.buscarItemSelecionado(itemId)
        .then((resposta) => {
            res.status(200).json(resposta)
        }).catch((erro) => {
            res.status(500).json(erro.sqlMessage)
        })
}

function updateResenha(req, res) {
    const resenha = req.body.resenhaServer;
    const itemId = req.body.itemIdServer;
    console.log("ITEM ID NO ITEM CONTROLLER: ", itemId)

    itemModel.updateResenha(resenha, itemId)
        .then((resposta) => {
            res.status(200).json(resposta)
        }).catch((erro) => {
            res.status(500).json(erro.sqlMessage)
        })
}

function updateStatus(req, res) {
    const status = req.body.statusServer;
    const itemId = req.body.itemIdServer;

    if (status === 'concluido') {
        itemModel.updateStatusConcluido(status, itemId)
            .then((resposta) => {
                res.status(200).json(resposta)
            }).catch((erro) => {
                res.status(500).json(erro.sqlMessage)
            })

    return 
    }
    console.log("ITEM ID NO ITEM CONTROLLER: ", itemId)

    itemModel.updateStatus(status, itemId)
        .then((resposta) => {
            res.status(200).json(resposta)
        }).catch((erro) => {
            res.status(500).json(erro.sqlMessage)
        })
}

function updateClassificacao(req, res) {
    const classificacao = req.body.classificacaoServer;
    const itemId = req.body.itemIdServer;
    console.log("ITEM ID NO ITEM CONTROLLER: ", itemId)

    itemModel.updateClassificacao(classificacao, itemId)
        .then((resposta) => {
            res.status(200).json(resposta)
        }).catch((erro) => {
            res.status(500).json(erro.sqlMessage)
        })
}

function deleteItem(req, res) {
    const itemId = req.params.itemId;

    itemModel.deleteItem(itemId)
        .then((resposta) => {
            res.status(200).json(resposta)
        }).catch((erro) => {
            res.status(500).json(erro.sqlMessage)
        })
}

function buscarItensHomeProgresso(req, res) {
    const usuarioId = req.params.id
    console.log(usuarioId)

    itemModel.buscarItensHomeProgresso(usuarioId)
        .then((resposta) => {
            res.status(200).json(resposta)
        }).catch((erro) => {
            res.status(500).json(erro.sqlMessage)
        })
}

function buscarItensHomeConcluido(req, res) {
    const usuarioId = req.params.id;
    console.log(usuarioId)

    itemModel.buscarItensHomeConcluido(usuarioId)
        .then((resposta) => {
            res.status(200).json(resposta)
        }).catch((erro) => {
            res.status(500).json(erro.sqlMessage)
        })
}

module.exports = {
    buscarGeneros,
    cadastrarItem,
    buscarItensWishlist,
    buscarItensTimeline,
    buscarItemSelecionado,
    updateResenha,
    updateStatus,
    updateClassificacao,
    deleteItem,
    buscarItensHomeProgresso,
    buscarItensHomeConcluido
};