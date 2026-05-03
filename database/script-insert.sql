-- USUARIOS
INSERT INTO usuario (nome, email, senha_hash, telefone, avatar_url) VALUES
('João Silva', 'joao@email.com', '$2b$10$hashdojoao', '11999990001', 'avatars/joao.jpg'),
('Maria Souza', 'maria@email.com', '$2b$10$hashdamaria', '11999990002', NULL);

-- CATEGORIAS
INSERT INTO categoria (nome_categoria) VALUES
('jogo'),
('livro'),
('filme'),
('serie'),
('anime'),
('manga'),
('musica');

-- GENEROS (com categoria associada)
INSERT INTO genero (nome, id_categoria) VALUES
('Ficção Científica', 2), -- livro
('Fantasia',          2),
('RPG',               1), -- jogo
('Ação',              1),
('Drama',             3), -- filme
('Thriller',          3),
('Shounen',           5), -- anime
('Seinen',            6); -- manga

-- ITENS
INSERT INTO item (usuario_id, categoria_id, titulo, status, classificacao, horas, iniciado_em, concluido_em) VALUES
(1, 1, 'Hollow Knight',         'concluido',    5, 52.0, '2026-01-10', '2026-02-01'),
(1, 1, 'Disco Elysium',         'em_progresso', 0, 18.5, '2026-03-20', NULL),
(1, 1, 'Sekiro',                'wishlist',      0, NULL,  NULL,        NULL),
(1, 2, 'Fundação',              'concluido',    4, NULL,  '2026-01-05', '2026-01-28'),
(1, 2, 'O Fim da Eternidade',   'wishlist',      0, NULL,  NULL,        NULL),
(1, 3, 'Dune: Part Two',        'concluido',    4, 2.8,  '2026-03-28', '2026-03-28'),
(1, 4, 'The Expanse',           'wishlist',      0, NULL,  NULL,        NULL),
(1, 5, 'Frieren',               'concluido',    5, 14.0, '2026-02-10', '2026-04-15'),
(1, 5, 'Vinland Saga S2',       'wishlist',      0, NULL,  NULL,        NULL),
(1, 6, 'Berserk',               'em_progresso', 0, NULL,  '2026-02-01', NULL),
(1, 7, 'OK Computer',           'concluido',    5, 0.9,  '2026-01-12', '2026-01-12'),
(2, 3, 'Blade Runner 2049',     'concluido',    5, 2.7,  '2026-02-05', '2026-02-05'),
(2, 2, 'Hyperion',              'em_progresso', 0, NULL,  '2026-03-01', NULL);

-- RESENHAS (nos itens que têm classificacao > 0 e o usuário escreveu)
UPDATE item SET resenha = 'Um dos melhores metroidvanias já feitos. A trilha sonora e o level design são impecáveis.' WHERE id = 1;
UPDATE item SET resenha = 'Adaptação fiel e visualmente deslumbrante. Villeneuve confirma seu talento.' WHERE id = 6;
UPDATE item SET resenha = 'Frieren subverte o gênero de forma inteligente e emocionante. Obra rara.' WHERE id = 8;
UPDATE item SET resenha = 'In Rainbows continua sendo superior, mas OK Computer é essencial.' WHERE id = 11;

-- ITEM_GENERO
INSERT INTO item_genero (item_id, genero_id) VALUES
(1,  3), -- Hollow Knight: RPG
(1,  4), -- Hollow Knight: Ação
(2,  3), -- Disco Elysium: RPG
(4,  1), -- Fundação: Ficção Científica
(5,  1), -- O Fim da Eternidade: Ficção Científica
(6,  5), -- Dune Part Two: Drama
(8,  7), -- Frieren: Shounen
(10, 8), -- Berserk: Seinen
(12, 5), -- Blade Runner: Drama
(13, 1); -- Hyperion: Ficção Científica

-- METAS (João, ano 2026)
INSERT INTO meta (usuario_id, categoria_id, quantidade, ano) VALUES
(1, 1, 24, 2026), -- jogos
(1, 2, 15, 2026), -- livros
(1, 3, 20, 2026), -- filmes
(1, 4, 8,  2026), -- series
(1, 5, 12, 2026), -- animes
(1, 6, 10, 2026), -- mangas
(1, 7, 30, 2026); -- musicas

