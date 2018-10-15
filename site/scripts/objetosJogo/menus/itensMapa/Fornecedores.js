function Fornecedores(mapa)
{
	this. x = mapa.x;
	this.y = mapa.y;
	this.fornecedores = 0;
	var aqueleF = mapa;
	var esteF = this;
	var produzido = 0;
	var f = 5;
	var custo = 2;
	var telaAtual = -1;
	var primeiraVez = true;
	var qtdDeFornecedoresCompra = 1;

	this.btnVoltar = new BotaoRetangular(aqueleF.x + 120, aqueleF.y + 130, 100, 25, {upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5}, 100, 25, "#c1c1c1", "gray", null, null,
		"14pt Century Gothic", "black", "Voltar", false, false, false);
	this.btnAddFornecedores = new BotaoRetangular(this.x + 250, this.y + 225, 300, 75, {upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5}, 300, 75, "#c1c1c1", "gray", null, null,
		"bold 16pt Century Gothic", "black", "Contratar mais fornecedores", false, false, false);
	this.btnDemitirFornecedores = new BotaoRetangular(this.x + 250, this.y + 325, 300, 75, {upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5}, 300, 75, "#c1c1c1", "gray", null, null,
		"bold 18pt Century Gothic", "black", "Demitir fornecedores", false, false, false);

	this.btnMaisFornecedores = new BotaoRetangular(590, aqueleF.y + 225, 35, 35, {upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5 }, 35, 35, "#c1c1c1", "gray", null, null, 
		"bold 25pt Century Gothic", "black", "+", false, false, false);
	this.btnMenosFornecedores = new BotaoRetangular(375, aqueleF.y + 225, 35, 35, {upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5 }, 35, 35, "#c1c1c1", "gray", null, null, 
		"bold 25pt Century Gothic", "black", "-", false, false, false);
	this.btnComprarFornecedores = new BotaoRetangular(350, 550, 300, 50, {upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5}, 300, 50, "#c1c1c1", "gray", null, null,
		"bold 20pt Century Gothic", "black", "Contratar", false, false, true);

	this.btnSim = new BotaoRetangular(550, 400, 150, 50, {upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5 }, 150, 50, "#c1c1c1", "gray", null,
			null, "bold 17pt Century Gothic", "black", "Sim!", false, false, false);
	this.btnNao = new BotaoRetangular(325, 400, 150, 50, {upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5 }, 150, 50, "#c1c1c1", "gray", null,
			null, "bold 15pt Century Gothic", "black", "Agora não", false, false, false);


	this.btnAddFornecedores.onclick = function() {
		esteF.desativar();
		telaAtual = 1;
	};
	this.btnDemitirFornecedores.onclick = function() {
		esteF.desativar();
		telaAtual = 2;
	};
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
	this.btnComprarFornecedores.onclick = function() {
		fazerCompra("Fornecedores", calcularGastoDiario(), true, true, 2, function() {
			produzido += (150 * qtdDeFornecedoresCompra);
			esteF.fornecedores += qtdDeFornecedoresCompra;
			qtdDeFornecedoresCompra = 1;
			esteF.desativar();
			telaAtual = 0;
			primeiraVez = false;
		})
	};

	this.btnSim.onclick = function() {
		esteF.desativar();
		telaAtual = 1;
		desenharCompraDeFornecedores();
	};
	this.btnNao.onclick = function() {
		voltarAoMapa();
	};

	this.desenhar = function() {
		ctx.save();
		if (telaAtual != -1 && telaAtual != 3)
		{
			ctx.fillStyle = "lightgrey"
			roundRect(200, 200, 600, 450, 0, true, true);
			if (!primeiraVez && telaAtual != 0)
				esteF.btnVoltar.desenhar();
		}
		switch(telaAtual)
		{
			case -1:
				telaAtual = (primeiraVez==true?3:0);
			break;
			case 0:
				desenharTelaInicial();
			break;
			case 1:
				desenharCompraDeFornecedores();
			break;
			case 2:
				desenharDemissaoDeFornecedores();
			break;
			case 3:
				desenharTelaComeco();
			break;
		}
		ctx.restore();
	};
	this.ativar = function() {
		switch(telaAtual)
		{
			case 0:
				esteF.btnAddFornecedores.ativarInteracao();
				esteF.btnDemitirFornecedores.ativarInteracao();
			break;
			case 1:
				esteF.btnComprarFornecedores.ativarInteracao();
				esteF.btnMenosFornecedores.ativarInteracao();
				esteF.btnMaisFornecedores.ativarInteracao();
				esteF.btnVoltar.ativarInteracao();
			break;
			case 2:
				esteF.btnVoltar.ativarInteracao();
			break;
			case 3:
				esteF.btnNao.ativarInteracao();
				esteF.btnSim.ativarInteracao();
			break;
		}
	};
	this.desativar = function() {
		switch(telaAtual)
		{
			case -1:
			break;
			case 0:
				esteF.btnAddFornecedores.desativarInteracao();
				esteF.btnDemitirFornecedores.desativarInteracao();
			break;
			case 1:
				esteF.btnComprarFornecedores.desativarInteracao();
				esteF.btnMenosFornecedores.desativarInteracao();
				esteF.btnMaisFornecedores.desativarInteracao();
				esteF.btnVoltar.desativarInteracao();
			break;
			case 2:
				esteF.btnVoltar.desativarInteracao();
			break;
			case 3:
				esteF.btnNao.desativarInteracao();
				esteF.btnSim.desativarInteracao();
			break;
		}
	};
	this.produzido = function() {
		return produzido;
	};
	this.custo = function() {
		custo = Math.floor(10/(f==0?1:f));
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
		ctx.fillStyle = "black";
		ctx.font = "bold 24pt Century Gothic";
		ctx.fillText("Contratar fornecedores", aqueleF.x + 400, aqueleF.y + 180);
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
		ctx.font = "bold 22pt Century Gothic";
		ctx.fillStyle = "darkred";
		ctx.textAlign = "left";
		ctx.fillText("Gasto: $" + calcularGastoDiario() + "/dia", aqueleF.x + 275, aqueleF.y + 300);
		ctx.fillStyle = "green";
		ctx.fillText("Matéria-prima: " + calcularMPDiaria() +  "/dia", aqueleF.x + 200, aqueleF.y + 350);
	}
	function desenharTelaInicial()
	{
		esteF.ativar();
		esteF.btnAddFornecedores.desenhar();
		esteF.btnDemitirFornecedores.desenhar();
		ctx.font = "bold 22pt Century Gothic";
		ctx.textAlign = "left";
		ctx.fillStyle = "black";
		ctx.fillText("Número de fornecedores: " + esteF.fornecedores, aqueleF.x + 150, aqueleF.y + 175);
		ctx.fillStyle = "green";
		ctx.font = "bold 24pt Century Gothic";
		ctx.fillText("Matéria-prima produzida: " + produzido + "/dia", aqueleF.x + 125, aqueleF.y + 450);
		ctx.fillStyle = "darkred";
		ctx.fillText("Gasto: $" + calcularGastoTotal() + "/dia", aqueleF.x + 125, aqueleF.y + 500);
	}
	function desenharDemissaoDeFornecedores()
	{
		//
	}
	function voltarAoMapa()
	{
		//
	}

	function calcularGastoDiario()
	{
		return Math.floor(150 * qtdDeFornecedoresCompra * custo);
	}
	function calcularMPDiaria()
	{
		return Math.floor(150 * qtdDeFornecedoresCompra);
	}
	function calcularGastoTotal()
	{
		return Math.floor(150 * esteF.fornecedores * custo);
	}
}