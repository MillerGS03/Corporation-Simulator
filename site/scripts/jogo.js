var canvas = null;
var ctx = null;

var imgDinheiro = new Image();
var imgNivel = new Image();
var imgCalendario = new Image();
imgDinheiro.src = "imagens/iconeDinheiro.png";
imgNivel.src = "imagens/iconeNivel.png";
imgCalendario.src = "imagens/iconeCalendario.png";


function iniciar()
{
	canvas = document.getElementById('meuCanvas');
	ctx = canvas.getContext("2d");

	var barra = new BarraSuperior();
	desenharFundo();
	barra.desenhar();
}

function BarraSuperior() {
	this.nivel = 5;
	this.xp = 10;
	this.maxXP = 80;
	this.dinheiro = 2000;
	this.dia = 1;
	this.desenhar = function() {
		ctx.fillStyle = "#232323";
		ctx.fillRect(0, 0, canvas.width - 35, 60); // Preenche o retângulo
		ctx.beginPath();
		ctx.arc(canvas.width - 35, 0, 60, 0, Math.PI / 2);
		ctx.stroke(); // Desenha a borda do canto circular
		ctx.moveTo(canvas.width + 25, 0);
		ctx.lineTo(canvas.width - 35, 0);
		ctx.lineTo(canvas.width - 35, 60);
		ctx.fill(); // Preenche o canto circular
		ctx.beginPath();
		ctx.moveTo(0, 60);
		ctx.lineTo(canvas.width - 35, 60);
		ctx.stroke(); // Desenha a borda do retângulo

		// Desenha o nível
		ctx.drawImage(imgNivel, 50, 9);
		ctx.font = "bold 18pt Century Gothic";
		ctx.fillStyle = "White";
		ctx.fillText(this.nivel, 62, 37)

		// Desenha a barra de experiência
		ctx.fillStyle = "#8e8e8e";
		roundRect(88, 18, 200, 20, {lowerRight: 10, upperRight:10}, true, true) // Retângulo base
		var grd = null;
		if (this.xp <= this.maxXP) // Retângulo de tamanho proporcional ao progresso naquele nível
		{
			grd = ctx.createLinearGradient(0, 0, (this.xp / this.maxXP) * 200, 20)
			grd.addColorStop(0, "#4c98a5");
			grd.addColorStop(1, "#4cbbce");
			ctx.fillStyle = grd;
			roundRect(88, 18, (this.xp / this.maxXP) * 200, 20, {lowerRight: 10, upperRight: 10}, true, true);
		}
		else
		{
			grd = ctx.createLinearGradient(0, 0, 200, 20)
			grd.addColorStop(0, "#4c98a5");
			grd.addColorStop(1, "#4cbbce");
			ctx.fillStyle = grd;
			roundRect(88, 18, 200, 20, {lowerRight: 10, upperRight: 10}, true, true);
		}
		ctx.font = "bold 12pt Century Gothic";
		ctx.textAlign = "center";
		ctx.fillStyle = "White";
		ctx.fillText(this.xp + "/" + this.maxXP + " xp", 188, 34)

		// Desenha o dinheiro
		ctx.drawImage(imgDinheiro, 420, 9);
		ctx.font = "bold 15pt Century Gothic";
		ctx.textAlign = "left";
		ctx.fillStyle = "Green";
		ctx.fillText(this.dinheiro + ",00", 463, 36)

		// Desenha o dia
		ctx.drawImage(imgCalendario, 690, 9);
		ctx.fillStyle = "White";
		ctx.fillText(this.dia + "° dia", 733, 36);
	}
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