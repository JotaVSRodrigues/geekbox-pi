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

router.put("/atualizar-resenha/:itemId", function(req, res) {
    itemController.updateResenha(req, res);
})

module.exports = router;

