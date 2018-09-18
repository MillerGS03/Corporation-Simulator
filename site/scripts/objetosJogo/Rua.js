var imgRua = new Image();
imgRua.src = "imagens/rua.png";

var imgsCarros = new Array();

for (var i = 0; i < 5; i++)
{
	imgsCarros.push(new Image());
	imgsCarros[i].src = "imagens/carros/carro" + (i + 1) + ".png";
}

function Rua()
{
	this.x = 700;
	this.y = 0;

	this.carros = new Array();

	this.carros.push(new Carro(this.x + 28, - (100 + Math.floor(Math.random() * 2500)), imgsCarros[0]));
	this.carros.push(new Carro(this.x + 65, canvas.height + 200 + Math.floor(Math.random() * 2500), imgsCarros[3]));
	this.carros.push(new Carro(this.x + 28, - (100 + Math.floor(Math.random() * 2500)), imgsCarros[1]));
	this.carros.push(new Carro(this.x + 65, canvas.height + 200 + Math.floor(Math.random() * 2500), imgsCarros[4]));
	this.carros.push(new Carro(this.x + 28, - (100 + Math.floor(Math.random() * 2500)), imgsCarros[2]));
	
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
		{
			arrayCarros[0].y = - (200 + Math.floor(Math.random() * 2500));
			arrayCarros[0].imagem = imgsCarros[Math.floor(Math.random() * 3)];
		}
		if (arrayCarros[1].y < 0)
		{
			arrayCarros[1].y = canvas.height + 200 + Math.floor(Math.random() * 2500);
			arrayCarros[1].imagem = imgsCarros[Math.floor(Math.random() * 2) + 3];
		}
		if (arrayCarros[2].y > canvas.height)
		{
			arrayCarros[2].y = - (200 + Math.floor(Math.random() * 2500));
			arrayCarros[2].imagem = imgsCarros[Math.floor(Math.random() * 3)];
		}
		if (arrayCarros[3].y < 0)
		{
			arrayCarros[3].y = canvas.height + 200 + Math.floor(Math.random() * 2500);
			arrayCarros[3].imagem = imgsCarros[Math.floor(Math.random() * 2) + 3];
		}
		if (arrayCarros[4].y > canvas.height)
		{
			arrayCarros[4].y = - (200 + Math.floor(Math.random() * 2500));
			arrayCarros[4].imagem = imgsCarros[Math.floor(Math.random() * 3)];
		}

		if (Math.abs(arrayCarros[0].y - arrayCarros[2].y) <= 70)
			arrayCarros[0].y = - (200 + Math.floor(Math.random() * 2500));
		if (Math.abs(arrayCarros[0].y - arrayCarros[4].y) <= 70)
			arrayCarros[4].y = - (200 + Math.floor(Math.random() * 2500));
		if (Math.abs(arrayCarros[2].y - arrayCarros[4].y) <= 70)
			arrayCarros[2].y = - (200 + Math.floor(Math.random() * 2500));
		if (Math.abs(arrayCarros[1].y - arrayCarros[3].y) <= 70)
			arrayCarros[1].y = canvas.height + 200 + Math.floor(Math.random() * 2500);
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