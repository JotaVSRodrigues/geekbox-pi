var itemModel = require("../models/itemModel");

function buscarGeneros(req, res) {  
    itemModel.buscarGeneros()
        .then(function(resultado) {
            res.status(200).json(resultado);
        })
        .catch(function(erro) {
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    buscarGeneros
};