var imgRua = new Image();
var carro1 = new Image();
var carro2 = new Image();
var carro3 = new Image();
var carro4 = new Image();
var carro5 = new Image();
imgRua.src = "imagens/rua.png"
carro1.src = "imagens/carros/carro1.png";
carro2.src = "imagens/carros/carro2.png";
carro3.src = "imagens/carros/carro3.png";
carro4.src = "imagens/carros/carro4.png";
carro5.src = "imagens/carros/carro5.png";

function Rua()
{
	this.x = 700;
	this.y = 0;

	this.carros = new Array();

	this.carros.push(new Carro(this.x + 28, 0, carro1));
	this.carros.push(new Carro(this.x + 65, 710, carro2));
	this.carros.push(new Carro(this.x + 28, -100, carro3));
	this.carros.push(new Carro(this.x + 65, 820, carro4));
	this.carros.push(new Carro(this.x + 28, -200, carro5));
	
	this.desenhar = function() {
		ctx.drawImage(imgRua, this.x, this.y);
		this.desenharCarros();
	}
	this.iniciarMovimentacao = function(autoUpdate) {
			setInterval(this.moverCarros, 10, this.carros, autoUpdate);
	}
	this.moverCarros = function(arrayCarros, autoUpdate) {
		arrayCarros;

		arrayCarros[0].y++;
		arrayCarros[1].y--;
		arrayCarros[2].y++;
		arrayCarros[3].y--;
		arrayCarros[4].y++;

		if (arrayCarros[0].y > canvas.height)
			arrayCarros[0].y = 0;
		if (arrayCarros[1].y < 0)
			arrayCarros[1].y = 710;
		if (arrayCarros[2].y > canvas.height)
			arrayCarros[2].y = -100;
		if (arrayCarros[3].y < 0)
			arrayCarros[3].y = 820;
		if (arrayCarros[4].y > canvas.height)
			arrayCarros[4].y = -200;

		if (autoUpdate)
			atualizar();
	}
	this.desenharCarros = function() {
		this.carros[0].desenhar();
		this.carros[1].desenhar();
		this.carros[2].desenhar();
		this.carros[3].desenhar();
		this.carros[4].desenhar();
	}
	this.desenha = function(){
		this.desenharRua();
		setTimeout(this.desenharCarros, 300);
		this.testar();
	}
}
function Carro(x, y, img) {
	this.x = x;
	this.y = y;
	this.imagem = img;

	this.desenhar = function() {
		ctx.drawImage(this.imagem, this.x, this.y);
	}
}