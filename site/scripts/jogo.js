﻿/**
 * Variável contendo o elemento canvas;
 * @type {HTMLCanvasElement}
 */
var canvas = null;
/**
 * Variável de contexto do canvas.
 * @type {CanvasRenderingContext2D}
 */
var ctx = null;

var botoes;

/**
 * Barra de informações (Nível, dinheiro em caixa e dia do mês)
 * @type {BarraSuperior}
 */
var barra;
var btnEstatisticas;
var btnConstrucao;
var btnMapa;
var btnCalendario;
var btnNotificacoes;
var painelNotificacoes;
var mapa;
var menuJogo;
var tutorial;
/**
 * Calendário
 * @type {Calendario}
 */
var calendario;
var construcao;
var estatisticas;
var rua;

var timerDias = null;
var timerDesenhar = null;

var contador = 0;
var itensConstruidos;
var efetuacao;

var xMouse;
var yMouse;

var carregado = false;

var fatorEscala = 1;

// Sons:
var musicas = ["musicas/airtone_-_backwaters.ogg"];
var musica = document.createElement("audio");

iniciar();
function iniciar()
{
	tocarMusica();

	canvas = document.getElementById('meuCanvas');
	ctx = canvas.getContext("2d");

	function redimensionarCanvas() 
	{
		fatorEscala = window.innerWidth / 1500;
		if (96 * window.innerHeight / 100 < 700 * fatorEscala || 72 * window.innerWidth / 100 > 1000 * (96 * window.innerHeight / 70000))
			fatorEscala = 96 * window.innerHeight / 70000;

		$("#meuCanvas").css("left", "calc((76vw - 1000px * " + fatorEscala + ") / 2)")
		$("#meuCanvas").css("top", "calc((96vh - 700px * " + fatorEscala + ") / 2)");
		$("#meuCanvas").css("transform", "scale(" + fatorEscala + ")")
	}
	redimensionarCanvas();
	window.addEventListener("resize", redimensionarCanvas);

	barra = new BarraSuperior();
	barra.onNivelMudou = function() {
		construcao.setNivel(barra.nivel);
	}
	painelNotificacoes = new PainelNotificacoes();

	mapa = new Mapa();
	calendario = new Calendario();
	estatisticas = new Estatisticas();
	construcao = new Construcao();

	tutorial = new Tutorial();
	menuJogo = new MenuJogo();
	$(document).on("keydown", function(e) {
		if (e.keyCode == 27)
			menuJogo.abrirFechar();
	})

	rua = new Rua();
	rua.iniciarMovimentacao(true);

	carregarDados();

	setTimeout(function(){
		criarBotoes();
		ativarBotoes();
		timerDesenhar = setInterval(atualizar, 1000 / 60); // 60 FPS
	}, 10);
	$("#meuCanvas").on("mousemove", (function(e){
		if (e.bubbles)
		{
			var rect = e.target.getBoundingClientRect();
	
			xMouse = (e.clientX - rect.left) / fatorEscala;
			yMouse = (e.clientY - rect.top) / fatorEscala;
		}
	})); 

	calendario.adicionarEvento(25, 2, 1, 1);
}
function intervaloDias()
{
	contador++;
	if (contador % 10 == 0)
	{
		passarDia();
		barra.ganharXP(1);
	}
	if (contador % 200 == 0)
		painelNotificacoes.adicionarNotificacao("bla", "Hello, mi amigo", calendario.dia, calendario.mes, calendario.ano);
}
function finalizarJogo()
{
	$("#meuCanvas").off();
	$(document).off();
	rua.pausar();
	clearInterval(timerDias);
	clearInterval(timerDesenhar);
	salvar();
	musica.pause();
}
function criarBotoes() 
{
	btnEstatisticas = new BotaoCircular(60, 130, 40, 48,
		"#347b87", "#4c98a5", imgBtnEstatisticas, imgBtnEstatisticasHover,
		"bold 13pt Century Gothic", "#232323", "Estatísticas", true, false, false);
	btnConstrucao = new BotaoCircular(60, 230, 40, 48,
		"#347b87", "#4c98a5", imgBtnConstrucao, imgBtnConstrucaoHover,
		"bold 13pt Century Gothic", "#232323", "Construção", true, false, false);
	btnMapa = new BotaoCircular(60, 330, 40, 48,
		"#347b87", "#4c98a5", imgBtnMapa, imgBtnMapaHover,
		"bold 14pt Century Gothic", "#232323", "Mapa", true, false, false);
	btnCalendario = new BotaoCircular(60, 430, 40, 48,
		"#347b87", "#4c98a5", imgBtnCalendario, imgBtnCalendarioHover,
		"bold 13pt Century Gothic", "#232323", "Calendário", true, false, false);
	btnNotificacoes = new BotaoCircular(canvas.width - 42, 110, 32, 32,
		"#232323", "#535353", imgBtnNotificacoes, imgBtnNotificacoes,
		"bold 16pt Century Gothic", "#c80000", "", false, true, true);
	btnNotificacoes.atualizarNotificacoes = function(qtasNotificacoes) {	
		if (qtasNotificacoes == "0")
		{
			this.text = "";
			this.backgroundImage = imgBtnNotificacoes;
			this.backgroundHoverImage = imgBtnNotificacoes;
		}
		else
		{
			this.text = qtasNotificacoes;
			this.backgroundImage = imgBtnNotificacoes2;
			this.backgroundHoverImage = imgBtnNotificacoes2;
		}
	}
	btnNotificacoes.onclick = function() {
		painelNotificacoes.abrirFechar();
	}
	btnMapa.onclick = function() {
		mapa.abrirFechar();
	}
	btnEstatisticas.onclick = function() {
		estatisticas.abrirFechar();
	}
	btnCalendario.onclick = function() {
		calendario.abrirFechar();
	}
	btnConstrucao.onclick = function() {
		construcao.abrirFechar();
	}

	botoes.push(btnEstatisticas);
	botoes.push(btnConstrucao);
	botoes.push(btnMapa);
	botoes.push(btnCalendario);
	botoes.push(btnNotificacoes);
}
function ativarBotoes()
{
	for (var i = 0; i < botoes.length; i++)
		botoes[i].ativarInteracao();
}
function desativarBotoes()
{
	for (var i = 0; i < botoes.length; i++)
		botoes[i].desativarInteracao();
}
function atualizar()
{
	if (carregado)
	{
		desenharFundo();
		barra.desenhar();
		for (var i = 0; i < botoes.length; i++)
			if (botoes != null && botoes[i] != null)
				botoes[i].desenhar();
		for (var i = 0; i < itensConstruidos.length; i++)
			if (itensConstruidos[i].menuVisivel)
				itensConstruidos[i].menu.desenhar();
		painelNotificacoes.desenhar();
		mapa.desenhar();
		calendario.desenhar();
		construcao.desenhar();
		estatisticas.desenhar();
		tutorial.desenhar();
		if (efetuacao != null && efetuacao.ativo)
			efetuacao.desenhar();
		menuJogo.desenhar();
		desenharBordasCanvas();
	}
}
function desenharBordasCanvas()
{
	ctx.save();

	ctx.lineWidth = 2;
	ctx.fillStyle = "black";

	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(canvas.width, 0);
	ctx.lineTo(canvas.width, canvas.height);
	ctx.lineTo(0, canvas.height);
	ctx.lineTo(0, 0);
	ctx.stroke();
	ctx.closePath();

	ctx.restore();
}
function desenharFundo()
{
	var grd = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
	grd.addColorStop(0, "#08a52a");
	grd.addColorStop(1,"#09bc30");

	ctx.fillStyle = grd;
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	rua.desenhar();

	for (var i = 0; i < itensConstruidos.length; i++)
		itensConstruidos[i].desenhar();
}
function passarDia()
{
	calendario.passarDia();
	barra.atualizarDia(calendario.dia);
	estatisticas.adicionarValor(barra.dinheiro);
	estatisticas.isPassouMes(calendario.mes);
	estatisticas.setEconomia(calendario.fatorEconomia());
	estatisticas.setCustos(mapa.custoTotal());
	estatisticas.setGanhos(mapa.ganhoTotal());
	var l = mapa.ganhoTotal() - mapa.custoTotal();
	l = (l<0?(l*(-1)):l)
	estatisticas.setLucroPrejuizo(l);
	mapa.setFator(calendario.fatorEconomia());
	barra.dinheiro += (mapa.ganhoTotal() - mapa.custoTotal());
}

