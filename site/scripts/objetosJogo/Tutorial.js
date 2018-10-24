function Tutorial()
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
    this.btnFechar.onclick = function() {este.abrirFechar()};

    this.abrirFechar = function() 
    {
        this.aberto = !this.aberto;
        if (this.aberto)
        {
            this.btnFechar.ativarInteracao();
            BotaoRetangular.desativarTodos([this.btnFechar]);
            BotaoCircular.desativarTodos();

            clearInterval(timerDias);
            rua.pausar();
        }
        else
        {
            BotaoRetangular.reativar();
            BotaoCircular.reativar();

            this.btnFechar.desativarInteracao();
            this.btnFechar.hovering = false;
            timerDias = setInterval(intervaloDias, 50);
            rua.despausar();
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
        roundRect(este.x, este.y, este.width, este.height, { upperLeft: 20, upperRight: 20, lowerLeft: 20, lowerRight: 20 }, true, true);
        
        ctx.fillStyle = "White";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.font = "bold 24pt Century Gothic";
        ctx.fillText("Tutorial", este.x + este.width/2, este.y + 10, este.width - 5);

        este.btnFechar.desenhar();
    }
}