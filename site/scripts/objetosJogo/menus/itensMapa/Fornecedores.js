function Fornecedores(mapa)
{
	var aqueleF = mapa;
	var esteF = this;
	var produzido = 15000;
	var f = 5;
	var custo = 2;
	var telaAtual = -1;
	var primeiraVez = true;
	var qtdDeFornecedoresCompra = 1;

	this.btnVoltar = new BotaoRetangular(aqueleF.x + 120, aqueleF.y + 130, 100, 25, {upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5}, 100, 25, "#c1c1c1", "gray", null, null,
		"14pt Century Gothic", "black", "Voltar", false, false, false);

	this.btnMaisFornecedores = new BotaoRetangular(590, aqueleF.y + 225, 35, 35, {upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5 }, 35, 35, "#c1c1c1", "gray", null, null, 
		"bold 25pt Century Gothic", "black", "+", false, false, false);
	this.btnMenosFornecedores = new BotaoRetangular(375, aqueleF.y + 225, 35, 35, {upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5 }, 35, 35, "#c1c1c1", "gray", null, null, 
		"bold 25pt Century Gothic", "black", "─", false, false, false);
	this.btnComprarFornecedores = new BotaoRetangular(350, 550, 300, 50, {upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5}, 300, 50, "#c1c1c1", "gray", null, null,
		"bold 20pt Century Gothic", "black", "Comprar fornecedores", false, false, true);

	this.btnSim = new BotaoRetangular(550, 400, 150, 50, {upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5 }, 150, 50, "#c1c1c1", "gray", null,
			null, "bold 17pt Century Gothic", "black", "Sim!", false, false, false);
	this.btnNao = new BotaoRetangular(325, 400, 150, 50, {upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5 }, 150, 50, "#c1c1c1", "gray", null,
			null, "bold 15pt Century Gothic", "black", "Agora não", false, false, false);


	this.btnVoltar.onclick = function () {
		if (primeiraVez)
			telaAtual = 3;
		else
			telaAtual = 0;
	};

	this.btnMaisFornecedores.onclick = function() {
		if (qtdDeFornecedoresCompra < 100)
			qtdDeFornecedoresCompra++;
	};
	this.btnMenosFornecedores.onclick = function() {
		if (qtdDeFornecedoresCompra > 1)
			qtdDeFornecedoresCompra--;
	};
	this.btnComprarFornecedores.onclick = function() {};

	this.btnSim.onclick = function() {
		esteF.desativar();
		telaAtual = 1;
		desenharCompraDeFornecedores();
	};
	this.btnNao.onclick = function() {
		voltarAoMapa();
	};

	this.desenhar = function() {
		switch(telaAtual)
		{
			case -1:
				telaAtual = (primeiraVez==true?3:0);
			break;
			case 0:
			break;
			case 1:
				desenharCompraDeFornecedores();
			break;
			case 2:
			break;
			case 3:
				desenharTelaComeco();
			break;
		}
	};
	this.ativar = function() {
		switch(telaAtual)
		{
			case 0:
			break;
			case 1:
				esteF.btnComprarFornecedores.ativarInteracao();
				esteF.btnMenosFornecedores.ativarInteracao();
				esteF.btnMaisFornecedores.ativarInteracao();
				esteF.btnVoltar.ativarInteracao();
			break;
			case 2:
			break;
			case 3:
				esteF.btnNao.ativarInteracao();
				esteF.btnSim.ativarInteracao();
			break;
		}
	};
	this.desativar = function() {
		//
	};
	this.produzido = function() {
		return produzido;
	};
	this.custo = function() {
		custo = Math.floor(10/f);
		return custo;
	};
	this.setEconomia = function(fat) {f = fat;}
	function desenharTelaComeco()
	{
		esteF.ativar();
		ctx.fillStyle = "black";
		ctx.font = "bold 24pt Century Gothic";
		ctx.fillText("Bem-vindo à sua produção de matéria-prima!", aqueleF.x + 400, aqueleF.y + 150);
		ctx.font = "18pt Century Gothic";
		ctx.fillText("Aqui, você pode contratar mais fornecedores", aqueleF.x + 400, aqueleF.y + 200);
		ctx.fillText("para aumentar a sua produção de matéria-prima.", aqueleF.x + 400, aqueleF.y + 225);
		ctx.font = "bold 20pt Century Gothic";
		ctx.fillText("Deseja contratar mais fornecedores?", aqueleF.x + 400, aqueleF.y + 275);
		esteF.btnSim.desenhar();
		esteF.btnNao.desenhar();
	}
	function desenharCompraDeFornecedores()
	{
		esteF.ativar();
		ctx.fillStyle = "lightgrey";
		roundRect(200, 200, 600, 450, 0, true, true);
		ctx.fillStyle = "black";
		ctx.font = "bold 24pt Century Gothic";
		ctx.fillText("Comprar mais fornecedores", aqueleF.x + 400, aqueleF.y + 180);
		ctx.fillStyle = "lightgrey";
		roundRect(aqueleF.x + 325, aqueleF.y + 225, 150, 35, 5, true, true);
		esteF.btnMaisFornecedores.desenhar();
		esteF.btnMenosFornecedores.desenhar();
		esteF.btnComprarFornecedores.desenhar();
		esteF.btnVoltar.desenhar();
		ctx.fillStyle = "black"
		ctx.font = "bold 16pt Century Gothic";
		ctx.textAlign = "left";
		ctx.fillText(qtdDeFornecedoresCompra, aqueleF.x + 335, aqueleF.y + 242);
	}
	function voltarAoMapa()
	{
		//
	}
}