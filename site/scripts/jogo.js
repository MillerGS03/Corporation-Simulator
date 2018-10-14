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

var xMouse;
var yMouse;

iniciar();
function iniciar()
{
	canvas = document.getElementById('meuCanvas');
	ctx = canvas.getContext("2d");

	barra = new BarraSuperior();
	barra.dinheiro = 400000;
	barra.onNivelMudou = function() {
		construcao.setNivel(barra.nivel);
	}

	painelNotificacoes = new PainelNotificacoes();

	mapa = new Mapa();
	estatisticas = new Estatisticas();
	calendario = new Calendario();
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
	}, 50);

	$("#meuCanvas").on("mousemove", (function(e){
			var rect = e.target.getBoundingClientRect();
	
			xMouse = e.clientX - rect.left;
			yMouse = e.clientY - rect.top;
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
	mapa.setFator(calendario.fatorEconomia());
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