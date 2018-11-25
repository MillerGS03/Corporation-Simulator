const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({dest: "./uploads"});
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const porta = 3000; //porta padrão
const sql = require('mssql');
const conexaoStr = "Server=regulus.cotuca.unicamp.br;Database=PR118178;User Id=PR118178;Password=MillerScherer1;";

//conexao com BD
sql.connect(conexaoStr)
   .then(conexao => global.conexao = conexao)
   .catch(erro => console.log(erro));

// configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({limit: '500gb', extended: true}));
app.use(bodyParser.json({limit: '500gb', extended: true}));
//acrescentando informacoes de cabecalho para suportar o CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PATCH, DELETE");
  next();
});
//definindo as rotas
const rota = express.Router();
rota.get('/', (requisicao, resposta) => resposta.json({ mensagem: 'Funcionando!'}));
app.use('/', rota);

//inicia servidor
app.listen(porta);
console.log('API Funcionando!');

function execSQL(sql, resposta) {
	global.conexao.request()
				  .query(sql)
				  .then(resultado => resposta.json(resultado.recordset))
				  .catch(erro => resposta.json(erro));
}

//rotas para registro/login de usuario
rota.get('/usuario/:id?', (requisicao, resposta) => {
  let filtro = '';
	if (requisicao.params.id)
		filtro = ' WHERE CodUsuario=' + parseInt(requisicao.params.id);
	execSQL('SELECT * from usuario' + filtro, resposta);
})
rota.post('/autenticar', (requisicao, resposta) => {
  const SenhaDigitada = requisicao.body.SenhaDigitada;
  const Hash = requisicao.body.Hash;
  bcrypt.compare(SenhaDigitada, Hash, function(err, res) {
    resposta.json(res);
  });
})
rota.delete('/usuario/:id', (requisicao, resposta) =>{
	execSQL(`RemoverUsuario_sp ${requisicao.params.id}`, resposta);
})
rota.post('/usuario', (requisicao, resposta) =>{
    const Username = requisicao.body.Username.substring(0, 30);
    const Senha = requisicao.body.Senha;
    const Nome = requisicao.body.Nome.substring(0, 50);
    const Sexo = requisicao.body.Sexo;
    const Biografia = requisicao.body.Biografia;
    const Email = requisicao.body.Email;
    const CorBanner = '#d3d3d3';
    const CorFundo = '#4c98a5';
    const VolumeJogos = 5;
    const ComMusicaNosJogos = 1; // false
    bcrypt.hash(Senha, saltRounds, (err, hash) => {
      execSQL(`insert into Usuario values('${Username}', '${hash}', '${Nome}', '${Sexo}', '${Biografia}', '${Email}',
              '${CorBanner}', '${CorFundo}', ${VolumeJogos}, ${ComMusicaNosJogos}, 0)`, resposta);
    });
})
rota.post('/usuario/aux', (requisicao, resposta) => {
  const hoje = requisicao.body.hoje;
  const f = 'data:image/png;base64,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';
  execSQL(`CriarUsuarioAux_sp '${f}', '${hoje}'`, resposta);
})
rota.get('/usuarioFoto/:codUsuario', (requisicao, resposta) => {
  execSQL(`select * from UsuarioFoto where CodUsuario = ${requisicao.params.codUsuario}`, resposta);
})
rota.patch('/usuario/:id', (requisicao, resposta) =>{
    const CodUsuario = parseInt(requisicao.params.id);
    const Senha = requisicao.body.Senha;
    const Nome = requisicao.body.Nome;
    const Sexo = requisicao.body.Sexo;
    const Email = requisicao.body.Email;
    if (Senha != '')
    {
      bcrypt.hash(Senha, saltRounds, (err, hash) => {
      execSQL(`UPDATE usuario SET Senha='${hash}', Nome='${Nome}', Sexo='${Sexo}',
              Email='${Email}' WHERE CodUsuario=${CodUsuario}`, resposta);
      });
    }
    else
      execSQL(`UPDATE usuario SET Nome='${Nome}', Sexo='${Sexo}',
              Email='${Email}' WHERE CodUsuario=${CodUsuario}`, resposta);
})
rota.patch('/usuario/corFundo/:cod', (requisicao, resposta) => {
  const cor = requisicao.body.Cor;
  execSQL(`update Usuario set CorFundo = '${cor}' where CodUsuario = ${requisicao.params.cod}`, resposta);
})
rota.patch('/usuario/corBanner/:cod', (requisicao, resposta) => {
  const cor = requisicao.body.Cor;
  execSQL(`update Usuario set CorBanner = '${cor}' where CodUsuario = ${requisicao.params.cod}`, resposta);
})
rota.patch('/usuario/bio/:cod/:bio', (requisicao, resposta) => {
  const cod = requisicao.params.cod;
  const bio = requisicao.params.bio;
  execSQL(`update Usuario set Biografia = '${bio}' where CodUsuario = ${cod}`, resposta);
})
rota.patch('/usuario/mudarVolumeJogos/:cod', (requisicao, resposta) =>{
  const cod = requisicao.params.cod;
  const VolumeJogos = requisicao.body.VolumeJogos;
  execSQL(`update Usuario set VolumeJogos = '${VolumeJogos}' where CodUsuario = ${cod}`, resposta);
})
rota.patch('/usuario/mudarComMusicaNosJogos/:cod', (requisicao, resposta) =>{
  const cod = requisicao.params.cod;
  const ComMusicaNosJogos = requisicao.body.ComMusicaNosJogos;
  execSQL(`update Usuario set ComMusicaNosJogos = '${ComMusicaNosJogos}' where CodUsuario = ${cod}`, resposta);
})
rota.patch('/usuario/mudarFoto/:cod', (requisicao, resposta) =>{
  const cod = requisicao.params.cod;
  const foto = requisicao.body.foto;
  execSQL(`update UsuarioFoto set FotoPerfil = '${foto}' where CodUsuario = ${cod}`, resposta);
})
rota.patch('/usuario/mudarBanner/:cod', (requisicao, resposta) =>{
  const cod = requisicao.params.cod;
  const banner = requisicao.body.banner;
  execSQL(`update UsuarioFoto set ImagemBanner = '${banner}' where CodUsuario = ${cod}`, resposta);
})
// devolve usuario com base no seu username
rota.get('/getUsuario/:username', (requisicao, resposta) => {
  const username = requisicao.params.username;
  execSQL(`select * from Usuario where Username='${username}'`, resposta);
})

