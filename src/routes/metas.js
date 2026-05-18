var express = require("express");
var router = express.Router();

var itemController = require("../controllers/itemController");

router.get("/buscar-item/:itemId", function(req, res) {
    itemController.buscarItemSelecionado(req, res);
})

module.exports = router;
