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
    btnVoltar.onclick = function() {ativarLugares(); lugarAberto = -1};

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
                ativarLugares();
        }
        else
        {
            this.btnFechar.desativarInteracao();
            this.btnFechar.hovering = false;
                
            if (lugarAberto == -1)
            {
                desativarLugares();
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
        ctx.fillText(nome, este.x + este.width / 2, este.y + 90);
        ctx.drawImage(imagem, este.x + este.width - 74, este.y + 70);
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
        btnBanco.onclick = function() {desativarLugares(); lugarAberto = 0; abrirLugar();};

        // Na área comercial, será possível abrir franquias
        var btnComercio      = new BotaoRetangular(este.x + 90, este.y + 275, 130, 130, null, 130, 130, corTransparente, corTransparente,
                                                imgComercio, imgComercio, fonte, "black", "Comércio", true, false, true);
        btnComercio.onclick = function() {desativarLugares(); lugarAberto = 1;};

        // Na fábrica, será possível aumentar a produção
        var btnFabrica       = new BotaoRetangular(este.x + 555, este.y + 90, 130, 130, null, 130, 130, corTransparente, corTransparente,
                                                imgFabrica, imgFabrica, fonte, "black", "Fábrica", true, false, true);
        btnFabrica.onclick = function() {desativarLugares(); lugarAberto = 2;};
        
        // Nos fornecedores, será possível regular a entregar de matéria prima
        var btnFornecedores  = new BotaoRetangular(este.x + 600, este.y + 438, 140, 140, null, 140, 140, corTransparente, corTransparente,
                                                imgFornecedores, imgFornecedores, fonte, "black", "Fornecedores", true, false, true);
        btnFornecedores.onclick = function() {desativarLugares(); lugarAberto = 3;};               

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
    function ativarLugares()
    {
        for (var i = 0; i < lugares.length; i++)
            lugares[i].ativarInteracao();
        btnVoltar.desativarInteracao();
    }
    function desativarLugares()
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

    var xOperacoes = this.x + 25;
    var yOperacoes = this.y + 150;
    var widthOperacoes = 320;
    var heightOperacoes = 200;

    var xInfoConta = xOperacoes + widthOperacoes + 20;
    var yInfoConta = this.y + 150;

    this.btnFazerSaque = new BotaoRetangular(xOperacoes + 60, yOperacoes + 70, 200, 50, {upperLeft: 10, upperRight: 10, lowerLeft: 10, lowerRight: 10},
                                             200, 50, "gray", "#a3a3a3", null, null, "16pt Century Gothic", "white",
                                                    "Fazer saque", false, false, false);
    this.btnFazerSaque.onclick = function() {aberto = 1};
    this.btnFazerDeposito = new BotaoRetangular(xOperacoes + 60, yOperacoes + 130, 200, 50, {upperLeft: 10, upperRight: 10, lowerLeft: 10, lowerRight: 10},
                                                  200, 50, "gray", "#a3a3a3", null, null, "16pt Century Gothic", "white",
                                                   "Fazer depósito", false, false, false);
    this.btnFazerDeposito.onclick = function() {aberto = 2};

    /**
     * 0 -> Tela inicial
     * 1 -> Saque
     * 2 -> Depósito
     */
    var aberto = 0;
    this.desenhar = function()
    {
        ctx.save();

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
        }

        ctx.restore();
    }
    function desenharTelaInicial()
    {
        desenharOperacoes();
        desenharInfoConta();
    }
    function desenharTelaSaque()
    {
        desenharTeclado();
    }
    function desenharTelaDeposito()
    {
        desenharTeclado();
    }

    var botoesTeclado = new Array();
    for (var i = 0; i < 10; i++)
        botoesTeclado.push(new BotaoRetangular(este.x + 150 + ((i - 1) % 3) * 40, este.y + 300 + Math.ceil((i / 3))*40, 
                           30, 30, {upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5}, 30, 30, "gray", "#a3a3a3", null,
                           null, "bold 18pt Century Gothic", "white", i + "", false, false, false));
    botoesTeclado[0].x = este.x + 190;
    botoesTeclado[0].y = este.y + 460;

    function desenharTeclado()
    {
        ctx.save();

        ctx.fillStyle = "#a1a1a1";
        ctx.strokeStyle = "black";
        var widthTeclado = 250;
        roundRect(este.x + 400 - widthTeclado/2, este.y + 250, widthTeclado, 320, {upperLeft: 10, upperRight: 10, lowerLeft: 10, lowerRight:10}, true, true);
        for (var i = 0; i < botoesTeclado.length; i++)
            botoesTeclado[i].desenhar();
    
        ctx.restore();
    }
    function desenharOperacoes()
    {
        ctx.save();
        
        ctx.fillStyle = "#d1d1d1";
        ctx.strokeStyle = "black";
        roundRect(xOperacoes, yOperacoes, widthOperacoes, heightOperacoes, {upperLeft:10, upperRight:10, lowerLeft:10, lowerRight:10}, true, true);
        
        ctx.fillStyle = "black";
        ctx.font = "bold 20pt Century Gothic";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillText("Operações", xOperacoes + widthOperacoes/2, yOperacoes + 15, widthOperacoes);

        este.btnFazerSaque.desenhar();
        este.btnFazerDeposito.desenhar();
        
        ctx.restore();
    }
    function desenharInfoConta()
    {
        ctx.save();
        
        ctx.fillStyle = "#d1d1d1";
        ctx.strokeStyle = "black";
        roundRect(xInfoConta, yInfoConta, 410, 400, {upperLeft:10, upperRight:10, lowerLeft:10, lowerRight:10}, true, true);

        ctx.fillStyle = "black";
        ctx.font = "bold 20pt Century Gothic";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillText("Sua Conta", xInfoConta + 205, yInfoConta + 15, 410);

        ctx.restore();
    }
    this.ativar = function()
    {
        switch (aberto)
        {
            case 0:
                this.btnFazerSaque.ativarInteracao();
                this.btnFazerDeposito.ativarInteracao();
                break;
        }
    }
    this.desativar = function()
    {
        this.btnFazerSaque.desativarInteracao();
        this.btnFazerDeposito.desativarInteracao();
    }
}