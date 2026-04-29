CREATE TABLE usuario (
  id         INT PRIMARY KEY AUTO_INCREMENT,
  nome       VARCHAR(100) NOT NULL,
  email      VARCHAR(150) NOT NULL UNIQUE,
  senha_hash VARCHAR(255) NOT NULL,
  telefone CHAR(11) NOT NULL,
  avatar_url VARCHAR(255),
  criado_em  DATETIME DEFAULT NOW()
);

CREATE TABLE categoria (
	id_categoria INT PRIMARY KEY AUTO_INCREMENT,
    nome_categoria VARCHAR(45) 
);

CREATE TABLE item (
  id              INT PRIMARY KEY AUTO_INCREMENT,
  usuario_id      INT NOT NULL,
  categoria_id    INT NOT NULL,
  titulo          VARCHAR(255) NOT NULL,
--   external_id     VARCHAR(100),
  status          ENUM('wishlist','em_progresso','concluido','pausado','abandonado') DEFAULT 'wishlist',
  classificacao   TINYINT CHECK (classificacao BETWEEN 0 AND 5) DEFAULT 0,
  resenha         TEXT,
  horas           DECIMAL(6,1),
  iniciado_em     DATE,
  concluido_em    DATE,
  criado_em       DATETIME DEFAULT NOW(),
  atualizado_em   DATETIME DEFAULT NOW() ON UPDATE NOW(),
  FOREIGN KEY (usuario_id) REFERENCES usuario(id),
  FOREIGN KEY (categoria_id) REFERENCES categoria(id_categoria),
  INDEX idx_id (id)
);

CREATE TABLE meta (
  id         INT PRIMARY KEY AUTO_INCREMENT,
  usuario_id INT NOT NULL,
  categoria_id INT NOT NULL,
  quantidade INT NOT NULL,
  ano        YEAR NOT NULL,
  UNIQUE KEY unico_meta (usuario_id, categoria_id, ano),
  FOREIGN KEY (usuario_id) REFERENCES usuario(id),
  FOREIGN KEY (categoria_id) REFERENCES categoria(id_categoria)
);

CREATE TABLE genero (
  id        INT PRIMARY KEY AUTO_INCREMENT,
  nome      VARCHAR(80) NOT NULL,
  id_categoria INT,
  FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria)
);

CREATE TABLE item_genero (
  item_id   INT NOT NULL,
  genero_id INT NOT NULL,
  PRIMARY KEY (item_id, genero_id),
  FOREIGN KEY (item_id)   REFERENCES item(id)   ON DELETE CASCADE,
  FOREIGN KEY (genero_id) REFERENCES genero(id) ON DELETE CASCADE
);

CREATE TABLE evento (
  id         INT PRIMARY KEY AUTO_INCREMENT,
  item_id    INT NOT NULL,
  usuario_id INT NOT NULL,
  tipo       ENUM('adicionado','iniciado','progresso','concluido','pausado','abandonado','avaliado') NOT NULL,
  ocorreu_em DATETIME DEFAULT NOW(),
  FOREIGN KEY (item_id)    REFERENCES item(id),
  FOREIGN KEY (usuario_id) REFERENCES usuario(id)
);