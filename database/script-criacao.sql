CREATE TABLE usuario (
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    telefone CHAR(11) NOT NULL,
    avatar_url VARCHAR(255),
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id)
);

CREATE TABLE categoria (
    id_categoria INT NOT NULL AUTO_INCREMENT,
    nome_categoria VARCHAR(45),

    PRIMARY KEY (id_categoria)
);

CREATE TABLE genero (
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(80) NOT NULL,
    id_categoria INT,

    PRIMARY KEY (id),

    CONSTRAINT fk_genero_categoria
        FOREIGN KEY (id_categoria)
        REFERENCES categoria(id_categoria)
);

CREATE TABLE item (
    id INT NOT NULL AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    categoria_id INT NOT NULL,
    titulo VARCHAR(255) NOT NULL,

    status ENUM(
        'wishlist',
        'em_progresso',
        'concluido',
        'pausado',
        'abandonado'
    ) DEFAULT 'wishlist',

    classificacao TINYINT DEFAULT 0,
    resenha TEXT,
    horas DECIMAL(6,1),
    iniciado_em DATE,
    concluido_em DATE,

    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    atualizado_em DATETIME DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    genero_id INT,
    url_imagem VARCHAR(255),

    PRIMARY KEY (id),

    CONSTRAINT fk_item_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuario(id),

    CONSTRAINT fk_item_categoria
        FOREIGN KEY (categoria_id)
        REFERENCES categoria(id_categoria),

    CONSTRAINT fk_item_genero
        FOREIGN KEY (genero_id)
        REFERENCES genero(id),

    CONSTRAINT chk_classificacao
        CHECK (classificacao BETWEEN 0 AND 5)
);

CREATE TABLE meta (
    id INT NOT NULL AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    categoria_id INT NOT NULL,
    quantidade INT NOT NULL,
    ano INT,

    PRIMARY KEY (id),

    CONSTRAINT uk_meta
        UNIQUE (usuario_id, categoria_id, ano),

    CONSTRAINT fk_meta_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuario(id),

    CONSTRAINT fk_meta_categoria
        FOREIGN KEY (categoria_id)
        REFERENCES categoria(id_categoria)
);