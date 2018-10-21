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
CorFundo varchar(7),
NumeroDeJogos int not null,
NumeroDeSimulacoes int not null
)
insert into Usuario values('Scherer', '01010001', 'Felipe', 'M', 'sla', 'fsvicentin@hgta.com', 
convert(varbinary, 'abcdefg'), convert(varbinary, 'abcdefg'), '#ffffff', '#fffff', 0, 0)
insert into Usuario values('Miller', 'aaaaaaaa', 'GustaGOD', 'M', 'aaaaa', 'gustavinho@hgta.com', 
convert(varbinary, '12e'), convert(varbinary, '23425425ds'), '#ffff23', '#243521', 0, 0)
insert into Usuario values('Felipe', 'bbbbb', 'Vinsssss', 'M', '435asd', 'afadfe@hgta.com', 
convert(varbinary, '12e'), convert(varbinary, '23425425ds'), '#ffff23', '#243521', 0, 0)
delete Usuario where codUsuario = 3
select * from Usuario
select * from Jogo
delete from Jogo

create table Jogo (
CodJogo int identity(1,1) primary key,
Nome varchar(30),
CodUsuario int not null,
constraint fkUsuarioJogo foreign key(CodUsuario) references Usuario(CodUsuario),
XP int not null,
Data datetime not null,
Caixa money not null,
ContaBancoMovimento money not null,
NumeroFranquias int not null,
NumeroIndustrias int not null,
NumeroFornecedores int not null
)

create table Simulacao (
CodSimulacao int primary key,
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