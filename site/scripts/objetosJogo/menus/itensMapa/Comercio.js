function Comercio(aquele)
{
	this.f = 5;
	this.n = 150;
	this.custo = 5;
	this.preco = this.custo * 1.2;
	this.x = aquele.x;
	this.y = aquele.y;
	this.franquias = 0;
	this.setEconomia = function (fator){this.f = fator; vendaPorFranquia = fator * 50;}

	var esteC = this;
	var aqueleC = aquele;
	var telaAtual = -1;
	var numeroDeFranquiasASeremAdicionadas = 1;
	var numeroDeFranquiasASeremExcluidas = 1;
	var precoFranquia = 0;
	var gasto = 0;
	var ganho = 0;
	var pagamento = 0;
	var economia = 0;
	var total = 0;
	var primeiraVez = this.franquias==0;

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
		"bold 20pt Century Gothic", "black", "Comprar franquias", false, false, true);

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
		if (primeiraVez)
			telaAtual = 3;
		else
			telaAtual = 0;
	};
	this.btnAddFranquias.onclick = function(){
		desativarTela();
		telaAtual = 1;
		criacaoDeFranquia();
	};
	this.btnVenderFranquias.onclick = function(){
		desativarTela();
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
		if (numeroDeFranquiasASeremAdicionadas > 0)
		{
			fazerCompra("Franquia", precoFranquia, true, true, 4, function(){
					esteC.franquias += numeroDeFranquiasASeremAdicionadas;
					numeroDeFranquiasASeremAdicionadas = 1;
					primeiraVez = false;
					desativarTela();
					telaAtual = 0;
			})
		}
		else
			alerta('Selecione ao menos 1 franquia para comprar');
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
		if (esteC.franquias - numeroDeFranquiasASeremExcluidas >= 0)
		{
			receber(pagamento, 0);
			esteC.franquias -= numeroDeFranquiasASeremExcluidas;
			gasto -= economia;
			numeroDeFranquiasASeremExcluidas = 1;
			desativarTela();
			telaAtual = 0;
		}
		else
			alerta('Franquias insuficientes');
	};

	this.desenhar = function() {
		primeiraVez = this.franquias==0;
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
				telaAtual = primeiraVez?3:0;
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
		if (!primeiraVez)
			esteC.btnVoltar.desenhar();
		ativarTela();
		precoFranquia = calcularPrecoDeFranquia();

		ctx.textAlign = "left";
		ctx.font = "bold 18.5pt Century Gothic";
		ctx.fillText("Preço: " + formatarDinheiro(precoFranquia), 215, 420, 4000);
		ctx.fillStyle = "darkred";
		ctx.fillText("Gasto: " + formatarDinheiro(calcularDespesasFuturas()) + ` + ${esteC.franquias + numeroDeFranquiasASeremAdicionadas}X despesas da matriz/dia`, 215, 460, 4000);
		ctx.fillStyle = "green";
		ctx.fillText("Ganho: " + (esteC.franquias + numeroDeFranquiasASeremAdicionadas) + "X ganhos da matriz/dia", 215, 500, 4000);
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
		primeiraVez = this.franquias==0;
		if (telaAtual == -1)
			telaAtual = (primeiraVez?3:0);
		ativarTela();
	}
	function voltarAoMapa()
	{
		mapa.btnVoltar.onclick();
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

	this.getTotalDespesas = function()
	{
		return 300 * this.franquias;
	}
	function calcularDespesasFuturas()
	{
		return 300 * (esteC.franquias + numeroDeFranquiasASeremAdicionadas);
	}
	function calcularPrecoDeFranquia()
	{
		var x = 250000;
		for (var i = 0; i < numeroDeFranquiasASeremAdicionadas + esteC.franquias - 1; i++)
		{
			x = Math.floor(x * 1.25);
		}
		return x;
	}

	function desenharTelaInicial()
	{
		ctx.fillStyle = "black";
		ctx.font = "bold 24pt Century Gothic";
		ctx.fillText("Número de franquias: " + esteC.franquias, esteC.x + 300, esteC.y + 175);
		esteC.btnAddFranquias.desenhar();
		esteC.btnVenderFranquias.desenhar();
		total = (ultimoGanho - ultimoGasto) * esteC.franquias;
		ctx.textAlign = "left";
		if (total < 0)
		{
			ctx.fillStyle = "darkred";
			ctx.fillText("Prejuízo diário: " + formatarDinheiro(total), 350, esteC.y + 500, 3000);
		}
		else
		{
			ctx.fillStyle = "green";
			ctx.fillText("Lucro diário: " + formatarDinheiro(total), 350, esteC.y + 500, 3000);
		}
		ativarTela();
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
		esteC.btnVoltar.desenhar();
		ctx.fillStyle = "black";
		ctx.textAlign = "left";
		ctx.fillText("Pagamento: " + formatarDinheiro(pagamento), 375, 400, 4000);
		ctx.fillStyle = "green";
		ctx.fillText("Economia: $" + formatarDinheiro(economia) + "/dia", 375, 450, 4000);
		ativarTela();
	}
	function calcularPagamento()
	{
		return (12000 * numeroDeFranquiasASeremExcluidas * esteC.f)/(esteC.f/2);
	}
	function calcularEconomia()
	{
		return Math.floor(formatarDinheiro(300 * numeroDeFranquiasASeremExcluidas) + "/dia");
	}

	this.gastosDoDiaMatriz = 0;
	this.ganhosDoDiaMatriz = 0;
	var ultimoGanho = 0;
	var ultimoGasto = 0;
	this.passarDia = function()
	{
		if (this.franquias > 0)
		{
			var contas = getJanelaConstrucao("Garagem").contas;

			var meioRecebimento = getMeioDePagamento("Vendas da(s) franquia(s)");
			if (meioRecebimento == null)
			{
				meioRecebimento = 0;
				contas.push(new Conta("Vendas da(s) franquia(s)", "Ganhos diários"));
			}
			receber(this.franquias * this.ganhosDoDiaMatriz, meioRecebimento);
			if (meioRecebimento == 1)
				mapa.banco.extrato.lancar(calendario.dia, calendario.mes, calendario.ano, "Vendas da(s) franquia(s)", this.franquias * this.ganhosDoDiaMatriz);
			
			var meioDesconto = getMeioDePagamento("Gastos da(s) franquia(s)");
			if (meioDesconto == null)
			{
				meioDesconto = 0;
				contas.push(new Conta("Gastos da(s) franquia(s)", "Despesas diárias"));
			}
			descontar(this.franquias * this.gastosDoDiaMatriz, meioDesconto);
		}
		
		ultimoGanho = this.ganhosDoDiaMatriz;
		ultimoGasto = this.gastosDoDiaMatriz;
		this.ganhosDoDiaMatriz = 0;
		this.gastosDoDiaMatriz = 0;
	}
}