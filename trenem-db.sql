CREATE TABLE IF NOT EXISTS questoes (
	id INTEGER PRIMARY KEY,
	origem TEXT,
	enunciado TEXT UNIQUE NOT NULL,
	alternativas TEXT NOT NULL,
	gabarito TEXT NOT NULL,
	materia TEXT NOT NULL,
	supertopico TEXT,
	topico TEXT,
	subtopico TEXT,
);

CREATE TABLE IF NOT EXISTS estudante (
    email TEXT PRIMARY KEY,
    senha TEXT,
    cod INTEGER UNIQUE,
    nome TEXT,
    percentualDeAcertos REAL,
    foto BLOB,
    tempoMedio REAL
);

CREATE TABLE IF NOT EXISTS amizades(
    codEstudante INTEGER,
    codAmigo INTEGER,
    PRIMARY KEY (codEstudante, codAmigo),
    FOREIGN KEY (codEstudante) 
        REFERENCES estudante (cod) 
            ON DELETE CASCADE 
            ON UPDATE NO ACTION,
    FOREIGN KEY (codAmigo) 
        REFERENCES estudante (cod) 
            ON DELETE CASCADE 
            ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS questoes_realizadas(
    codEstudante INTEGER,
    idQuestao INTEGER,
    alternativaMarcada TEXT,
    PRIMARY KEY (codEstudante, idQuestao),
    FOREIGN KEY (codEstudante) 
        REFERENCES estudante (cod) 
            ON DELETE CASCADE 
            ON UPDATE NO ACTION,
    FOREIGN KEY (idQuestao) 
        REFERENCES questoes (id) 
            ON DELETE CASCADE 
            ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS questoes_avaliadas(
    codEstudante INTEGER,
    idQuestao INTEGER,
    dificuldade REAL,
    PRIMARY KEY (codEstudante, idQuestao),
    FOREIGN KEY (codEstudante) 
        REFERENCES estudante (cod) 
            ON DELETE CASCADE 
            ON UPDATE NO ACTION,
    FOREIGN KEY (idQuestao) 
        REFERENCES questoes (id) 
            ON DELETE CASCADE 
            ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS questoes_avaliadas(
    codEstudante INTEGER,
    idQuestao INTEGER,
    dificuldade REAL,
    PRIMARY KEY (codEstudante, idQuestao),
    FOREIGN KEY (codEstudante) 
        REFERENCES estudante (cod) 
            ON DELETE CASCADE 
            ON UPDATE NO ACTION,
    FOREIGN KEY (idQuestao) 
        REFERENCES questoes (id) 
            ON DELETE CASCADE 
            ON UPDATE NO ACTION
);