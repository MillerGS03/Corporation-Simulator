function Financeiro()
{
    this.width = 900;
    this.height = 620;
    this.x = (canvas.width - this.width)/2;
    this.y = (canvas.height - this.height - 60)/2 + 60;

    var garagem = getJanelaConstrucao("Garagem");

    var este = this;

    this.aberto = false;
    this.btnFechar = new BotaoRetangular(this.x + this.width - 50, this.y + 10, 40, 40,
                             { upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5 }, 40, 40,
        "#232323", "#535353", null, null, "bold 18pt Century Gothic", "red", "X", false, false, false);
    this.btnFechar.onclick = function(e) {
        este.abrirFechar();
    }

    this.btnIrParaGaragem = new BotaoRetangular(this.x + 10, this.y + 10, 40, 40, 5, 40, 40,
                                                "#232323", "#535353", imgIrParaGaragem, imgIrParaGaragem, "", "", "", false, false, false);
    this.btnIrParaGaragem.onclick = function(e) {
        este.abrirFechar();
        getJanelaConstrucao("Garagem").abrirFechar();
    }

    this.abrirFechar = function() 
    {
        this.aberto = !this.aberto;
        if (this.aberto)
        {
            if (!garagem)
                garagem = getJanelaConstrucao("Garagem");
            desativarBotoes();
            this.btnIrParaBanco.ativarInteracao();
            this.btnFechar.ativarInteracao();
            this.btnIrParaGaragem.ativarInteracao();
            for (var i = 0; i < garagem.contas.length; i++)
            {
                this.switchers[i].ativarInteracao();
                this.switchers[i].side = garagem.contas[i].efetuarNoDebito?"right":"left";
                this.switchers[i].deslocamento = garagem.contas[i].efetuarNoDebito?100:0;
            }
        }
        else
        {
            this.btnIrParaBanco.desativarInteracao();
            this.btnFechar.desativarInteracao();
            this.btnIrParaBanco.desativarInteracao();
            for (var i = 0; i < this.switchers.length; i++)
                this.switchers[i].desativarInteracao();
            ativarBotoes();
        }
    }
    this.desenhar = function() 
    {
        if (this.aberto)
        {
            ctx.save();

            desenharJanela();
            desenharTabela();
            desenharInformacoes();

            ctx.restore();
        }
    }
    function desenharJanela()
    {
        ctx.save();

        ctx.fillStyle = "#333333";
        ctx.globalAlpha = 0.3;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        roundRect(este.x, este.y, este.width, este.height, 20, true, true)
       
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.font = "bold 24pt Century Gothic";
        ctx.fillText("Financeiro", este.x + este.width/2, este.y + 10, este.width - 5);

        este.btnIrParaGaragem.desenhar();
        este.btnFechar.desenhar();

        roundRect(este.x, este.y + 60, este.width, este.height - 60, {lowerLeft: 20, lowerRight: 20 }, true, true);

        ctx.globalAlpha = 0.3;
        ctx.drawImage(imgFundoFinanceiro, este.x + (este.width - 667)/2, este.y + 60 + (este.height - 560)/2);

        ctx.restore();
    }

    var widthTabela = 800;
    var heightTabela = 380;
    var xTabelaFinancas = este.x + (este.width - widthTabela)/2;
    var yTabelaFinancas = este.y + 70;
    function desenharTabela()
    {
        ctx.save();

        ctx.lineWidth = 2;
        ctx.fillStyle = "#333333";
        ctx.strokeStyle = "black";
        roundRect(xTabelaFinancas, yTabelaFinancas, widthTabela, heightTabela, 10, true, true);

        ctx.fillStyle = "gray";
        roundRect(xTabelaFinancas, yTabelaFinancas, widthTabela, 40, {upperLeft: 10, upperRight: 10}, true, true);

        ctx.fillStyle = "white";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.font = "bold 17pt Century Gothic";
        ctx.fillText(" Nome da conta                                  Classificação        Caixa ou Débito", xTabelaFinancas + 5, yTabelaFinancas + 20);

        for (var i = 0; i < 10; i++)
        {
            if (i % 2 == 0)
            {
                ctx.fillStyle = "#555555";
                ctx.fillRect(xTabelaFinancas + 1, yTabelaFinancas + 41 + i * 34, widthTabela - 2, 34);
                ctx.fillStyle = "#333333";
            }
            if (i < garagem.contas.length)
            {
                ctx.fillStyle = "black";
                ctx.fillText(garagem.contas[i].nome, xTabelaFinancas + 5, yTabelaFinancas + 58 + i * 34);
                ctx.fillText(garagem.contas[i].classificacao, xTabelaFinancas + 370, yTabelaFinancas + 58 + i * 34);
                ctx.drawImage(imgFinanceiroDinheiro, este.switchers[i].x - 40, yTabelaFinancas + 42 + i * 34);
                ctx.drawImage(imgFinanceiroCartao, este.switchers[i].x + este.switchers[i].width + 8, yTabelaFinancas + 42 + i * 34);
                este.switchers[i].desenhar();
            }
        }

        var xLinhas = [365, 580];
        for (var i = 0; i < xLinhas.length; i++)
        {
            ctx.beginPath();
            ctx.moveTo(xTabelaFinancas + xLinhas[i], yTabelaFinancas + 41);
            ctx.lineTo(xTabelaFinancas + xLinhas[i], yTabelaFinancas + heightTabela - 1);
            ctx.closePath();
            ctx.stroke();
        }

        ctx.restore();
    }

    var saldos = estatisticas.getEstatisticas().Saldo;
    function desenharInformacoes()
    {
        ctx.save();

        ctx.textAlign = "right";
        ctx.textBaseline = "alphabetic";
        ctx.fillStyle = "black";
        ctx.font = "bold 18pt Century Gothic";
        ctx.fillText("Status mensal: ", xTabelaFinancas + 190, yTabelaFinancas + heightTabela + 65);
        ctx.fillText("Status anual: ", xTabelaFinancas + 190, yTabelaFinancas + heightTabela + 100);

        var corStatusMensal = "black";
        var corStatusAnual = "black";
        var msgStatusMensal = " - ";
        var msgStatusAnual = " - ";

        if (saldos.length > 30)
        {
            var saldoAtual = saldos[saldos.length - 1].y;
            var saldoMesAnterior = saldos[saldos.length - 31].y;
            var lucroOuPrejuizoMensal = saldoAtual - saldoMesAnterior;
            if (lucroOuPrejuizoMensal > 0)
            {
                msgStatusMensal = "Lucro de " + formatarDinheiro(Math.abs(lucroOuPrejuizoMensal));
                corStatusMensal = "green";
            }
            else if (lucroOuPrejuizoMensal == 0)
                msgStatusMensal = "Sem variação";
            else
            {
                msgStatusMensal = "Prejuízo de " + formatarDinheiro(Math.abs(lucroOuPrejuizoMensal));
                corStatusMensal = "red";
            }

            if (saldos.length > 364)
            {
                var saldoAnoAnterior = saldos[saldos.length - 365].y;
                var lucroOuPrejuizoAnual = saldoAtual - saldoAnoAnterior;
                if (lucroOuPrejuizoAnual > 0)
                {
                    msgStatusAnual = "Lucro de " + formatarDinheiro(Math.abs(lucroOuPrejuizoAnual));
                    corStatusAnual = "green";
                }
                else if (lucroOuPrejuizoAnual == 0)
                    msgStatusAnual = "Sem variação";
                else
                {
                    msgStatusAnual = "Prejuízo de " + formatarDinheiro(Math.abs(lucroOuPrejuizoAnual));
                    corStatusAnual = "red";
                }
            }
        }

        ctx.textAlign = "left";
        ctx.fillStyle = corStatusMensal;
        ctx.fillText(msgStatusMensal, xTabelaFinancas + 190, yTabelaFinancas + heightTabela + 65);
        ctx.fillStyle = corStatusAnual;
        ctx.fillText(msgStatusAnual, xTabelaFinancas + 190, yTabelaFinancas + heightTabela + 100);

        este.btnIrParaBanco.desenhar();

        ctx.restore();
    }
    function configurar()
    {
        este.switchers = new Array();
        for (var i = 0; i < 10; i++)
        {
            este.switchers.push(new Switcher({
                x: xTabelaFinancas + (580 + widthTabela - 84)/2,
                y: yTabelaFinancas + 45 + i * 34
            }));
            este.switchers[i].numeroRegistro = i;
            este.switchers[i].onswitch = function(switcher) {
                garagem.contas[switcher.numeroRegistro].efetuarNoDebito = switcher.side=="right";
            }
        }
        este.btnIrParaBanco = new BotaoRetangular(xTabelaFinancas + widthTabela - 280, este.y + (yTabelaFinancas - este.y + heightTabela + este.height)/2 - 22,
                                                  280, 44, 8, 280, 44, "#c3c3c3", "#ececec", null, null, "bold 18pt Century Gothic",
                                                  "black", "Ir para o banco", false, false, false);
        este.btnIrParaBanco.onclick = function() {
            este.abrirFechar();
            mapa.setLugarAberto(0);
            mapa.abrirFechar();
        }
    }
    configurar();
}