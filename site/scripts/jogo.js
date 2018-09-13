var canvas = null;
var ctx = null;

var imgDinheiro = new Image();
var imgNivel = new Image();
imgDinheiro.src = "imagens/iconeDinheiro.png";
imgNivel.src = "imagens/iconeNivel.png";


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
	this.xp = 20;
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
		ctx.fillRect(88, 18, 200, 20);
		ctx.strokeRect(88, 18, 200, 20);
		var grd = ctx.createLinearGradient(0, 0, (this.xp / this.maxXP) * 200, 20)
		grd.addColorStop(0, "#4c98a5");
		grd.addColorStop(1, "#4cbbce");
		ctx.fillStyle = grd;
		ctx.fillRect(88, 18, (this.xp / this.maxXP) * 200, 20);
		ctx.strokeRect(88, 18, (this.xp / this.maxXP) * 200, 20);
		ctx.font = "bold 12pt Century Gothic";
		ctx.fillStyle = "White";
		ctx.fillText(this.xp + "/" + this.maxXP + " xp", 158, 34)

		// Desenha o dinheiro
		ctx.drawImage(imgDinheiro, 320, 9);
		ctx.font = "bold 16pt Century Gothic";
		ctx.fillStyle = "Green";
		ctx.fillText(this.dinheiro + ",00", 363, 37)
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