/**
 * Mostra uma tela de confirmação de compra, exibindo o nome, o preço e as opções de pagamento.
 * @param {string} nome Nome do item a ser comprado.
 * @param {number} preco Preço do item.
 * @param {boolean} aceitaCredito Se aceita ou não pagamento com crédito.
 * @param {boolean} aceitaDebito Se aceita ou não pagamento com débito.
 * @param {number} qtasParcelasMaximo Máximo de parcelas no crédito.
 * @param {Function} funcaoSucesso Função executada caso a compra seja realizada com sucesso.
 */
function fazerCompra(nome, preco, aceitaCredito, aceitaDebito, qtasParcelasMaximo, funcaoSucesso)
{
	efetuacao = new EfetuacaoDeCompra(nome, preco, aceitaCredito, aceitaDebito, qtasParcelasMaximo, funcaoSucesso);
	efetuacao.ativar();
}

/**
 * Recebe um valor inteiro e retorna uma string no formato $xxxx,xx.
 * @param {number} valor Valor inteiro.
 */
function formatarDinheiro(valor)
{
	return "$" + valor.toFixed(2).replace(".", ",");
}

/**
 * Recebe o dia, o mês e o ano e retorna uma data no formato dd/mm/aa. Se o ano for omitido, retorna dd/mm.
 * @param {number} dia 
 * @param {number} mes 
 * @param {number} ano 
 * @return {string} Data
 */
