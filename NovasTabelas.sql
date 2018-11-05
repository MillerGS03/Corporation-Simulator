sp_help ConstrucaoJogo

alter proc CriarJogo_sp
@nome varchar(30),
@codUsuario int
as
insert into Jogo values (@nome, @codUsuario, 0, '01/01/01', -1, 0, 0, 0, 0, '{"Saldo":[], "Economia":[], "LucroPrejuizo":[], "Perda":[], "Ganho":[], "Fator":[], "xVal":0, "xValMes":0}'
)
declare @codJogo int
select @CodJogo = max(CodJogo) from Jogo
insert into InfoEmpresa values (@codJogo, null, null, null, null, null, 0, 0, 0, 0, 0, 0, 0, 0)

alter proc RemoverJogo_sp
@codUsuario int,
@nomeJogo varchar(30)
as
delete from ConstrucaoJogo where CodJogo in (select CodJogo from Jogo where CodUsuario = @codUsuario and nome=@nomeJogo)
delete from Produto where CodJogo in (select CodJogo from Jogo where CodUsuario = @codUsuario and nome = @nomeJogo)
delete from InfoEmpresa where CodJogo in (select CodJogo from Jogo where CodUsuario = @codUsuario and nome = @nomeJogo)
delete from Jogo where CodUsuario = @codUsuario and Nome = @nomeJogo

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