rota.post('/executarSQL', (requisicao, resposta) => {
  execSQL(requisicao.body.comando, resposta);
})
rota.patch('/updateTotalXp/:cod/:xpFinal', (requisicao, resposta) => {
  const somar = requisicao.params.xpFinal;
  const cod = requisicao.params.cod;
  execSQL(`AtualizarXP_sp ${cod}, ${somar}`, resposta)
})
rota.get('/getRanking', (requisicao, resposta) => {
  execSQL(`select * from Usuario u order by u.SomaXP desc`, resposta)
})
rota.get('/rankUsuario/:cod', (requisicao, resposta) => {
  execSQL(`select * from UsuarioRank where CodUsuario = ${requisicao.params.cod}`, resposta)
})
rota.patch('/updateUsuarioRank/:cod', (requisicao, resposta) => {
  execSQL(`update UsuarioRank set DiaAtual = '${requisicao.body.DiaAtual}', GraficoRank = '${requisicao.body.GraficoRank}' where CodUsuario = ${requisicao.params.cod}`, resposta)
})

//rotas para selecao/carregamento/delecao de jogo
rota.get('/jogos/:codUsuario', (requisicao, resposta) => {
  execSQL(`select * from Jogo where CodUsuario = ${requisicao.params.codUsuario} order by XP desc`, resposta);
})
rota.get('/jogos/:codUsuario/:nome', (requisicao, resposta) => {
  execSQL(`select * from Jogo where CodUsuario = ${requisicao.params.codUsuario} and Nome = '${requisicao.params.nome}'`, resposta);
})
rota.delete('/jogos/:codUsuario/:nome', (requisicao, resposta) =>{
  execSQL(`exec RemoverJogo_sp ${requisicao.params.codUsuario}, '${requisicao.params.nome}'`, resposta);
})
rota.post('/addJogo/:cod/:nome', (requisicao, resposta) => {
  const nome = requisicao.params.nome;
  const cod = requisicao.params.cod;
  execSQL(`exec CriarJogo_sp '${nome}', ${cod}`, resposta);
})
rota.post('/construir/:codJogo', (requisicao, resposta) => {
  const codJogo = requisicao.params.codJogo;
  const Nome = requisicao.body.ItemConstruido;
  const X = requisicao.body.X;
  const Y = requisicao.body.Y;
  const Sustentador = requisicao.body.Sustentador?"'" + requisicao.body.Sustentador + "'":"null";
  execSQL(`insert into ConstrucaoJogo values(${codJogo}, '${Nome}', ${X}, ${Y}, ${Sustentador})`, resposta);
})
rota.patch('/construcao', (requisicao, resposta) =>{
  const CodJogo = requisicao.body.CodJogo;
  const ItemConstruido = requisicao.body.ItemConstruido;
  const X = requisicao.body.X;
  const Y = requisicao.body.Y;
  const Sustentador = requisicao.body.Sustentador?"'" + requisicao.body.Sustentador + "'":"null";
  const AtualizacaoConstrucao = requisicao.body.Atualizacao;
  execSQL(`update ConstrucaoJogo set X=${X}, Y=${Y}, Sustentador=${Sustentador}
           where CodJogo=${CodJogo} and ItemConstruido='${ItemConstruido}'`, resposta);
})
rota.get('/construcao/:codJogo', (requisicao, resposta) => {
  const codJogo = requisicao.params.codJogo;
  execSQL(`select * from ConstrucaoJogo where CodJogo = ${codJogo}`, resposta);
})
rota.get('/produtos/:codJogo', (requisicao, resposta) => {
  const codJogo = requisicao.params.codJogo;
  execSQL(`select * from Produto where CodJogo = ${codJogo}`, resposta);
})
rota.post('/produto', (requisicao, resposta) => {
  const a = requisicao.body;
  const CodJogo = a.CodJogo;
  const Nome = a.Nome;
  const Preco = a.Preco;
  const QuantidadeEmEstoque = a.QuantidadeEmEstoque;
  const DataDeCriacao = a.DataDeCriacao;
  const Status = a.Status;
  const Qualidade = a.Qualidade;
  const DiasRestantes = a.DiasRestantes;
  const Producao = a.Producao;
  const TotalDeVendas = a.TotalDeVendas;
  const FatorMarketing = a.FatorMarketing;

  execSQL(`exec ColocarProduto_sp ${CodJogo}, '${Nome}', ${Preco}, ${QuantidadeEmEstoque}, '${DataDeCriacao}',
                                       ${Status}, ${Qualidade}, ${DiasRestantes}, ${Producao}, ${TotalDeVendas}, ${FatorMarketing}`, resposta)
})
rota.delete('/produto/:codJogo/:nome', (requisicao, resposta) => {
  execSQL(`delete from Produto where CodJogo = ${requisicao.params.codJogo} and Nome = '${requisicao.params.nome}'`, resposta);
})

