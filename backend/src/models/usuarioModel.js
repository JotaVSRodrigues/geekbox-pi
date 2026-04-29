var database = require("../database/config");

function cadastrar(nome, email, senha, telefone) {
    console.log("ACESSEI O USUARIO MODEL - CADASTRAR");

    var instrucaoSQL = `
        INSERT INTO usuario (nome, email, senha_hash, telefone) VALUES
        ('${nome}', '${email}', '${senha}', '${telefone}');
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSQL);
    return database.executar(instrucaoSQL);
}


 function autenticar (email, senha) {
    console.log("ACESSEI O USUARIO MODEL - AUTENTICAR");
    var instrucaoSQL = `
        SELECT id, nome, email, senha_hash, telefone, avatar_url
        FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSQL);
    return database.executar(instrucaoSQL);
 }

module.exports = {
    autenticar,
    cadastrar
}