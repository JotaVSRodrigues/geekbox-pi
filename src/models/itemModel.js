var database = require("../database/config");

function buscarGeneros() {
    var instrucao = `
        select * from genero;
    `;
    return database.executar(instrucao);
}

function cadastrarItem(usuarioId, categoriaId, titulo, status, horas, generoId, urlImagem) {

    var instrucaoSQL = `
        insert into item (usuario_id, categoria_id, titulo, status, horas, genero_id, url_imagem) values
        (${usuarioId}, ${categoriaId}, '${titulo}', '${status}', ${horas}, ${generoId}, '${urlImagem}');
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSQL);
    return database.executar(instrucaoSQL);
}

function buscarItensWishlist(usuarioId) {
    var instrucaoSQL = `
    select 
        i.id,
        i.titulo, 
        i.status,
        i.horas,
        c.nome_categoria,
        g.nome nome_genero,
        day(i.criado_em) dia_criacao,
        month(i.criado_em) mes_criacao
    from item i 
    join categoria c on i.categoria_id = c.id_categoria
    join genero g on g.id = i.genero_id
        where i.usuario_id = ${usuarioId}
            and i.status != 'concluido';
    `;

    return database.executar(instrucaoSQL);
}

function buscarItemSelecionado(itemId) {
    var instrucaoSQL = `
    select i.titulo, 
		i.url_imagem, 
        i.status,
        i.horas,
        c.nome_categoria, 
        g.nome nome_genero, 
        day(i.criado_em) dia_criacao, 
        month(i.criado_em) mes_criacao, 
        year(i.criado_em) ano_criacao
    from item i 
    join categoria c on i.categoria_id = c.id_categoria
    join genero g on g.id = i.genero_id
        where i.id = ${itemId};
    `

    return database.executar(instrucaoSQL);
}

function buscarItensTimeline(usuarioId) {
    var instrucaoSQL = `
    select 
        i.id,
        i.titulo, 
        i.status,
        i.horas,
        c.nome_categoria,
        g.nome nome_genero,
        day(i.criado_em) dia_criacao,
        month(i.criado_em) mes_criacao
    from item i 
    join categoria c on i.categoria_id = c.id_categoria
    join genero g on g.id = i.genero_id
        where i.usuario_id = ${usuarioId}
            and i.status = 'concluido';
    `;

    return database.executar(instrucaoSQL);
}



module.exports = {
    buscarGeneros,
    cadastrarItem,
    buscarItensWishlist,
    buscarItensTimeline,
    buscarItemSelecionado,
};