rota.get('/contasJogo/:codJogo', (requisicao, resposta) => {
  const codJogo = requisicao.params.codJogo;
  execSQL(`select * from Conta where CodJogo = ${codJogo}`, resposta);
})
rota.post('/contasJogo', (requisicao, resposta) => {
  const a = requisicao.body;
  const CodJogo = a.CodJogo;
  const Nome = a.Nome;
  const Classificacao = a.Classificacao;
  const EfetuarNoDebito = a.EfetuarNoDebito;

  execSQL(`exec ColocarConta_sp ${CodJogo}, '${Nome}', '${Classificacao}', ${EfetuarNoDebito}`, resposta)
})

rota.get('/infoEmpresa/:codJogo', (requisicao, resposta) => {
  const codJogo = requisicao.params.codJogo;
  execSQL(`select * from InfoEmpresa where CodJogo = ${codJogo}`, resposta);
})
//salva o jogo quando o usuario sai
rota.post('/jogo/:cod', (requisicao, resposta) => {
  const codJogo = requisicao.params.cod;
  const a = requisicao.body;
  const xp = a.XP;
  const caixa = a.Caixa;
  const nF = a.NumeroFranquias;
  const nFo = a.NumeroFornecedores;
  const nI = a.NumeroIndustrias;
  const est = a.Estatisticas;
  execSQL(`update Jogo set XP=${xp}, Data='${a.Data}', Caixa=${caixa},
  NumeroFranquias=${nF}, NumeroFornecedores=${nFo}, NumeroIndustrias=${nI}, Estatisticas = '${est}' where CodJogo=${codJogo}`, resposta)
})

