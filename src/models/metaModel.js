var database = require("../database/config");

function cadastrarItem(usuarioId, categoriaId, titulo, status, horas, generoId) {

    var instrucaoSQL = `
        insert into item (usuario_id, categoria_id, titulo, status, horas, genero_id) values
        (${usuarioId}, ${categoriaId}, '${titulo}', '${status}', ${horas}, ${generoId});
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSQL);
    return database.executar(instrucaoSQL);
}

module.exports = {
    buscarGeneros,
    cadastrarItem,
    buscarItensWishlist,
    buscarItemSelecionado
};