function Mapa()
{
    var fator = 5;
    this.width = 800;
    this.height = 600;
    this.x = (canvas.width - this.width)/2;
    this.y = (canvas.height - this.height - 60)/2 + 60;

    var este = this;

    this.aberto = false;
    this.btnFechar = new BotaoRetangular(this.x + this.width - 50, this.y + 10, 40, 40,
                                         { upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5 }, 40, 40,
                                         "#232323", "#535353", null, null, "bold 18pt Century Gothic", "red", "X", false, true, false);
    this.btnFechar.onclick = function() {este.abrirFechar()};

    /**
     * -1: Nada 
     *  0: Banco
     *  1: Comércio
     *  2: Fábrica
     *  3: Fornecedores
     */
    var lugarAberto = -1;
    this.btnVoltar = new BotaoRetangular(this.x + 20, this.y + 80, 40, 40, {upperLeft: 10, upperRight: 10, lowerLeft: 10, lowerRight: 10},
                                        40, 40, "gray", "#a3a3a3", imgBtnVoltar, imgBtnVoltar, "", "", "", false, false, false);
    this.btnVoltar.onclick = function() {ativarMapa(); lugarAberto = -1};

    const corFundo = "#00b71e"
    var lugares = new Array();
    configurarLugares();

    this.desenhar = function() {

        if (this.aberto)
        {
            ctx.save();
            
            desenharJanela();

            switch(lugarAberto)
            {
                case -1:
                    desenharMapa();
                    break;
                case 0:
                    desenharBanco();
                    break;
                case 1:
                    desenharComercio();
                    break;
                case 2:
                    desenharFabrica();
                    break;
                case 3:
                    desenharFornecedores();
                    break;
            }
            if (lugarAberto != -1 && (lugarAberto != 0 || (!este.banco.fatura.aberto && !este.banco.extrato.aberto)))
                este.btnVoltar.desenhar();
            
            ctx.restore();
        }
    } 
    this.abrirFechar = function() {
        this.aberto = !this.aberto;
        if (this.aberto)
        {
            desativarBotoes();
            this.btnFechar.ativarInteracao();

            if (lugarAberto != -1)
            {
                este.btnVoltar.ativarInteracao();
                abrirLugar();
            }
            else
                ativarMapa();
        }
        else
        {
            this.btnFechar.desativarInteracao();
            this.btnFechar.hovering = false;
                
            if (lugarAberto == -1)
                desativarMapa();
            else
                fecharLugar();
            este.btnVoltar.desativarInteracao();

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
        ctx.fillText("Mapa", este.x + este.width/2, este.y + 10, este.width - 5);

        este.btnFechar.desenhar();
    }

    var corSobMouseIgnorandoLugares = "";

    function corHexadecimalSobMouse()
    {
        var corRGB = ctx.getImageData(xMouse, yMouse, 1, 1).data;
        var corHexadecimal = "#" + ("000000" + ((corRGB[0] << 16) | (corRGB[1] << 8) | corRGB[2]).toString(16)).slice(-6);
        return corHexadecimal;
    }
    function desenharMapa()
    {
        ctx.fillStyle = corFundo;
        roundRect(este.x, este.y + 60, este.width, este.height - 60, {lowerLeft: 20, lowerRight: 20 }, true, true);
        ctx.drawImage(imgRuas, este.x, este.y + 60);
        corSobMouseIgnorandoLugares = corHexadecimalSobMouse();

        for (var i = 0; i < lugares.length; i++)
            lugares[i].desenhar();
    }

    var economia = 4;
    this.fornecedores = new Fornecedores(this);
    this.banco = new Banco(this.x, this.y);
    this.comercio = new Comercio(this, economia, this.fornecedores.produzido(), this.fornecedores.custo());
    function desenharBanco()
    {
        desenharBaseLugar("Banco", imgIconeBanco);
        este.banco.desenhar();
    }
    function desenharComercio()
    {
        desenharBaseLugar("Comércio", imgIconeComercio);
        este.comercio.desenhar();
        este.comercio.setEconomia(fator);
        este.comercio.setCusto(este.fornecedores.custo());
        este.comercio.setProduzido(este.fornecedores.produzido());
    }
    function desenharFabrica()
    {
        desenharBaseLugar("Fábrica", imgIconeFabrica);
    }
    function desenharFornecedores()
    {
        desenharBaseLugar("Fornecedores", imgIconeFornecedores);
        este.fornecedores.desenhar();
        este.fornecedores.setEconomia(fator);
    }
    function desenharBaseLugar(nome, imagem)
    {
        ctx.fillStyle = "silver";
        roundRect(este.x, este.y + 60, este.width, este.height - 60, {lowerLeft: 20, lowerRight: 20 }, true, true);
        ctx.font = "bold 25pt Century Gothic";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "black";
        ctx.fillText(nome, este.x + este.width / 2, este.y + 80);
        ctx.drawImage(imagem, este.x + este.width - 74, este.y + 65);
    }
    function configurarLugares()
    {
        var fonte = "bold 17pt Century Gothic";
        var corTransparente = "rgba(255, 255, 255, 0)";
        
        var btnEmpresa       = new BotaoRetangular(este.x + 330, este.y + 255, 140, 140, null, 140, 140, corTransparente, corTransparente,
                                                imgEmpresa, imgEmpresa, fonte, "black", "Sua empresa", true, false, false);

        // No banco, será possível realizar empréstimos
        var btnBanco         = new BotaoRetangular(este.x + 55, este.y + 80, 130, 130, null, 130, 130, corTransparente, corTransparente,
                                                imgBanco, imgBanco, fonte, "black", "Banco", true, false, true);
        btnBanco.onclick = function() {desativarMapa(); lugarAberto = 0; abrirLugar();};

        // Na área comercial, será possível abrir franquias
        var btnComercio      = new BotaoRetangular(este.x + 90, este.y + 275, 130, 130, null, 130, 130, corTransparente, corTransparente,
                                                imgComercio, imgComercio, fonte, "black", "Comércio", true, false, true);
        btnComercio.onclick = function() {desativarMapa(); lugarAberto = 1; abrirLugar();};

        // Na fábrica, será possível aumentar a produção
        var btnFabrica       = new BotaoRetangular(este.x + 555, este.y + 90, 130, 130, null, 130, 130, corTransparente, corTransparente,
                                                imgFabrica, imgFabrica, fonte, "black", "Fábrica", true, false, true);
        btnFabrica.onclick = function() {desativarMapa(); lugarAberto = 2;};
        
        // Nos fornecedores, será possível regular a entregar de matéria prima
        var btnFornecedores  = new BotaoRetangular(este.x + 600, este.y + 438, 140, 140, null, 140, 140, corTransparente, corTransparente,
                                                imgFornecedores, imgFornecedores, fonte, "black", "Fornecedores", true, false, true);
        btnFornecedores.onclick = function() {desativarMapa(); lugarAberto = 3; abrirLugar();};               

        lugares.push(btnEmpresa);
        lugares.push(btnBanco);
        lugares.push(btnComercio);
        lugares.push(btnFabrica);
        lugares.push(btnFornecedores);

        for (var i = 0; i < lugares.length; i++)
        {
            lugares[i].adicionarTesteHover(function() {
                return corSobMouseIgnorandoLugares != corHexadecimalSobMouse();
            });
            lugares[i].stroke = false;
        }
    }
    function abrirLugar()
    {
        este.banco.desativar();
        este.comercio.desativar();
        este.fornecedores.desativar();
        switch (lugarAberto)
        {
            case 0:
                este.banco.ativar();
                break;
            case 1:
                este.comercio.ativar();
                break;
            case 3:
                este.fornecedores.ativar();
            break;
        }
    }
    function fecharLugar()
    {
        este.banco.desativar();
        este.comercio.desativar();
        este.fornecedores.desativar();
    }
    function ativarMapa()
    {
        fecharLugar();
        for (var i = 0; i < lugares.length; i++)
            lugares[i].ativarInteracao();
        este.btnVoltar.desativarInteracao();
    }
    function desativarMapa()
    {
        for (var i = 0; i < lugares.length; i++)
            lugares[i].desativarInteracao();
        este.btnVoltar.ativarInteracao();
    }
    this.setFator = function(f) {fator = f;}

    this.custoTotal = function() {
        return este.comercio.custoTotal() + este.fornecedores.custoTotal();
    };
    this.ganhoTotal = function() {
        return este.comercio.ganhoTotal();
    };
}