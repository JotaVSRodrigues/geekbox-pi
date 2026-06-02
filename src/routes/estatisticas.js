var express = require("express");
var router = express.Router();

var estatisticaController = require("../controllers/estatisticaController");


router.get("/consumo-mensal/:id", function (req, res) {
    estatisticaController.consumoMensal(req, res);
});

router.get("/horas-por-categoria/:id", function (req, res) {
    estatisticaController.horasPorCategoria(req, res);
});

router.get("/metas-por-ano/:id", function (req, res) {
    estatisticaController.metasVsConcluidos(req, res);
});

router.get("/frequencia-consumo/:id", function (req, res) {
    estatisticaController.frequenciaDeConsumo(req, res);
});

router.get("/kpi-concluidos/:id", function (req, res) {
    estatisticaController.kpiConcluidos(req, res);
});

router.get("/kpi-horas-totais/:id", function (req, res) {
    estatisticaController.kpiHorasTotais(req, res);
});

router.get("/kpi-horas-semanais/:id", function (req, res) {
    estatisticaController.kpiHorasSemanais(req, res);
});

router.get("/kpi-taxa-conclusao/:id", function (req, res) {
    estatisticaController.kpiTaxaConclusao(req, res);
});


module.exports = router;


