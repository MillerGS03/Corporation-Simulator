var imgRua = new Image();
imgRua.src = "../imagens/rua.png";

var imgsCarros = new Array();

for (var i = 0; i < 12; i++)
{
	imgsCarros.push(new Image());
	imgsCarros[i].src = "../imagens/carros/carro" + (i + 1) + ".png";
}

function Rua()
{
	var forcarParada = false;

	this.x = 720;
	this.y = 0;

	this.qtosCarrosDescendo = 2;
	this.qtosCarrosSubindo = 2;

	this.qtasImagensCarrosDescendo = 6;
	this.qtasImagensCarrosSubindo = 6;

	this.carros = new Array();
	this.todosOsCarrosParados = false;

	var este = this;

	var caminhao = null;

	var intervalo = null;

	// Instancia a quantidade de carros descendo determinada, em posição e modelo aleatórios
	for (var i = 0; i < this.qtosCarrosDescendo; i++) 
		this.carros.push(new Carro(this.x + 15, - (100 + Math.floor(Math.random() * 2500)),
								   imgsCarros[Math.floor(Math.random() * this.qtasImagensCarrosDescendo)]));
	// Instancia a quantidade de carros subindo determinada, em posição e modelo aleatórios
	for (var i = this.qtosCarrosDescendo; i < this.qtosCarrosDescendo + this.qtosCarrosSubindo; i++)
		this.carros.push(new Carro(this.x + 54, canvas.height + 200 + Math.floor(Math.random() * 2500),
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
			intervalo = setInterval(this.moverCarros, 10, autoUpdate);
	}
	this.pararMovimentacao = function() {
		forcarParada = true;
	}
	this.onMovimentacaoParou = function() {} // Evento do fim da movimentação de todos os carros após forçação de parada
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
	this.moverCarros = function(autoUpdate) {
		if (!este.todosOsCarrosParados) // Se tiver algum carro a ser movido
		{
			arrayCarros = este.carros;

			for (var i = 0; i < este.qtosCarrosDescendo; i++) // Move os carros descendo
				arrayCarros[i].moverCarro(1, forcarParada, este.qtasImagensCarrosDescendo, este.qtasImagensCarrosSubindo);
			for (var i = este.qtosCarrosDescendo; i < arrayCarros.length; i++) // Move os carros subindo
				arrayCarros[i].moverCarro(-1, forcarParada, este.qtasImagensCarrosDescendo, este.qtasImagensCarrosSubindo);

			for (var i = 0; i < este.qtosCarrosDescendo; i++) // Testa colisão ou muita proximidade entre carros descendo
				for (var j = i + 1; j < este.qtosCarrosDescendo; j++)
					if (Math.abs(arrayCarros[i].y - arrayCarros[j].y) <= 200)
						arrayCarros[i].y = - (200 + Math.floor(Math.random() * 2500));

			for (var i = este.qtosCarrosDescendo; i < arrayCarros.length; i++) // Testa colisão ou muita proximidade entre carros subindo
				for (var j = i + 1; j < arrayCarros.length; j++)
					if (Math.abs(arrayCarros[i].y - arrayCarros[j].y) <= 200)
						arrayCarros[i].y = canvas.height + 200 + Math.floor(Math.random() * 2500);

			if (autoUpdate)
				atualizar();

			if (forcarParada) // Testa se todos os carros estão fora do canvas em caso de forçação de parada
			{
				este.todosOsCarrosParados = true;
				for (var i = 0; i < arrayCarros.length; i++)
					if (!arrayCarros[i].parado)
					{
						este.todosOsCarrosParados = false;
						break;
					}
				if (este.todosOsCarrosParados)
					este.onMovimentacaoParou();
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
				{ // Continua andando se não estiver forçando parada ou se o carro estiver dentro do canvas
					if ((this.y < canvas.height && sentido >= 0) || (this.y + 54 > 0 && sentido < 0))
						this.y += sentido;
					else  // Reseta e aleatoriza a posição e o modelo de carros que acabaram de chegar ao final do canvas
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
				else // Para o carro se o carro estiver fora do canvas durante forçação de parada
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