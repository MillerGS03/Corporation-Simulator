var canvas = null;
var ctx = null;

function iniciar()
{
	canvas = document.getElementById('meuCanvas');
	ctx = canvas.getContext("2d");

	var barra = new BarraSuperior();
	barra.desenhar();
}

function BarraSuperior() {
	this.nivel = 1;
	this.xp = 0;
	this.maxXP = 80;
	this.dinheiro = 2500;
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

		var imgDinheiro = new Image();
		imgDinheiro.src = "imagens/iconeDinheiro.png";
		ctx.drawImage(imgDinheiro, 35, 35);
	}
}