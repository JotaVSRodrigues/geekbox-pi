var estatisticaModel = require("../models/estatisticaModel");

// kpis
// horasSemanais
// horasPorCategoria
// metasVsConcluidos



function consumoMensal(req, res) {
    var usuarioId = req.params.id; 
    
    
    estatisticaModel.consumoMensal(usuarioId)
        .then(function(resultado) {
            res.status(200).json(resultado);
        })
        .catch(function(erro) {
            res.status(500).json(erro.sqlMessage);
        });
}

function horasPorCategoria(req, res) {
    var usuarioId = req.params.id;

    estatisticaModel.horasPorCategoria(usuarioId)
        .then(function(resultado) {
            res.status(200).json(resultado);
        })
        .catch(function(erro) {
            res.status(500).json(erro.sqlMessage);
        })
}

function metasVsConcluidos(req, res) {
    var usuarioId = req.params.id;

    estatisticaModel.metasVsConcluidos(usuarioId)
        .then(function(resultado) {
            res.status(200).json(resultado);
        })
        .catch(function(erro) {
            res.status(500).json(erro.sqlMessage);
        })
}

function kpiConcluidos(req, res) {
    var usuarioId = req.params.id;

    estatisticaModel.kpiConcluidos(usuarioId)
        .then(function(resultado) {
            res.status(200).json(resultado);
        })
        .catch(function(erro) {
            res.status(500).json(erro.sqlMessage);
        })
}

function kpiHorasTotais(req, res) {
    var usuarioId = req.params.id;

    estatisticaModel.kpiHorasTotais(usuarioId)
        .then(function(resultado) {
            res.status(200).json(resultado);
        })
        .catch(function(erro) {
            res.status(500).json(erro.sqlMessage);
        })
}


function kpiHorasSemanais(req, res) {
    var usuarioId = req.params.id;

    estatisticaModel.kpiHorasSemanais(usuarioId)
        .then(function(resultado) {
            res.status(200).json(resultado);
        })
        .catch(function(erro) {
            res.status(500).json(erro.sqlMessage);
        })
}

function kpiTaxaConclusao(req, res) {
    var usuarioId = req.params.id;

    estatisticaModel.kpiTaxaConclusao(usuarioId)
        .then(function(resultado) {
            res.status(200).json(resultado);
        })
        .catch(function(erro) {
            res.status(500).json(erro.sqlMessage);
        })
}

function frequenciaDeConsumo(req, res) {
    var usuarioId = req.params.id;

    estatisticaModel.frequenciaDeConsumo(usuarioId)
        .then(function(resultado) {
            res.status(200).json(resultado);
        })
        .catch(function(erro) {
            res.status(500).json(erro.sqlMessage);
        })
}

module.exports = {
    consumoMensal, 
    horasPorCategoria,
    metasVsConcluidos,
    kpiConcluidos,
    kpiHorasTotais,
    kpiHorasSemanais,
    kpiTaxaConclusao,
    frequenciaDeConsumo
};