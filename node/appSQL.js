const express = require('express');
const app = express();         
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({dest: "./uploads"});
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
          //.then(resultado => console.log(resultado.recordset))
				  .catch(erro => resposta.json(erro));
}

//o simbolo ? indica que id na rota abaixo é opcional
rota.get('/usuario/:id?', (requisicao, resposta) => {
  let filtro = '';
	if (requisicao.params.id) 
		filtro = ' WHERE CodUsuario=' + parseInt(requisicao.params.id);
	execSQL('SELECT * from usuario' + filtro, resposta);
})

// testar no POSTMAN
rota.delete('/usuario/:id', (requisicao, resposta) =>{
	execSQL('DELETE usuario WHERE CodUsuario=' + parseInt(requisicao.params.id), resposta);
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
    execSQL(`INSERT INTO usuario VALUES('${Username}','${Senha}', '${Nome}', '${Sexo}',
                                        '${Biografia}', '${Email}', '${FotoPerfil}', '${ImagemBanner}', '${CorBanner}',
                                        '${CorFundo}'`, resposta);
    resposta.end(resposta.json({ mensagem: 'Incluído!'}));    
})

rota.patch('/usuario/:id', (requisicao, resposta) =>{
    const CodUsuario = parseInt(requisicao.params.id);
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
    execSQL(`UPDATE usuario SET CodUsuario='${CodUsuario}', Username='${Username}', Senha='${Senha}',
                                Nome='${Nome}', Sexo='${Sexo}', Biografia='${Biografia}', Email='${Email}',
                                FotoPerfil='${FotoPerfil}', ImagemBanner='${ImagemBanner}', CorBanner='${CorBanner}',
                                CorFundo='${CorFundo}'
                                WHERE CodUsuario=${CodUsuario}`, resposta);
    resposta.end(resposta.json({ mensagem: 'Alterado!'}));  
})

rota.get('/getCodUsuario/:username', (requisicao, resposta) => {
  const username = requisicao.params.username;
  execSQL(`select CodUsuario from Usuario where Username='${username}'`, resposta);
})

rota.get('/jogos/:cod', (requisicao, resposta) => {
  execSQL(`select * from Jogo where CodUsuario = ${requisicao.params.cod}`, resposta);
})

rota.post('/addJogo/:cod/:nome', (requisicao, resposta) => {
  const nome = requisicao.params.nome;
  const cod = requisicao.params.cod;
  execSQL(`insert into Jogo values('${nome}', ${cod}, 0, '01/01/2001', 5000, 0, 1, 0, 1)`, resposta);
})

rota.post('/jogo/:cod', (requisicao, resposta) => {
  //
})