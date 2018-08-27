create table Usuario (
CodUsuario int primary key,
Username varchar(30) not null,
Senha varbinary(20) not null,
Nome varchar(50) not null,
Sexo char not null,
Biografia ntext not null
)

create table Empresa (
CodEmpresa int primary key,
CodUsuario int not null,
constraint fkUsuarioEmpresa foreign key(CodUsuario) references Usuario(CodUsuario),
Pontuacao int not null,
Confiabilidade int not null,
Dias int not null,
Caixa money not null
)

create table Simulacao (
CodSimulacao int primary key,
CodUsuario int not null,
constraint fkUsuarioSimulacao foreign key(CodUsuario) references Usuario(CodUsuario),
DataCriacao datetime not null,
Nome varchar(25) not null,
Descriacao ntext not null
)

create table Patrimonio (
CodPatrimonio int not null,
CodSimulacao int not null,
constraint fkSimulacaoPatrimonio foreign key(CodSimulacao) references Simulacao(CodSimulacao),
Nome varchar(30) not null,
Valor money not null
)

create table Banco (
CodBanco int primary key,
Nome varchar(30) not null
)

create table Emprestimo (
CodEmprestimo int primary key,
CodEmpresa int not null,
constraint fkEmpresaEmprestimo foreign key(CodEmpresa) references Empresa(CodEmpresa),
CodBanco int not null,
constraint fkBancoEmprestimo foreign key(CodBanco) references Banco(CodBanco),
Valor money not null
)

create table Investimento (
CodInvestimento int primary key,
Nome varchar(30) not null,
PrecoInicial money not null,
)

create table JogoInvestimento (
CodJogoInvestimento int primary key,
CodEmpresa int not null,
constraint fkEmpresaJogoInvestimento foreign key(CodEmpresa) references Empresa(CodEmpresa),
CodInvestimento int not null,
constraint fkInvestimentoJogoInvestimento foreign key(CodInvestimento) references Investimento(CodInvestimento),
Quantidade int not null
)