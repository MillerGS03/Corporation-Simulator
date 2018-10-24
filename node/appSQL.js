const express = require('express');
const app = express();         
const bodyParser = require('body-parser');
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
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
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
	execSQL('DELETE from usuario WHERE CodUsuario=' + parseInt(requisicao.params.id), resposta);
  resposta.end(resposta.json({ mensagem: 'Deletado!'}));
})
rota.post('/usuario', (requisicao, resposta) =>{
    const Username = requisicao.body.Username.substring(0, 30);
    const Senha = requisicao.body.Senha;
    const Nome = requisicao.body.Nome.substring(0, 50);
    const Sexo = requisicao.body.Sexo;
    const Biografia = requisicao.body.Biografia;
    const Email = requisicao.body.Email;
    const FotoPerfil = requisicao.body.FotoPerfil;
    const ImagemBanner = requisicao.body.ImagemBanner;
    const CorBanner = requisicao.body.CorBanner.substring(0, 7);
    const CorFundo = requisicao.body.CorFundo.substring(0, 7);
    bcrypt.hash(Senha, saltRounds, (err, hash) => {
      execSQL(`insert into Usuario values('${Username}', '${hash}', '${Nome}', '${Sexo}', '${Biografia}', '${Email}', 
              ${FotoPerfil}, ${ImagemBanner}, '${CorBanner}', '${CorFundo}')`, resposta);
    });
})
rota.patch('/usuario/:id', (requisicao, resposta) =>{
    const CodUsuario = parseInt(requisicao.params.id);
    const Senha = requisicao.body.Senha;
    const Nome = requisicao.body.Nome;
    const Sexo = requisicao.body.Sexo;
    const Biografia = requisicao.body.Biografia;
    const Email = requisicao.body.Email;
    const FotoPerfil = requisicao.body.FotoPerfil;
    const ImagemBanner = requisicao.body.ImagemBanner;
    const CorBanner = requisicao.body.CorBanner.substring(0, 7);
    const CorFundo = requisicao.body.CorFundo.substring(0, 7);
    execSQL(`UPDATE usuario SET CodUsuario='${CodUsuario}', Senha='${Senha}',
                                Nome='${Nome}', Sexo='${Sexo}', Biografia='${Biografia}', Email='${Email}',
                                FotoPerfil='${FotoPerfil}', ImagemBanner='${ImagemBanner}', CorBanner='${CorBanner}',
                                CorFundo='${CorFundo}'
                                WHERE CodUsuario=${CodUsuario}`, resposta);
    resposta.end(resposta.json({ mensagem: 'Alterado!'}));  
})
// devolve usuario com base no seu username
rota.get('/getUsuario/:username', (requisicao, resposta) => {
  const username = requisicao.params.username;
  execSQL(`select * from Usuario where Username='${username}'`, resposta);
})


