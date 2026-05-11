var express = require("express");
var router = express.Router();

var itemController = require("../controllers/itemController");

router.get("/buscar-generos", function (req, res) {
    itemController.buscarGeneros(req, res);
});

// router.post("/cadastrar-item", function (req, res) {
//     usuarioController.cadastrar(req, res);
// });

module.exports = router;

