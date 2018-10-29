function MenuJogo()
{
    this.width = 320;
    this.height = 400;
    this.x = (canvas.width - this.width)/2;
    this.y = (canvas.height - this.height - 60)/2 + 105;

    var este = this;
    var volumeGeral = 1;
    var isComMusica = true;

    this.aberto = false;

    configurarBotoes();
    this.abrirFechar = function() 
    {
        this.aberto = !this.aberto;
        if (this.aberto)
        {
            this.ativar();

            if (!tutorial.aberto)
                pausar();
        }
        else
        {
            this.desativar();
            this.btnDespausar.hovering = false;

            if (!tutorial.aberto)
                despausar();
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
    this.ativar = function() 
    {
        BotaoCircular.reativar();
        BotaoRetangular.reativar();

        BotaoCircular.desativarTodos([este.btnMutarDesmutar]);
        BotaoRetangular.desativarTodos([este.btnDespausar, este.btnSalvar, este.btnSalvarFechar, este.btnAbrirTutorial, este.btnTirarColocarMusica]);
        
        for (var i = 0; i < this.botoesNivelSom.length; i++)
            BotaoRetangular.exceto.push(this.botoesNivelSom[i]);

        this.btnSalvar.ativarInteracao();
        this.btnSalvarFechar.ativarInteracao();
        this.btnDespausar.ativarInteracao();
        this.btnMutarDesmutar.ativarInteracao();
        this.btnTirarColocarMusica.ativarInteracao();

        for (var i = 0; i < this.botoesNivelSom.length; i++)
            this.botoesNivelSom[i].ativarInteracao();

        if (!tutorial.aberto)
            this.btnAbrirTutorial.ativarInteracao();
    }
    this.desativar = function() 
    {
        BotaoRetangular.reativar();
        BotaoCircular.reativar();

        this.btnSalvar.desativarInteracao();
        this.btnSalvarFechar.desativarInteracao();
        this.btnDespausar.desativarInteracao();
        this.btnMutarDesmutar.desativarInteracao();
        this.btnTirarColocarMusica.desativarInteracao();

        for (var i = 0; i < this.botoesNivelSom.length; i++)
            this.botoesNivelSom[i].desativarInteracao();

        this.btnAbrirTutorial.desativarInteracao();
    }
    this.getAlturaSom = function() {
        return volumeGeral;
    }
    this.isComMusica = function() {
        return isComMusica;
    }
    this.setIsComMusica = function(estaComMusica) {
        isComMusica = estaComMusica;
        este.btnTirarColocarMusica.text = isComMusica?"Tirar música":"Colocar música";
        musica.muted = volumeGeral == 0 || !isComMusica;
    }
    /**
     * Controla a altura do som em geral.
     * @param {number} altura Altura do som. Vai de -1 (mudo) a 5
     */
    this.setAlturaSom = function(altura) {
        volumeGeral = (altura + 1)/6;
        musica.volume = volumeGeral;

        var botao = este.btnMutarDesmutar;
        botao.backgroundImage = volumeGeral == 0?imgBtnSomMudo:imgBtnSomAtivo;
        botao.backgroundHoverImage = volumeGeral == 0?imgBtnSomMudo:imgBtnSomAtivo;
        musica.muted = volumeGeral == 0 || !isComMusica;


        for (var i = 0; i < this.botoesNivelSom.length; i++)
        {
            if (i <= altura)
            {
                this.botoesNivelSom[i].backgroundColor = "#cecece";
                this.botoesNivelSom[i].backgroundHoverColor = "#e5e5e5";
            }
            else
            {
                this.botoesNivelSom[i].backgroundColor = "#838383";
                this.botoesNivelSom[i].backgroundHoverColor = "#a3a3a3";
            }
        }
    }
    function desenharJanela()
    {
        ctx.save();

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

        ctx.restore();
    }
    function desenharBotoes()
    {
        este.btnDespausar.desenhar();
        este.btnSalvar.desenhar();
        este.btnSalvarFechar.desenhar();
        este.btnMutarDesmutar.desenhar();
        este.btnTirarColocarMusica.desenhar();

        for (var i = 0; i < este.botoesNivelSom.length; i++)
            este.botoesNivelSom[i].desenhar();
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
        este.btnSalvar.onclick = function() {salvar(); alert("Jogo salvo com sucesso!")};
        
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

        este.btnMutarDesmutar = new BotaoCircular(este.x + 52, este.y + 90, 26, 26,
                                "#c3c3c3", "#dadada", imgBtnSomAtivo, imgBtnSomAtivo,
                                "", "", "", false, false, false);
        este.btnMutarDesmutar.onclick = function() {
            este.setAlturaSom(-1);
        }

        este.botoesNivelSom = new Array();
        for (var i = 0; i < 6; i++)
        {
            este.botoesNivelSom.push(new BotaoRetangular(este.x + 87 + i* 34, este.y + 83, 30, 14, 0, 30, 14,
                                     "#838383", "#a3a3a3", null, null, "", "", "", false, false, false));
            var botao = este.botoesNivelSom[i];
            botao.altura = i;
            botao.onclick = function() {
                for (var x = 0; x < este.botoesNivelSom.length; x++)
                    if (este.botoesNivelSom[x].hovering)
                    {
                        este.setAlturaSom(x);
                        break;
                    }
            };
        }

        este.btnTirarColocarMusica = new BotaoRetangular(este.x + este.width/2 - 85, este.y + 115, 170, 30, 0, 170, 30,
            "#c3c3c3", "#dadada", null, null, "bold 16pt Century Gothic", "black", "Tirar música", false, true, false);
        este.btnTirarColocarMusica.onclick = function() {
            este.setIsComMusica(!isComMusica);
        }
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