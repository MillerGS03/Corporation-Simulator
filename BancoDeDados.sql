create table Usuario (
CodUsuario int identity(1,1) primary key,
Username varchar(30) not null,
Senha ntext not null,
Nome varchar(50) not null,
Sexo char not null,
Biografia ntext,
Email ntext not null,
FotoPerfil varchar(max),
ImagemBanner varchar(max),
CorBanner varchar(7),
CorFundo varchar(7)
)

alter table Usuario
drop column FotoPerfil

select * from UsuarioFoto
select * from Usuario


create table UsuarioFoto(
CodUsuario int not null,
constraint fkUsuarioFoto foreign key(CodUsuario) references Usuario(CodUsuario),
FotoPerfil varchar(max),
ImagemBanner varchar(max)
)

create table Jogo (
CodJogo int identity(1,1) primary key,
Nome varchar(30),
CodUsuario int not null,
constraint fkUsuarioJogo foreign key(CodUsuario) references Usuario(CodUsuario),
XP int not null,
Nivel int not null,
Data datetime not null,
Caixa int not null,
ContaBancoMovimento int not null,
NumeroFranquias int not null,
NumeroIndustrias int not null,
NumeroFornecedores int not null
)
create table ConstrucaoJogo(
CodConstrucao int identity(1,1) primary key,
CodJogo int not null,
constraint fkConstrucaoJogo foreign key(CodJogo) references Jogo(CodJogo),
ItemConstruido varchar(50) not null,
X int not null,
Y int not null
)

create table Simulacao (
CodSimulacao int identity(1,1) primary key,
CodUsuario int not null,
constraint fkUsuarioSimulacao foreign key(CodUsuario) references Usuario(CodUsuario),
DataCriacao datetime not null,
Nome varchar(30) not null
)

create table Patrimonio (
CodPatrimonio int identity(1,1) primary key,
CodSimulacao int not null,
constraint fkSimulacaoPatrimonio foreign key(CodSimulacao) references Simulacao(CodSimulacao),
IntervaloDeTempo varchar(10) not null,
Nome varchar(30) not null,
Valor money not null,
CodClassificacao int not null,
constraint fkClassificacaoPatrimonio foreign key(CodClassificacao) references Classificacao(CodClassificacao)
)

create table Classificacao (
CodClassificacao int identity(1,1) primary key,
Nome varchar(35) not null,
CodSimulacao int not null,
constraint fkSimulacaoClassificacao foreign key(CodSimulacao) references Simulacao(CodSimulacao)
)

create table Notificacao(
CodNotificacao int primary key,
CodUsuario int not null,
constraint fkNotificacaoUsuario foreign key(CodUsuario) references Usuario(CodUsuario),
Titulo varchar(20) not null,
Descricao ntext not null
)

select * from Amizade
select * from Notificacao
select * from Classificacao
select * from Patrimonio
select * from Simulacao
select * from ConstrucaoJogo
select * from Jogo
select * from Usuario
update Jogo set Estatisticas = '{"Saldo":[], "Economia":[], "LucroPrejuizo":[], "Perda":[], "Ganho":[], "Fator":[], "xVal":0, "xValMes":0}'


delete from Notificacao
delete from Classificacao
delete from Patrimonio
delete from Simulacao
delete from ConstrucaoJogo
delete from Jogo
delete from UsuarioFoto
delete from Usuario

drop table Amizade
drop table Notificacao
drop table Classificacao
drop table Patrimonio
drop table Simulacao
drop table ConstrucaoJogo
drop table Jogo
drop table Usuario