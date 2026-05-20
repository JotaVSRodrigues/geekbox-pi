var express = require("express");
var router = express.Router();

var metaController = require("../controllers/metaController");

router.post("/cadastrar-meta", function(req, res) {
    metaController.cadastrarMeta(req, res);
})

module.exports = router;
