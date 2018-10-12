var imgRuas = new Image();
var imgBtnVoltar = new Image();

var imgBanco = new Image();
var imgFabrica = new Image();
var imgComercio = new Image();
var imgFornecedores = new Image();
var imgEmpresa = new Image();

var imgIconeBanco = new Image();
var imgIconeComercio = new Image();
var imgIconeFabrica = new Image();
var imgIconeFornecedores = new Image();

imgRuas.src = "../imagens/mapa/ruas.png";
imgBtnVoltar.src = "../imagens/mapa/btnVoltar.png";

imgBanco.src = "../imagens/mapa/banco.png";
imgComercio.src = "../imagens/mapa/comercio.png";
imgFabrica.src = "../imagens/mapa/fabrica.png";
imgFornecedores.src = "../imagens/mapa/fornecedores.png";
imgEmpresa.src = "../imagens/mapa/empresa.png";

imgIconeBanco.src = "../imagens/mapa/iconeBanco.png";
imgIconeComercio.src = "../imagens/mapa/iconeComercio.png";
imgIconeFabrica.src = "../imagens/mapa/iconeFabrica.png";
imgIconeFornecedores.src = "../imagens/mapa/iconeFornecedores.png";

function Mapa()
{
    this.width = 800;
    this.height = 600;
    this.x = (canvas.width - this.width)/2;
    this.y = (canvas.height - this.height - 60)/2 + 60;

    var este = this;

    this.aberto = false;
    this.btnFechar = new BotaoRetangular(this.x + this.width - 50, this.y + 10, 40, 40,
                             { upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5 }, 40, 40,
        "#232323", "#535353", null, null, "bold 18pt Century Gothic", "red", "X", false, true, false);
    this.btnFechar.onclick = function(e) {
        este.abrirFechar();
    }

    /**
     * -1: Nada 
     *  0: Banco
     *  1: Comércio
     *  2: Fábrica
     *  3: Fornecedores
     */
    var lugarAberto = -1;
    var btnVoltar = new BotaoRetangular(this.x + 20, this.y + 80, 40, 40, {upperLeft: 10, upperRight: 10, lowerLeft: 10, lowerRight: 10},
                                        40, 40, "gray", "#a3a3a3", imgBtnVoltar, imgBtnVoltar, "", "", "", false, false, false);
    btnVoltar.onclick = function() {ativarMapa(); lugarAberto = -1};

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
            if (lugarAberto != -1)
                btnVoltar.desenhar();
            
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
                btnVoltar.ativarInteracao();
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
            {
                desativarMapa();
                fecharLugar();
            }
            btnVoltar.desativarInteracao();

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

    var banco = new Banco(this.x, this.y);
    function desenharBanco()
    {
        desenharBaseLugar("Banco", imgIconeBanco);
        banco.desenhar();
    }
    function desenharComercio()
    {
        desenharBaseLugar("Comércio", imgIconeComercio);
    }
    function desenharFabrica()
    {
        desenharBaseLugar("Fábrica", imgIconeFabrica);
    }
    function desenharFornecedores()
    {
        desenharBaseLugar("Fornecedores", imgIconeFornecedores);
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
        btnComercio.onclick = function() {desativarMapa(); lugarAberto = 1;};

        // Na fábrica, será possível aumentar a produção
        var btnFabrica       = new BotaoRetangular(este.x + 555, este.y + 90, 130, 130, null, 130, 130, corTransparente, corTransparente,
                                                imgFabrica, imgFabrica, fonte, "black", "Fábrica", true, false, true);
        btnFabrica.onclick = function() {desativarMapa(); lugarAberto = 2;};
        
        // Nos fornecedores, será possível regular a entregar de matéria prima
        var btnFornecedores  = new BotaoRetangular(este.x + 600, este.y + 438, 140, 140, null, 140, 140, corTransparente, corTransparente,
                                                imgFornecedores, imgFornecedores, fonte, "black", "Fornecedores", true, false, true);
        btnFornecedores.onclick = function() {desativarMapa(); lugarAberto = 3;};               

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
        banco.desativar();
        switch (lugarAberto)
        {
            case 0:
                banco.ativar();
                break;
        }
    }
    function fecharLugar()
    {
        banco.desativar();
    }
    function ativarMapa()
    {
        fecharLugar();
        for (var i = 0; i < lugares.length; i++)
            lugares[i].ativarInteracao();
        btnVoltar.desativarInteracao();
    }
    function desativarMapa()
    {
        for (var i = 0; i < lugares.length; i++)
            lugares[i].desativarInteracao();
        btnVoltar.ativarInteracao();
    }
}
function Banco(x, y)
{
    this.x = x;
    this.y = y;

    var este = this;

    var widthTela = 620;
    var heightTela = 295;
    var xTela = this.x + 400 - widthTela/2;
    var yTela = this.y + 105;

    var xInfoConta = xTela + 30;
    var yInfoConta = yTela + 30;

    this.btnTelaInicial = new BotaoRetangular(xTela + 10, yTela + 10, 90, 40, {upperLeft: 10, upperRight: 10, lowerLeft: 10, lowerRight: 10},
                                              90, 40, "gray", "#a3a3a3", null, null, "16pt Century Gothic", "white",
                                              "Voltar", false, false, false);
    this.btnTelaInicial.onclick = function() {aberto = 0; ativarTela()};

    this.btnFazerSaque = new BotaoRetangular(xTela + widthTela / 2 - 150, yTela + 50, 300, 50, {upperLeft: 10, upperRight: 10, lowerLeft: 10, lowerRight: 10},
                                             300, 50, "gray", "#a3a3a3", null, null, "16pt Century Gothic", "white",
                                             "Fazer saque", false, false, false);
    this.btnFazerSaque.onclick = function() {aberto = 1; ativarTela()};

    this.btnFazerDeposito = new BotaoRetangular(xTela + widthTela / 2 - 150, yTela + 110, 300, 50, 
                                                {upperLeft: 10, upperRight: 10, lowerLeft: 10, lowerRight: 10},
                                                300, 50, "gray", "#a3a3a3", null, null, "16pt Century Gothic", "white",
                                                "Fazer depósito", false, false, false);
    this.btnFazerDeposito.onclick = function() {aberto = 2; ativarTela()};

    this.btnInfoConta = new BotaoRetangular(xTela + widthTela / 2 - 150, yTela + 170, 300, 50, 
                                                {upperLeft: 10, upperRight: 10, lowerLeft: 10, lowerRight: 10},
                                                300, 50, "gray", "#a3a3a3", null, null, "16pt Century Gothic", "white",
                                                "Informações da Conta", false, false, false);
    this.btnInfoConta.onclick = function() {aberto = 3; ativarTela()};

    /**
     * 0 -> Tela inicial
     * 1 -> Saque
     * 2 -> Depósito
     * 3 -> Informações da conta
     */
    var aberto = 0;

    this.desenhar = function()
    {
        ctx.save();

        desenharTeclado();
        desenharVisor();

        if (aberto > 0)
            este.btnTelaInicial.desenhar();

        switch (aberto)
        {
            case 0:
                desenharTelaInicial();
                break;
            case 1:
                desenharTelaSaque();
                break;
            case 2:
                desenharTelaDeposito();
                break;
            case 3:
                desenharTelaInfoConta();
                break;
        }

        ctx.restore();
    }
    function desenharTeclado()
    {
        ctx.save();

        ctx.fillStyle = "#a1a1a1";
        ctx.strokeStyle = "black";
        roundRect(xTeclado, yTeclado, widthTeclado, heightTeclado, {upperLeft: 10, upperRight: 10, lowerLeft: 10, lowerRight:10}, true, true);
        for (var i = 0; i < botoesTeclado.length; i++)
            botoesTeclado[i].desenhar();
    
        ctx.restore();
    }
    function desenharVisor()
    {
        ctx.save();

        ctx.fillStyle = "#d1d1d1";
        ctx.strokeStyle = "black";
        roundRect(xTela, yTela, widthTela, heightTela, {upperLeft:10, upperRight:10, lowerLeft:10, lowerRight:10}, true, true);
        
        ctx.restore();
    }
    function desenharTelaInicial()
    {
        este.btnFazerDeposito.desenhar();
        este.btnFazerSaque.desenhar();
        este.btnInfoConta.desenhar();
    }
    function desenharTelaSaque()
    {
        ctx.save();

        ctx.restore();
    }
    function desenharTelaDeposito()
    {
        ctx.save();

        ctx.restore();
    }
    function desenharTelaInfoConta()
    {
        ctx.save();

        ctx.restore();
    }

    var widthTeclado = 250;
    var heightTeclado = 180;
    var xTeclado = este.x + 400 - widthTeclado/2;
    var yTeclado = este.y + 410;

    var botoesTeclado = new Array();
    for (var i = 0; i <= 15; i++)
        botoesTeclado.push(criarBotaoTeclado(i));

    var apertouDigito = function(digito) {};
    var apertouCancela = function () {};
    var apertouCorrige = function() {};
    var apertouEntra = function() {};

    function criarBotaoTeclado(numero)
    {
        var xBotao = 0;
        var yBotao = 0;
        var widthBotao = 35;
        var heightBotao = 35;
        var corBotao = "gray";
        var corBotaoHover = "#a3a3a3";
        var texto = "";
        var fonte = "bold 17pt Century Gothic";
        var funcaoClick = null;

        if (numero > 11)
        {
            widthBotao = 80;
            xBotao =  xTeclado + widthTeclado - 20 - widthBotao;
            yBotao = yTeclado + 15 +  (heightBotao + 5) * (numero - 12);
            fonte = "bold 14pt Century Gothic";
            switch (numero)
            {
                case 12:
                    corBotao = "#cc4040";
                    corBotaoHover = "#dd5050";
                    texto = "Cancela";
                    funcaoClick = function() {apertouCancela()};
                    break;
                case 13:
                    corBotao = "#fffb21";
                    corBotaoHover = "#fffd8d";
                    texto = "Corrige";
                    funcaoClick = function() {apertouCorrige()};
                    break;
                case 14:
                    corBotao = "#40cc40";
                    corBotaoHover = "#50dd50";
                    texto = "Entra";
                    funcaoClick = function() {apertouEntra()};
                    break;
            }
        }
        else
        {
            if (numero < 10)
            {
                texto = numero + "";
                funcaoClick = function() {apertouDigito(numero)};
            }
            if (numero != 0)
            {
                if (numero != 11)
                    xBotao = xTeclado + 20 + ((numero - 1) % 3) * (widthBotao + 5);
                else
                    xBotao = xTeclado + 30 + widthBotao * 2;
                yBotao = yTeclado + 15 + Math.ceil(numero / 3 - 1) * (heightBotao + 5);
            }
            else
            {
                xBotao = xTeclado + 25 + widthBotao;
                yBotao = yTeclado + 30 + heightBotao * 3;
            }
        }
        var botao = new BotaoRetangular(xBotao, yBotao, widthBotao, heightBotao,
                                        {upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5}, 
                                        widthBotao, heightBotao, corBotao, corBotaoHover, null, null,
                                        fonte, "black", texto, false, false, false);
        if (funcaoClick != null)
            botao.onclick = funcaoClick;
        return botao;
    }

    this.ativar = function()
    {
        ativarTeclado();
        ativarTela();
    }
    function ativarTeclado()
    {
        for (var i = 0; i < botoesTeclado.length; i++)
            botoesTeclado[i].ativarInteracao();
    }
    function ativarTela()
    {
        if (aberto > 0)
        {
            este.btnTelaInicial.ativarInteracao();
            este.btnFazerSaque.desativarInteracao();
            este.btnFazerDeposito.desativarInteracao();
            este.btnInfoConta.desativarInteracao();
        }
        else
        {
            este.btnTelaInicial.desativarInteracao();
            este.btnFazerSaque.ativarInteracao();
            este.btnFazerDeposito.ativarInteracao();
            este.btnInfoConta.ativarInteracao();
        }
    }
    this.desativar = function()
    {
        desativarTeclado();
    }
    function desativarTeclado()
    {
        for (var i = 0; i < botoesTeclado.length; i++)
            botoesTeclado[i].desativarInteracao();
    }
    function desativarTela()
    {
        if (aberto > 0)
            este.btnTelaInicial.desativarInteracao();
        switch (aberto)
        {
            case 0:
                este.btnFazerSaque.desativarInteracao();
                este.btnFazerDeposito.desativarInteracao();
            break;
        }
    }
}