function formatarData(dia, mes, ano)
{
	var data = (dia < 10?"0" + dia:dia) + "/" + (mes < 10?"0" + mes:mes);
	if (ano != null)
		data += "/" + (ano < 10?"0" + ano:ano);
	return data;
}
function roundRect(x, y, width, height, radius, fill, stroke) // Desenha um retângulo com bordas redondas
{
	var cornerRadius = { upperLeft: 0, upperRight: 0, lowerLeft: 0, lowerRight: 0 };
    if (typeof stroke == "undefined") {
        stroke = true;
    }
    if (typeof radius === "object") {
        for (var side in radius) {
            cornerRadius[side] = radius[side];
        }
	}
	else if (typeof radius === "number")
		for (var side in cornerRadius)
			cornerRadius[side] = radius;

    ctx.beginPath();
    ctx.moveTo(x + cornerRadius.upperLeft, y);
    ctx.lineTo(x + width - cornerRadius.upperRight, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + cornerRadius.upperRight);
    ctx.lineTo(x + width, y + height - cornerRadius.lowerRight);
    ctx.quadraticCurveTo(x + width, y + height, x + width - cornerRadius.lowerRight, y + height);
    ctx.lineTo(x + cornerRadius.lowerLeft, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - cornerRadius.lowerLeft);
    ctx.lineTo(x, y + cornerRadius.upperLeft);
    ctx.quadraticCurveTo(x, y, x + cornerRadius.upperLeft, y);
    ctx.closePath();
    if (stroke) {
        ctx.stroke();
    }
    if (fill) {
        ctx.fill();
	}
}
function carregarDados()
{
	itensConstruidos = new Array();
	botoes = new Array();
	var aux = jogo.Data;
	var ano = parseInt(aux.substring(6));
	var mes = parseInt(aux.substring(3, 5));
	var dia = parseInt(aux.substring(0, 2));
	calendario.dia = dia;
	calendario.mes = mes;
	calendario.ano = ano;
	barra.atualizarDia(dia);
	barra.ganharXP(jogo.XP, false);
	mapa.banco.saldo = jogo.ContaBancoMovimento; // @TODO Resolver informações do banco
	menuJogo.setAlturaSom(5); // @TODO Puxar do banco de dados
	mapa.setNumeros(parseInt(jogo.NumeroFranquias), parseInt(jogo.NumeroFornecedores), parseInt(jogo.NumeroIndustrias));
	$.ajax({
		url: 'http://' + local + ':3000/construcao/' + jogo.CodJogo
	}).done(function(dados){
		for (var i = 0; i < dados.length; i++)
		{
			switch(dados[i].ItemConstruido)
			{
				case 'Armazém':
					itensConstruidos[i] = new ItemConstruido(ItemConstruido.armazem, false);
				break;
	
				case 'Garagem':
					itensConstruidos[i] = new ItemConstruido(ItemConstruido.garagem, false);
				break;
	
				case 'Operacional':
					itensConstruidos[i] = new ItemConstruido(ItemConstruido.operacional, false);
				break;
	
				case 'R. Humanos':
					itensConstruidos[i] = new ItemConstruido(ItemConstruido.recursosHumanos, false);
				break;
	
				case 'Marketing':
					itensConstruidos[i] = new ItemConstruido(ItemConstruido.marketing, false);
				break;
			}
			itensConstruidos[i].setX(dados[i].X);
			itensConstruidos[i].setY(dados[i].Y);
			itensConstruidos[i].passarItens(itensConstruidos);
		}
		for(var i = 0; i < itensConstruidos.length; i++){
			botoes.push(itensConstruidos[i].botao)
		}
	})
	if (!(calendario.dia < 3 && calendario.mes == 1 && calendario.ano == 1))
	{
		setTimeout(ativarBotoes, 50);
		setTimeout(ativarBotoes, 500);
	}
	contador = 0;

	if (jogo.Caixa == -1)
	{
		barra.dinheiro = 20000;
		tutorial.abrirFechar();
	}
	else
	{
		barra.dinheiro = jogo.Caixa;
		timerDias = setInterval(intervaloDias, 50);
	}
	carregado = true;
}
function salvar()
{
	var atualizar = new Object();
	atualizar.XP = barra.getXPTotal();
	atualizar.Data = formatarData(calendario.dia, calendario.mes, calendario.ano);
	atualizar.Caixa = barra.dinheiro;
	atualizar.ContaBancoMovimento = mapa.banco.saldo;
	atualizar.NumeroFranquias = mapa.numeroFranquias;
	atualizar.NumeroFornecedores = mapa.numeroFornecedores;
	atualizar.NumeroIndustrias = mapa.numeroIndustrias;
	$.post('http://' + local + ':3000/jogo/' + jogo.CodJogo, atualizar);
}
function tocarMusica()
{
	var novaMusica = musicas[Math.floor(Math.random() * musicas.length)];
	while (novaMusica == musica.src && musicas.length > 1)
		novaMusica = musicas[Math.floor(Math.random() * musicas.length)];

	musica.src = novaMusica;
	musica.load();
	musica.play();
	musica.onloadeddata = function() {
		setTimeout(tocarMusica, (musica.duration + 1) * 1000);
	}
}
function tocarSom(caminho)
{
	var audio = document.createElement("audio");
	audio.src = caminho;
	audio.load();
	audio.play();
}