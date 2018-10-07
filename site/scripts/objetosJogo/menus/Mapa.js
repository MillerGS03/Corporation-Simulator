var imgBanco = new Image();
var imgFabrica = new Image();
var imgAreaComercial = new Image();
var imgFornecedores = new Image();
var imgEmpresa = new Image();
imgBanco.src = "../imagens/lugaresMapa/banco.png";
imgFabrica.src = "../imagens/lugaresMapa/fabrica.png";
imgAreaComercial.src = "../imagens/lugaresMapa/areaComercial.png";
imgFornecedores.src = "../imagens/lugaresMapa/fornecedores.png";
imgEmpresa.src = "../imagens/lugaresMapa/empresa.png";

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

    const corFundo = "#00b71e"
    var lugares = new Array();
    configurarLugares();

    this.desenhar = function() {

        if (this.aberto)
        {
            ctx.save();
            
            desenharJanela();
            desenharMapa();
            
            ctx.restore();
        }
    } 
    this.abrirFechar = function() {
        this.aberto = !this.aberto;
        if (this.aberto)
        {
            desativarBotoes();
            this.btnFechar.ativarInteracao();
            for (var i = 0; i < lugares.length; i++)
                lugares[i].ativarInteracao();
        }
        else
        {
            this.btnFechar.desativarInteracao();
            this.btnFechar.hovering = false;
            for (var i = 0; i < lugares.length; i++)
                lugares[i].desativarInteracao();
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
    function desenharMapa()
    {
        ctx.fillStyle = corFundo;
        roundRect(este.x, este.y + 60, este.width, este.height - 60, {lowerLeft: 20, lowerRight: 20 }, true, true);

        for (var i = 0; i < lugares.length; i++)
            lugares[i].desenhar();
    }
    function configurarLugares()
    {
        var fonte = "bold 17pt Century Gothic";
        var corTransparente = "rgba(255, 255, 255, 0)";
        var testeMouseSobreLugar = function() {
            var corRGB = ctx.getImageData(xMouse, yMouse, 1, 1).data;
            var corHexadecimal = "#" + ("000000" + ((corRGB[0] << 16) | (corRGB[1] << 8) | corRGB[2]).toString(16)).slice(-6);
            return corHexadecimal != corFundo;
        }
        
        var banco         = new BotaoRetangular(este.x + 55, este.y + 80, 130, 130, null, 130, 130, corTransparente, corTransparente,
                                                imgBanco, imgBanco, fonte, "black", "Banco", true, false, true);
        var fabrica       = new BotaoRetangular(este.x + 555, este.y + 90, 130, 130, null, 130, 130, corTransparente, corTransparente,
                                                imgFabrica, imgFabrica, fonte, "black", "Fábrica", true, false, true);
        var areaComercial = new BotaoRetangular(este.x + 90, este.y + 275, 130, 130, null, 130, 130, corTransparente, corTransparente,
                                                imgAreaComercial, imgAreaComercial, fonte, "black", "Comércio", true, false, true);
        var fornecedores  = new BotaoRetangular(este.x + 600, este.y + 438, 140, 140, null, 140, 140, corTransparente, corTransparente,
                                                imgFornecedores, imgFornecedores, fonte, "black", "Fornecedores", true, false, true);
        var empresa       = new BotaoRetangular(este.x + 330, este.y + 255, 140, 140, null, 140, 140, corTransparente, corTransparente,
                                                imgEmpresa, imgEmpresa, fonte, "black", "Sua empresa", true, false, true);
                                        
        lugares.push(banco);
        lugares.push(fabrica);
        lugares.push(areaComercial);
        lugares.push(fornecedores);
        lugares.push(empresa);

        for (var i = 0; i < lugares.length; i++)
        {
            lugares[i].adicionarTesteHover(testeMouseSobreLugar);
            lugares[i].stroke = false;
        }
    }
}