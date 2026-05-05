var express = require("express");
var router = express.Router();

var itemController = require("../controllers/itemController");

router.post("/item/cadastrar", function (req, res) {
    itemController.cadastrar(req, res);
});

router.get("/item/buscar", function (req, res) {
    itemController.buscar(req, res);
});

module.exports = router;

