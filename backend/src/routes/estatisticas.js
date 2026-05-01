var express = require("express");
var router = express.Router();

var estatisticaController = require("../controllers/estatisticaController");

router.get("/grafico/consumo-anual", function (req, res) {
    estatisticaController.buscarConsumoAnual(req, res);
});

router.get("/grafico/horas-por-midia", function (req, res) {
    estatisticaController.buscarHorasPorMidia(req, res);
});

router.get("/grafico/metas-por-ano", function (req, res) {
    estatisticaController.buscarMetasPorAno(req, res);
});

router.get("/grafico/frequencia-consumo", function (req, res) {
    estatisticaController.buscarFrequenciaConsumo(req, res);
});