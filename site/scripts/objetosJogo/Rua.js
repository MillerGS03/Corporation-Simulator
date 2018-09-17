var imgRua = new Image();
var carro1 = new Image();
var carro2 = new Image();
var carro3 = new Image();
var carro4 = new Image();
var carro5 = new Image();
var nula = new Image();
imgRua.src = "imagens/rua.png"
carro1.src = "imagens/carro1.png";
carro2.src = "imagens/carro2.png";
carro3.src = "imagens/carro3.png";
carro4.src = "imagens/carro4.png";
carro5.src = "imagens/carro5.png";
nula.src = "imagens/null.png";
var yc1 = 0;
var yc2 = 710;
var yc3 = -100;
var yc4 = 820;
var yc5 = -200;

function Rua()
{
	this.desenharRua = function() {
		ctx.drawImage(imgRua, 700, 60);
	}
	this.desenharCarros = function() {
		ctx.drawImage(carro1, 710, yc1++);
		ctx.drawImage(carro2, 750, yc2--);
		ctx.drawImage(carro3, 710, yc3++);
		ctx.drawImage(carro4, 750, yc4--);
		ctx.drawImage(carro5, 710, yc5++);
		if (yc1 > canvas.height)
			yc1 = 0;
		if (yc2 < canvas.height)
			yc2 = 710;
		if (yc3 > canvas.height)
			yc3 = -100;
		if (yc4 < canvas.height)
			yc4 = 820;
		if (yc5 > canvas.height)
			yc5 = -200;
	}
	this.apagarCarros = function() {
		ctx.drawImage(nula, 710, yc1++);
		ctx.drawImage(nula, 750, yc2--);
		ctx.drawImage(nula, 710, yc3++);
		ctx.drawImage(nula, 750, yc4--);
		ctx.drawImage(nula, 710, yc5++);
	}
	this.testar = function() {
		if (yc1 > canvas.height)
			yc1 = 0;
		if (yc2 < canvas.height)
			yc2 = 710;
		if (yc3 > canvas.height)
			yc3 = -100;
		if (yc4 < canvas.height)
			yc4 = 820;
		if (yc5 > canvas.height)
			yc5 = -200;
	}
	this.desenha = function(){
		this.desenharRua();
		setTimeout(this.desenharCarros, 300);
		this.apagarCarros();
		this.testar();
	}
}