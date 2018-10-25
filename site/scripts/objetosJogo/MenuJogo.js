function MenuJogo()
{
    this.width = 320;
    this.height = 380;
    this.x = (canvas.width - this.width)/2;
    this.y = (canvas.height - this.height - 60)/2 + 120;

    var este = this;

    this.aberto = false;
    this.btnDespausar = new BotaoRetangular(this.x , this.y + this.height - 170, this.width, 50, 0, this.width, 50,
                                         "#c3c3c3", "#d3d3d3", null, null, "bold 20pt Century Gothic", "black", "Despausar", false, true, false);
    this.btnDespausar.onclick = function() {este.abrirFechar()};
    this.btnSalvar = new BotaoRetangular(this.x , this.y + this.height - 120, this.width, 50, 0, this.width, 50,
        "#c3c3c3", "#d3d3d3", null, null, "bold 20pt Century Gothic", "black", "Salvar", false, true, false);
    this.btnSalvar.onclick = function() {salvar()};
    this.btnSalvarFechar = new BotaoRetangular(this.x , this.y + this.height - 70, this.width, 50, 0, this.width, 50,
        "#c3c3c3", "#d3d3d3", null, null, "bold 20pt Century Gothic", "black", "Salvar e fechar", false, true, false);
    this.btnSalvarFechar.onclick = function() {abrirInfo("selecionar.html")};

    this.abrirFechar = function() 
    {
        this.aberto = !this.aberto;
        if (this.aberto)
        {
            this.btnDespausar.ativarInteracao();
            this.btnSalvar.ativarInteracao();
            this.btnSalvarFechar.ativarInteracao();
            BotaoRetangular.desativarTodos([this.btnDespausar, this.btnSalvar, this.btnSalvarFechar]);
            BotaoCircular.desativarTodos();

            clearInterval(timerDias);
            rua.pausar();
        }
        else
        {
            BotaoRetangular.reativar();
            BotaoCircular.reativar();

            this.btnSalvarFechar.desativarInteracao();
            this.btnSalvar.desativarInteracao();
            this.btnDespausar.desativarInteracao();
            this.btnDespausar.hovering = false;

            if (!timerDias)
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
            desenharBotoes();
            desenharJogoPausado();

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
    }
    function desenharBotoes()
    {
        este.btnDespausar.desenhar();
        este.btnSalvar.desenhar();
        este.btnSalvarFechar.desenhar();
    }
    function desenharJogoPausado()
    {
        ctx.save();

        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "bold 50pt Century Gothic";

        ctx.fillText("Jogo Pausado", canvas.width/2, 150);
        ctx.fillStyle = "black";
        ctx.lineWidth = 2;
        ctx.strokeText("Jogo Pausado", canvas.width/2, 150);

        ctx.restore();
    }
}