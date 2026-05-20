var database = require("../database/config");

function cadastrarMeta(usuarioId, categoriaId, quantidade, ano) {

    var instrucaoSQL = `
        insert into meta (usuario_id, categoria_id, quantidade, ano) values
		(${usuarioId}, ${categoriaId}, ${quantidade}, ${ano});
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSQL);
    return database.executar(instrucaoSQL);
}

module.exports = {
    cadastrarMeta
};