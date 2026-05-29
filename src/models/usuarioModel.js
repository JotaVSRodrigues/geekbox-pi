var database = require("../database/config");

function cadastrar(nome, email, senha, telefone) {
    var instrucaoSQL = `
        INSERT INTO usuario (nome, email, senha, telefone) VALUES
        ('${nome}', '${email}', '${senha}', '${telefone}');
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSQL);
    return database.executar(instrucaoSQL);
}


 function autenticar (email, senha) {
    var instrucaoSQL = `
        SELECT id, nome, email, senha, telefone, avatar_url
        FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSQL);
    return database.executar(instrucaoSQL);
 }

function buscarSemanas(usuarioId) {
    let instrucaoSQL = `
    select 
        timestampdiff(week, criado_em, curdate()) semanas
    from usuario
    where id = ${usuarioId};
    `
    return database.executar(instrucaoSQL);
}
 
module.exports = {
    autenticar,
    cadastrar,
    buscarSemanas
}