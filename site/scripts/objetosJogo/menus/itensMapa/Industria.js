function Industria(aquele)
{
	var esteI = this;
	var telaAtualI = -1;
	var fat = 5;
	var qtdDeIndustriasConstrucao = 1;
	var qtdDeIndustriasDemolicao = 1;
	this.x = aquele.x;
	this.y = aquele.y;

	this.industrias = 0;
	this.materiaPrimaAcumulada = 0;
	var produzido = 0;
	var custo = 10/(fat==0?1:fat);
	var primeiraVez = this.industrias == 0;

	this.btnVoltar = new BotaoRetangular(esteI.x + 120, esteI.y + 130, 100, 25, {upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5}, 100, 25, "#c1c1c1", "gray", null, null,
		"14pt Century Gothic", "black", "Voltar", false, false, false);
	this.btnAddIndustria = new BotaoRetangular(this.x + 250, this.y + 225, 300, 75, {upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5}, 300, 75, "#c1c1c1", "gray", null, null,
		"bold 16pt Century Gothic", "black", "Construir industrias", false, false, false);
	this.btnDemolirIndustria = new BotaoRetangular(this.x + 250, this.y + 325, 300, 75, {upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5}, 300, 75, "#c1c1c1", "gray", null, null,
		"bold 18pt Century Gothic", "black", "Demolir industrias", false, false, false);

	this.btnMaisIndustria = new BotaoRetangular(590, esteI.y + 185, 35, 35, {upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5 }, 35, 35, "#c1c1c1", "gray", null, null, 
		"bold 25pt Century Gothic", "black", "+", false, false, false);
	this.btnMenosIndustria = new BotaoRetangular(375, esteI.y + 185, 35, 35, {upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5 }, 35, 35, "#c1c1c1", "gray", null, null, 
		"bold 25pt Century Gothic", "black", "-", false, false, false);
	this.btnConstruir = new BotaoRetangular(350, 550, 300, 50, {upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5}, 300, 50, "#c1c1c1", "gray", null, null,
		"bold 20pt Century Gothic", "black", "Construir", false, false, true);

	this.btnMaisIndustriaD = new BotaoRetangular(590, esteI.y + 185, 35, 35, {upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5 }, 35, 35, "#c1c1c1", "gray", null, null, 
		"bold 25pt Century Gothic", "black", "+", false, false, false);
	this.btnMenosIndustriaD = new BotaoRetangular(375, esteI.y + 185, 35, 35, {upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5 }, 35, 35, "#c1c1c1", "gray", null, null, 
		"bold 25pt Century Gothic", "black", "-", false, false, false);
	this.btnDemolirIndustriaD = new BotaoRetangular(350, 550, 300, 50, {upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5}, 300, 50, "#c1c1c1", "gray", null, null,
		"bold 20pt Century Gothic", "black", "Demolir", false, false, true);

	this.btnSim = new BotaoRetangular(550, 400, 150, 50, {upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5 }, 150, 50, "#c1c1c1", "gray", null,
			null, "bold 17pt Century Gothic", "black", "Sim!", false, false, false);
	this.btnNao = new BotaoRetangular(325, 400, 150, 50, {upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5 }, 150, 50, "#c1c1c1", "gray", null,
			null, "bold 15pt Century Gothic", "black", "Agora não", false, false, false);

	this.btnVoltar.onclick = function() {esteI.desativar(); telaAtualI = 0; esteI.ativar();};
	this.btnAddIndustria.onclick = function() {esteI.desativar(); telaAtualI = 1; esteI.ativar();};
	this.btnDemolirIndustria.onclick = function() {esteI.desativar(); telaAtualI = 2; esteI.ativar();};

	this.btnMaisIndustria.onclick = function() {if (qtdDeIndustriasConstrucao + esteI.industrias < 100) qtdDeIndustriasConstrucao++;};
	this.btnMenosIndustria.onclick = function() {if (qtdDeIndustriasConstrucao > 1) qtdDeIndustriasConstrucao--;};
	this.btnConstruir.onclick = function() {
		fazerCompra("Industria", calcularPreco(), true, true, 2, function(){
			esteI.industrias += qtdDeIndustriasConstrucao;
			produzido = producaoPorIndustria * esteI.industrias;
			qtdDeIndustriasConstrucao = 1;
			primeiraVez = false;
			esteI.desativar();
			telaAtualI = 0;
			esteI.ativar();
		});
	};

	this.btnMaisIndustriaD.onclick = function() {if (qtdDeIndustriasDemolicao <= esteI.industrias) qtdDeIndustriasDemolicao++;};
	this.btnMenosIndustriaD.onclick = function() {if (qtdDeIndustriasDemolicao > 1) qtdDeIndustriasDemolicao--;};
	this.btnDemolirIndustriaD.onclick = function() {
		fazerCompra("Industria", calcularPrecoDemolir(), true, true, 2, function() {
			esteI.industrias -= qtdDeIndustriasDemolicao;
			produzido = producaoPorIndustria * esteI.industrias;
			qtdDeIndustriasDemolicao = 1;
			esteI.desativar();
			telaAtualI = 0;
			esteI.ativar();
		});
	};

	this.btnNao.onclick = function() {mapa.btnVoltar.onclick();};
	this.btnSim.onclick = function() {esteI.desativar(); telaAtualI = 1; esteI.ativar();};

	function desenharComeco()
	{
		esteI.btnSim.desenhar();
		esteI.btnNao.desenhar();
		ctx.fillStyle = "black";
		ctx.font = "bold 24pt Century Gothic";
		ctx.fillText("Bem-vindo à sua Industria!", 500, 225);
		ctx.font = "18pt Century Gothic";
		ctx.fillText("Aqui, você pode fabricar a própria matéria-prima,", 500, 275);
		ctx.fillText("Deixando de ficar a mercê de fornecedores.", 500, 300)
		ctx.font = "bold 20pt Century Gothic";
		ctx.fillText("Gostaria de construir sua primeira industria?", 500, 325);
	}
	function desenharInicio()
	{
		esteI.btnAddIndustria.desenhar();
		esteI.btnDemolirIndustria.desenhar();

		ctx.textAlign = "left";
		ctx.fillStyle = "black";
		ctx.font = "bold 22pt Century Gothic";
		ctx.fillText("Número de industrias: " + esteI.industrias, esteI.x + 150, esteI.y + 145);

		ctx.font = "bold 16pt Century Gothic";
		ctx.textAlign = "left";
		ctx.fillStyle = "green";
		ctx.fillText("Produção: " + produzido + "u/dia", esteI.x + 115, esteI.y + 433);
		ctx.fillText("Matéria-prima acumulada: " + esteI.materiaPrimaAcumulada + "u", esteI.x + 115, esteI.y + 461);

		ctx.fillStyle = "darkred";
		ctx.fillText("Custo de produção: " + formatarDinheiro(esteI.getCustoUnitario()) + "/u", esteI.x + 115, esteI.y + 489);
		ctx.fillText("Despesas: " + formatarDinheiro(esteI.getDespesas()) + "/dia", esteI.x + 115, esteI.y + 517)
		ctx.fillText("Preço total: " + formatarDinheiro(esteI.getPrecoTotal()), esteI.x + 115, esteI.y + 545);
	}
	function desenharConstruir()
	{
		esteI.btnMaisIndustria.desenhar();
		esteI.btnMenosIndustria.desenhar();
		esteI.btnConstruir.desenhar();
		ctx.fillStyle = "black";
		ctx.font = "bold 24pt Century Gothic";
		ctx.fillText("Construir indústrias", esteI.x + 400, esteI.y + 140);
		ctx.fillStyle = "lightgrey";
		roundRect(esteI.x + 325, esteI.y + 185, 150, 35, 5, true, true);
		ctx.fillStyle = "black";
		ctx.font = "bold 16pt Century Gothic";
		ctx.textAlign = "left";
		ctx.fillText(qtdDeIndustriasConstrucao, esteI.x + 335, esteI.y + 202);
		ctx.font = "bold 20pt Century Gothic";
		ctx.fillText("Preço: " + formatarDinheiro(calcularPreco()), 350, 350);
		ctx.fillStyle = "green";
		ctx.fillText("Matéria-prima: " + calcularMateriaPrimaFuturaDiaria() + "u/dia", 350, 400);
		ctx.fillStyle = "darkred";
		ctx.fillText("Gasto: " + formatarDinheiro(calcularGastoFuturoDiario()) + "/dia", 350, 450);
	}
	function desenharDemolir()
	{
		esteI.btnMaisIndustriaD.desenhar();
		esteI.btnMenosIndustriaD.desenhar();
		esteI.btnDemolirIndustriaD.desenhar();
		ctx.fillStyle = "black";
		ctx.font = "bold 24pt Century Gothic";
		ctx.fillText("Demolir industrias", esteI.x + 400, esteI.y + 140);
		ctx.fillStyle = "lightgrey";
		roundRect(esteI.x + 325, esteI.y + 185, 150, 35, 5, true, true);
		ctx.fillStyle = "black";
		ctx.font = "bold 16pt Century Gothic";
		ctx.textAlign = "left";
		ctx.fillText(qtdDeIndustriasDemolicao, esteI.x + 335, esteI.y + 202);
		ctx.font = "bold 20pt Century Gothic";
		ctx.fillText("Preço: " + formatarDinheiro(calcularPrecoDemolir()), 350, 350);
		ctx.fillStyle = "green";
		ctx.fillText("Economia: " + formatarDinheiro(Math.floor((producaoPorIndustria * custo + (1000 + producaoPorIndustria/ Math.sqrt(fat + 1))) * qtdDeIndustriasDemolicao)) + "/dia", 350, 400);
		ctx.fillStyle = "darkred";
		ctx.fillText("Matéria-prima a menos: " + (producaoPorIndustria + qtdDeIndustriasDemolicao) + "u/dia", 350, 450);
	}

	this.desenhar = function() {
		if (telaAtualI != -1 && telaAtualI != 3)
		{
			ctx.fillStyle = "lightgrey"
			roundRect(200, 200, 600, 450, 0, true, true);
			if (!primeiraVez && telaAtualI != 0)
				esteI.btnVoltar.desenhar();
		}
		if (telaAtualI == -1)
			telaAtualI = (primeiraVez?3:0);
		switch(telaAtualI)
		{
			case 0:
				desenharInicio();
			break;
			case 1:
				desenharConstruir();
			break;
			case 2:
				desenharDemolir();
			break;
			case 3:
				desenharComeco();
			break;
		}
	};
	this.setEconomia = function(f) {fat = f;};
	this.ativar = function() {
		if (telaAtualI == -1)
			telaAtualI = (primeiraVez?3:0);
		switch(telaAtualI)
		{
			case 0:
				esteI.btnAddIndustria.ativarInteracao();
				esteI.btnDemolirIndustria.ativarInteracao();
			break;
			case 1:
				esteI.btnMaisIndustria.ativarInteracao();
				esteI.btnMenosIndustria.ativarInteracao();
				esteI.btnConstruir.ativarInteracao();
				esteI.btnVoltar.ativarInteracao();
			break;
			case 2:
				esteI.btnMaisIndustriaD.ativarInteracao();
				esteI.btnMenosIndustriaD.ativarInteracao();
				esteI.btnDemolirIndustriaD.ativarInteracao();
				esteI.btnVoltar.ativarInteracao();
			break;
			case 3:
				esteI.btnSim.ativarInteracao();
				esteI.btnNao.ativarInteracao();
			break;
		}
	};
	this.desativar = function() {
		switch(telaAtualI)
		{
			case 0:
				esteI.btnAddIndustria.desativarInteracao();
				esteI.btnDemolirIndustria.desativarInteracao();
			break;
			case 1:
				esteI.btnMaisIndustria.desativarInteracao();
				esteI.btnMenosIndustria.desativarInteracao();
				esteI.btnConstruir.desativarInteracao();
				esteI.btnVoltar.desativarInteracao();
			break;
			case 2:
				esteI.btnMaisIndustriaD.desativarInteracao();
				esteI.btnMenosIndustriaD.desativarInteracao();
				esteI.btnDemolirIndustriaD.desativarInteracao();
				esteI.btnVoltar.desativarInteracao();
			break;
			case 3:
				esteI.btnSim.desativarInteracao();
				esteI.btnNao.desativarInteracao();
			break;
		}
	};
	this.produzido = function() {return produzido;};
	esteI.ativar();

	var anunciouFaltando = false;
	this.passarDia = function()
	{
		produzido = producaoPorIndustria * esteI.industrias;
		if (produzido > 0)
		{
			this.materiaPrimaAcumulada += produzido;
			var resultado = getJanelaConstrucao("Garagem").adicionarMateriaPrima(this.materiaPrimaAcumulada);
			if (!resultado.sucesso && !anunciouFaltando)
			{
				anunciouFaltando = true;
				painelNotificacoes.adicionarNotificacao("Espaço de armazenamento insuficiente!", "Consiga mais espaço!",
														calendario.dia, calendario.mes, calendario.ano);
			}
			else if (resultado.sucesso)
				anunciouFaltando = false;
			
			descontar(this.getPrecoTotal(resultado.faltandoAEntregar), 0);
			if (resultado.faltandoAEntregar != this.materiaPrimaAcumulada)
			{
				this.materiaPrimaAcumulada = resultado.faltandoAEntregar;
				painelNotificacoes.adicionarNotificacao("Matéria-prima entregue!", "Seu estoque aumentou. Produza!",
														calendario.dia, calendario.mes, calendario.ano);
			}
		}
	}
	this.getCustoUnitario = function() {
		var aux = (fat!=0?fat:1);
		custo = Math.round(10/aux);
		return custo;
	};
	this.getCustoTotal = function(faltandoAEntregar) {
		return this.getCustoUnitario() * faltandoAEntregar?faltandoAEntregar:this.materiaPrimaAcumulada;
	}
	this.getDespesas = function(faltandoAEntregar) {
		return (1000 + producaoPorIndustria/ Math.sqrt(fat + 1)) * esteI.industrias;
	};
	this.getPrecoTotal = function(faltandoAEntregar)
	{
		return this.getCustoTotal(faltandoAEntregar) + this.getDespesas(faltandoAEntregar);
	}
	var producaoPorIndustria = 200;
	function calcularPreco()
	{
		return qtdDeIndustriasConstrucao * Math.pow(1.1, esteI.industrias) * 250000;
	}
	function calcularMateriaPrimaFuturaDiaria()
	{
		return producaoPorIndustria * (esteI.industrias + qtdDeIndustriasConstrucao);
	}
	function calcularGastoFuturoDiario()
	{
		return calcularMateriaPrimaFuturaDiaria() * esteI.getCustoUnitario() + (1000 + producaoPorIndustria/ Math.sqrt(fat + 1)) * (esteI.industrias + qtdDeIndustriasConstrucao);
	}
	function calcularPrecoDemolir()
	{
		return qtdDeIndustriasDemolicao * 100000;
	}
}