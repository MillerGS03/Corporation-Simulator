adicionarScript("scripts/objetosJogo/botoes/BotaoCircular.js")
adicionarScript("scripts/objetosJogo/botoes/BotaoRetangular.js");
adicionarScript("scripts/objetosJogo/BarraSuperior.js")
adicionarScript("scripts/objetosJogo/PainelNotificacoes.js")
adicionarScript("scripts/objetosJogo/menus/Mapa.js")
adicionarScript("scripts/objetosJogo/menus/Estatisticas.js")
adicionarScript("scripts/objetosJogo/menus/Construcao.js")
adicionarScript("scripts/objetosJogo/menus/Calendario.js")
adicionarScript("scripts/objetosJogo/Rua.js");

var canvas = null;
var ctx = null;

// Imagens dos botões circulares
var imgBtnEstatisticas = new Image();
var imgBtnConstrucao = new Image();
var imgBtnMapa = new Image();
var imgBtnCalendario = new Image();
var imgBtnNotificacoes = new Image();
var imgBtnNotificacoes2 = new Image();
imgBtnEstatisticas.src = "imagens/botoes/btnEstatisticas.png";
imgBtnConstrucao.src = "imagens/botoes/btnConstrucao.png"
imgBtnMapa.src = "imagens/botoes/btnMapa.png";
imgBtnCalendario.src = "imagens/botoes/btnCalendario.png";
imgBtnNotificacoes.src = "imagens/botoes/btnNotificacoes.png";
imgBtnNotificacoes2.src = "imagens/botoes/btnNotificacoes2.png";

//Imagens dos botões circulares no evento hover
var imgBtnEstatisticasHover = new Image();
var imgBtnConstrucaoHover = new Image();
var imgBtnMapaHover = new Image();
var imgBtnCalendarioHover = new Image();
imgBtnEstatisticasHover.src = "imagens/botoes/btnEstatisticasHover.png";
imgBtnConstrucaoHover.src = "imagens/botoes/btnConstrucaoHover.png"
imgBtnMapaHover.src = "imagens/botoes/btnMapaHover.png";
imgBtnCalendarioHover.src = "imagens/botoes/btnCalendarioHover.png";

var botoes = new Array();
var barra;
var btnEstatisticas;
var btnConstrucao;
var btnMapa;
var btnCalendario;
var btnNotificacoes;
var painelNotificacoes;
var mapa;
var calendario;
var construcao;
var estatisticas;
var rua;

function iniciar()
{
 	canvas = document.getElementById('meuCanvas');
	ctx = canvas.getContext("2d");

	barra = new BarraSuperior();
	btnEstatisticas = new BotaoCircular(60, 130, 40, 48,
		"#347b87", "#4c98a5", imgBtnEstatisticas, imgBtnEstatisticasHover,
		"bold 13pt Century Gothic", "#232323", "Estatísticas", true, true, false);
	btnConstrucao = new BotaoCircular(60, 230, 40, 48,
		"#347b87", "#4c98a5", imgBtnConstrucao, imgBtnConstrucaoHover,
		"bold 13pt Century Gothic", "#232323", "Construção", true, true, false);
	btnMapa = new BotaoCircular(60, 330, 40, 48,
		"#347b87", "#4c98a5", imgBtnMapa, imgBtnMapaHover,
		"bold 14pt Century Gothic", "#232323", "Mapa", true, true, false);
	btnCalendario = new BotaoCircular(60, 430, 40, 48,
		"#347b87", "#4c98a5", imgBtnCalendario, imgBtnCalendarioHover,
		"bold 13pt Century Gothic", "#232323", "Calendário", true, true, false);
	btnNotificacoes = new BotaoCircular(canvas.width - 42, 110, 32, 32,
		"#232323", "#535353", imgBtnNotificacoes, imgBtnNotificacoes,
		"bold 16pt Century Gothic", "#c80000", "", false, true, true);

	painelNotificacoes = new PainelNotificacoes();

	mapa = new Mapa();
	estatisticas = new Estatisticas();
	calendario = new Calendario();
	construcao = new Construcao();

	rua = new Rua();
	rua.iniciarMovimentacao(true);

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

	ativarBotoes();

	atualizar();
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
	for (var i = 0; i < botoes.length; i++)
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
function adicionarScript(caminho)
{
	document.write("<script type=\"text/javascript\" src=\"" + caminho + "\"></script>")
}