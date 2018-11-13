function Operacional()
{
    this.width = 900;
    this.height = 620;
    this.x = (canvas.width - this.width)/2;
    this.y = (canvas.height - this.height - 60)/2 + 60;
    
    var este = this;

    var garagem = getJanelaConstrucao("Garagem");
    var produtos = garagem.produtos;

    this.precoUpgrade = 4000;

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
            desativarBotoes();
            for (var i = 0; i < produtos.length; i++)
                este.txtsProducao[i].ativarInteracao();
            this.btnFechar.ativarInteracao();
            this.btnIrParaGaragem.ativarInteracao();
            this.btnUpgrade.ativarInteracao();
        }
        else
        {
            for (var i = 0; i < este.txtsProducao.length; i++)
                este.txtsProducao[i].desativarInteracao();
            this.btnFechar.desativarInteracao();
            this.btnIrParaGaragem.desativarInteracao();
            this.btnUpgrade.desativarInteracao();
            ativarBotoes();
        }
    }
    this.desenhar = function() 
    {
        if (this.aberto)
        {
            ctx.save();

            desenharJanela();
            desenharInformacoes();
            desenharGrafico();
            desenharTabela();

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
        roundRect(este.x, este.y, este.width, este.height, { upperLeft: 20, upperRight: 20, lowerLeft: 20, lowerRight: 20 }, true, true)
       
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.font = "bold 24pt Century Gothic";
        ctx.fillText("Operacional", este.x + este.width/2, este.y + 10, este.width - 5);

        este.btnIrParaGaragem.desenhar();
        este.btnFechar.desenhar();

        roundRect(este.x, este.y + 60, este.width, este.height - 60, {lowerLeft: 20, lowerRight: 20 }, true, true);

        ctx.globalAlpha = 0.2;
        ctx.drawImage(imgFundoOperacional, este.x + 171.5, este.y + 131);

        ctx.restore();
    }
    function desenharInformacoes()
    {
        ctx.save();

        ctx.textAlign = "right";
        ctx.textBaseline = "alphabetic";
        ctx.font = "bold 22pt Century Gothic";
        ctx.fillStyle = "black";
        ctx.fillText("Capacidade de produção: ", este.x + 570, este.y + 105);
        
        ctx.textAlign = "left";
        ctx.font = "22pt Century Gothic";
        ctx.fillText(`${garagem.capacidadeProducao}u/dia`, este.x + 570, este.y + 105);

        ctx.textBaseline = "top";
        ctx.textAlign = "center";
        ctx.font = "bold 18pt Century Gothic";
        ctx.fillStyle = "green";
        ctx.fillText("Preço do upgrade: " + formatarDinheiro(este.precoUpgrade), este.x + este.width/2, este.y + 170);
        este.btnUpgrade.desenhar();

        ctx.textBaseline = "top";
        ctx.textAlign = "right";
        ctx.fillStyle = "black";
        ctx.font = "bold 17pt Century Gothic";
        ctx.fillText("Status da produção: ", este.x + este.width/2 + 65, este.y + 225);

        var produtosAtivos = 0;
        for (var i = 0; i < produtos.length; i++)
            if (produtos[i].producao > 0)
                produtosAtivos++;

        ctx.textAlign = "left";
        ctx.fillStyle = produtosAtivos == 0 || garagem.qtdeMateriaPrima==0?"red":"green";
        ctx.fillText(produtosAtivos == 0 || garagem.qtdeMateriaPrima==0?"parada.":"ativa.", este.x + este.width/2 + 65, este.y + 225);

        ctx.textAlign = "center";
        ctx.font = "italic 16pt Century Gothic";
        var texto;
        if (produtosAtivos > 0)
            texto = garagem.qtdeMateriaPrima==0?"Sem matéria-prima.":`${garagem.qtdeMateriaPrima}u de matéria-prima disponível`;
        else if (produtos.length == 0)
            texto = "Crie produtos para começar!";
        else
            texto = produtos.length - (produtos[produtos.length - 1].status!=1?1:0) > 1?"Inicie a produção dos itens abaixo!":"Inicie a produção do item abaixo!";
            
        ctx.fillText(texto, este.x + este.width/2, este.y + 250);

        ctx.restore();
    }

    var coresProducao = ["#00e52a", "#ba0000", "#e87b06", "#efff3f", "#8e0047", "#aa00ff", "#0003c4", "#00c3e5", "gray"];

    function desenharGrafico()
    {
        ctx.save();

        var raio = 88;
        var xCentro = este.x + este.width - (raio + 15);
        var yCentro = este.y + 200;
        var corBase = "gray";
        var valores = new Array();
        
        for (var i = 0; i < produtos.length; i++)
            valores.push(produtos[i].producao);
        
        var total = garagem.capacidadeProducao;

        desenharGraficoPizza(raio, xCentro, yCentro, valores, total, coresProducao, corBase);
        
        ctx.restore();
    }

    function calcularProducaoDisponivel()
    {
        var producaoDisponivel = garagem.capacidadeProducao;
        for (var i = 0; i < produtos.length; i++)
            producaoDisponivel -= parseInt(este.txtsProducao[i].text);
        return producaoDisponivel;
    }


    var widthTabela = 580;
    var heightTabela = 303;
    var xTabelaProducao = este.x + (este.width - widthTabela)/2;
    var yTabelaProducao = este.y + 308;
    function desenharTabela()
    {
        ctx.save();

        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;

        ctx.fillStyle = "silver";
        ctx.fillRect(xTabelaProducao, yTabelaProducao, widthTabela, heightTabela);
        ctx.strokeRect(xTabelaProducao, yTabelaProducao, widthTabela, heightTabela);

        ctx.fillStyle = "gray";
        ctx.fillRect(xTabelaProducao, yTabelaProducao, widthTabela, 30);
        ctx.strokeRect(xTabelaProducao, yTabelaProducao, widthTabela, 30);

        ctx.fillStyle = "black";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.font = "bold 13pt Consolas";
        
        ctx.fillText(" Legenda           Nome                    Produção", xTabelaProducao, yTabelaProducao + 15);

        for (var i = 0; i < 9; i++)
        {
            if (i%2 == 0) // Faixas mais claras
            {
                ctx.fillStyle = "#d8d8d8";
                ctx.fillRect(xTabelaProducao + 1, yTabelaProducao + 31 + 30 * i, widthTabela - 2, 31);
            }

            ctx.fillStyle = coresProducao[i];
            ctx.fillRect(xTabelaProducao + 6, yTabelaProducao + 36 + 30 * i, 80, 20);
            ctx.strokeRect(xTabelaProducao + 6, yTabelaProducao + 36 + 30 * i, 80, 20);

            ctx.fillStyle = "black";
            if (i < produtos.length && produtos[i].status == 1)
            {
                var pad = "                                                          ";
                ctx.fillText(" " + (produtos[i].nome + pad).substr(0, 20), xTabelaProducao + 92, yTabelaProducao + 46 + 30 * i);
                ctx.fillText("u/dia", xTabelaProducao + 509, yTabelaProducao + 45 + 30 * i)
                este.txtsProducao[i].desenhar();
            }
            else if (i == 8)
            {
                ctx.save();

                ctx.textAlign = "center";
                ctx.font = "bold 14.5pt Consolas"
                ctx.fillText("Produção disponível", xTabelaProducao + 208.5, yTabelaProducao + 46 + 30 * i);
                ctx.fillText(calcularProducaoDisponivel() + "u/dia", xTabelaProducao + (widthTabela + 325)/2, yTabelaProducao + 46 + 30 * i);

                ctx.restore();
            }
        }

        ctx.beginPath();
        ctx.moveTo(xTabelaProducao + 92, yTabelaProducao + 30);
        ctx.lineTo(xTabelaProducao + 92, yTabelaProducao + heightTabela);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(xTabelaProducao + 325, yTabelaProducao + 30);
        ctx.lineTo(xTabelaProducao + 325, yTabelaProducao + heightTabela);
        ctx.closePath();
        ctx.stroke();

        ctx.restore();
    }
    function configurar()
    {
        este.btnUpgrade = new BotaoRetangular(este.x + (este.width - 280)/2, este.y + 125, 280, 40, 5, 280, 40,
                                              "#c3c3c3", "#dadada", null, null, "bold 18pt Century Gothic",
                                              "black", "Dobrar capacidade", false, false, false);
        este.btnUpgrade.onclick = function() {
            fazerCompra("Reforma do operacional", este.precoUpgrade, true, true, Math.log2(este.precoUpgrade/1000) + 1, function() {
            este.precoUpgrade *= 2;
            garagem.capacidadeProducao *= 2;
        })
}

        este.txtsProducao = new Array();
        for (var i = 0; i < 8; i++)
            este.txtsProducao.push(new TextBox({
                x: xTabelaProducao + 375,
                y: yTabelaProducao + 34 + 30 * i,
                width: 130,
                height: 24,
                text: garagem.txtsProducao[i].text,
                onlynumbers: true,
                acceptFloats: false,
                font: "13pt Century Gothic",
                beforeTextChanged: function(textbox) {
                    textbox.maxvalue = calcularProducaoDisponivel() + parseInt(textbox.text);
                },
                afterTextChanged: function(textbox) {
                    var registro = (textbox.y - (yTabelaProducao + 34))/30;
                    produtos[registro].producao = parseInt(textbox.text);
                    garagem.txtsProducao[registro].text = textbox.text;
                }
            }))
    }
    configurar();
}