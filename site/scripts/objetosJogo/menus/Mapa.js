var imgMapa = new Image();
imgMapa.src = "../imagens/fundoMapa.png";

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

    this.desenhar = function() {

        if (this.aberto)
        {
            ctx.save();
            
            desenharJanela();
            
            var grd=ctx.createRadialGradient(this.x + this.width / 2,this.y + (this.height - 60)/2,this.width / 2,this.x + this.width / 2,this.y + (this.height - 60)/2,this.width);
            grd.addColorStop(0,"#00b71e");
            grd.addColorStop(1,"#009919");
            ctx.fillStyle = grd;
            roundRect(this.x, this.y + 60, this.width, this.height - 60, {lowerLeft: 20, lowerRight: 20 }, true, true);

            ctx.restore();
        }
    }
    this.abrirFechar = function() {
        this.aberto = !this.aberto;
        if (this.aberto)
        {
            desativarBotoes();
            this.btnFechar.ativarInteracao();
        }
        else
        {
            this.btnFechar.desativarInteracao();
            this.btnFechar.hovering = false;
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
}