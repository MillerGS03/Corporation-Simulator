adicionarScript("scripts/objetosJogo/BotaoCircular.js")
adicionarScript("scripts/objetosJogo/BarraSuperior.js")

var canvas = null;
var ctx = null;

// Imagens dos botões circulares
var imgBtnEstatisticas = new Image();
var imgBtnConstrucao = new Image();
var imgBtnMapa = new Image();
var imgBtnCalendario = new Image();

imgBtnEstatisticas.src = "imagens/btnEstatisticas.png";
imgBtnConstrucao.src = "imagens/btnConstrucao.png"
imgBtnMapa.src = "imagens/btnMapa.png";
imgBtnCalendario.src = "imagens/btnCalendario.png";

var botoes = new Array();
var barra;
var btnEstatisticas;
var btnConstrucao;
var btnMapa;
var btnCalendario;

function iniciar()
{
 	canvas = document.getElementById('meuCanvas');
	ctx = canvas.getContext("2d");

	barra = new BarraSuperior();
	btnEstatisticas = new BotaoCircular(60, 140, 50,
		"#347b87", "#4c98a5", imgBtnEstatisticas,
		"bold 14pt Century Gothic", "Black", "Estatísticas", true, true);
	btnConstrucao = new BotaoCircular(60, 250, 50,
		"#347b87", "#4c98a5", imgBtnConstrucao,
		"bold 14pt Century Gothic", "Black", "Construção", true, true);
	btnMapa = new BotaoCircular(60, 360, 50,
		"#347b87", "#4c98a5", imgBtnMapa,
		"bold 14pt Century Gothic", "Black", "Mapa", true, true);
	btnCalendario = new BotaoCircular(60, 470, 50,
		"#347b87", "#4c98a5", imgBtnCalendario,
		"bold 14pt Century Gothic", "Black", "Calendário", true, true);

	botoes.push(btnEstatisticas);
	botoes.push(btnConstrucao);
	botoes.push(btnMapa);
	botoes.push(btnCalendario);

	atualizar();

	btnEstatisticas.ativarInteracao();
	btnConstrucao.ativarInteracao();
	btnMapa.ativarInteracao();
	btnCalendario.ativarInteracao();

}
function atualizar()
{
	desenharFundo();
	barra.desenhar();

	btnEstatisticas.desenhar();
	btnConstrucao.desenhar();
	btnMapa.desenhar();
	btnCalendario.desenhar();
}


function desenharFundo()
{
	var grd = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
	grd.addColorStop(0, "#08a52a");
	grd.addColorStop(1,"#09bc30");

	ctx.fillStyle = grd;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
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