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

module.exports = {
    consumoMensal, 
    horasPorCategoria,
    metasVsConcluidos

};