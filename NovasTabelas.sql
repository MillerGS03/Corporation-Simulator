create table Produto (
codProduto int identity(1,1) primary key,
codJogo int not null,
nome varchar(20) not null,
preco money not null)

drop table Armazem
create table Armazem (
CodArmazem int identity(1,1) primary key,
CodJogo int not null,
Capacidade int not null,
PrecoUpgrade money not null,
MateriaPrima int not null)

select * from Armazem

sp_help ConstrucaoJogo

create proc CriarJogo_sp
@nome varchar(30),
@codUsuario int
as
insert into Jogo values (@nome, @codUsuario, 0, '01/01/01', -1, 0, 0, 0, 0)

alter proc RemoverJogo_sp
@codUsuario int,
@nomeJogo varchar(30)
as
delete from ConstrucaoJogo where CodJogo in (select CodJogo from Jogo where CodUsuario = @codUsuario and nome=@nomeJogo)
delete from Jogo where CodUsuario = @codUsuario and Nome = @nomeJogo
sp_help jogo