rota.post('/infoEmpresa/:cod', (requisicao, resposta) => {
  const codJogo = requisicao.params.cod;
  const a = requisicao.body;
  const CapacidadeArmazem = a.CapacidadeArmazem != null?a.CapacidadeArmazem:"null";
  const PrecoUpgradeArmazem = a.PrecoUpgradeArmazem != null?a.PrecoUpgradeArmazem:"null";
  const QtdeMateriaPrima = a.QtdeMateriaPrima != null?a.QtdeMateriaPrima:"null";
  const PrecoUpgradeOperacional = a.PrecoUpgradeOperacional != null?a.PrecoUpgradeOperacional:"null";
  const CapacidadeProducao = a.CapacidadeProducao != null?a.CapacidadeProducao:"null";
  const Capacitacao = a.Capacitacao != null?a.Capacitacao:"null";
  const fDesenv = a.FuncionariosDesenvolvimento != null?a.FuncionariosDesenvolvimento:"null";
  const fProd = a.FuncionariosProducao != null?a.FuncionariosProducao:"null";
  const fFin = a.FuncionariosFinanceiro != null?a.FuncionariosFinanceiro:"null";
  const fMark = a.FuncionariosMarketing != null?a.FuncionariosMarketing:"null";
  const fRh = a.FuncionariosRH != null?a.FuncionariosRH:"null";
  const PromocaoEmpresa = a.PromocaoEmpresa != null?a.PromocaoEmpresa:"null";
  const DiasRestantesPromocaoEmpresa = a.DiasRestantesPromocaoEmpresa != null?a.DiasRestantesPromocaoEmpresa:"null";
  const DiasTotaisPromocaoEmpresa = a.DiasTotaisPromocaoEmpresa != null?a.DiasTotaisPromocaoEmpresa:"null";
  const Reformada = a.Reformada != null?a.Reformada:"null";
  const FreqFornecedores = a.FreqFornecedores != null?a.FreqFornecedores:2;
  const MateriaPrimaAcumulada = a.MateriaPrimaAcumulada != null?a.MateriaPrimaAcumulada:0;
  const JaTemContaNoBanco = a.JaTemContaNoBanco != null?a.JaTemContaNoBanco:0;

  execSQL(`update InfoEmpresa set CapacidadeArmazem = ${CapacidadeArmazem}, PrecoUpgradeArmazem = ${PrecoUpgradeArmazem},
                                  QtdeMateriaPrima = ${QtdeMateriaPrima}, PrecoUpgradeOperacional = ${PrecoUpgradeOperacional},
                                  CapacidadeProducao = ${CapacidadeProducao}, Capacitacao = ${Capacitacao}, FuncionariosDesenvolvimento = ${fDesenv},
                                  FuncionariosProducao = ${fProd}, FuncionariosFinanceiro = ${fFin}, FuncionariosMarketing = ${fMark}, FuncionariosRH = ${fRh},
                                  PromocaoEmpresa = ${PromocaoEmpresa}, DiasRestantesPromocaoEmpresa = ${DiasRestantesPromocaoEmpresa}, 
                                  DiasTotaisPromocaoEmpresa = ${DiasTotaisPromocaoEmpresa}, Reformada = ${Reformada}, FreqFornecedores = ${FreqFornecedores},
                                  MateriaPrimaAcumulada = ${MateriaPrimaAcumulada}, JaTemContaNoBanco = ${JaTemContaNoBanco}
                                  where CodJogo=${codJogo}`, resposta);
})
rota.post('/emprestimos/:cod', (requisicao, resposta) => {
  const e = requisicao.body;
  const cod = requisicao.params.cod;
  execSQL(`AdicionarEmprestimo_sp ${cod}, ${e.valorInicial}, ${e.indice}, '${e.dataCriacao}', ${e.j}, ${e.p}`, resposta)
})
rota.get('/getEmprestimos/:cod', (requisicao, resposta) => {
  execSQL(`select * from Emprestimo where CodJogo = ${requisicao.params.cod}`, resposta)
})

