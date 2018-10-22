create table Usuario (
CodUsuario int identity(1,1) primary key,
Username varchar(30) not null,
Senha ntext not null,
Nome varchar(50) not null,
Sexo char not null,
Biografia ntext,
Email ntext not null,
FotoPerfil varbinary(max),
ImagemBanner varbinary(max),
CorBanner varchar(7),
CorFundo varchar(7)
)
delete from Usuario
select * from Usuario
select * from Simulacao
select * from Jogo
update Jogo set XP = 100 where CodJogo = 1
delete from Jogo
delete from Simulacao

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
select * from ConstrucaoJogo
delete from ConstrucaoJogo
drop table ConstrucaoJogo

create table Simulacao (
CodSimulacao int identity(1,1) primary key,
CodUsuario int not null,
constraint fkUsuarioSimulacao foreign key(CodUsuario) references Usuario(CodUsuario),
DataCriacao datetime not null,
Nome varchar(25) not null
)

create table Patrimonio (
CodPatrimonio int not null,
CodSimulacao int not null,
constraint fkSimulacaoPatrimonio foreign key(CodSimulacao) references Simulacao(CodSimulacao),
Nome varchar(30) not null,
Valor money not null,
Classificacao varchar(25) not null,
)

create table Notificacoes(
CodNotificacao int primary key,
CodUsuario int not null,
constraint fkNotificacaoUsuario foreign key(CodUsuario) references Usuario(CodUsuario),
Titulo varchar(20) not null,
Descricao ntext not null
)

create table Amizades(
CodUsuario int not null,
constraint fkUsuarioAmigo foreign key(CodUsuario) references Usuario(CodUsuario),
CodAmigo int not null
)
select * from Amizades

drop table Amizades
drop table Notificacoes
drop table Patrimonio
drop table Simulacao
drop table Jogo
drop table Usuario