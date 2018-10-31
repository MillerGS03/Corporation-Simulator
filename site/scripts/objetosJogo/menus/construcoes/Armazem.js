function Armazem()
{
    this.width = 800;
    this.height = 600;
    this.x = (canvas.width - this.width)/2;
    this.y = (canvas.height - this.height - 60)/2 + 60;
    
    var este = this;

    this.aberto = false;
    this.btnFechar = new BotaoRetangular(this.x + this.width - 50, this.y + 10, 40, 40, 5, 40, 40,
                                         "#232323", "#535353", null, null, "bold 18pt Century Gothic",
                                         "red", "X", false, false, false);
    this.btnFechar.onclick = function(e) {
        este.abrirFechar();
    }

    this.btnUpgrade = new BotaoRetangular(this.x + 3 * this.width/4 - 140, this.y + this.height - 80, 280, 40, 5, 280, 40,
                                          "#c3c3c3", "#dadada", null, null, "bold 18pt Century Gothic",
                                          "black", "Dobrar capacidade", false, false, false);
    this.btnUpgrade.onclick = function() {
        fazerCompra("Reforma do armazém", este.precoUpgrade, true, true, Math.log2(este.precoUpgrade/1000) + 1, function() {
            este.precoUpgrade *= 2;
            este.capacidade *= 2;
        })
    }

    this.qtdeMateriaPrima = 150;
    this.capacidade = 500;
    this.precoUpgrade = 2000;
    this.produtos = new Array();
    this.getQtdeTotalDeProdutos = function() {
        var total = 10;
        for (var i = 0; i < this.produtos.length; i++)
            total += this.produtos[i].qtdeEmEstoque;
        return total;
    }

    this.abrirFechar = function() 
    {
        this.aberto = !this.aberto;
        if (this.aberto)
        {
            desativarBotoes();
            this.btnFechar.ativarInteracao();
            this.btnUpgrade.ativarInteracao();
        }
        else
        {
            this.btnFechar.desativarInteracao();
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
            desenharLayout();
            desenharMateriasPrimas();
            desenharMercadorias();
            desenharEstoque();

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
        ctx.fillText("Armazém", este.x + este.width/2, este.y + 10, este.width - 5);

        este.btnFechar.desenhar();

        roundRect(este.x, este.y + 60, este.width, este.height - 60, {lowerLeft: 20, lowerRight: 20 }, true, true);

        ctx.globalAlpha = 0.15;
        ctx.drawImage(imgFundoArmazem, este.x + 50, este.y + 142);

        ctx.restore();
    }
    function desenharLayout()
    {
        ctx.save();

        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.moveTo(este.x, este.y + este.height/3 + 29);
        ctx.lineTo(este.x + este.width/2 - 1, este.y + este.height/3 + 29);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(este.x + este.width/2 - 1, este.y + 60);
        ctx.lineTo(este.x + este.width/2 - 1, este.y + este.height -1);
        ctx.closePath();
        ctx.stroke();

        ctx.drawImage(imgIconeFornecedores, este.x + 20, este.y + 70);
        ctx.drawImage(imgMercadoria, este.x + 20, este.y + este.height/3 + 39);

        ctx.fillStyle = "black";
        ctx.textBaseline = "middle";
        ctx.font = "bold 24pt Century Gothic";
        ctx.textAlign = "center";

        ctx.fillText("Matérias-primas", este.x + este.width / 4 + 30, este.y + 102);
        ctx.fillText("Mercadorias", este.x + este.width / 4 + 30, este.y + este.height/3 + 81);
        ctx.fillText("Estoque", este.x + 3 * este.width/4, este.y + 102);

        ctx.restore();
    }
    function desenharMateriasPrimas()
    {
        ctx.save();

        ctx.fillStyle = "black";
        ctx.textAlign = "right";
        ctx.textBaseline = "alphabetic";
        ctx.font = "bold 18pt Century Gothic";
        ctx.fillText("Quantidade: ", este.x + 190, este.y + 180);

        ctx.textAlign = "left";
        ctx.font = "18pt Century Gothic";
        ctx.fillText(este.qtdeMateriaPrima + " " + (este.qtdeMateriaPrima == 1?"unidade.":"unidades."), este.x + 190, este.y + 180);

        ctx.restore();
    }
    function desenharMercadorias()
    {
        ctx.save();

        ctx.fillStyle = "silver";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;

        ctx.fillRect(este.x + 15, este.y + este.height/3 + 118, este.width/2 - 30, 263);
        ctx.strokeRect(este.x + 15, este.y + este.height/3 + 118, este.width/2 - 30, 263);

        ctx.fillStyle = "gray";
        ctx.fillRect(este.x + 15, este.y + este.height/3 + 118, este.width/2 - 30, 30);
        ctx.strokeRect(este.x + 15, este.y + este.height/3 + 118, este.width/2 - 30, 30);

        ctx.fillStyle = "black";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.font = "bold 13pt Consolas";
        
        ctx.fillText(" Produto              Preço     Qtde", este.x + 15, este.y + este.height/3 + 133);

        ctx.fillStyle = "#d8d8d8";
        for (var i = 0; i < 8; i += 2)
            ctx.fillRect(este.x + 16, este.y + este.height/3 + 149 + 29 * i, este.width/2 - 32, 30);

        ctx.beginPath();
        ctx.moveTo(este.x + 215, este.y + este.height/3 + 118);
        ctx.lineTo(este.x + 215, este.y + este.height/3 + 381);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(este.x + 300, este.y + este.height/3 + 118);
        ctx.lineTo(este.x + 300, este.y + este.height/3 + 381);
        ctx.closePath();
        ctx.stroke();

        ctx.restore();
    }
    function desenharEstoque()
    {
        ctx.save();

        desenharGrafico();
        desenharLegenda();

        ctx.textBaseline = "top";
        ctx.textAlign = "center";
        ctx.font = "bold 16pt Century Gothic";
        ctx.fillStyle = "green";
        ctx.fillText(`Preço do upgrade: ${formatarDinheiro(este.precoUpgrade)}`, este.x + 3 * este.width/4, este.y + este.height - 35);

        este.btnUpgrade.desenhar();

        ctx.restore();
    }
    function desenharGrafico()
    {
        ctx.save();

        var raio = 96;
        var xCentro = este.x + 3 * este.width/4;
        var yCentro = este.y + 230;

        ctx.lineWidth = 4;
        ctx.fillStyle = "#00ff00";
        ctx.beginPath();
        ctx.ellipse(xCentro, yCentro, raio, raio, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fill();


        var anguloInicial = - Math.PI / 2;
        var anguloFinal = 2 * Math.PI * este.qtdeMateriaPrima / este.capacidade + anguloInicial;

        ctx.lineWidth = 2;
        ctx.fillStyle = "#664805";
        ctx.beginPath();
        ctx.moveTo(xCentro, yCentro);
        ctx.arc(xCentro, yCentro, raio, anguloInicial, anguloFinal);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();

        anguloInicial = anguloFinal;
        anguloFinal = 2 * Math.PI * este.getQtdeTotalDeProdutos() / este.capacidade + anguloInicial;

        ctx.fillStyle = "#ffb200";
        ctx.beginPath();
        ctx.moveTo(xCentro, yCentro);
        ctx.arc(xCentro, yCentro, raio, anguloInicial, anguloFinal);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        
        ctx.restore();
    }
    function desenharLegenda()
    {
        ctx.save();

        // Retângulos coloridos

        ctx.strokeStyle = "black";
        ctx.fillStyle = "#664805";
        ctx.fillRect(este.x + este.width/2 + 25, este.y + 364, 22, 12);
        ctx.strokeRect(este.x + este.width/2 + 25, este.y + 364, 22, 12);

        ctx.fillStyle = "#ffb200";
        ctx.fillRect(este.x + este.width/2 + 25, este.y + 394, 22, 12);
        ctx.strokeRect(este.x + este.width/2 + 25, este.y + 394, 22, 12);

        ctx.fillStyle = "#00ff00";
        ctx.fillRect(este.x + este.width/2 + 25, este.y + 424, 22, 12);
        ctx.strokeRect(este.x + este.width/2 + 25, este.y + 424, 22, 12);

        // Títulos

        ctx.fillStyle = "black";
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";
        ctx.font = "bold 14.5pt Century Gothic";

        ctx.fillText("Matérias-primas: ", este.x + este.width/2 + 255, este.y + 370);
        ctx.fillText("Mercadorias: ", este.x + este.width/2 + 255, este.y + 400);
        ctx.fillText("Espaço disponível: ", este.x + este.width/2 + 255, este.y + 430);
        ctx.fillText("Capacidade máxima: ", este.x + este.width/2 + 255, este.y + 460);

        // Valores absolutos

        ctx.textAlign = "left";
        ctx.font = "14.5pt Century Gothic";

        ctx.fillText(`${este.qtdeMateriaPrima} u`, este.x + este.width/2 + 255, este.y + 370);
        ctx.fillText(`${este.getQtdeTotalDeProdutos()} u`, este.x + este.width/2 + 255, este.y + 400);
        ctx.fillText(`${este.capacidade - este.qtdeMateriaPrima - este.getQtdeTotalDeProdutos()} u`, este.x + este.width/2 + 255, este.y + 430);
        ctx.fillText(`${este.capacidade} u`, este.x + este.width/2 + 255, este.y + 460);

        // Valores percentuais

        ctx.textAlign = "right";
        ctx.fillText(`${Math.round(100* este.qtdeMateriaPrima / este.capacidade)}%`, este.x + este.width - 25, este.y + 370);
        ctx.fillText(`${Math.round(100* este.getQtdeTotalDeProdutos() / este.capacidade)}%`, este.x + este.width - 25, este.y + 400);
        ctx.fillText(`${Math.round(100* (este.capacidade - este.qtdeMateriaPrima - este.getQtdeTotalDeProdutos()) / este.capacidade)}%`, este.x + este.width - 25, este.y + 430);
        ctx.fillText(`100%`, este.x + este.width - 25, este.y + 460);

        // Observação

        ctx.textAlign = "left";
        ctx.font = "italic 13pt Century Gothic";
        ctx.fillText("Observação: u = unidade(s)", este.x + este.width/2 + 20, este.y + este.height - 105);

        ctx.restore();
    }
}
function Produto(nome, preco)
{
    this.nome = nome;
    this.preco = preco;
    this.qtdeEmEstoque = 0;
}