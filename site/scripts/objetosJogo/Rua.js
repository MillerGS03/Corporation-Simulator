var imgRua = new Image();
imgRua.src = "imagens/rua.png";

var imgsCarros = new Array();

for (var i = 0; i < 10; i++)
{
	imgsCarros.push(new Image());
	imgsCarros[i].src = "imagens/carros/carro" + (i + 1) + ".png";
}

function Rua()
{
	var forcarParada = false;

	this.x = 700;
	this.y = 0;

	this.qtosCarrosDescendo = 2;
	this.qtosCarrosSubindo = 2;

	this.carros = new Array();

	var intervalo = null;

	for (var i = 0; i < this.qtosCarrosDescendo; i++)
		this.carros.push(new Carro(this.x + 30, - (100 + Math.floor(Math.random() * 2500)),
		                           imgsCarros[Math.floor(Math.random() * 5)]));
	for (var i = this.qtosCarrosDescendo; i < this.qtosCarrosDescendo + this.qtosCarrosSubindo; i++)
		this.carros.push(new Carro(this.x + 69, canvas.height + 200 + Math.floor(Math.random() * 2500),
		                           imgsCarros[Math.floor(Math.random() * 5) + 5]));
	
	this.desenhar = function() {
		ctx.drawImage(imgRua, this.x, this.y);
		this.desenharCarros();
	}
	this.iniciarMovimentacao = function(autoUpdate) {
			forcarParada = false;
			for (var i = 0; i < this.carros.length; i++)
				this.carros[i].parado = false;
			intervalo = setInterval(this.moverCarros, 10, this, autoUpdate);
	}
	this.pararMovimentacao = function() {
		forcarParada = true;
	}
	this.moverCarros = function(ruaUsada, autoUpdate) {
		arrayCarros = ruaUsada.carros;

		for (var i = 0; i < ruaUsada.qtosCarrosDescendo; i++)
			arrayCarros[i].moverCarro(1, forcarParada);
		for (var i = ruaUsada.qtosCarrosDescendo; i < arrayCarros.length; i++)
			arrayCarros[i].moverCarro(-1, forcarParada);

		for (var i = 0; i < ruaUsada.qtosCarrosDescendo; i++)
			for (var j = i + 1; j < ruaUsada.qtosCarrosDescendo; j++)
				if (Math.abs(arrayCarros[i].y - arrayCarros[j].y) <= 200)
					arrayCarros[i].y = - (200 + Math.floor(Math.random() * 2500));

		for (var i = ruaUsada.qtosCarrosDescendo; i < arrayCarros.length; i++)
			for (var j = i + 1; j < arrayCarros.length; j++)
				if (Math.abs(arrayCarros[i].y - arrayCarros[j].y) <= 200)
					arrayCarros[i].y = canvas.height + 200 + Math.floor(Math.random() * 2500);

		if (autoUpdate)
			atualizar();

		if (forcarParada)
		{
			var todosParados = true;
			for (var i = 0; i < arrayCarros.length; i++)
				if (!arrayCarros[i].parado)
					todosParados = false;
			if (todosParados)
			{
				clearInterval(intervalo);
				alert("Todos pararam");
			}
		}

	}
	this.desenharCarros = function() {
		for (var i = 0; i < this.carros.length; i++)
			this.carros[i].desenhar();
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
	this.parado = true;

	this.desenhar = function() {
		ctx.drawImage(this.imagem, this.x, this.y);
	}
	this.moverCarro = function(sentido, forcarParada) {
		if (!this.parado)
			{
				if ((this.y + 54 > 0 && this.y < canvas.height) || !forcarParada)
				{
					if ((this.y < canvas.height && sentido >= 0) || (this.y + 54 > 0 && sentido < 0))
						this.y += sentido;
					else 
					{						
						if (sentido >= 0)
						{
							this.y = - (200 + Math.floor(Math.random() * 2500));
							this.imagem = imgsCarros[Math.floor(Math.random() * 5)];
						}
						else
						{
							this.y = canvas.height + (200 + Math.floor(Math.random() * 2500));
							this.imagem = imgsCarros[Math.floor(Math.random() * 5) + 5];
						}
					}
				}
				else
					this.parado = true;
			}
	}
}