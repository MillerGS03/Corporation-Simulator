var imgRua = new Image();
imgRua.src = "imagens/rua.png";

var imgsCarros = new Array();

for (var i = 0; i < 12; i++)
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

	this.qtasImagensCarrosDescendo = 6;
	this.qtasImagensCarrosSubindo = 6;

	this.carros = new Array();
	this.todosOsCarrosParados = false;

	var caminhao = null;

	var intervalo = null;

	for (var i = 0; i < this.qtosCarrosDescendo; i++)
		this.carros.push(new Carro(this.x + 30, - (100 + Math.floor(Math.random() * 2500)),
		                           imgsCarros[Math.floor(Math.random() * this.qtasImagensCarrosDescendo)]));
	for (var i = this.qtosCarrosDescendo; i < this.qtosCarrosDescendo + this.qtosCarrosSubindo; i++)
		this.carros.push(new Carro(this.x + 69, canvas.height + 200 + Math.floor(Math.random() * 2500),
		                           imgsCarros[Math.floor(Math.random() * this.qtasImagensCarrosSubindo) + this.qtasImagensCarrosDescendo]));
	
	this.desenhar = function() {
		ctx.drawImage(imgRua, this.x, this.y);
		this.desenharCarros();
		if (caminhao != null)
			caminhao.desenhar();
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
	this.onMovimentacaoParou = function() {}
	this.entregar = function() {
		this.pararMovimentacao();
		this.onMovimentacaoParou = function() 
		{
			caminhao = new CaminhaoDeEntrega(this.x + 30, -200, canvas.height / 2, imgsCarros[0]);
			caminhao.iniciarMovimentacao();
			caminhao.onChegouAGaragem = function() {
				caminhao.pararMovimentacao();
			}
		}
	}
	this.moverCarros = function(ruaUsada, autoUpdate) {
		if (!ruaUsada.todosOsCarrosParados)
		{
			arrayCarros = ruaUsada.carros;

			for (var i = 0; i < ruaUsada.qtosCarrosDescendo; i++)
				arrayCarros[i].moverCarro(1, forcarParada, ruaUsada.qtasImagensCarrosDescendo, ruaUsada.qtasImagensCarrosSubindo);
			for (var i = ruaUsada.qtosCarrosDescendo; i < arrayCarros.length; i++)
				arrayCarros[i].moverCarro(-1, forcarParada, ruaUsada.qtasImagensCarrosDescendo, ruaUsada.qtasImagensCarrosSubindo);

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
				ruaUsada.todosOsCarrosParados = true;
				for (var i = 0; i < arrayCarros.length; i++)
					if (!arrayCarros[i].parado)
					{
						ruaUsada.todosOsCarrosParados = false;
						break;
					}
				if (ruaUsada.todosOsCarrosParados)
					ruaUsada.onMovimentacaoParou();
			}
		}
	}
	this.desenharCarros = function() {
		for (var i = 0; i < this.carros.length; i++)
			this.carros[i].desenhar();
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
	this.moverCarro = function(sentido, forcarParada, qtasImagensCarrosDescendo, qtasImagensCarrosSubindo) {
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
							this.imagem = imgsCarros[Math.floor(Math.random() * qtasImagensCarrosDescendo)];
						}
						else
						{
							this.y = canvas.height + (200 + Math.floor(Math.random() * 2500));
							this.imagem = imgsCarros[Math.floor(Math.random() * qtasImagensCarrosSubindo) + qtasImagensCarrosDescendo];
						}
					}
				}
				else
					this.parado = true;
			}
	}
}
function CaminhaoDeEntrega(x, y, yGrg, img) {
	this.x = x;
	this.y = y;
	this.yGaragem = yGrg;
	this.imagem = img; 

	var intervaloMovimentoCaminhao = null;

	this.desenhar = function() {
		ctx.drawImage(this.imagem, this.x, this.y)
	}
	this.iniciarMovimentacao = function()
	{
		intervaloMovimentoCaminhao = setInterval(this.mover, 10, this);
	}
	this.pararMovimentacao = function() {
		clearInterval(intervaloMovimentoCaminhao);
	}
	this.mover = function(caminhao) {
		caminhao.y++;
		atualizar();
		if (caminhao.y == caminhao.yGaragem)
			caminhao.onChegouAGaragem();
	}
	this.onChegouAGaragem = function(){}
}