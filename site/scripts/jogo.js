/**
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
/**
 * Calendário
 * @type {Calendario}
 */
var calendario;
var construcao;
var estatisticas;
var rua;
var timerDias = null;
var contador = 0;
var itensConstruidos;
var efetuacao;

var xMouse;
var yMouse;

iniciar();
function iniciar()
{
	canvas = document.getElementById('meuCanvas');
	ctx = canvas.getContext("2d");

	barra = new BarraSuperior();
	barra.dinheiro = 4000000;
	barra.onNivelMudou = function() {
		construcao.setNivel(barra.nivel);
	}

	painelNotificacoes = new PainelNotificacoes();

	mapa = new Mapa();
	calendario = new Calendario();
	estatisticas = new Estatisticas();
	construcao = new Construcao();

	rua = new Rua();
	rua.iniciarMovimentacao(true);

	criarBotoes();
	ativarBotoes();
	atualizar();

	contador = 0;
	timerDias = setInterval(function() {
		contador++;
		if (contador % 10 == 0)
		{
			passarDia();
			atualizar();
			barra.ganharXP(1);
		}
		if (contador % 200 == 0)
			painelNotificacoes.adicionarNotificacao("bla", "olá, babaca", calendario.dia, calendario.mes, calendario.ano);
	}, 50);

	$("#meuCanvas").on("mousemove", (function(e){
		if (e.bubbles)
		{
			var rect = e.target.getBoundingClientRect();
	
			xMouse = e.clientX - rect.left;
			yMouse = e.clientY - rect.top;
		}
	})); 

	calendario.adicionarEvento(25, 2, 1, 1);
}
function finalizarJogo()
{
	$("#meuCanvas").off();
	clearInterval(timerDias);
}
function criarBotoes() 
{
	botoes = new Array();
	itensConstruidos = new Array();

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
	desenharFundo();
	barra.desenhar();
	for (var i = 0; i < 5; i++)
		botoes[i].desenhar();
	painelNotificacoes.desenhar();
	mapa.desenhar();
	calendario.desenhar();
	construcao.desenhar();
	estatisticas.desenhar();
	if (efetuacao != null && efetuacao.ativo)
		efetuacao.desenhar();
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
	for (var i = 0; i < itensConstruidos.length; i++)
		if (itensConstruidos[i].menuVisivel)
			itensConstruidos[i].menu.desenhar();
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