//rotas para selecao/carregamento/delecao de jogo
rota.get('/jogos/:codUsuario', (requisicao, resposta) => {
  execSQL(`select * from Jogo where CodUsuario = ${requisicao.params.codUsuario} order by XP`, resposta);
})
rota.get('/jogos/:codUsuario/:nome', (requisicao, resposta) => {
  execSQL(`select * from Jogo where CodUsuario = ${requisicao.params.codUsuario} and Nome = '${requisicao.params.nome}'`, resposta);
})
rota.delete('/jogos/:codUsuario/:nome', (requisicao, resposta) =>{
  execSQL(`Delete from ConstrucaoJogo where CodJogo in (select CodJogo from Jogo where CodUsuario = ${requisicao.params.codUsuario} and nome='${requisicao.params.nome}')`, resposta);
	execSQL(`DELETE from Jogo where CodUsuario = ${requisicao.params.codUsuario} and nome='${requisicao.params.nome}'`, resposta);
})
// devolve jogo que o usuario escolheu
rota.post('/addJogo/:cod/:nome', (requisicao, resposta) => {
  const nome = requisicao.params.nome;
  const cod = requisicao.params.cod;
  execSQL(`insert into Jogo values('${nome}', ${cod}, 0, 1, '1/1/2001', 20000, 0, 0, 0, 0)`, resposta);
})
rota.post('/construir/:codJogo', (requisicao, resposta) => {
  const codJogo = requisicao.params.codJogo;
  const Nome = requisicao.body.ItemConstruido;
  const X = requisicao.body.X;
  const Y = requisicao.body.Y;
  execSQL(`insert into ConstrucaoJogo values(${codJogo}, '${Nome}', ${X}, ${Y})`, resposta);
})
rota.get('/construcao/:codJogo', (requisicao, resposta) => {
  const codJogo = requisicao.params.codJogo;
  execSQL(`select * from ConstrucaoJogo where CodJogo = ${codJogo}`, resposta)
})
//salva o jogo quando o usuario sai
rota.post('/jogo/:cod', (requisicao, resposta) => {
  const codJogo = requisicao.params.cod;
  const a = requisicao.body;
  const xp = a.XP;
  const lvl = parseInt(a.Nivel);
  const caixa = parseInt(a.Caixa);
  const nF = parseInt(a.NumeroFranquias);
  const nFo = parseInt(a.NumeroFornecedores);
  const nI = parseInt(a.NumeroIndustrias);
  execSQL(`update Jogo set XP=${xp}, Nivel=${lvl}, Data='${a.Data}', Caixa=${caixa}, 
  NumeroFranquias=${nF}, NumeroFornecedores=${nFo},
  NumeroIndustrias=${nI} where CodJogo=${codJogo}`, resposta)
})


//rotas das simulacoes
//devolve simulacao a partir do codigo do usuario
rota.get('/simulacoes/:cod', (requisicao, resposta) => {
  execSQL(`select * from Simulacao where CodUsuario = ${requisicao.params.cod}`, resposta);
})
//adiciona simulacao
rota.post('/addSimulacao/:cod/:nome', (requisicao, resposta) => {
  const cod = requisicao.params.cod;
  const nome = requisicao.params.nome;
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
  if(dd<10) {
    dd = '0'+dd
  } 
  if(mm<10) {
    mm = '0'+mm
  } 
  today = mm + '/' + dd + '/' + yyyy;
  execSQL(`insert into Simulacao values(${cod}, '${today}', '${nome}')`, resposta);
})
rota.post('/addConta/:codSimulacao', (requisicao, resposta) => {
  const cod = requisicao.params.codSimulacao;
  const c = requisicao.body;
  const Intervalo = c.Intervalo;
  const Nome = c.Nome;
  const Valor = parseInt(c.Valor);
  const Class = c.Classificacao;
  execSQL(`insert into Patrimonio values(${cod}, '${Intervalo}', '${Nome}', ${Valor}, ${Class})`, resposta);
})
rota.get('/getClassificacoes/:codSimulacao', (requisicao, resposta) => {
  execSQL(`select * from Classificacao where CodSimulacao = ${requisicao.params.codSimulacao}`, resposta);
})
rota.get('/getContas/:codSimulacao', (requisicao, resposta) => {
  const cod = requisicao.params.codSimulacao;
  execSQL(`select * from Patrimonio where CodSimulacao = ${cod}`, resposta)
})
rota.post('/addClassificacao/:codSimulacao/:nome', (requisicao, resposta) => {
  execSQL(`insert into Classificacao values('${requisicao.params.nome}', ${parseInt(requisicao.params.codSimulacao)})`, resposta);
})
rota.delete('/classificacoes/:codSimulacao/:nome', (requisiscao, resposta) => {
  execSQL(`delete Classificacao from Classificacao where CodSimulacao = ${parseInt(requisicao.params.codSimulacao)} and
  Nome='${requisicao.params.nome}'`, resposta);
})