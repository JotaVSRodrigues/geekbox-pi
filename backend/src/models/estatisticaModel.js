var database = require("../database/config");

// kpis
// horasSemanais
// horasPorCategoria
// metasVsConcluidos

function consumoMensal(usuarioId) {
    var instrucao = `
        SELECT MONTH(i.concluido_em) AS mes,
            c.nome_categoria, 
            COUNT(*) AS total   
        FROM item i 
        JOIN categoria c ON c.id_categoria = i.categoria_id
        WHERE i.usuario_id = ${usuarioId}
            AND i.status = 'concluido'
            AND YEAR(i.concluido_em) = YEAR(NOW())
        GROUP BY mes, c.nome_categoria
        ORDER BY mes
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

module.exports = {
    consumoMensal,
    horasPorCategoria,
    metasVsConcluidos
};