sp_help ConstrucaoJogo

alter proc CriarJogo_sp
@nome varchar(30),
@codUsuario int
as
insert into Jogo values (@nome, @codUsuario, 0, '01/01/01', -1, 0, 0, 0, 0, '{"Saldo":[], "Economia":[], "LucroPrejuizo":[], "Perda":[], "Ganho":[], "Fator":[]}')

alter proc RemoverJogo_sp
@codUsuario int,
@nomeJogo varchar(30)
as
delete from ConstrucaoJogo where CodJogo in (select CodJogo from Jogo where CodUsuario = @codUsuario and nome=@nomeJogo)
delete from Jogo where CodUsuario = @codUsuario and Nome = @nomeJogo
sp_help jogo

create table Produto (
CodProduto int identity(1,1) primary key,
CodJogo int not null,
constraint fkCodJogoProduto foreign key (CodJogo) references Jogo(CodJogo),
Nome varchar(20) not null,
Preco money not null,
QuantidadeEmEstoque int not null,
DataDeCriacao varchar(10) not null,
Status int not null,
Qualidade float not null,
DiasRestantes int not null)