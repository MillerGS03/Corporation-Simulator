function Estatisticas()
{
    var datas = new Array();
    iniciarDatas();
    var meses = new Array();
    iniciarMeses();
    var valores15 = new Array();
    var valoresTotais = new Array();
    var posicoes = new Array();
    var posicoes12 = new Array();
    var valoresEconomia = new Array();
    var valoresCustos = new Array();
    var valoresGanhos = new Array();
    var valoresCG = new Array();
    var atual = 0;
    var atualTudo = 0;
    var telaAtualE = 0;
    var vezes = 0;
    var x;
    var y;
    var escalaAtual = 0;
    var escalaTudo = 0;
    var escalaCG = 0;
    var ec = 0;
    var cus = 0;
    var ga = 0;
    var cg = 0;
    var passouMes = false;
    var mesAtual = 1;
    var mudandoMes = false;
    this.width = 700;
    this.height = 500;
    this.x = (canvas.width - this.width)/2;
    this.y = (canvas.height - this.height - 60)/2 + 60;
    var este = this;

    this.aberto = false;
    this.btnFechar = new BotaoRetangular(this.x + this.width - 50, this.y + 10, 40, 40,
                             { upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5 }, 40, 40,
        "#232323", "#535353", null, null, "bold 18pt Century Gothic", "red", "X", false, true, false);

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
        este.abrirFechar();
    }
    this.btnVoltar.onclick = function()
    {
    	desativarTela();
    	telaAtualE = 0;
    	ativarTela();
    };
    this.btnDinheiro.onclick = function()
    {
    	desativarTela();
    	telaAtualE = 1;
    	ativarTela();
    };
    this.btnDinheiroTudo.onclick = function()
    {
    	desativarTela();
    	telaAtualE = 2;
    	ativarTela();
    };
    this.btnEconomia.onclick = function() 
    {
    	desativarTela();
    	telaAtualE = 3;
    	ativarTela();
    };
    this.btnCustosGanhos.onclick = function()
    {
    	desativarTela();
    	telaAtualE = 4;
    	ativarTela();
    };

    this.setEconomia = function(f) {
    	if (passouMes)
    	{
    		valoresEconomia[ec++] = f;
	    	if (ec == 12)
	    	{
	    		for (var i = 0; i < 12; i++)
	    			valoresEconomia[i] = valoresEconomia[i+1];
	    		valoresEconomia[11] = f;
	    	}
	    }
    };
    this.setCustos = function(c) {
    	if (passouMes)
    	{
    		valoresCustos[cus++] = c;
	    	if (cus == 12)
	    	{
	    		for(var i = 0; i < 12; i++)
	    			valoresCustos[i] = valoresCustos[i+1];
	    		valoresCustos[11] = c;
	    	}
	    }
    };
    this.setGanhos = function(g) {
    	if (passouMes)
    	{
    		valoresGanhos[ga++] = g;
	    	if (ga == 12)
	    	{
	    		for(var i = 0; i < 12; i++)
	    			valoresGanhos[i] = valoresGanhos[i+1];
	    		valoresGanhos[11] = g;
	    	}
    	}
    };
    this.setLucroPrejuizo = function(v) 
    {
    	if (passouMes)
    	{
    		valoresCG[cg++] = v;
	    	if (cg == 12)
	    	{
	    		for (var i = 0; i < 12; i++)
	    			valoresCG[i] = valoresCG[i+1];
	    		valoresCG[11] = v;
	    	}
	    	passouMes = false;
	    }
    };
    this.isPassouMes = function(m)
    {
    	if (mesAtual < m)
    	{
    		passouMes = true;
    		mesAtual = m;
    	}
    	else if (mesAtual == 12 && m == 1)
    	{
    		passouMes = true;
    		mesAtual = m;
    	}
    };
    ativarTela();
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
            	escalaAtual = calcularEscala();
            	escalaTudo = calcularEscalaTudo();
            	escalaCG = calcularEscalaLucro();
            	desenharEixos();
            	switch(telaAtualE)
            	{
            		case 1:
            			desenharLinhaGrafico("#4286f4");
            		break;
            		case 2:
            			desenharLinhaGraficoTudo("#4286f4");
            		break;
            		case 3:
            			desenharLinhaGraficoEconomia("#5e35e8");
            		break;
            		case 4:
            			desenharLucro("#ffeb3a");
            			desenharCusto("#ff2b2b");
            			desenharGanho("#41e835");
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
            this.btnFechar.ativarInteracao();
        }
        else
        {
            this.btnFechar.desativarInteracao();
            this.btnFechar.hovering = false;
            ativarBotoes();
        }
        atualizar();
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
    function desenharEixos()
    {
        ctx.save();
        desenharLinhas();
        ctx.fillStyle = "Black";
        var e = 0;
        switch(telaAtualE)
        {
        	case 1:
        		e = escalaAtual;
        	break;
        	case 2:
        		e = escalaTudo;
        	break;
        	case 3:
        		e = 1;
        	break;
        	case 4:
        		e = escalaCG;
        	break;
        }
        desenharEixoY(e);
        desenharEixoX(e);
        desenharSetas();
        ctx.closePath();
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
    	{
    		este.btnVoltar.desativarInteracao();
    	}
    }
    function desenharSetas()
    {
        ctx.beginPath();
        ctx.strokeStyle = "Black";
        ctx.moveTo(x + 620, y);
        ctx.lineTo(x + 620, y - 7.5);
        ctx.lineTo(x + 635, y);
        ctx.lineTo(x + 620, y + 7.5);
        ctx.lineTo(x + 620, y);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.strokeStyle = "Black";
        ctx.moveTo(x, y - 350);
        ctx.lineTo(x - 7.5, y - 350);
        ctx.lineTo(x, y - 365);
        ctx.lineTo(x + 7.5, y - 350);
        ctx.lineTo(x, y - 350);
        ctx.stroke();
        ctx.closePath();
    }
    function desenharLinhas()
    {
        ctx.beginPath();
        ctx.lineTo(x, y);
        ctx.moveTo(x - 30, y);
        ctx.lineTo(x + 620, y);
        ctx.moveTo(x, y - 350);
        ctx.lineTo(x, y + 30);
        ctx.strokeStyle = "#000";
        ctx.stroke();
        ctx.closePath();
    }
    function desenharEixoY(e)
    {
        for (var i = 1; i <= 10; i++) {
            ctx.textAlign = "right";
            ctx.font = "bold 12pt Century Gothic";
            ctx.fillText(i + "", x - 3, y - (34 * i), 3000);
        }
        ctx.textAlign = "left";
        strEscala = defineStringEscala(e);
        ctx.fillText("$ " + strEscala, x - 40, y - 385);
    }
    function desenharEixoX(e)
    {
        ctx.font = "bold 10pt Century Gothic";
        var xAtual;
        var yAtual;
        var atual;
        var aux = x;
        ctx.beginPath();
        if (telaAtualE == 1)
        {
            for (var i = 0; i < 15; i++)
            {
                aux += (i!=0?40:15);
                posicoes[i] = aux + 20;
                ctx.fillText(datas[i], aux, y + 5);
            }
        }
        else if (telaAtualE == 3 || telaAtualE == 4)
        {
        	for (var i = 0; i < 12; i++)
        	{
        		aux += (i!=0?50:15);
        		posicoes12[i] = aux + 20;
        		ctx.fillText(meses[i], aux, y + 5);
        	}
        }
    }
    function calcularEscala()
    {
        var aux = "";
        for (var i = 0; i < valores15.length; i++) {
            if (aux < valores15[i])
                aux = valores15[i] + "";
        }
        return aux.length - 1;
    }
    function calcularEscalaTudo()
    {
        var aux = "";
        for (var i = 0; i < valoresTotais.length; i++)
            if (aux < valoresTotais[i])
                aux = valoresTotais[i] + "";
        return aux.length - 1;
    }
    function calcularEscalaLucro()
    {
    	var aux = 0;
    	var aux2 = "";
    	for (var i = 0; i < 12; i++)
    	{
    		if (valoresCG[i] > aux)
    			aux = valoresCG[i];
    	}
    	for (var i = 0; i < 12; i++)
    	{
    		if (valoresGanhos[i] > aux)
    			aux = valoresGanhos[i];
    	}
    	for (var i = 0; i < 12; i++)
    	{
    		if (valoresCustos[i] > aux)
    			aux = valoresCustos[i];
    	}
    	aux2 = aux + "";
    	return aux2.length - 1;
    }
    function defineStringEscala(e)
    {
        var strE = "";
        if (e == 1)
            strE = "(dezenas)";
        else if (e == 2)
            strE = "(centenas)";
        else if (e == 3)
            strE = "(milhares)";
        else if (e == 4)
            strE = "(dezenas de milhares)";
        else if (e == 5)
            strE = "(centenas de milhares)";
        else if (e == 6)
            strE = "(milhões)";
        else if (e == 7)
            strE = "(dezenas de milhões)";
        else if (e == 8)
            strE = "(centenas de milhões)";
        else if (e == 9)
            strE = "(bilhões)";
        else if (e == 10)
            strE = "(dezenas de bilhões)";
        else if (e == 11)
            strE = "(centenas de bilhões)";
        else if (e == 12)
            strE = "(trilhões)";
        else if (e == 13)
            strE = "(dezenas de trilhões)";
        else if (e == 14)
        	strE = "(centenas de trilhões)";
        else if (e == 15)
        	strE = "(quadrilhões)";
        return strE;
    }
    function iniciarDatas()
    {
        var dia = calendario.dia;
        var mes = calendario.mes;
        for (var i = 0; i < 15; i++){
            datas[i] = formatarData(dia, mes, null);
            if (dia == calendario.qtosDiasTemOMes[calendario.mes - 1]){
                dia = 1;
                mes++;
            }
            dia++;
        }
    }
    function iniciarMeses()
    {
    	var mes = calendario.mes;
    	var ano = calendario.ano;
    	for (var i = 0; i < 12; i++)
    		meses[i] = formatarData(mes++, ano);
    }
    this.adicionarValor = function (v) {
        if (!isNaN(v)) {
        	mudandoMes = false;
            if (atual >= 15) {
                for (var i = 0; i < 15; i++)
                    valores15[i] = valores15[i+1];
                valores15[atual] = v;
            }
            else {
                valores15[atual++] = v;
            }
            valoresTotais[atualTudo++] = v;
            if (vezes == 14){
                for(var i = 0; i < 14; i++){
                    datas[i] = datas[i+1];
                }
                datas[14] = formatarData(calendario.dia, calendario.mes, null);
            }
            else
                vezes++;
            if (mesAtual == 12 && !mudandoMes)
            {
        		for (var i = 0; i < 12; i++)
        			meses[i] = meses[i+1];
        		meses[11] = formatarData(calendario.mes, calendario.ano);
        		mudandoMes = true;
            }
        }
    }
    function desenharLinhaGrafico(cor)
    {
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = cor;
        var Y = 0;
        var valorAtual = 0;
        for (var i = 0; i < valores15.length; i++)
        {
            if (valores15[i] != null)
            {
                valorAtual = valores15[i]/Math.pow(10, escalaAtual);
                Y = (y-(34*valorAtual));
                if (i == 0)
                    ctx.moveTo(x, Y);
                ctx.lineTo(posicoes[i], Y);
                ctx.stroke();
            }
        }
        ctx.closePath();
        ctx.restore();
    }
    function desenharLinhaGraficoTudo(cor)
    {
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = cor;
        var X = x;
        var Y = 0;
        var valorAtual = 0;
        for(var i = 0; i < valoresTotais.length; i++)
        {
            X += (i!=0?(620/valoresTotais.length):0);
            valorAtual = valoresTotais[i]/Math.pow(10, escalaTudo);
            Y = (y-(34*valorAtual));
            ctx.lineTo(X, Y);
            ctx.stroke();
        }
        ctx.closePath();
        ctx.restore();
    }
    function desenharLinhaGraficoEconomia(cor)
    {
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = cor;
        var Y = 0;
        var valorAtual = 0;
        for (var i = 0; i < valoresEconomia.length; i++)
        {
            if (valoresEconomia[i] != null)
            {
                valorAtual = valoresEconomia[i];
                Y = (y-(34*valorAtual));
                if (i == 0)
                    ctx.moveTo(x, Y);
                ctx.lineTo(posicoes12[i], Y);
                ctx.stroke();
            }
        }
        ctx.closePath();
        ctx.restore();
    }
    function desenharLucro(cor)
    {
    	ctx.save();
    	ctx.beginPath();
    	ctx.strokeStyle = cor;
        var valor = 0;
        var Y = 0;
        for (var i = 0; i < valoresCG.length; i++)
        {
        	if (valoresCG[i] != null)
        	{
        		valor = valoresCG[i]/Math.pow(10, escalaCG);
        		Y = (y-(34*valor));
        		if (i == 0)
        			ctx.moveTo(x, Y);
        		ctx.lineTo(posicoes12[i], Y);
        		ctx.stroke();
        	}
        }
        ctx.closePath();
        ctx.restore();
    }
    function desenharCusto(cor)
    {
    	ctx.save();
    	ctx.beginPath();
    	ctx.strokeStyle = cor;
        var valor = 0;
        var Y = 0;
        for (var i = 0; i < valoresCustos.length; i++)
        {
        	if (valoresCustos[i] != null)
        	{
        		valor = valoresCustos[i]/Math.pow(10, escalaCG);
        		Y = (y-(34*valor));
        		if (i == 0)
       	 			ctx.moveTo(x, Y);
        		ctx.lineTo(posicoes12[i], Y);
        		ctx.stroke();
        	}
        }
        ctx.closePath();
        ctx.restore();
    }
    function desenharGanho(cor)
    {
    	ctx.save();
    	ctx.beginPath();
    	ctx.strokeStyle = cor;
        var valor = 0;
        var Y = 0;
        for (var i = 0; i < valoresGanhos.length; i++)
        {
        	if (valoresGanhos[i] != null)
        	{
        		valor = valoresGanhos[i]/Math.pow(10, escalaCG);
        		Y = (y-(34*valor));
        		if (i == 0)
        			ctx.moveTo(x, Y);
        		ctx.lineTo(posicoes12[i], Y);
        		ctx.stroke();
        	}
        }
        ctx.closePath();
        ctx.restore();
    }
}