function Comercio(aquele, fatorEconomia, produzido, custo)
{
	var vendaPorFranquia = 10000;
	this.f = fatorEconomia;
	alert(this.f)
	this.n = produzido;
	this.maxFranquia = Math.floor(produzido/vendaPorFranquia);
	this.preco = custo * 1.1;
	this.custo = custo;
	this.x = aquele.x;
	this.y = aquele.y;
	this.franquias = 0;
	var esteC = this;
	var aqueleC = aquele;
	var telaAtual = this.franquias<1?3:0;
	this.btnVoltar = new BotaoRetangular(this.x + 125, this.y + 125, 100, 25, {upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5}, 100, 25, "#c1c1c1", "gray", null, null,
		"14pt Century Gothic", "black", "Voltar", false, false, false);
	this.btnAddFranquias = new BotaoRetangular(this.x + 250, this.y + 225, 300, 75, {upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5}, 300, 75, "#c1c1c1", "gray", null, null,
		"bold 18pt Century Gothic", "black", "Comprar mais franquias", false, false, false);
	this.btnVenderFranquias = new BotaoRetangular(this.x + 250, this.y + 325, 300, 75, {upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5}, 300, 75, "#c1c1c1", "gray", null, null,
		"bold 18pt Century Gothic", "black", "Vender franquias", false, false, false);

	this.btnMaisFranquias = new BotaoRetangular(650, 300, 50, 50, {upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5 }, 50, 50, "#c1c1c1", "gray", null, null, 
		"bold 25pt Century Gothic", "black", "+", false, false, false);
	this.btnMenosFranquias = new BotaoRetangular(300, 300, 50, 50, {upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5 }, 50, 50, "#c1c1c1", "gray", null, null, 
		"bold 25pt Century Gothic", "black", "-", false, false, false);
	this.btnComprarFranquias = new BotaoRetangular(350, 550, 300, 50, {upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5}, 300, 50, "#c1c1c1", "gray", null, null,
		"bold 20pt Century Gothic", "black", "Comprar franquias!", false, false, true);

	this.btnVenderFranquiasV = new BotaoRetangular(350, 550, 300, 50, {upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5}, 300, 50, "#c1c1c1", "gray", null, null,
		"bold 20pt Century Gothic", "black", "Vender franquias!", false, false, true);
	this.btnMenosFranquiasV = new BotaoRetangular(300, 300, 50, 50, {upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5 }, 50, 50, "#c1c1c1", "gray", null, null, 
		"bold 25pt Century Gothic", "black", "-", false, false, false);
	this.btnMaisFranquiasV = new BotaoRetangular(650, 300, 50, 50, {upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5 }, 50, 50, "#c1c1c1", "gray", null, null, 
		"bold 25pt Century Gothic", "black", "+", false, false, false);
	
	this.btnSim = new BotaoRetangular(550, 400, 150, 50, {upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5 }, 150, 50, "#c1c1c1", "gray", null,
			null, "bold 17pt Century Gothic", "black", "Sim!", false, false, false);
	this.btnNao = new BotaoRetangular(325, 400, 150, 50, {upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5 }, 150, 50, "#c1c1c1", "gray", null,
			null, "bold 15pt Century Gothic", "black", "Agora não", false, false, false);

	this.btnVoltar.onclick = function() {
		desativarTela();
		if (this.franquias < 1)
			telaAtual = 3;
		else
			telaAtual = 0;
	};
	this.btnAddFranquias.onclick = function(){
		telaAtual = 1;
		criacaoDeFranquia();
	};
	this.btnVenderFranquias.onclick = function(){
		telaAtual = 2;
		vendaDeFranquia();
	};

	this.btnSim.onclick = function(){
		telaAtual = 1;
		criacaoDeFranquia();
	};
	this.btnNao.onclick = function() {
		voltarAoMapa();
	};

	this.btnMenosFranquias.onclick = function() {
		if (numeroDeFranquiasASeremAdicionadas > 1)
			numeroDeFranquiasASeremAdicionadas--;
		precoFranquia = calcularPrecoDeFranquia();
		gasto = calcularGastoPorDia();
		ganho = calcularGanhoPorDia();
	};
	this.btnMaisFranquias.onclick = function() {
		if (numeroDeFranquiasASeremAdicionadas + esteC.franquias < 100)
			numeroDeFranquiasASeremAdicionadas++;
		precoFranquia = calcularPrecoDeFranquia();
		gasto = calcularGastoPorDia();
		ganho = calcularGanhoPorDia();
	};
	this.btnComprarFranquias.onclick = function() {
		if (barra.dinheiro >= precoFranquia)
		{
			if (numeroDeFranquiasASeremAdicionadas > 0)
			{
				if (numeroDeFranquiasASeremAdicionadas <= esteC.maxFranquia)
				{
					barra.dinheiro -= precoFranquia;
					esteC.franquias += numeroDeFranquiasASeremAdicionadas;
					numeroDeFranquiasASeremAdicionadas = 1;
					desativarTela();
					telaAtual = 0;
				}
				else
					alert('Não há fornecedores suficientes');
			}
			else
				alert('Selecione ao menos 1 franquia para comprar');
		}
		else
			alert('Dinheiro insuficiente');
	};

	this.btnMaisFranquiasV.onclick = function() {
		if (numeroDeFranquiasASeremExcluidas < esteC.franquias)
			numeroDeFranquiasASeremExcluidas++;
	};
	this.btnMenosFranquiasV.onclick = function() {
		if (numeroDeFranquiasASeremExcluidas > 1)
			numeroDeFranquiasASeremExcluidas--;
	};
	this.btnVenderFranquiasV.onclick = function() {
		if (numeroDeFranquiasASeremExcluidas > 0)
		{
			barra.dinheiro += pagamento;
			esteC.franquias -= numeroDeFranquiasASeremExcluidas;
			gasto -= economia;
			numeroDeFranquiasASeremExcluidas = 1;
			desativarTela();
			telaAtual = 0;
		}
	};

	var numeroDeFranquiasASeremAdicionadas = 1;
	var numeroDeFranquiasASeremExcluidas = 1;
	var precoFranquia = 0;
	var gasto = 0;
	var ganho = 0;
	var pagamento = 0;
	var economia = 0;

	this.desenhar = function() {
		ctx.save();
		if (telaAtual != 3)
		{
			ctx.fillStyle = "lightgrey"
			roundRect(esteC.x + 100, esteC.y + 100, esteC.x + 500, esteC.y + 375, 5, true, true);
			if (esteC.franquias > 0 && telaAtual != 0)
				esteC.btnVoltar.desenhar();
		}
		switch(telaAtual)
		{
			case 0:
				desenharTelaInicial();
			break;
			case 1:
				criacaoDeFranquia();
			break;
			case 2:
				vendaDeFranquia();
			break;
			case 3:
				desenharComeco();
			break;
			case -1:
				telaAtual = esteC.franquias<1?3:0;
			break;
		}
		ctx.restore();
	}
	function desenharComeco()
	{
		ativarTela();
		ctx.fillStyle = "Black";
		ctx.textAlign = "center";
		ctx.font = "bold 22pt Century Gothic";
		ctx.fillText("Bem-vindo à área comercial!", esteC.x + aquele.width/2, esteC.y + 150);
		ctx.font = "18pt Century Gothic";
		ctx.fillText("Aqui, você pode comprar franquias para aumentar o seu lucro.", esteC.x + 400, esteC.y + 200);
		ctx.font = "22pt Century Gothic";
		ctx.fillText("Deseja começar sua primeira franquia?", esteC.x + aquele.width/2, esteC.y + 250);
		esteC.btnSim.desenhar();
		esteC.btnNao.desenhar();
	}
	function criacaoDeFranquia()
	{
		ctx.fillStyle = "black";
		ctx.font = "bold 22pt Century Gothic";
		ctx.fillText("Adicionar franquias", esteC.x + 400, 250);
		ctx.fillStyle = "lightgrey";
		ctx.strokeStyle = "black";
		roundRect(400, 300, 200, 50, 5, true, true);
		ctx.font = "18pt Century Gothic";
		ctx.fillStyle = "black";
		ctx.fillText(numeroDeFranquiasASeremAdicionadas, 425, 325);
		esteC.btnMaisFranquias.desenhar();
		esteC.btnMenosFranquias.desenhar();
		ativarTela();
		precoFranquia = calcularPrecoDeFranquia();
		ctx.textAlign = "left";
		ctx.font = "bold 20pt Century Gothic";
		ctx.fillText("Preço: " + precoFranquia, 375, 400, 4000);
		ctx.fillStyle = "darkred";
		ctx.fillText("Gasto por dia: $" + gasto, 375, 450, 4000);
		ctx.fillStyle = "green";
		ctx.fillText("Ganho por dia: $" + ganho, 375, 500, 4000);
		esteC.btnComprarFranquias.desenhar();
	}
	function desativarTela()
	{
		if (telaAtual == 0)
		{
			esteC.btnAddFranquias.desativarInteracao();
			esteC.btnVenderFranquias.desativarInteracao();
		}
		else if (telaAtual == 1)
		{
			esteC.btnMenosFranquias.desativarInteracao();
			esteC.btnMaisFranquias.desativarInteracao();
			esteC.btnComprarFranquias.desativarInteracao();
			esteC.btnVoltar.desativarInteracao();
		}
		else if (telaAtual == 2)
		{
			esteC.btnMenosFranquiasV.desativarInteracao();
			esteC.btnMaisFranquiasV.desativarInteracao();
			esteC.btnVenderFranquiasV.desativarInteracao();
			esteC.btnVoltar.desativarInteracao();
		}
		else if (telaAtual == 3)
		{
			esteC.btnSim.desativarInteracao();
			esteC.btnNao.desativarInteracao();
		}
		else if (telaAtual == -1)
		{
			esteC.btnSim.desativarInteracao();
			esteC.btnNao.desativarInteracao();
			esteC.btnMenosFranquias.desativarInteracao();
			esteC.btnMaisFranquias.desativarInteracao();
			esteC.btnComprarFranquias.desativarInteracao();
			esteC.btnVoltar.desativarInteracao();
			esteC.btnAddFranquias.desativarInteracao();
			esteC.btnVenderFranquias.desativarInteracao();
		}
	}

	this.desativar = function()
	{
		telaAtual = -1;
		desativarTela();
	}
	this.ativar = function()
	{
		ativarTela();
	}
	function voltarAoMapa()
	{
		//nao sei o que fazer aqui ;-;
	}
	function ativarTela()
	{
		if (telaAtual == 3)
		{
			esteC.btnSim.ativarInteracao();
			esteC.btnNao.ativarInteracao();
		}
		else if(telaAtual == 1)
		{
			esteC.btnMenosFranquias.ativarInteracao();
			esteC.btnMaisFranquias.ativarInteracao();
			esteC.btnComprarFranquias.ativarInteracao();
			esteC.btnVoltar.ativarInteracao();
		}
		else if (telaAtual == 0)
		{
			esteC.btnAddFranquias.ativarInteracao();
			esteC.btnVenderFranquias.ativarInteracao();
		}
		else
		{
			esteC.btnVoltar.ativarInteracao();
			esteC.btnVenderFranquiasV.ativarInteracao();
			esteC.btnMenosFranquiasV.ativarInteracao();
			esteC.btnMaisFranquiasV.ativarInteracao();
		}
	}
	function calcularPrecoDeFranquia()
	{
		var x = 25000;
		for (var i = 0; i < numeroDeFranquiasASeremAdicionadas + esteC.franquias - 1; i++)
		{
			x = Math.floor(x * 1.25);
		}
		return x;
	}
	function calcularGastoPorDia()
	{
		return Math.floor((numeroDeFranquiasASeremAdicionadas * 35000) + (esteC.n * esteC.custo * numeroDeFranquiasASeremAdicionadas)/esteC.f);
	}
	function calcularGanhoPorDia()
	{
		return esteC.preco * esteC.f/2 * esteC.n * numeroDeFranquiasASeremAdicionadas;
	}
	function desenharTelaInicial()
	{
		ctx.fillStyle = "black";
		ctx.font = "bold 24pt Century Gothic";
		ctx.fillText("Número de franquias: " + esteC.franquias, esteC.x + 300, esteC.y + 175);
		esteC.btnAddFranquias.desenhar();
		esteC.btnVenderFranquias.desenhar();
		var total = ganhoTotalDiario() - gastoTotalDiario();
		total = Math.floor(total);
		ctx.textAlign = "left";
		if (total < 0)
		{
			ctx.fillStyle = "darkred";
			ctx.fillText("Prejuízo diário: $" + total, 350, esteC.y + 500, 3000);
		}
		else
		{
			ctx.fillStyle = "green";
			ctx.fillText("Lucro diário: $" + total, 350, esteC.y + 500, 3000);
		}
		ativarTela();
	}
	function ganhoTotalDiario()
	{
		return esteC.franquias * esteC.f/2 * esteC.n * esteC.preco;
	}
	function gastoTotalDiario()
	{
		return (esteC.franquias * 35000) + (esteC.n * esteC.custo * esteC.franquias)/esteC.f;
	}
	function vendaDeFranquia()
	{
		pagamento = calcularPagamento();
		economia = calcularEconomia();
		ctx.fillStyle = "black";
		ctx.font = "bold 22pt Century Gothic";
		ctx.fillText("Vender franquias", esteC.x + 400, 250);
		ctx.fillStyle = "lightgrey";
		ctx.strokeStyle = "black";
		roundRect(400, 300, 200, 50, 5, true, true);
		ctx.font = "18pt Century Gothic";
		ctx.fillStyle = "black";
		ctx.fillText(numeroDeFranquiasASeremExcluidas, 425, 325);
		esteC.btnVenderFranquiasV.desenhar();
		esteC.btnMenosFranquiasV.desenhar();
		esteC.btnMaisFranquiasV.desenhar();
		ctx.fillStyle = "black";
		ctx.textAlign = "left";
		ctx.fillText("Pagamento: $" + pagamento, 375, 400, 4000);
		ctx.fillStyle = "green";
		ctx.fillText("Economia por dia: $" + economia, 375, 450, 4000);
		ativarTela();
	}
	function calcularPagamento()
	{
		return (12000 * numeroDeFranquiasASeremExcluidas * esteC.f)/(esteC.f/2);
	}
	function calcularEconomia()
	{
		return Math.floor(35000 * numeroDeFranquiasASeremExcluidas + (esteC.n * esteC.custo * numeroDeFranquiasASeremExcluidas)/esteC.f);
	}
}