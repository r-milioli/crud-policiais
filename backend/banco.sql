create database crud_policiais;
use crud_policiais;

create table crud_policiais(
    id int primary key auto_increment,
    rg_civil varchar(20) NOT NULL UNIQUE,
    rg_militar varchar(20) NOT NULL UNIQUE,
    cpf varchar(14) NOT NULL UNIQUE,
    data_nascimento date NOT NULL,
    matricula varchar(50) NOT NULL
);