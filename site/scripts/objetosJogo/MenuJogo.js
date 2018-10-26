function MenuJogo()
{
    this.width = 320;
    this.height = 400;
    this.x = (canvas.width - this.width)/2;
    this.y = (canvas.height - this.height - 60)/2 + 105;

    var este = this;

    this.aberto = false;

    this.abrirFechar = function() 
    {
        this.aberto = !this.aberto;
        if (this.aberto)
        {
            this.ativar();
            BotaoCircular.desativarTodos();

            if (!tutorial.aberto)
            {
                clearInterval(timerDias);
                BotaoRetangular.desativarTodos([this.btnDespausar, this.btnSalvar, this.btnSalvarFechar, this.btnAbrirTutorial]);
            }
            else
            {
                tutorial.desativar();
                BotaoRetangular.exceto.push(this.btnDespausar);
                BotaoRetangular.exceto.push(this.btnSalvar);
                BotaoRetangular.exceto.push(this.btnSalvarFechar);
                BotaoRetangular.exceto.push(this.btnAbrirTutorial);
            }

            rua.pausar();
        }
        else
        {
            this.desativar();
            this.btnDespausar.hovering = false;

            if (!tutorial.aberto)
            {
                timerDias = setInterval(intervaloDias, 50);
                BotaoRetangular.reativar();
                BotaoCircular.reativar();
                rua.despausar();
            }
            else
                tutorial.ativar();
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
    this.ativar = function() {
        this.btnSalvar.ativarInteracao();
        this.btnSalvarFechar.ativarInteracao();
        this.btnDespausar.ativarInteracao();
        if (!tutorial.aberto)
            this.btnAbrirTutorial.ativarInteracao();
    }
    this.desativar = function() {
        this.btnSalvar.desativarInteracao();
        this.btnSalvarFechar.desativarInteracao();
        this.btnDespausar.desativarInteracao();
        this.btnAbrirTutorial.desativarInteracao();
    }
    function desenharJanela()
    {
        ctx.fillStyle = "#333333";
        ctx.globalAlpha = 0.4;
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
        if (!tutorial.aberto)
            este.btnAbrirTutorial.desenhar();
    }
    function configurarBotoes() 
    {
        este.btnDespausar = new BotaoRetangular(este.x + 1, este.y + este.height - 240, este.width - 2, 50, 0, este.width - 2, 50,
                                                "#c3c3c3", "#dadada", null, null, "bold 20pt Century Gothic", "black", "Despausar", false, true, false);
        este.btnDespausar.onclick = function() {este.abrirFechar()};

        este.btnSalvar = new BotaoRetangular(este.x + 1, este.y + este.height - 190, este.width - 2, 50, 0, este.width - 2, 50,
                                                "#c3c3c3", "#dadada", null, null, "bold 20pt Century Gothic", "black", "Salvar", false, true, false);
        este.btnSalvar.onclick = function() {salvar()};
        
        este.btnSalvarFechar = new BotaoRetangular(este.x + 1, este.y + este.height - 140, este.width - 2, 50, 0, este.width - 2, 50,
                                                "#c3c3c3", "#dadada", null, null, "bold 20pt Century Gothic", "black", "Salvar e fechar", false, true, false);
        este.btnSalvarFechar.onclick = function() {abrirInfo("selecionar.html")};
        
        este.btnAbrirTutorial = new BotaoRetangular(este.x + 1, este.y + este.height - 90, este.width - 2, 50, 0, este.width - 2, 50,
                                                "#c3c3c3", "#dadada", null, null, "bold 20pt Century Gothic", "black", "Abrir tutorial", false, true, false);
        este.btnAbrirTutorial.onclick = function() {
            este.abrirFechar();
            if (!tutorial.aberto)
                tutorial.abrirFechar();
        };

        este.btnMutarDesmutar;
    }
    function desenharJogoPausado()
    {
        ctx.save();

        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "bold 50pt Century Gothic";

        ctx.fillText("Jogo Pausado", canvas.width/2, 135);
        ctx.fillStyle = "black";
        ctx.lineWidth = 2;
        ctx.strokeText("Jogo Pausado", canvas.width/2, 135);

        ctx.restore();
    }
}