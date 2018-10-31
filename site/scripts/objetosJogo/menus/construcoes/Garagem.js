function Garagem()
{
    this.width = 900;
    this.height = 620;
    this.x = (canvas.width - this.width)/2;
    this.y = (canvas.height - this.height - 60)/2 + 60;

    
    var este = this;

    this.aberto = false;
    this.btnFechar = new BotaoRetangular(this.x + this.width - 50, this.y + 10, 40, 40,
                             { upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5 }, 40, 40,
        "#232323", "#535353", null, null, "bold 18pt Century Gothic", "red", "X", false, false, false);
    this.btnFechar.onclick = function(e) {
        este.abrirFechar();
    }

    configurarBotoes();

    this.abrirFechar = function() 
    {
        this.aberto = !this.aberto;
        if (this.aberto)
        {
            desativarBotoes();

            this.btnFechar.ativarInteracao();
            this.btnEstoque.ativarInteracao();
            this.btnMercadorias.ativarInteracao();
            this.btnGerenciarProducao.ativarInteracao();
            this.btnGerenciarDinheiro.ativarInteracao();
        }
        else
        {
            this.btnFechar.desativarInteracao();
            this.btnEstoque.desativarInteracao();
            this.btnMercadorias.desativarInteracao();
            this.btnGerenciarProducao.desativarInteracao();
            this.btnGerenciarDinheiro.desativarInteracao();

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
        ctx.fillText("Garagem", este.x + este.width/2, este.y + 10, este.width - 5);

        este.btnFechar.desenhar();

        roundRect(este.x, este.y + 60, este.width, este.height - 60, {lowerLeft: 20, lowerRight: 20 }, true, true);

        ctx.globalAlpha = 0.15;
        ctx.drawImage(imgFundoGaragem, este.x + 182, este.y + 80);

        ctx.restore();
    }
    function desenharLayout()
    {
        ctx.save();

        ctx.fillStyle = "gray";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;

        roundRect(este.x, este.y + 60, 280, este.height - 60, {lowerLeft: 20}, true, true);

        este.btnMercadorias.desenhar();
        este.btnEstoque.desenhar();
        este.btnGerenciarProducao.desenhar();
        este.btnGerenciarDinheiro.desenhar();

        ctx.restore();
    }
    function configurarBotoes()
    {
        este.btnMercadorias = new BotaoRetangular(este.x, este.y + 300, 280, 45, 0, 280, 45,
                                                  "#e5e5e5", "#ececec", null, null, "bold 18pt Century Gothic",
                                                  "black", "Mercadorias", false, false, false);
        este.btnEstoque = new BotaoRetangular(este.x, este.y + 345, 280, 45, 0, 280, 45,
                                              "#c3c3c3", "#dadada", null, null, "bold 18pt Century Gothic",
                                              "black", "Estoque", false, false, false);
        este.btnGerenciarProducao = new BotaoRetangular(este.x, este.y + 390, 280, 45, 0, 280, 45,
                                                        "#c3c3c3", "#dadada", null, null, "bold 18pt Century Gothic",
                                                        "black", "Gerenciar Produção", false, false, false);
        este.btnGerenciarDinheiro = new BotaoRetangular(este.x, este.y + 435, 280, 45, 0, 280, 45,
                                                        "#c3c3c3", "#dadada", null, null, "bold 18pt Century Gothic",
                                                        "black", "Gerenciar Dinheiro", false, false, false);
    
        var onclick = function(sender)
        {
            este.btnMercadorias.backgroundColor = "#c3c3c3";
            este.btnEstoque.backgroundColor = "#c3c3c3";
            este.btnGerenciarProducao.backgroundColor = "#c3c3c3";
            este.btnGerenciarDinheiro.backgroundColor = "#c3c3c3";

            este.btnMercadorias.backgroundHoverColor = "#dadada";
            este.btnEstoque.backgroundHoverColor = "#dadada";
            este.btnGerenciarProducao.backgroundHoverColor = "#dadada";
            este.btnGerenciarDinheiro.backgroundHoverColor = "#dadada";

            sender.backgroundColor = "#e5e5e5";
            sender.backgroundHoverColor = "#ececec";
        }

        este.btnMercadorias.onclick = function() {onclick(este.btnMercadorias)};
        este.btnEstoque.onclick = function() {onclick(este.btnEstoque)};
        este.btnGerenciarProducao.onclick = function() {onclick(este.btnGerenciarProducao)};
        este.btnGerenciarDinheiro.onclick = function() {onclick(este.btnGerenciarDinheiro)};
    }
}