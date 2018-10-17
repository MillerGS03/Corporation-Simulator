function EfetuacaoDeCompra(nome, valor, aceitaCredito, aceitaDebito, qtasParcelasMaximo, funcaoSucesso)
{
	this.width = 500;
	this.height = 400;
	this.x = (canvas.width - this.width)/2;
	this.y = (canvas.height - this.height)/2;

	this.nome = nome;
	this.valor = valor;
	this.aceitaCredito = aceitaCredito;
	this.aceitaDebito = aceitaDebito;
	this.qtasParcelasMaximo = qtasParcelasMaximo;
	this.funcaoSucesso = funcaoSucesso;

	var este = this;
	var radioButtons = new Array();
	configurarBotoes();

	this.ativo = false;
	this.ativar = function() 
	{
		this.ativo = true;

		this.btnConfirmar.ativarInteracao();
		this.btnCancelar.ativarInteracao();
		BotaoRetangular.desativarTodos([this.btnConfirmar, this.btnCancelar]);
		BotaoCircular.desativarTodos();
		/*
		if (this.rbCredito != null && this.rbCredito.getChecked())
		{
			BotaoRetangular.exceto.push(this.btnMais);
			BotaoRetangular.exceto.push(this.btnMenos);
			this.btnMais.ativarInteracao();
			this.btnMenos.ativarInteracao();
		}*/
		for (var i = 0; i < radioButtons.length; i++)
		{
			radioButtons[i].ativarInteracao();
			BotaoCircular.exceto.push(radioButtons[i].botao);
		}
	}
	this.desativar = function()
	{
		this.ativo = false;
		this.btnConfirmar.desativarInteracao();
		this.btnCancelar.desativarInteracao();
		/*
		if (this.rbCredito != null)
		{
			this.btnMais.desativarInteracao();
			this.btnMenos.desativarInteracao();
		}*/
		for (var i= 0; i < radioButtons.length; i++)
			radioButtons[i].desativarInteracao();
		BotaoRetangular.reativar();
		BotaoCircular.reativar();
	}

	function configurarBotoes()
	{
		este.btnConfirmar = new BotaoRetangular(este.x + 80, este.y + este.height - 55, 140, 45, 5, 140, 45, "#a3a3a3", "#c3c3c3",
												null, null, "bold 17pt Century Gothic", "black", "Confirmar", false, false, false);
		este.btnConfirmar.onclick = function() {
			var nomeRB;
			for (var i = 0; i < radioButtons.length; i++)
				if (radioButtons[i].getChecked())
				{
					nomeRB = radioButtons[i].nome;
					break;
				}

			var sucesso = false;
			switch(nomeRB)
			{
				case "Dinheiro": 
					if (sucesso = barra.dinheiro >= este.valor)
						barra.dinheiro -= este.valor;
					else
						alert("Dinheiro em caixa insuficiente!");
					break;
				case "Débito": 
					if (sucesso = mapa.banco.saldo >= este.valor)
					{
						mapa.banco.saldo -= este.valor;
						mapa.banco.extrato.lancar(calendario.dia, calendario.mes, calendario.ano, este.nome, -este.valor);
					}
					else
						alert("Saldo insuficiente!");
					break;
				/*case "Crédito":
					if (sucesso = mapa.banco.fatura.checarLimiteParcelas(calendario.dia, calendario.mes, calendario.ano, opcaoDeParcelasAtual, valorPorParcela))
						mapa.banco.fatura.lancar(calendario.dia, calendario.mes, calendario.ano, este.nome, valorPorParcela, opcaoDeParcelasAtual)
					else
						alert("Limite de crédito disponível insuficiente!");
					break;*/
			}
			if (sucesso)
			{
				este.funcaoSucesso();
				este.desativar();
			}
		}
		este.btnCancelar = new BotaoRetangular(este.x + este.width - 220, este.y + este.height - 55, 140, 45, 5, 140, 45, "#a3a3a3", "#c3c3c3",
											   null, null, "bold 17pt Century Gothic", "black", "Cancelar", false, false, false);
		este.btnCancelar.onclick = function() {
			este.desativar();
		}
		radioButtons.push(este.rbDinheiro = new RadioButton(este.x + 30, este.y + 170, "Dinheiro", "white", radioButtons))
		
		este.rbDebito = null;
		if (mapa.banco.jaAbriuConta && este.aceitaDebito)
			radioButtons.push(este.rbDebito = new RadioButton(este.x + 30, este.y + 210, "Débito", "white", radioButtons));
		
		/*este.rbCredito = null;
		if (mapa.banco.jaTemCartaoDeCredito && este.aceitaCredito)
		{
			var yCredito = (mapa.banco.jaAbriuConta && este.aceitaDebito)?(este.y + 250):(este.y + 210);
			radioButtons.push(este.rbCredito = new RadioButton(este.x + 30, yCredito, "Crédito", "white", radioButtons));

			function atualizarParcelas() {
				if (opcaoDeParcelasAtual < este.qtasParcelasMaximo)
						este.btnMais.ativarInteracao();
				else
					este.btnMais.desativarInteracao();
				if (opcaoDeParcelasAtual > 1)
					este.btnMenos.ativarInteracao();
				else
					este.btnMenos.desativarInteracao();
				
				if (este.qtasParcelasMaximo <= 3)
					juros = 0;
				else if (este.qtasParcelasMaximo <= 6)
					juros = 10;
				else if (este.qtasParcelasMaximo <= 12)
					juros = 20;
				else
					juros = 25;
				valorPorParcela = (este.valor * (100 + juros)/100) / opcaoDeParcelasAtual;
			}
			este.rbCredito.onchange = function() {
				if (este.rbCredito.getChecked())
				{
					BotaoRetangular.exceto.push(este.btnMais);
					BotaoRetangular.exceto.push(este.btnMenos);
					atualizarParcelas();
				}
				else
				{
					BotaoRetangular.exceto.pop();
					BotaoRetangular.exceto.pop();
					este.btnMais.desativarInteracao();
					este.btnMenos.desativarInteracao();
				}
			}
			este.btnMais = new BotaoRetangular(este.x + 150, yCredito - 15, 45, 15, null, 45, 15, "#a3a3a3", "#c3c3c3",
												null, null, "bold 15pt Century Gothic", "black", "^", false, false, false);
			este.btnMais.onclick = function() {
				opcaoDeParcelasAtual++;
				atualizarParcelas();
			}
			este.btnMenos = new BotaoRetangular(este.x + 150, yCredito, 45, 15, null, 45, 15, "#a3a3a3", "#c3c3c3",
												null, null, "bold 15pt Century Gothic", "black", "v", false, false, false);
			este.btnMenos.onclick = function() {
				opcaoDeParcelasAtual--;
				atualizarParcelas();
			}
		}*/
		este.rbDinheiro.setChecked(true);
	}
	this.desenhar = function() 
	{
		ctx.save();

		desenharForma();
		desenharTextos();
		/*
		if (este.rbCredito != null && este.rbCredito.getChecked())
			desenharQtasParcelasCredito();*/

		for (var i = 0; i < radioButtons.length; i++)
			radioButtons[i].desenhar();

		ctx.restore();
	}
	function desenharForma()
	{
		ctx.save();

		ctx.globalAlpha = 0.3;
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.globalAlpha = 1;

		ctx.fillStyle = "#232323";
		ctx.strokeStyle = "black";
		ctx.lineWidth = 3;
		roundRect(este.x, este.y, este.width, este.height, 10, true, true);

		este.btnConfirmar.desenhar();
		este.btnCancelar.desenhar();

		ctx.restore();
	}
	function desenharTextos()
	{
		ctx.save();

		ctx.fillStyle = "white";
		ctx.font = "bold 25pt Century Gothic";
		ctx.textAlign = "center";
		ctx.textBaseline = "alphabetic";
		ctx.fillText("Confirmar Pagamento", este.x + este.width/2, este.y + 40, este.width - 10);

		ctx.font = "bold 16pt Century Gothic";
		ctx.textAlign = "right";
		ctx.fillText("Nome:", este.x + 80, este.y + 90, este.width - 15);
		ctx.fillText("Valor:", este.x + 80, este.y + 120, este.width - 15);
		ctx.font = "16pt Century Gothic";
		ctx.textAlign = "left";
		ctx.fillText(este.nome, este.x + 85, este.y + 90, este.width - 60);
		ctx.fillText(formatarDinheiro(este.valor), este.x + 85, este.y + 120, este.width - 60);

		ctx.restore();
	}

	var opcaoDeParcelasAtual = 1;
	var valorPorParcela = this.preco;
	var juros = 0;
	function desenharQtasParcelasCredito()
	{
		ctx.save();

		este.btnMais.desenhar();
		este.btnMenos.desenhar()

		var yRetangulo = (mapa.banco.jaAbriuConta && este.aceitaDebito)?(este.y + 235):(este.y + 195);
		ctx.fillStyle = "silver";
		ctx.fillRect(este.x + 195, yRetangulo, 270, 30);
		ctx.strokeRect(este.x + 195, yRetangulo, 270, 30);

		ctx.fillStyle = "black";
		ctx.font = "bold 13pt Century Gothic";
		ctx.textAlign = "left";
		ctx.textBaseline = "middle";
		var texto = `${opcaoDeParcelasAtual}X de ${formatarDinheiro(valorPorParcela)} `;
		if (juros > 0)
			texto += "(+" + juros + "% de juros).";
		else
			texto += "sem juros.";
		ctx.fillText(texto,este.x + 200, yRetangulo + 15, 260);
		
		ctx.restore();
	}
}