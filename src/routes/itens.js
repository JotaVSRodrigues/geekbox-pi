var express = require("express");
var router = express.Router();

var itemController = require("../controllers/itemController");

router.get("/buscar-generos", function (req, res) {
    itemController.buscarGeneros(req, res);
});

router.post("/cadastrar-item", function (req, res) {
    itemController.cadastrarItem(req, res);
});

router.get("/buscar-wishlist/:id", function(req, res) {
    itemController.buscarItensWishlist(req, res);
})

router.get("/buscar-timeline/:id", function(req, res) {
    itemController.buscarItensTimeline(req, res);
})

router.get("/buscar-item/:itemId", function(req, res) {
    itemController.buscarItemSelecionado(req, res);
})

router.put("/atualizar-resenha", function(req, res) {
    itemController.updateResenha(req, res);
})

router.put("/atualizar-status", function(req, res) {
    itemController.updateStatus(req, res);
})

router.put("/atualizar-classificacao", function(req, res) {
    itemController.updateClassificacao(req, res);
})

router.delete("/excluir/:itemId", function(req, res) {
    itemController.deleteItem(req, res);
})

router.get("/buscar-item-progresso/:id", function(req, res) {
    itemController.buscarItensHomeProgresso(req, res);
})

router.get("/buscar-item-concluido/:id", function(req, res) {
    itemController.buscarItensHomeConcluido(req, res);
})

module.exports = router;

