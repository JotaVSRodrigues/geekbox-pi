const database = require("../database/config");

function buscarGeneros() {
    let instrucao = `
        select * from genero;
    `;
    return database.executar(instrucao);
}

function cadastrarItem(usuarioId, categoriaId, titulo, status, horas, generoId, urlImagem) {

    let instrucaoSQL = `
        insert into item (usuario_id, categoria_id, titulo, status, horas, genero_id, url_imagem) values
        (${usuarioId}, ${categoriaId}, '${titulo}', '${status}', ${horas}, ${generoId}, '${urlImagem}');
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSQL);
    return database.executar(instrucaoSQL);
}

function buscarItensWishlist(usuarioId) {
    let instrucaoSQL = `
    select 
        i.id,
        i.titulo, 
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
        where i.usuario_id = ${usuarioId}
            and i.status != 'concluido';
    `;

    return database.executar(instrucaoSQL);
}

function buscarItemSelecionado(itemId) {
    let instrucaoSQL = `
    select i.titulo, 
		i.url_imagem, 
        i.status,
        i.horas,
        i.classificacao,
        c.nome_categoria, 
        g.nome nome_genero, 
        day(i.criado_em) dia_criacao, 
        month(i.criado_em) mes_criacao, 
        year(i.criado_em) ano_criacao,
        i.resenha
    from item i 
    join categoria c on i.categoria_id = c.id_categoria
    join genero g on g.id = i.genero_id
        where i.id = ${itemId};
    `

    return database.executar(instrucaoSQL);
}

function buscarItensTimeline(usuarioId) {
    let instrucaoSQL = `
    select 
        i.id,
        i.titulo, 
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
        where i.usuario_id = ${usuarioId}
            and i.status = 'concluido';
    `;

    return database.executar(instrucaoSQL);
}

function updateResenha(resenha, itemId) {
    let instrucaoSQL = `
        update item 
        set resenha = '${resenha}'
        where id = ${itemId};
    `;

    return database.executar(instrucaoSQL);
}

function updateStatus(status, itemId) {
    let instrucaoSQL = `
        update item 
        set status = '${status}'        
        where id = ${itemId};
    `;

    return database.executar(instrucaoSQL);
}

function updateStatusConcluido(status, itemId) {
    let instrucaoSQL = `
        update item 
        set status = '${status}',
        concluido_em = current_date()
        where id = ${itemId};
    `;

    return database.executar(instrucaoSQL);
}

function updateClassificacao(classificacao, itemId) {
    let instrucaoSQL = `
        update item 
        set classificacao = '${classificacao}'
        where id = ${itemId};
    `;

    return database.executar(instrucaoSQL);
}


function deleteItem(itemId) {
    let instrucaoSQL = `
        delete from item
        where id = ${itemId};
    `;

    return database.executar(instrucaoSQL)
}


function buscarItensHomeProgresso(usuarioId) {
    let instrucaoSQL = `
        select 
            i.id,
            i.titulo, 
            i.status,
            i.horas,
            c.nome_categoria,
            g.nome nome_genero,
            day(i.criado_em) dia_criacao,
            month(i.criado_em) mes_criacao,
            year(i.criado_em) ano_criacao,
            i.url_imagem 
        from item i 
        join categoria c on i.categoria_id = c.id_categoria
        join genero g on g.id = i.genero_id
            where i.usuario_id = ${usuarioId}
            and i.status = 'em_progresso'
        order by atualizado_em desc
        limit 3;
    `;
    
    return database.executar(instrucaoSQL)
}

function buscarItensHomeConcluido(usuarioId) {
    let instrucaoSQL = `
        select 
            i.id,
            i.titulo, 
            i.status,
            i.horas,
            c.nome_categoria,
            g.nome nome_genero,
            day(i.criado_em) dia_criacao,
            month(i.criado_em) mes_criacao,
            year(i.criado_em) ano_criacao,
            i.url_imagem
        from item i 
        join categoria c on i.categoria_id = c.id_categoria
        join genero g on g.id = i.genero_id
            where i.usuario_id = ${usuarioId}
            and i.status = 'concluido'
        order by atualizado_em desc
        limit 3;
    `;
    
    return database.executar(instrucaoSQL)
}

module.exports = {
    buscarGeneros,
    cadastrarItem,
    buscarItensWishlist,
    buscarItensTimeline,
    buscarItemSelecionado,
    updateResenha,
    updateStatus,
    updateStatusConcluido,
    updateClassificacao,
    deleteItem,
    buscarItensHomeProgresso,
    buscarItensHomeConcluido
};