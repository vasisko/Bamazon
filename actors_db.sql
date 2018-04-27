DROP DATABASE if exists actors_db;
CREATE DATABASE actors_db;

USE actors_db;

CREATE TABLE actors(
id INTEGER(10) NOT NULL AUTO_INCREMENT,
name VARCHAR(50),
coolness_points INTEGER(50),
attitude VARCHAR(10),
PRIMARY KEY(id)
);

INSERT INTO actors(name, coolness_points, attitude)
VALUES
("Jim", 9, "laidback"),
("Dwight", 3, "nerdy"),
("Pam", 8, "calm")
;