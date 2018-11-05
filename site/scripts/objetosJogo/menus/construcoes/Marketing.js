function Marketing()
{
    this.width = 900;
    this.height = 620;
    this.x = (canvas.width - this.width)/2;
    this.y = (canvas.height - this.height - 60)/2 + 60;

    var garagem = getJanelaConstrucao("Garagem");
    var este = this;

    this.aberto = false;
    this.btnFechar = new BotaoRetangular(this.x + this.width - 50, this.y + 10, 40, 40, 5, 40, 40,
                                         "#232323", "#535353", null, null, "bold 18pt Century Gothic", 
                                         "red", "X", false, false, false);
    this.btnFechar.onclick = function(e) {
        este.abrirFechar();
    }

    this.abrirFechar = function() 
    {
        this.aberto = !this.aberto;
        if (this.aberto)
        {
            desativarBotoes();
            this.ativar();
        }
        else
        {
            this.desativar();
            ativarBotoes();
        }
    }
    this.ativar = function()
    {
        if (dadosJanelaPromocao.aberta)
        {
            this.btnFecharPromocao.ativarInteracao();
            if (dadosJanelaPromocao.indiceQualidade < 4)
                this.btnMaisQualidade.ativarInteracao();
            if (dadosJanelaPromocao.indiceQualidade > 0)
                this.btnMenosQualidade.ativarInteracao();
            this.txtTempo.ativarInteracao();
            this.btnPromover.ativarInteracao();
        }
        else
        {
            for (var i = 0; i < garagem.produtos.length; i++)
                if (i < garagem.produtos.length && garagem.produtos[i].fatorMarketing > 0)
                    this.botoesPromover[i].ativarInteracao();
            this.btnFechar.ativarInteracao();
        }
    }
    this.desativar = function() 
    {
        for (var i = 0; i < 8; i++)
            this.botoesPromover[i].desativarInteracao();

        this.txtTempo.desativarInteracao();
        this.btnMaisQualidade.desativarInteracao();
        this.btnMenosQualidade.desativarInteracao();
        this.btnPromover.desativarInteracao();
        this.btnFecharPromocao.desativarInteracao();
        this.btnFechar.desativarInteracao();
    }
    this.desenhar = function() 
    {
        if (this.aberto)
        {
            ctx.save();

            desenharJanela();
            desenharTabelaVendas();
            desenharGraficoRendaDiariaVendas();
            desenharGraficoVendasTotais();
            desenharInformacoesVendas();

            if (dadosJanelaPromocao.aberta)
                desenharJanelaPromocao();

            ctx.restore();
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
        roundRect(este.x, este.y, este.width, este.height, { upperLeft: 20, upperRight: 20, lowerLeft: 20, lowerRight: 20 }, true, true)
       
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.font = "bold 24pt Century Gothic";
        ctx.fillText("Marketing", este.x + este.width/2, este.y + 10, este.width - 5);

        este.btnFechar.desenhar();

        roundRect(este.x, este.y + 60, este.width, este.height - 60, {lowerLeft: 20, lowerRight: 20 }, true, true);
    }
    var xTabelaVendas = este.x + 10;
    var yTabelaVendas = este.y + 330;
    var widthTabela = este.width - (xTabelaVendas + 10 - este.x);
    var heightTabela = 272;

    function desenharTabelaVendas()
    {
        ctx.save();

        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;

        ctx.fillStyle = "silver";
        ctx.fillRect(xTabelaVendas, yTabelaVendas, widthTabela, heightTabela);
        ctx.strokeRect(xTabelaVendas, yTabelaVendas, widthTabela, heightTabela);

        ctx.fillStyle = "gray";
        ctx.fillRect(xTabelaVendas, yTabelaVendas, widthTabela, 30);
        ctx.strokeRect(xTabelaVendas, yTabelaVendas, widthTabela, 30);

        ctx.fillStyle = "black";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.font = "bold 13pt Consolas";
        
        ctx.fillText(" Legenda          Produto          Renda Diária  Vendas Totais   Criado em        Ações", xTabelaVendas, yTabelaVendas + 15);

        for (var i = 0; i < 8; i++)
        {
            if (i%2 == 0) // Faixas mais claras
            {
                ctx.fillStyle = "#d8d8d8";
                ctx.fillRect(xTabelaVendas + 1, yTabelaVendas + 31 + 30 * i, widthTabela - 2, 31);
            }

            ctx.fillStyle = coresGrafico[i];
            ctx.fillRect(xTabelaVendas + 6, yTabelaVendas + 36 + 30 * i, 80, 20);
            ctx.strokeRect(xTabelaVendas + 6, yTabelaVendas + 36 + 30 * i, 80, 20);

            ctx.fillStyle = "black";
            if (i < garagem.produtos.length && garagem.produtos[i].status == 1)
            {
                var pad = "                                                          ";
                ctx.textAlign = "left";
                ctx.fillText(" " + (garagem.produtos[i].nome + pad).substr(0, 20), xTabelaVendas + 92, yTabelaVendas + 46 + 30 * i);
                ctx.textAlign = "right";
                ctx.fillText(formatarDinheiro(garagem.produtos[i].vendasDiarias * garagem.produtos[i].preco), xTabelaVendas + 453, yTabelaVendas + 46 + 30 * i);
                ctx.fillText(garagem.produtos[i].totalDeVendas, xTabelaVendas + 594, yTabelaVendas + 46 + 30 * i);
                ctx.textAlign = "center";
                ctx.fillText(garagem.produtos[i].dataDeCriacao, xTabelaVendas + 664, yTabelaVendas + 46 + 30 * i);

                if (garagem.produtos[i].diasRestantes > 0)
                {
                    var s = garagem.produtos[i].diasRestantes == 1?"":"s";
                    ctx.font = "bold 12pt Consolas";
                    ctx.fillText(`+${garagem.produtos[i].diasRestantes} dia${s} de promoção`, 
                                 xTabelaVendas + (730 + widthTabela)/2, yTabelaVendas + 46 + 30 * i, widthTabela - 734);
                    ctx.font = "bold 13pt Consolas";
                }
                else
                    este.botoesPromover[i].desenhar();
            }
        }

        var xLinhas = [92, 322, 457, 598, 730];

        for (var i = 0; i < xLinhas.length; i++)
        {
            ctx.beginPath();
            ctx.moveTo(xTabelaVendas + xLinhas[i], yTabelaVendas + 30);
            ctx.lineTo(xTabelaVendas + xLinhas[i], yTabelaVendas + heightTabela);
            ctx.closePath();
            ctx.stroke();
        }

        ctx.restore();
    }

    var coresGrafico = ["#00e52a", "#ba0000", "#e87b06", "#efff3f", "#8e0047", "#aa00ff", "#0003c4", "#00c3e5", "gray"];
    function desenharGraficoRendaDiariaVendas()
    {
        ctx.save();

        var raio = 70;
        var xCentro = este.x + raio + 30;
        var yCentro = este.y + raio + 165;
        var valores = new Array();
        var total = 0;

        for (var i = 0; i < garagem.produtos.length; i++)
        {
            var rendaDiaria = garagem.produtos[i].vendasDiarias * garagem.produtos[i].preco;
            valores.push(rendaDiaria);
            total += rendaDiaria;
        }

        desenharGraficoPizza(raio, xCentro, yCentro, valores, total, coresGrafico, "gray");

        ctx.textBaseline = "bottom";
        ctx.textAlign = "center";
        ctx.fillStyle = "black";
        ctx.font = "bold 19pt Century Gothic";

        ctx.fillText("Renda Diária", xCentro, yCentro - raio - 10);
        
        ctx.restore();
    }
    function desenharGraficoVendasTotais()
    {
        ctx.save();

        var raio = 70;
        var xCentro = este.x + este.width - (raio + 30);
        var yCentro = este.y + raio + 165;
        var valores = new Array();
        var total = 0;

        for (var i = 0; i < garagem.produtos.length; i++)
        {
            var vendasTotais = garagem.produtos[i].totalDeVendas;
            valores.push(vendasTotais);
            total += vendasTotais;
        }
        
        desenharGraficoPizza(raio, xCentro, yCentro, valores, total, coresGrafico, "gray");

        ctx.textBaseline = "bottom";
        ctx.textAlign = "center";
        ctx.fillStyle = "black";
        ctx.font = "bold 19pt Century Gothic";

        ctx.fillText("Vendas Totais", xCentro, yCentro - raio - 10);
        
        ctx.restore();
    }
    function desenharInformacoesVendas()
    {
        ctx.save();

        ctx.textBaseline = "top";
        ctx.textAlign = "right";
        ctx.fillStyle = "black";
        ctx.font = "bold 19pt Century Gothic";
        ctx.fillText("Status das vendas: ", este.x + este.width/2 + 60, este.y + 70);
    
        var produtosComEstoque = 0;
        for (var i = 0; i < garagem.produtos.length; i++)
            if (garagem.produtos[i].rendaDiaria > 0 || garagem.produtos[i].qtdeEmEstoque > 0)
                produtosComEstoque++;

        ctx.textAlign = "left";
        ctx.fillStyle = produtosComEstoque==0?"red":"green";
        ctx.fillText(produtosComEstoque==0?"paradas.":"ativas.", este.x + este.width/2 + 60, este.y + 70);

        ctx.textAlign = "center";
        ctx.font = "italic 16pt Century Gothic";
        var texto = produtosComEstoque==0?"Nenhum produto com estoque.":`${produtosComEstoque}/${garagem.produtos.length - (garagem.produtos[garagem.produtos.length - 1].status!=1?1:0)} produto(s) com estoque`;
        ctx.fillText(texto, este.x + este.width/2, este.y + 95);

        ctx.restore();
    }

    var dadosJanelaPromocao = {aberta: false, nomePromocao: "Empresa", indiceQualidade: 0, onPromocaoFeita: function(){}};


    var widthJanelaPromocao = 540;
    var heightJanelaPromocao = 345;
    var xJanelaPromocao = this.x + (this.width - widthJanelaPromocao)/2
    var yJanelaPromocao = this.y + (this.height - heightJanelaPromocao)/2;
    function desenharJanelaPromocao()
    {
        ctx.save();

        ctx.fillStyle = "#333333";
        ctx.globalAlpha = 0.3;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;

        ctx.lineWidth = 3;
        ctx.strokeStyle = "black";
        roundRect(xJanelaPromocao, yJanelaPromocao, widthJanelaPromocao, heightJanelaPromocao, 12, true, true);

        este.btnFecharPromocao.desenhar();

        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillStyle = "white";
        ctx.font = "bold 22pt Century Gothic";
        ctx.fillText("Promover " + dadosJanelaPromocao.nomePromocao, este.x + este.width/2, yJanelaPromocao + 10);

        ctx.textAlign = "right";
        ctx.textBaseline = "middle";
        ctx.font = "bold 20pt Century Gothic";
        ctx.fillText("Tempo", xJanelaPromocao + 150, yJanelaPromocao + 115);
        ctx.fillText("Qualidade", xJanelaPromocao + 150, yJanelaPromocao + 165);
        ctx.fillText("Preço", xJanelaPromocao + 150, yJanelaPromocao + 215);

        este.txtTempo.desenhar();

        ctx.textAlign = "left";
        ctx.fillText("dias", xJanelaPromocao + 435, yJanelaPromocao + 115);

        ctx.fillStyle = "green";
        ctx.fillText(formatarDinheiro(calcularPreco()), xJanelaPromocao + 165, yJanelaPromocao + 215)

        var qualidades = ["Baixa", "Regular", "Média", "Boa", "Excelente"];
        var coresQualidade = ["#930000", "#f27d00", "#cebd02", "#5ca801", "#01a884"]

        ctx.fillStyle = "white";

        ctx.lineWidth = 1;
        ctx.fillRect(xJanelaPromocao + 165, yJanelaPromocao + 145, 260, 40);
        ctx.strokeRect(xJanelaPromocao + 165, yJanelaPromocao + 145, 260, 40);

        ctx.fillStyle = coresQualidade[dadosJanelaPromocao.indiceQualidade];
        ctx.font = "bold 18pt Century Gothic";
        ctx.textAlign = "center";
        ctx.fillText(qualidades[dadosJanelaPromocao.indiceQualidade], xJanelaPromocao + 295, yJanelaPromocao + 165);
        
        este.btnMaisQualidade.desenhar();
        este.btnMenosQualidade.desenhar();
        este.btnPromover.desenhar();

        ctx.restore();
    }
    function calcularPreco()
    {
        return parseInt(este.txtTempo.text) * 1000 * Math.pow(2, dadosJanelaPromocao.indiceQualidade);
    }

    function configurar()
    {
        este.botoesPromover = new Array();
        for (var i = 0; i < 8; i++)
        {
            este.botoesPromover.push(new BotaoRetangular(xTabelaVendas + 740, yTabelaVendas + 34 + 30 * i, widthTabela - 750,
                                                         24, 3, widthTabela - 750, 24, "#4c98a5", "#5eb9c9",
                                                         null, null, "bold 12pt Century Gothic", "white", "Promover!", false, false, false));
            este.botoesPromover[i].numeroRegistro = i;
            este.botoesPromover[i].onclick = function(botao) {
                dadosJanelaPromocao.aberta = true;
                dadosJanelaPromocao.nomePromocao = '"' + garagem.produtos[botao.numeroRegistro].nome + '"';
                dadosJanelaPromocao.indiceQualidade = 0;
                este.txtTempo.clear();
                dadosJanelaPromocao.onPromocaoFeita = function() {
                    garagem.produtos[botao.numeroRegistro].fatorMarketing = dadosJanelaPromocao.indiceQualidade + 1;
                    garagem.produtos[botao.numeroRegistro].diasRestantes = parseInt(este.txtTempo.text);
                    alerta(`${dadosJanelaPromocao.nomePromocao} será promovido por ${este.txtTempo.text} dias`);
                }
                este.desativar();
                este.ativar();
            }
        }
        este.btnFecharPromocao = new BotaoRetangular(xJanelaPromocao + widthJanelaPromocao - 50, yJanelaPromocao + 10, 40, 40, 5, 40, 40,
                                                     "#232323", "#535353", null, null, "bold 18pt Century Gothic", 
                                                     "red", "X", false, false, false);
        este.btnFecharPromocao.onclick = function() {
            dadosJanelaPromocao.aberta = false;
            este.desativar();
            este.ativar();
        }

        este.txtTempo = new TextBox({
            x: xJanelaPromocao + 165,
            y: yJanelaPromocao + 95,
            width: 260,
            height: 40,
            font: "bold 18pt Century Gothic",
            onlynumbers: true,
            acceptFloats: false,
            text: "0",
            maxvalue: 99,
            borderRadius: 0,
            backgroundColor: "white"
        });

        este.btnMaisQualidade = new BotaoRetangular(xJanelaPromocao + 425, yJanelaPromocao + 145, 45, 20, 0, 45, 20,
                                                    "#c3c3c3", "#dadada", null, null, "bold 18pt Century Gothic", 
                                                    "black", "^", false, false, false);
        este.btnMaisQualidade.onclick = function() {
            var rh = getJanelaConstrucao("R. Humanos");
            var qualidadeMaxima = rh?(rh.getRH().FuncionariosMarketing)/2:0;
            if (dadosJanelaPromocao.indiceQualidade + 1 > qualidadeMaxima)
                alerta("Contrate contrate funcionários na área para aumentar a qualidade!");
            else
                dadosJanelaPromocao.indiceQualidade++;
            este.desativar();
            este.ativar();
        }
        este.btnMenosQualidade = new BotaoRetangular(xJanelaPromocao + 425, yJanelaPromocao + 165, 45, 20, 0, 45, 20,
                                                     "#c3c3c3", "#dadada", null, null, "bold 18pt Century Gothic", 
                                                     "black", "v", false, false, false);
        este.btnMenosQualidade.onclick = function() {
            dadosJanelaPromocao.indiceQualidade--;
            este.desativar();
            este.ativar();
        }
        este.btnPromover = new BotaoRetangular(xJanelaPromocao + (widthJanelaPromocao - 200)/2, yJanelaPromocao + 255, 200,
                                               50, 9, 200, 50, "#4c98a5", "#5eb9c9",
                                               null, null, "bold 21pt Century Gothic", "white", "Promover!", false, false, false);
        este.btnPromover.onclick = function() {
            if (parseInt(este.txtTempo.text) < 7)
                alerta("O tempo mínimo é de 7 dias!");
            else
            {
                fazerCompra("Publicidade de " + dadosJanelaPromocao.nomePromocao, calcularPreco(), false, true, 1, function() {
                    dadosJanelaPromocao.onPromocaoFeita();
                    dadosJanelaPromocao.aberta = false;
                    dadosJanelaPromocao.nomePromocao = "";
                    este.desativar();
                    este.ativar();
                })
            }
        }


    }
    configurar();
}