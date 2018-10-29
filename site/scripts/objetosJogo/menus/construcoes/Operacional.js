function Operacional()
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

    this.abrirFechar = function() 
    {
        this.aberto = !this.aberto;
        if (this.aberto)
        {
            desativarBotoes();
            this.btnFechar.ativarInteracao();
        }
        else
        {
            this.btnFechar.desativarInteracao();
            ativarBotoes();
        }
    }
    this.desenhar = function() 
    {
        if (this.aberto)
        {
            ctx.save();

            desenharJanela();

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
       
        ctx.fillStyle = "White";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.font = "bold 24pt Century Gothic";
        ctx.fillText("Operacional", este.x + este.width/2, este.y + 10, este.width - 5);

        este.btnFechar.desenhar();

        roundRect(este.x, este.y + 60, este.width, este.height - 60, {lowerLeft: 20, lowerRight: 20 }, true, true);
    }
}