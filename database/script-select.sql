-- 1. Todos os itens do João com nome da categoria
SELECT i.id, i.titulo, c.nome_categoria, i.status,
       i.classificacao, i.horas, i.iniciado_em, i.concluido_em
FROM item i
JOIN categoria c ON c.id_categoria = i.categoria_id
WHERE i.usuario_id = 1
ORDER BY i.criado_em DESC;

-- 2. KPI: total de concluídos no ano (dashboard)
SELECT COUNT(*) AS total_concluidos
FROM item
WHERE usuario_id = 1
  AND status = 'concluido'
  AND YEAR(concluido_em) = 2026;

-- 3. KPI: total de horas gastas
SELECT ROUND(SUM(horas), 1) AS total_horas
FROM item
WHERE usuario_id = 1;

-- 4. KPI: taxa de conclusão
SELECT ROUND(
  COUNT(CASE WHEN status = 'concluido'  THEN 1 END) * 100.0 /
  COUNT(CASE WHEN status IN ('concluido','abandonado') THEN 1 END)
, 0) AS taxa_conclusao
FROM item
WHERE usuario_id = 1;

-- 5. KPI: horário nobre (hora do dia com mais eventos)
SELECT HOUR(ocorreu_em) AS hora, COUNT(*) AS total
FROM evento
WHERE usuario_id = 1
GROUP BY hora
ORDER BY total DESC
LIMIT 1;

-- 6. Horas por categoria (donut da dashboard)
SELECT c.nome_categoria, ROUND(SUM(i.horas), 1) AS total_horas
FROM item i
JOIN categoria c ON c.id_categoria = i.categoria_id
WHERE i.usuario_id = 1
GROUP BY c.nome_categoria
ORDER BY total_horas DESC;

-- 7. Progresso vs meta por categoria (barras da dashboard)
SELECT c.nome_categoria,
       m.quantidade AS meta,
       COUNT(i.id)  AS concluidos
FROM meta m
JOIN categoria c ON c.id_categoria = m.categoria_id
LEFT JOIN item i
  ON  i.usuario_id   = m.usuario_id
  AND i.categoria_id = m.categoria_id
  AND i.status       = 'concluido'
  AND YEAR(i.concluido_em) = m.ano
WHERE m.usuario_id = 1 AND m.ano = 2026
GROUP BY c.nome_categoria, m.quantidade;

-- 8. Timeline: últimos eventos com título do item
SELECT e.tipo, e.ocorreu_em,
       i.titulo, c.nome_categoria
FROM evento e
JOIN item i     ON i.id = e.item_id
JOIN categoria c ON c.id_categoria = i.categoria_id
WHERE e.usuario_id = 1
ORDER BY e.ocorreu_em DESC
LIMIT 10;

-- 9. Itens da wishlist com gêneros
SELECT i.titulo, c.nome_categoria,
       GROUP_CONCAT(g.nome SEPARATOR ', ') AS generos
FROM item i
JOIN categoria c   ON c.id_categoria = i.categoria_id
LEFT JOIN item_genero ig ON ig.item_id = i.id
LEFT JOIN genero g       ON g.id = ig.genero_id
WHERE i.usuario_id = 1 AND i.status = 'wishlist'
GROUP BY i.id, i.titulo, c.nome_categoria;

-- 10. Consumo mensal por categoria em 2026 (gráfico de linha)
SELECT MONTH(e.ocorreu_em) AS mes,
       c.nome_categoria,
       COUNT(*) AS total
FROM evento e
JOIN item i      ON i.id = e.item_id
JOIN categoria c ON c.id_categoria = i.categoria_id
WHERE e.usuario_id = 1
  AND e.tipo = 'concluido'
  AND YEAR(e.ocorreu_em) = 2026
GROUP BY mes, c.nome_categoria
ORDER BY mes;