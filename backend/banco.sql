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


INSERT INTO crud_policiais (rg_civil, rg_militar, cpf, data_nascimento, matricula) VALUES
('12.345.678-9', '82247', '123.456.789-01', '1985-03-15', 'PM2024001'),
('23.456.789-0', '90124', '234.567.890-12', '1988-07-22', 'PM2024002'),
('34.567.890-1', '82465', '345.678.901-23', '1990-11-08', 'PM2024003'),
('45.678.901-2', '80196', '456.789.012-34', '1987-05-14', 'PM2024004'),
('56.789.012-3', '106258', '567.890.123-45', '1992-09-30', 'PM2024005');


