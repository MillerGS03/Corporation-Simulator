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
            this.btnVendas.ativarInteracao();
        }
        else
        {
            this.btnFechar.desativarInteracao();
            this.btnEstoque.desativarInteracao();
            this.btnMercadorias.desativarInteracao();
            this.btnGerenciarProducao.desativarInteracao();
            this.btnGerenciarDinheiro.desativarInteracao();
            this.btnVendas.desativarInteracao();

            ativarBotoes();
        }
    }

    /**
     * 0 - Mercadorias
     * 1 - Estoque
     * 2 - Gerenciar produção
     * 3 - Gerenciar dinheiro
     * 4 - Vendas
     */
    var opcaoAberta = 0;
    this.desenhar = function() 
    {
        if (this.aberto)
        {
            ctx.save();

            desenharJanela();
            desenharLayout();

            switch (opcaoAberta)
            {
                case 0:
                    desenharMercadorias();
                    break;
                case 1:
                    desenharEstoque();
                    break;
                case 2:
                    desenharGerenciarProducao();
                    break;
                case 3:
                    desenharGerenciarDinheiro();
                    break;
                case 4:
                    desenharVendas();
                    break;
            }

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
        este.btnVendas.desenhar();

        ctx.restore();
    }
    function desenharMercadorias()
    {
        ctx.save();

        ctx.fillStyle = "silver";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;

        ctx.fillRect(este.x + 300, este.y + 330, este.width - 320, 263);
        ctx.strokeRect(este.x + 300, este.y + 330, este.width - 320, 263);

        ctx.fillStyle = "gray";
        ctx.fillRect(este.x + 300, este.y + 330, este.width - 320, 30);
        ctx.strokeRect(este.x + 300, este.y + 330, este.width - 320, 30);

        ctx.fillStyle = "black";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.font = "bold 13pt Consolas";
        
        ctx.fillText(" Produto              Preço             Atualizar", este.x + 300, este.y + 345);

        ctx.fillStyle = "#d8d8d8";
        for (var i = 0; i < 8; i ++)
        {
            if (i%2 == 1)
                ctx.fillRect(este.x + 301, este.y + 359 + 29 * i, este.width - 322, 30);
            este.botoesAumentarPreco[i].desenhar();
            este.botoesDiminuirPreco[i].desenhar();
            este.botoesExcluir[i].desenhar();
        }

        ctx.beginPath();
        ctx.moveTo(este.x + 500, este.y + 360);
        ctx.lineTo(este.x + 500, este.y + 593);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(este.x + 575, este.y + 360);
        ctx.lineTo(este.x + 575, este.y + 593);
        ctx.closePath();
        ctx.stroke();

        ctx.restore();
    }
    function desenharEstoque()
    {
        ctx.save();
        
        
        
        ctx.restore();
    }
    function desenharGerenciarProducao()
    {
        ctx.save();
        
        
        
        ctx.restore();
    }
    function desenharGerenciarDinheiro()
    {
        ctx.save();
        
        
        
        ctx.restore();
    }
    function desenharVendas()
    {
        ctx.save();
        
        
        
        ctx.restore();
    }

    function configurarBotoes()
    {
        este.btnMercadorias = new BotaoRetangular(este.x, este.y + 200, 280, 45, 0, 280, 45,
                                                  "#e5e5e5", "#ececec", null, null, "bold 18pt Century Gothic",
                                                  "black", "Mercadorias", false, false, false);
        este.btnEstoque = new BotaoRetangular(este.x, este.y + 245, 280, 45, 0, 280, 45,
                                              "#c3c3c3", "#dadada", null, null, "bold 18pt Century Gothic",
                                              "black", "Estoque", false, false, false);
        este.btnGerenciarProducao = new BotaoRetangular(este.x, este.y + 290, 280, 45, 0, 280, 45,
                                                        "#c3c3c3", "#dadada", null, null, "bold 18pt Century Gothic",
                                                        "black", "Gerenciar Produção", false, false, false);
        este.btnGerenciarDinheiro = new BotaoRetangular(este.x, este.y + 335, 280, 45, 0, 280, 45,
                                                        "#c3c3c3", "#dadada", null, null, "bold 18pt Century Gothic",
                                                        "black", "Gerenciar Dinheiro", false, false, false);
        este.btnVendas = new BotaoRetangular(este.x, este.y + 380, 280, 45, 0, 280, 45,
                                             "#c3c3c3", "#dadada", null, null, "bold 18pt Century Gothic",
                                             "black", "Vendas", false, false, false);
    
        var onclickBotoesMenu = function(sender)
        {
            este.btnMercadorias.backgroundColor = "#c3c3c3";
            este.btnEstoque.backgroundColor = "#c3c3c3";
            este.btnGerenciarProducao.backgroundColor = "#c3c3c3";
            este.btnGerenciarDinheiro.backgroundColor = "#c3c3c3";
            este.btnVendas.backgroundColor = "#c3c3c3";

            este.btnMercadorias.backgroundHoverColor = "#dadada";
            este.btnEstoque.backgroundHoverColor = "#dadada";
            este.btnGerenciarProducao.backgroundHoverColor = "#dadada";
            este.btnGerenciarDinheiro.backgroundHoverColor = "#dadada";
            este.btnVendas.backgroundHoverColor = "#dadada";

            sender.backgroundColor = "#e5e5e5";
            sender.backgroundHoverColor = "#ececec";
        }

        este.btnMercadorias.onclick = function() {opcaoAberta = 0; onclickBotoesMenu(este.btnMercadorias)};
        este.btnEstoque.onclick = function() {opcaoAberta = 1; onclickBotoesMenu(este.btnEstoque)};
        este.btnGerenciarProducao.onclick = function() {opcaoAberta = 2; onclickBotoesMenu(este.btnGerenciarProducao)};
        este.btnGerenciarDinheiro.onclick = function() {opcaoAberta = 3; onclickBotoesMenu(este.btnGerenciarDinheiro)};
        este.btnVendas.onclick = function() {opcaoAberta = 4; onclickBotoesMenu(este.btnVendas)};

        este.botoesAumentarPreco = new Array();
        este.botoesDiminuirPreco = new Array();
        este.botoesExcluir = new Array();

        for (var i = 0; i < 8; i++)
        {
            este.botoesDiminuirPreco.push(new BotaoRetangular(este.x + 582, este.y + 362 + 29 * i, 94, 24, 3, 94, 24, "#c3c3c3", "#dadada",
                                          null, null, "bold 12pt Century Gothic", "black", "- Preço", false, false, false));
            este.botoesAumentarPreco.push(new BotaoRetangular(este.x + 681, este.y + 362 + 29 * i, 94, 24, 3, 94, 24, "#c3c3c3", "#dadada",
                                          null, null, "bold 12pt Century Gothic", "black", "+ Preço", false, false, false));
            este.botoesExcluir.push(new BotaoRetangular(este.x + 780, este.y + 362 + 29 * i, 94, 24, 3, 94, 24, "#c3c3c3", "#dadada",
                                    null, null, "bold 12pt Century Gothic", "black", "Excluir", false, false, false));
        }
    }
}