//rotas das simulacoes
//devolve simulacao a partir do codigo do usuario
rota.get('/simulacoes/:cod', (requisicao, resposta) => {
  execSQL(`select * from Simulacao where CodUsuario = ${requisicao.params.cod}`, resposta);
})
rota.get('/simulacoes/:cod/:nome', (requisicao, resposta) => {
  execSQL(`select * from Simulacao where CodUsuario = ${requisicao.params.cod} and Nome = '${requisicao.params.nome}'`, resposta);
})
//adiciona simulacao
rota.post('/addSimulacao/:cod/:nome', (requisicao, resposta) => {
  const cod = requisicao.params.cod;
  const nome = requisicao.params.nome;
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1;
  var yyyy = today.getFullYear();
  if(dd<10) {
    dd = '0'+dd
  }
  if(mm<10) {
    mm = '0'+mm
  }
  today = mm + '/' + dd + '/' + yyyy;
  execSQL(`insert into Simulacao values(${cod}, '${today}', '${nome}', 0)`, resposta);
})
rota.delete('/simulacoes/:codUsuario/:nome', (requisicao, resposta) =>{
  execSQL(`exec RemoverSimulacao_sp ${requisicao.params.codUsuario},'${requisicao.params.nome}'`, resposta);
})
rota.post('/addConta/:codSimulacao', (requisicao, resposta) => {
  const cod = requisicao.params.codSimulacao;
  const c = requisicao.body;
  const Intervalo = c.Intervalo;
  const Nome = c.Nome;
  const Valor = parseInt(c.Valor);
  const Class = c.Classificacao;
  const Marcado = c.Marcado;
  var today = new Date(c.DiaPerdaGanho);
  var dd = today.getDate();
  var mm = today.getMonth()+1;
  var yyyy = today.getFullYear();
  if(dd<10) {
    dd = '0'+dd
  }
  if(mm<10) {
    mm = '0'+mm
  }
  today = mm + '/' + dd + '/' + yyyy;
  execSQL(`insert into Patrimonio values(${cod}, '${Intervalo}', '${Nome}', ${Valor}, ${Class}, '${today}', ${Marcado})`, resposta);
})
rota.get('/getClassificacoes/:codSimulacao?', (requisicao, resposta) => {
  if (requisicao.params.codSimulacao)
    execSQL(`select * from Classificacao where CodSimulacao = ${requisicao.params.codSimulacao}`, resposta);
  else
    execSQL(`select * from Classificacao`, resposta);
})
rota.get('/getContas/:codSimulacao', (requisicao, resposta) => {
  const cod = requisicao.params.codSimulacao;
  execSQL(`select * from Patrimonio where CodSimulacao = ${cod}`, resposta)
})
rota.post('/addClassificacao/:codSimulacao/:nome', (requisicao, resposta) => {
  execSQL(`insert into Classificacao values('${requisicao.params.nome}', ${parseInt(requisicao.params.codSimulacao)})`, resposta);
})
rota.delete('/classificacoes/:codSimulacao/:nome', (requisicao, resposta) => {
  execSQL(`delete Classificacao from Classificacao where CodSimulacao = ${parseInt(requisicao.params.codSimulacao)} and
  Nome='${requisicao.params.nome}'`, resposta);
})
rota.delete('/excluirConta/:cod', (requisicao, resposta) => {
  execSQL(`delete Patrimonio from Patrimonio where CodPatrimonio = ${parseInt(requisicao.params.cod)}`, resposta);
})
rota.get('/contas/:codSimulacao/:nome', (requisicao, resposta) => {
  execSQL(`select * from Patrimonio where CodSimulacao = ${requisicao.params.codSimulacao} and Nome = '${requisicao.params.nome}'`, resposta);
})
rota.patch('/contas/:codPatrimonio', (requisicao, resposta) => {
  const conta = requisicao.body;
  const nome = conta.Nome;
  const valor = conta.Valor;
  const classificacao = conta.Classificacao;
  const intervalo = conta.Intervalo;
  const dia = conta.DiaPerdaGanho;
  execSQL(`update Patrimonio set Nome = '${nome}', Valor = ${valor}, CodClassificacao = ${classificacao}, IntervaloDeTempo = '${intervalo}', DiaPerdaGanho = '${dia}' where CodPatrimonio = ${requisicao.params.codPatrimonio}`, resposta);
})
rota.patch('/simulacao/:cod/saldo/:saldo', (requisicao, resposta) => {
  const cod = requisicao.params.cod;
  const saldo = requisicao.params.saldo
  execSQL(`update Simulacao set Saldo = ${saldo} where CodSimulacao = ${cod}`, resposta);
})
rota.get('/simulacao/:codS/contas/:ordem/:tipo', (requisicao, resposta) => {
  if (requisicao.params.ordem != 'Valor')
    execSQL(`select * from Patrimonio where CodSimulacao = ${requisicao.params.codS} order by ${requisicao.params.ordem} ${requisicao.params.tipo}`, resposta);
  else
    execSQL(`select * from Patrimonio where CodSimulacao = ${requisicao.params.codS} order by Nome ${requisicao.params.tipo}`, resposta);
})
rota.patch('/UpdateSimulacao', (requisicao, resposta) => {
  const s = requisicao.body;
  execSQL(`update Simulacao set Saldo=${s.Saldo} where CodSimulacao = ${s.CodSimulacao}`, resposta)
})