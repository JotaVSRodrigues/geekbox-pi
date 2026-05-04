var express = require("express");
var router = express.Router();

var estatisticaController = require("../controllers/estatisticaController");

// kpis
// horasSemanais
// horasPorCategoria
// metasVsConcluidos


// KPIS
// router.get("/kpi/concluidos", function (req, res) {
//     estatisticaController.buscarConcluidos(req, res);
// });

// router.get("/kpi/horas-totais", function (req, res) {
//     estatisticaController.buscarHorasTotais(req, res);
// });

// router.get("/kpi/horas-semanais", function (req, res) {
//     estatisticaController.buscarHorasSemanais(req, res);
// });

// router.get("/kpi/taxa-de-conclusao", function (req, res) {
//     estatisticaController.buscarTaxaDeConclusao(req, res);
// });


// GRAFICOS
router.get("/consumo-mensal/:id", function (req, res) {
    estatisticaController.consumoMensal(req, res);
});

router.get("/horas-por-categoria/:id", function (req, res) {
    estatisticaController.horasPorCategoria(req, res);
});

router.get("/metas-por-ano/:id", function (req, res) {
    estatisticaController.metasVsConcluidos(req, res);
});


// router.get("/grafico/frequencia-consumo", function (req, res) {
//     estatisticaController.buscarFrequenciaConsumo(req, res);
// });

module.exports = router;