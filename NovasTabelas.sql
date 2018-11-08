sp_help ConstrucaoJogo

alter proc CriarJogo_sp
@nome varchar(30),
@codUsuario int
as
insert into Jogo values (@nome, @codUsuario, 0, '01/01/01', -1, 0, 0, 0, 0, '{"Saldo":[], "Economia":[], "LucroPrejuizo":[], "Perda":[], "Ganho":[], "Fator":[], "xVal":0, "xValMes":0}'
)
declare @codJogo int
select @CodJogo = max(CodJogo) from Jogo
insert into InfoEmpresa values (@codJogo, null, null, null, null, null, 0, 0, 0, 0, 0, 0, 0, 0, 0)

alter proc RemoverJogo_sp
@codUsuario int,
@nomeJogo varchar(30)
as
declare @codJogo int
select @codJogo = CodJogo from Jogo where Nome = @nomeJogo and CodUsuario = @codUsuario
declare @xp int
select @xp = XP from Jogo where CodJogo = @codJogo
set @xp = @xp * -1
exec AtualizarXP_sp @xp
delete from ConstrucaoJogo where CodJogo = @codJogo
delete from Produto where CodJogo = @codJogo
delete from InfoEmpresa where CodJogo = @codJogo
delete from Conta where CodJogo = @codJogo
delete from ConstrucaoJogo where CodJogo in (select CodJogo from Jogo where CodUsuario = @codUsuario and nome=@nomeJogo)
delete from Produto where CodJogo in (select CodJogo from Jogo where CodUsuario = @codUsuario and nome = @nomeJogo)
delete from Conta where CodJogo in (select CodJogo from Jogo where CodUsuario = @codUsuario and nome = @nomeJogo)
delete from InfoEmpresa where CodJogo in (select CodJogo from Jogo where CodUsuario = @codUsuario and nome = @nomeJogo)
>>>>>>> 91660d8364d6c97615569b148c3c47dde0ae1503
delete from Jogo where CodUsuario = @codUsuario and Nome = @nomeJogo

create proc AtualizarXP_sp
@CodUsuario int,
@valor int
as
update Usuario set SomaXP += @valor where CodUsuario = @CodUsuario

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
DiasRestantes int not null,
TotalDeVendas int not null,
FatorMarketing int not null)

alter proc ColocarProduto_sp
@CodJogo int,
@Nome varchar(20),
@Preco money,
@QuantidadeEmEstoque int,
@DataDeCriacao varchar(10),
@Status int,
@Qualidade float,
@DiasRestantes int,
@Producao int,
@TotalDeVendas int,
@FatorMarketing int
as
if (select count(Nome) from Produto where Nome=@Nome and CodJogo=@CodJogo) = 0
    insert into Produto values (@CodJogo, @Nome, @Preco, @QuantidadeEmEstoque, @DataDeCriacao, @Status, @Qualidade, @DiasRestantes, @Producao, @TotalDeVendas, @FatorMarketing)
else
    update Produto set Preco=@Preco, QuantidadeEmEstoque=@QuantidadeEmEstoque, DataDeCriacao=@DataDeCriacao, Status=@Status, Qualidade=@Qualidade, DiasRestantes=@DiasRestantes, Producao=@Producao, TotalDeVendas=@TotalDeVendas, FatorMarketing=@FatorMarketing
                       where CodJogo=@CodJogo and Nome=@Nome


create proc RemoverUsuario_sp
@CodUsuario int
as
delete from Simulacao where CodUsuario = @CodUsuario
delete from UsuarioFoto where CodUsuario = @CodUsuario
delete from UsuarioRank where CodUsuario = @CodUsuario
delete from ConstrucaoJogo where CodJogo in (select CodJogo from Jogo where CodUsuario = @CodUsuario)
delete from Produto where CodJogo in (select CodJogo from Jogo where CodUsuario = @CodUsuario)
delete from InfoEmpresa where CodJogo in (select CodJogo from Jogo where CodUsuario = @CodUsuario)
delete from Conta where CodJogo in (select CodJogo from Jogo where CodUsuario = @CodUsuario)
delete from Jogo where CodUsuario = @codUsuario
delete from Usuario where CodUsuario = @CodUsuario


create table UsuarioRank(
CodUsuario int not null,
constraint fkUsuarioRank foreign key(CodUsuario) references Usuario(CodUsuario),
DiaAtual varchar(30),
GraficoRank varchar(max)
)
delete from UsuarioRank
delete from UsuarioFoto where CodUsuario = 16 and ImagemBanner = ''

delete from Usuario where CodUsuario = 26
delete from UsuarioRank where CodUsuario = 26
delete from UsuarioFoto where CodUsuario = 26
delete from Jogo where CodUsuario = 26

create proc CriarUsuarioAux_sp
@foto varchar(max),
@hoje varchar(30)
as
declare @cod int
select @cod = max(CodUsuario) from Usuario
insert into UsuarioFoto values(@cod, @foto, '')
insert into UsuarioRank values(@cod, @hoje, '{"Grafico": []}')

select * from UsuarioRank
update UsuarioRank set DiaAtual = '20/10/2018' where CodUsuario = 27
create table Conta (
CodConta int identity(1,1) primary key,
CodJogo int not null,
constraint fkCodJogoConta foreign key (CodJogo) references Jogo(CodJogo),
Nome varchar(50) not null,
Classificacao varchar(50) not null,
EfetuarNoDebito int not null
)

create proc ColocarConta_sp
@CodJogo int,
@Nome varchar(50),
@Classificacao varchar(50),
@EfetuarNoDebito int
as
    if (select count(*) from Conta where CodJogo=@CodJogo and Nome=@Nome) > 0
        update Conta set EfetuarNoDebito=@EfetuarNoDebito where CodJogo=@CodJogo and Nome=@Nome
    else
        insert into Conta values(@CodJogo, @Nome, @Classificacao, @EfetuarNoDebito)
