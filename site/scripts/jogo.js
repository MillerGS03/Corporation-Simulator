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
		ctx.fillStyle = "Gray";
		ctx.fillRect(0, 0, canvas.width - 70, 70);
		ctx.moveTo(0, 70);
		ctx.lineTo(canvas.width - 70, 70);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(canvas.width - 70, 0, 70, 0, Math.PI / 2);
		ctx.stroke();
		ctx.moveTo(canvas.width, 0);
		ctx.lineTo(canvas.width - 70, 0);
		ctx.lineTo(canvas.width - 70, 70);
		ctx.fill();
	}
}