function Fornecedores(mapa)
{
	this.x = mapa.x;
	this.y = mapa.y;
	this.fornecedores = 0;
	var aqueleF = mapa;
	var esteF = this;
	var produzido = 0;
	this.materiaPrimaAcumulada = 0;
	var f = 5;
	var custo = 2;
	var telaAtual = -1;
	var primeiraVez = this.fornecedores == 0 && this.materiaPrimaAcumulada == 0;
	var qtdDeFornecedoresCompra = 1;
	var qtdDeFornecedoresDemissao = 1;

	this.btnVoltar = new BotaoRetangular(aqueleF.x + 120, aqueleF.y + 130, 100, 25, 5, 100, 25, "#c1c1c1", "gray", null, null,
		"14pt Century Gothic", "black", "Voltar", false, false, false);
	this.btnAddFornecedores = new BotaoRetangular(this.x + 228, this.y + 180, 344, 45, 5, 344, 45, "#c1c1c1", "gray", null, null,
		"bold 17pt Century Gothic", "black", "Contratar mais fornecedores", false, false, false);
	this.btnDemitirFornecedores = new BotaoRetangular(this.x + 228, this.y + 230, 344, 45, 5, 344, 45, "#c1c1c1", "gray", null, null,
		"bold 17pt Century Gothic", "black", "Demitir fornecedores", false, false, false);
	this.osFrequenciaEntrega = new OptionSelector({
		x: this.x + (mapa.width - 300)/2,
		y: this.y + 330,
		width: 300,
		height: 50,
		opcoes: ["Semanais", "Quinzenais", "Mensais"],
		indiceOpcaoAtual: 2
	})

	this.btnMaisFornecedores = new BotaoRetangular(590, aqueleF.y + 225, 35, 35, 5, 35, 35, "#c1c1c1", "gray", null, null, 
		"bold 25pt Century Gothic", "black", "+", false, false, false);
	this.btnMenosFornecedores = new BotaoRetangular(375, aqueleF.y + 225, 35, 35, 5, 35, 35, "#c1c1c1", "gray", null, null, 
		"bold 25pt Century Gothic", "black", "-", false, false, false);
	this.btnContratarFornecedores = new BotaoRetangular(350, 550, 300, 50, 5, 300, 50, "#c1c1c1", "gray", null, null,
		"bold 20pt Century Gothic", "black", "Contratar", false, false, true);

	this.btnMaisFornecedoresD = new BotaoRetangular(590, aqueleF.y + 225, 35, 35, 5, 35, 35, "#c1c1c1", "gray", null, null, 
		"bold 25pt Century Gothic", "black", "+", false, false, false);
	this.btnMenosFornecedoresD = new BotaoRetangular(375, aqueleF.y + 225, 35, 35, 5, 35, 35, "#c1c1c1", "gray", null, null, 
		"bold 25pt Century Gothic", "black", "-", false, false, false);
	this.btnRemoveFornecedores = new BotaoRetangular(350, 550, 300, 50, 5, 300, 50, "#c1c1c1", "gray", null, null,
		"bold 20pt Century Gothic", "black", "Demitir", false, false, true);

	this.btnSim = new BotaoRetangular(550, 400, 150, 50, 5, 150, 50, "#c1c1c1", "gray", null,
			null, "bold 17pt Century Gothic", "black", "Sim!", false, false, false);
	this.btnNao = new BotaoRetangular(325, 400, 150, 50, 5, 150, 50, "#c1c1c1", "gray", null,
			null, "bold 15pt Century Gothic", "black", "Agora não", false, false, false);


	this.btnAddFornecedores.onclick = function() {
		esteF.desativar();
		telaAtual = 1;
		esteF.ativar();
	};
	this.btnDemitirFornecedores.onclick = function() {
		esteF.desativar();
		telaAtual = 2;
		esteF.ativar();
	};
	this.btnVoltar.onclick = function () {
		esteF.desativar();
		if (primeiraVez)
			telaAtual = 3;
		else
			telaAtual = 0;
		esteF.ativar();
	};

	this.btnMaisFornecedores.onclick = function() {
		if (qtdDeFornecedoresCompra < 100)
			qtdDeFornecedoresCompra++;
	};
	this.btnMenosFornecedores.onclick = function() {
		if (qtdDeFornecedoresCompra > 1)
			qtdDeFornecedoresCompra--;
	};
	this.btnContratarFornecedores.onclick = function() {
		var es = qtdDeFornecedoresCompra > 1?"es":"";
		confirma(`Deseja realmente contratar ${qtdDeFornecedoresCompra} fornecedor${es}?`, function() {
			esteF.fornecedores += qtdDeFornecedoresCompra;
			produzido = producaoPorFornecedor * esteF.fornecedores;
			qtdDeFornecedoresCompra = 1;
			esteF.desativar();
			telaAtual = 0;
			esteF.ativar();
			primeiraVez = false;
		})
	};

	this.btnMaisFornecedoresD.onclick = function() {
		if (qtdDeFornecedoresDemissao < esteF.fornecedores)
			qtdDeFornecedoresDemissao++;
	};
	this.btnMenosFornecedoresD.onclick = function() {
		if (qtdDeFornecedoresDemissao > 1)
			qtdDeFornecedoresDemissao--;
	};
	this.btnRemoveFornecedores.onclick = function() {
		if (esteF.fornecedores >= qtdDeFornecedoresDemissao)
		{
			esteF.fornecedores -= qtdDeFornecedoresDemissao;
			qtdDeFornecedoresDemissao = 1;
			produzido = producaoPorFornecedor * esteF.fornecedores;
			esteF.desativar();
			telaAtual = esteF.fornecedores!=0?0:3;
			esteF.ativar();
		}
	};

	this.btnSim.onclick = function() {
		esteF.desativar();
		telaAtual = 1;
		esteF.ativar();
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
				telaAtual = (primeiraVez?3:0);
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
		primeiraVez = this.fornecedores == 0 && this.materiaPrimaAcumulada == 0;
		if (telaAtual == -1)
			telaAtual = (primeiraVez?3:0);
		switch(telaAtual)
		{
			case 0:
				esteF.btnAddFornecedores.ativarInteracao();
				esteF.btnDemitirFornecedores.ativarInteracao();
				esteF.osFrequenciaEntrega.ativarInteracao();
			break;
			case 1:
				esteF.btnContratarFornecedores.ativarInteracao();
				esteF.btnMenosFornecedores.ativarInteracao();
				esteF.btnMaisFornecedores.ativarInteracao();
				esteF.btnVoltar.ativarInteracao();
			break;
			case 2:
				esteF.btnMaisFornecedoresD.ativarInteracao();
				esteF.btnMenosFornecedoresD.ativarInteracao();
				esteF.btnRemoveFornecedores.ativarInteracao();
				esteF.btnVoltar.ativarInteracao();
			break;
			case 3:
				esteF.btnNao.ativarInteracao();
				esteF.btnSim.ativarInteracao();
			break;
		}
	};
	this.desativar = function() {
		esteF.btnAddFornecedores.desativarInteracao();
		esteF.btnDemitirFornecedores.desativarInteracao();
		esteF.osFrequenciaEntrega.desativarInteracao();
		esteF.btnContratarFornecedores.desativarInteracao();
		esteF.btnMenosFornecedores.desativarInteracao();
		esteF.btnMaisFornecedores.desativarInteracao();
		esteF.btnVoltar.desativarInteracao();
		esteF.btnMenosFornecedoresD.desativarInteracao();
		esteF.btnMenosFornecedoresD.desativarInteracao();
		esteF.btnRemoveFornecedores.desativarInteracao();
		esteF.btnVoltar.desativarInteracao();
		esteF.btnNao.desativarInteracao();
		esteF.btnSim.desativarInteracao();
	};
	this.produzido = function() {
		return produzido;
	};

	var anunciouFaltando = false;
	this.passarDia = function() 
	{
		produzido = producaoPorFornecedor * esteF.fornecedores;
		if (produzido > 0)
		{
			this.materiaPrimaAcumulada += produzido;

			if (this.osFrequenciaEntrega.indiceOpcaoAtual == 0 && calendario.getDiaDaSemana() == "segunda" ||
				this.osFrequenciaEntrega.indiceOpcaoAtual == 1 && (calendario.dia == 1 || calendario.dia == 15) ||
				this.osFrequenciaEntrega.indiceOpcaoAtual == 2 && calendario.dia == 1)
			{
				var resultado = getJanelaConstrucao("Garagem").adicionarMateriaPrima(this.materiaPrimaAcumulada);
				if (!resultado.sucesso && !anunciouFaltando)
				{
					anunciouFaltando = true;
					painelNotificacoes.adicionarNotificacao("Espaço de armazenamento insuficiente!", "Consiga mais espaço!",
															calendario.dia, calendario.mes, calendario.ano);
				}
				else if (resultado.sucesso)
					anunciouFaltando = false;
				
				if (resultado.faltandoAEntregar != this.materiaPrimaAcumulada)
				{
					descontar(this.getPrecoTotal(resultado.faltandoAEntregar), 0);
					mapa.comercio.gastosDoDiaMatriz += this.getPrecoTotal(resultado.faltandoAEntregar);
					this.materiaPrimaAcumulada = resultado.faltandoAEntregar;
					painelNotificacoes.adicionarNotificacao("Matéria-prima entregue!", "Seu estoque aumentou. Produza!",
															calendario.dia, calendario.mes, calendario.ano);
				}
			}
		}
	}
	this.getCustoUnitario = function() {
		var aux = (f!=0?f:1);
		custo = Math.round(10/aux);
		return custo;
	};
	this.getCustoTotal = function(faltandoAEntregar) {
		return this.getCustoUnitario() * faltandoAEntregar?faltandoAEntregar:this.materiaPrimaAcumulada;
	}
	this.getTaxaDeEntrega = function(faltandoAEntregar) {
		return 500 + this.getCustoTotal(faltandoAEntregar)/10;
	};
	this.getPrecoTotal = function(faltandoAEntregar)
	{
		return this.getCustoTotal(faltandoAEntregar) + this.getTaxaDeEntrega(faltandoAEntregar);
	}
	this.setEconomia = function(fat) {f = fat;}

	function desenharTelaComeco()
	{
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
		ctx.fillStyle = "black";
		ctx.font = "bold 24pt Century Gothic";
		ctx.fillText("Contratar fornecedores", aqueleF.x + 400, aqueleF.y + 180);
		ctx.fillStyle = "lightgrey";
		roundRect(aqueleF.x + 325, aqueleF.y + 225, 150, 35, 5, true, true);
		esteF.btnMaisFornecedores.desenhar();
		esteF.btnMenosFornecedores.desenhar();
		esteF.btnContratarFornecedores.desenhar();
		esteF.btnVoltar.desenhar();
		ctx.fillStyle = "black"
		ctx.font = "bold 16pt Century Gothic";
		ctx.textAlign = "left";
		ctx.fillText(qtdDeFornecedoresCompra, aqueleF.x + 335, aqueleF.y + 242);
		ctx.font = "bold 22pt Century Gothic";
		ctx.fillStyle = "darkred";
		ctx.textAlign = "left";
		ctx.fillText("Gasto: " + formatarDinheiro(calcularGastoFuturoDiario()) + "/dia", aqueleF.x + 200, aqueleF.y + 300);
		ctx.fillStyle = "green";
		ctx.fillText("Matéria-prima: " + calcularMateriaPrimaFuturaDiaria() +  "u/dia", aqueleF.x + 200, aqueleF.y + 350);
	}
	function desenharTelaInicial()
	{
		esteF.btnAddFornecedores.desenhar();
		esteF.btnDemitirFornecedores.desenhar();
		esteF.osFrequenciaEntrega.desenhar();

		ctx.font = "bold 22pt Century Gothic";
		ctx.textAlign = "left";
		ctx.fillStyle = "black";
		ctx.fillText("Número de fornecedores: " + esteF.fornecedores, aqueleF.x + 150, aqueleF.y + 145);

		ctx.font = "bold 19pt Century Gothic";
		ctx.textAlign = "center";
		ctx.fillText("Frequência das entregas", esteF.x + mapa.width/2, esteF.y + 305)

		ctx.font = "bold 16pt Century Gothic";
		ctx.textAlign = "left";

		ctx.fillStyle = "green";
		ctx.fillText("Produção: " + produzido + "u/dia", aqueleF.x + 115, aqueleF.y + 433);
		ctx.fillText("Matéria-prima acumulada: " + esteF.materiaPrimaAcumulada + "u", aqueleF.x + 115, aqueleF.y + 461);

		ctx.fillStyle = "darkred";
		ctx.fillText("Frete: " + formatarDinheiro(500) + " + 10% da carga = " + formatarDinheiro(esteF.getTaxaDeEntrega()), aqueleF.x + 115, aqueleF.y + 489);
		ctx.fillText("Custo de produção: " + formatarDinheiro(esteF.getCustoUnitario()) + "/u", aqueleF.x + 115, aqueleF.y + 517);
		ctx.fillText("Preço total: " + formatarDinheiro(esteF.getPrecoTotal()), aqueleF.x + 115, aqueleF.y + 545);
	}
	function desenharDemissaoDeFornecedores()
	{
		esteF.btnVoltar.desenhar();
		esteF.btnMaisFornecedoresD.desenhar();
		esteF.btnMenosFornecedoresD.desenhar();
		esteF.btnRemoveFornecedores.desenhar();
		ctx.fillStyle = "black";
		ctx.font = "bold 22pt Century Gothic";
		ctx.fillText("Demitir fornecedores", aqueleF.x + 275, aqueleF.y + 175);
		ctx.fillStyle = "lightgrey";
		roundRect(aqueleF.x + 325, aqueleF.y + 225, 150, 35, 5, true, true);
		ctx.fillStyle = "black"
		ctx.font = "bold 16pt Century Gothic";
		ctx.textAlign = "left";
		ctx.fillText(qtdDeFornecedoresDemissao, aqueleF.x + 335, aqueleF.y + 242);
		ctx.textAlign = "center";
		ctx.font = "bold 22pt Century Gothic";
		ctx.fillStyle = "green";
		ctx.fillText("Economia: " + formatarDinheiro(Math.floor(producaoPorFornecedor * custo * qtdDeFornecedoresDemissao)), aqueleF.x + aqueleF.width/2, aqueleF.y + 325);
		ctx.fillStyle = "darkred";
		ctx.fillText("Matéria-prima a menos: " + (producaoPorFornecedor * qtdDeFornecedoresDemissao) + "u/dia", aqueleF.x + aqueleF.width/2, aqueleF.y + 375);
	}
	var producaoPorFornecedor = 20;
	function calcularMateriaPrimaFuturaDiaria()
	{
		return producaoPorFornecedor * (esteF.fornecedores + qtdDeFornecedoresCompra);
	}
	function calcularGastoFuturoDiario()
	{
		return calcularMateriaPrimaFuturaDiaria() * esteF.getCustoUnitario();
	}
	function voltarAoMapa()
	{
		mapa.btnVoltar.onclick();
	}
}