var database = require("../database/config");

function cadastrar(nome, email, senha, telefone) {
     console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha, telefone);

    var instrucaoSQL = `
        INSERT INTO usuario (nome, email, senha, telefone) VALUES
        ('${nome}', '${email}', '${senha}', '${telefone}');
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSQL);
    return database.executar(instrucaoSQL);
}


 function autenticar (email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha);

    var instrucaoSQL = `
        SELECT id, nome, email, senha, telefone, avatar_url
        FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSQL);
    return database.executar(instrucaoSQL);
 }

module.exports = {
    autenticar,
    cadastrar
}