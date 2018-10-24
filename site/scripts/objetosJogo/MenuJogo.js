function MenuJogo()
{
    this.width = 320;
    this.height = 400;
    this.x = (canvas.width - this.width)/2;
    this.y = (canvas.height - this.height - 60)/2 + 60;

    var este = this;

    this.aberto = false;
    this.btnDespausar = new BotaoRetangular(this.x , this.y + 80, this.width, 50, 14, this.width, 50,
                                         "#c3c3c3", "#d3d3d3", null, null, "bold 20pt Century Gothic", "black", "Despausar", false, true, false);
    this.btnDespausar.onclick = function() {este.abrirFechar()};
    this.btnSalvar = new BotaoRetangular(this.x , this.y + 130, this.width, 50, 14, this.width, 50,
        "#c3c3c3", "#d3d3d3", null, null, "bold 20pt Century Gothic", "black", "Despausar", false, true, false);
    this.btnSalvar.onclick = function() {salvar()};

    this.abrirFechar = function() 
    {
        this.aberto = !this.aberto;
        if (this.aberto)
        {
            this.btnDespausar.ativarInteracao();
            this.btnSalvar.ativarInteracao();
            BotaoRetangular.desativarTodos([this.btnDespausar, this.btnSalvar]);
            BotaoCircular.desativarTodos();

            clearInterval(timerDias);
            rua.pausar();
        }
        else
        {
            BotaoRetangular.reativar();
            BotaoCircular.reativar();

            this.btnDespausar.desativarInteracao();
            this.btnDespausar.hovering = false;
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
        ctx.fillText("Menu", este.x + este.width/2, este.y + 10, este.width - 5);

        este.btnDespausar.desenhar();
        este.btnSalvar.desenhar();
    }
}