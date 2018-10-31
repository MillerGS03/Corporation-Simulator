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

    this.btnUpgrade = new BotaoRetangular(this.x + 3 * this.width/4 - 140, this.y + this.height - 100, 280, 40, 5, 280, 40,
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

        ctx.fillStyle = "black";
        ctx.textAlign = "right";
        ctx.textBaseline = "alphabetic";
        ctx.font = "bold 14.6pt Century Gothic";
        ctx.fillText("Capacidade máxima: ", este.x + este.width/2 + 238, este.y + 480);
        ctx.fillText("Capacidade disponível: ", este.x + este.width/2 + 238, este.y + 450);

        ctx.textAlign = "left";
        ctx.font = "14.6pt Century Gothic";
        ctx.fillText(`${este.capacidade} unidades.`, este.x + este.width/2 + 238, este.y + 480);
        ctx.fillText(`${este.capacidade - este.qtdeMateriaPrima} unidades.`, este.x + este.width/2 + 238, este.y + 450);

        ctx.textBaseline = "top";
        ctx.textAlign = "center";
        ctx.font = "bold 16pt Century Gothic";
        ctx.fillStyle = "green";
        ctx.fillText(`Preço do upgrade: ${formatarDinheiro(este.precoUpgrade)}`, este.x + 3 * este.width/4, este.y + este.height - 50);

        este.btnUpgrade.desenhar();

        ctx.restore();
    }
}
function Produto(nome, preco)
{
    this.nome = nome;
    this.preco = preco;
    this.qtdeEmEstoque = 0;
}