var database = require("../database/config");

// kpis
// horasSemanais
// horasPorCategoria
// metasVsConcluidos

function consumoMensal(usuarioId) {
    var instrucao = `
        select month(i.concluido_em) mes,
            c.nome_categoria, 
            count(*) total   
        from item i 
        join categoria c on c.id_categoria = i.categoria_id
        where i.usuario_id = ${usuarioId}
            and i.status = 'concluido'
            and year(i.concluido_em) = year(now())
        group by mes, c.nome_categoria
        order by mes;
    `;
    return database.executar(instrucao);
}

function horasPorCategoria(usuarioId) {
    var instrucao = `
        select 
            c.nome_categoria,
            round(sum(i.horas), 0) total_horas
        from item i
        join categoria c on i.categoria_id = c.id_categoria
        where i.usuario_id = ${usuarioId}
        group by c.nome_categoria
        order by total_horas desc;
    `;

    return database.executar(instrucao);    
}

function metasVsConcluidos(usuarioId) {
    var instrucao = `
        select 
        c.nome_categoria,
        m.quantidade quantidade_meta,
        count(*) as quantidade_concluido  
        from meta m
        join categoria c on m.categoria_id = c.id_categoria
        join item i on i.categoria_id = c.id_categoria
        where m.usuario_id = ${usuarioId}
            and i.status = 'concluido'
            and year(i.concluido_em) = year(now())
            and m.ano = year(now())
        group by c.nome_categoria, quantidade_meta
        order by year(now());
    `;

    return database.executar(instrucao);
}

function kpiConcluidos(usuarioId) {
    var instrucao = `
        select count(*) quantidade_concluido   
        from item i 
        where i.usuario_id = ${usuarioId}
            and i.status = 'concluido'
        group by year(now());
    `;

    return database.executar(instrucao);
}

function kpiHorasTotais(usuarioId) {
    var instrucao = `
        select 
            concat(round(sum(horas), 0), 'h' )total_horas
        from item 
        where usuario_id = ${usuarioId}
            and year(concluido_em) = year(now());
    `;

    return database.executar(instrucao);
}

function kpiHorasSemanais(usuarioId) {
    var instrucao = `
        select 
        concat(
            round(sum(horas) / (round((dayofyear(curdate()) / 7), 0)), 0), 'h' ) 
            horas_semanais
        from item 
        where usuario_id = ${usuarioId}
            and year(concluido_em) = year(now());
    `;

    return database.executar(instrucao);
}

function kpiTaxaConclusao(usuarioId) {
    var instrucao = `
        select 
        concat(round((count(*) / (
            select count(*)
            from item
            where usuario_id = ${usuarioId}
            group by year(now()) ) * 100), 0), '%') taxa_concluido
        from item 
        where usuario_id = ${usuarioId}
            and status = 'concluido'
        group by year(now());
    `;

    return database.executar(instrucao);
}

function frequenciaDeConsumo(usuarioId) {
    var instrucao = `
    select date(concluido_em) as dia,
	count(*) as total
    from item
	where usuario_id = ${usuarioId}
		and year(concluido_em) = year(now())
        and status = 'concluido'
    group by dia
    order by dia;
    `;

    return database.executar(instrucao); 
}

module.exports = {
    consumoMensal,
    horasPorCategoria,
    metasVsConcluidos,
    kpiConcluidos,
    kpiHorasTotais,
    kpiHorasSemanais,
    kpiTaxaConclusao,
    frequenciaDeConsumo
};