create table Usuario (
CodUsuario int primary key,
Username varchar(30) not null,
Senha varbinary(20) not null,
Nome varchar(50) not null,
Sexo char not null,
Biografia ntext not null,
Email ntext not null,
FotoPerfil varbinary,
ImagemBanner varbinary,
CorBanner varchar(7) not null,
CorFuncdo varchar(7) not null,
NumeroDeJogos int not null,
NumeroDeSimulacoes int not null,
)

create table Jogo (
CodEmpresa int primary key,
CodUsuario int not null,
constraint fkUsuarioEmpresa foreign key(CodUsuario) references Usuario(CodUsuario),
XP int not null,
Dias int not null,
Data datetime not null,
CaixaBanco money not null,
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