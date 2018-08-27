create table Usuario (
CodUsuario int primary key,
Username varchar(30) not null,
Senha varbinary(20) not null,
Nome varchar(50) not null,
Sexo char not null,
Biografia ntext not null
)

create table Empresa (
CodEmpresa int not null,
CodUsuario int not null,
constraint fkUsuario foreign key(CodUsuario) references Usuario(CodUsuario),
Pontuacao int not null,
Confiabilidade int not null,
Dias int not null,
Caixa money not null
)

create table Simulacao (

)

create table Patrimonio (
)

create table Emprestimo (
)

create table Banco (
)

create table JogoInvestimento (
)

create table Investimento (
)