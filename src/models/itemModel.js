var database = require("../database/config");

function buscarGeneros() {
    var instrucao = `
        select * from genero;
    `;
    return database.executar(instrucao);
}

function cadastrar(titulo, idCategoria, idGenero, status, ) {

    var instrucaoSQL = `
        INSERT INTO usuario (nome, email, senha, telefone) VALUES
        ('${nome}', '${email}', '${senha}', '${telefone}');
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSQL);
    return database.executar(instrucaoSQL);
}

module.exports = {
    buscarGeneros
};