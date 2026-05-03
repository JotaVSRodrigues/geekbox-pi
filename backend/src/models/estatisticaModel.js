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

module.exports = {
    consumoMensal
};