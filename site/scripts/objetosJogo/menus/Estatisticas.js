function Estatisticas()
{
    var valores15 = new Array();
    var valoresTotais = new Array();
    var valoresEconomia = new Array();
    var valoresCustos = new Array();
    var valoresGanhos = new Array();
    var valoresCG = new Array();
    var telaAtualE = 0;
    var chartTotal;
    var chart15;
    var chartEconomia;
    var chartLucroPrejuizo;
    var mesAtual = calendario.mes;
    var xVal = 0;
    var xValMes = 0;
    this.width = 700;
    this.height = 500;
    this.x = (canvas.width - this.width)/2;
    this.y = (canvas.height - this.height - 60)/2 + 60;
    var este = this;

    this.aberto = false;
    this.btnFechar = new BotaoRetangular(this.x + this.width - 50, this.y + 10, 40, 40,
                             { upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5 }, 40, 40,
        "#232323", "#535353", null, null, "bold 18pt Century Gothic", "red", "X", false, false, false);

    this.btnDinheiro = new BotaoRetangular(este.x + 200, este.y + 150, 300, 50, { upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5 }, 300, 50, "lightgrey", "gray", null, null,
    	"bold 18pt Century Gothic", "black", "Últimos 15 dias", false, false, false);
    this.btnDinheiroTudo = new BotaoRetangular(este.x + 200, este.y + 225, 300, 50, { upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5 }, 300, 50, "lightgrey", "gray", null, null,
    	"bold 18pt Century Gothic", "black", "Dinheiro em caixa", false, false, false);
    this.btnVoltar = new BotaoRetangular(este.width + 50, este.y + 75, 75, 25, { upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5 }, 75, 25, "lightgrey", "gray", null, null,
    	"bold 12pt Century Gothic", "black", "Voltar", false, false, false);
    this.btnEconomia = new BotaoRetangular(este.x + 200, este.y + 300, 300, 50, { upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5 }, 300, 50, "lightgrey", "gray", null, null,
    	"bold 18pt Century Gothic", "black", "Economia", false, false, false);
    this.btnCustosGanhos = new BotaoRetangular(este.x + 200, este.y + 375, 300, 50, { upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5 }, 300, 50, "lightgrey", "gray", null, null,
    	"bold 18pt Century Gothic", "black", "Custos e Ganhos", false, false, false);

    this.btnFechar.onclick = function(e) {
        $('.grafico').css('display', 'none');
        este.abrirFechar();
    }
    this.btnVoltar.onclick = function()
    {
    	desativarTela();
    	telaAtualE = 0;
        ativarTela();
        $('.grafico').css('display', 'none');
    };
    this.btnDinheiro.onclick = function()
    {
    	desativarTela();
        telaAtualE = 1;
        ativarTela();
        $('.grafico').css('display', 'none');
        $("#15").css('display', 'block')
        criarGrafico15();
    };
    this.btnDinheiroTudo.onclick = function()
    {
    	desativarTela();
    	telaAtualE = 2;
        ativarTela();
        $('.grafico').css('display', 'none');
        $("#total").css('display', 'block')
        criarGraficoTotal();
        
    };
    this.btnEconomia.onclick = function() 
    {
    	desativarTela();
        telaAtualE = 3;      
        ativarTela();
        $('.grafico').css('display', 'none');
        $('#economia').css('display', 'block');  
        criarGraficoEconomia();
    };
    this.btnCustosGanhos.onclick = function()
    {
    	desativarTela();
        telaAtualE = 4;
        ativarTela();
        $('.grafico').css('display', 'none');
        $('#perdaGanho').css('display', 'block'); 
        criarGraficoCustosGanhos();
    };

    this.setEconomia = function(f) {
    	if (mesAtual != calendario.mes || xValMes == 0)
    	{
            var obj = new Object();
            obj.label = formatarData(calendario.mes, calendario.ano)
            obj.x = xValMes;
            obj.y = f;
            valoresEconomia.push(obj);
	    	if (valoresEconomia.length > 12)
	    		valoresEconomia.shift();
	    }
    };
    this.setCustos = function(c) {
    	if (mesAtual != calendario.mes || xValMes == 0)
    	{
            var obj = new Object();
            obj.label = formatarData(calendario.mes, calendario.ano)
            obj.y = c;
            obj.x = xValMes;
            valoresCustos.push(obj);
	    	if (valoresCustos.length > 12)
	    		valoresCustos.shift();
	    }
    };
    this.setGanhos = function(g) {
    	if (mesAtual != calendario.mes || xValMes == 0)
    	{
            var obj = new Object();
            obj.label = formatarData(calendario.mes, calendario.ano)
            obj.y = g;
            obj.x = xValMes;
            valoresGanhos.push(obj);
	    	if (valoresGanhos.length > 12)
	    		valoresGanhos.shift();
    	}
    };
    this.setLucroPrejuizo = function(v) 
    {
    	if (mesAtual != calendario.mes || xValMes == 0)
    	{
            mesAtual = calendario.mes;
            var obj = new Object();
            obj.label = formatarData(calendario.mes, calendario.ano)
            obj.y = v;
            obj.x = xValMes++;
            valoresCG.push(obj);
	    	if (valoresCG.length > 12)
                valoresCG.shift();
	    }
    };
    this.desenhar = function() {

        if (this.aberto)
        {
            ctx.save();
            x = este.x + 45;
            y = este.y + 450;
            desenharJanela();
            if (telaAtualE == 0)
            	desenharTelaInicio();
            else
            {
                este.btnVoltar.desenhar();
            	switch(telaAtualE)
            	{
                    case 1:
                        $("#15").css('display', 'block')
                        chart15.render();
            		break;
                    case 2:
                        $("#total").css('display', 'block')
                        chartTotal.render();
            		break;
                    case 3:
                        $("#economia").css('display', 'block')
                        chartEconomia.render();
            		break;
                    case 4:
                        $("#perdaGanho").css('display', 'block')
                        chartLucroPrejuizo.render();
            		break;
            	}
            }
            ctx.restore();
        }
    }
    this.abrirFechar = function() {
        this.aberto = !this.aberto;
        if (this.aberto)
        {
            desativarBotoes();
            this.btnCustosGanhos.ativarInteracao();
            this.btnDinheiro.ativarInteracao();
            this.btnDinheiroTudo.ativarInteracao();
            this.btnEconomia.ativarInteracao();
            this.btnVoltar.ativarInteracao();
            this.btnFechar.ativarInteracao();
        }
        else
        {
            this.btnCustosGanhos.desativarInteracao();
            this.btnDinheiro.desativarInteracao();
            this.btnDinheiroTudo.desativarInteracao();
            this.btnEconomia.desativarInteracao();
            this.btnVoltar.desativarInteracao();
            this.btnFechar.desativarInteracao();
            this.btnFechar.hovering = false;
            ativarBotoes();
        }
    }
    function desenharJanela()
    {
        ctx.fillStyle = "#333333";
        ctx.globalAlpha = 0.3;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        roundRect(este.x, este.y, este.width, este.height, { upperLeft: 20, upperRight: 20, lowerLeft: 20, lowerRight: 20 }, true, true);
       
        ctx.fillStyle = "White";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.font = "bold 24pt Century Gothic";
        ctx.fillText("Estatísticas", este.x + este.width/2, este.y + 10, este.width - 5);
    
        este.btnFechar.desenhar();
        roundRect(este.x, este.y + 60, este.width, este.height - 60, {lowerLeft: 20, lowerRight: 20 }, true, true);

        ctx.fillStyle = "Black";
        ctx.font = "bold 18pt Century Gothic";
        var situacao = "";
        ctx.fillText(situacao, este.x + este.width/2, este.y + 65, este.width - 5);
    }
    function desenharTelaInicio()
    {
    	ctx.save();
    	ctx.fillStyle = "black";
    	ctx.font = "bold 25pt Century Gothic";
    	ctx.fillText("Selecione o gráfico desejado:", este.x + 250, este.y + 75);
    	este.btnDinheiro.desenhar();
    	este.btnDinheiroTudo.desenhar();
    	este.btnEconomia.desenhar();
    	este.btnCustosGanhos.desenhar();
    	ctx.restore();
    }
    function ativarTela()
    {
    	if (telaAtualE == 0)
    	{
    		este.btnDinheiro.ativarInteracao();
    		este.btnDinheiroTudo.ativarInteracao();
    		este.btnEconomia.ativarInteracao();
    		este.btnCustosGanhos.ativarInteracao();
    	}
    	else
    		este.btnVoltar.ativarInteracao();
    }
    function desativarTela()
    {
    	if (telaAtualE == 0)
    	{
    		este.btnDinheiro.desativarInteracao();
    		este.btnDinheiroTudo.desativarInteracao();
    	}
    	else
    		este.btnVoltar.desativarInteracao();
    }
    this.adicionarValor = function (v) {
        if (!isNaN(v)) {
            var obj = new Object();
            obj.label = formatarData(calendario.dia, calendario.mes, calendario.ano)
            obj.x = xVal++;
            obj.y = v;
            valores15.push(obj);
            valoresTotais.push(obj)
            if (valores15.length > 15)
                valores15.shift();
        }
    }
    this.getEstatisticas = function() {
        var est = new Object();
        est.Saldo = valoresTotais;
        est.Economia = valoresEconomia;
        est.LucroPrejuizo = valoresCG;
        est.Perda = valoresCustos;
        est.Ganho = valoresGanhos;
        est.Fator = valoresEconomia[valoresEconomia.length-1];
        est.xVal = xVal;
        est.xValMes = xValMes;
        return est;
    }
    this.setEstatisticas = function(obj)
    {
        var est = JSON.parse(obj);
        valoresTotais = est.Saldo;
        valoresEconomia = est.Economia;
        valoresCG = est.LucroPrejuizo;
        valoresCustos = est.Perda;
        valoresGanhos = est.Ganho;
        mesAtual = calendario.mes;
        xVal = est.xVal;
        xValMes = est.xValMes;
    }
    function criarGraficoTotal()
    {
        chartTotal = new CanvasJS.Chart("total", {
            animationEnabled: true,
            culture: 'en',
            zoomEnabled: true,
            axisX: {title: "Dias"},
            axisY: {title: "Saldo", prefix: '$'},
            title: {text: "Saldo"},
            data:
            [{
                type: "line",
                color: '#4286f4',
                dataPoints: valoresTotais
            }]
        });
        chartTotal.render();
    }
    function criarGraficoEconomia()
    {
        chartEconomia = new CanvasJS.Chart("economia", {
            animationEnabled: true,
            culture: 'es',
            zoomEnabled: true,
            axisX: {title: "Meses"},
            axisY: {title: "Índice econômico"},
            title: {text: "Economia"},
            data:
            [{
                type: "line",
                color: '#5e35e8',
                dataPoints: valoresEconomia
            }]
        });
        chartEconomia.render();
    }
    function criarGrafico15()
    {
        chart15 = new CanvasJS.Chart("15", {
            animationEnabled: true,
            culture: 'es',
            zoomEnabled: true,
            axisX: {title: "Dias"},
            axisY: {title: "Saldo", prefix: '$'},
            title: {text: "Saldo"},
            data:
            [{
                type: "line",
                color: '#4286f4',
                dataPoints: valores15
            }]
        });
        chart15.render();
    }
    function criarGraficoCustosGanhos()
    {
        chartLucroPrejuizo = new CanvasJS.Chart("perdaGanho", {
            animationEnabled: true,
            culture: 'en',
            zoomEnabled: true,
            axisX: {title: "Meses"},
            axisY: {title: "Total", prefix: '$'},
            title: {text: "Lucros/Prejuízos"},
            data:
            [
                {
                    type: "line",
                    color: '#41e835',
                    dataPoints: valoresGanhos
                },
                {
                    type: 'line',
                    color: '#ff2b2b',
                    dataPoints: valoresCustos
                },
                {
                    type: 'line',
                    color: '#ffeb3a',
                    dataPoints: valoresCG
                }
            ]
        });
        chartLucroPrejuizo.render();
    }
}