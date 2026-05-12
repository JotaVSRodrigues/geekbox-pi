var express = require("express");
var router = express.Router();

var itemController = require("../controllers/itemController");

router.get("/buscar-generos", function (req, res) {
    itemController.buscarGeneros(req, res);
});

router.post("/cadastrar-item", function (req, res) {
    itemController.cadastrarItem(req, res);
});

module.exports = router;

