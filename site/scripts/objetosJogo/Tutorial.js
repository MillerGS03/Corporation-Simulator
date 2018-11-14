function Tutorial()
{
    this.width = 800;
    this.height = 600;
    this.x = (canvas.width - this.width)/2;
    this.y = (canvas.height - this.height - 60)/2 + 60;

    var este = this;
    var isPrimeiraVez = jogo.Caixa == -1;

    this.aberto = false;

    this.abrirFechar = function() 
    {
        this.aberto = !this.aberto;
        if (this.aberto)
        {
            this.ativar();

            pausar();
        }
        else
        {
            this.desativar();

            despausar();
        }
    }

    this.desenhar = function() 
    {
        if (this.aberto)
        {
            ctx.save();

            desenharJanela();

            if (isPrimeiraVez)
                desenharBemVindo();
            else
                desenharTutorial();

            ctx.restore();
        }
    }
    function desenharBemVindo()
    {
        ctx.save();

        ctx.fillStyle = "White";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.font = "bold 18pt Century Gothic";
        ctx.fillText("Bem Vindo", este.x + este.width/2, este.y + 15, este.width - 5);
        ctx.font = "bold 16pt Century Gothic";
        ctx.fillText("ao", este.x + este.width/2, este.y + 45, este.width - 5);
        ctx.font = "bold 38pt Century Gothic";
        ctx.fillText("Corporation Simulator!", este.x + este.width/2, este.y + 60, este.width - 5);

        ctx.textAlign = "left";
        ctx.font = "bold 18pt Century Gothic";
        ctx.fillText(`Você acaba de abrir uma empresa com um capital de ${formatarDinheiro(barra.dinheiro)}.`, este.x + 50, este.y + 220, este.width - 50);
        if (user.Nome.length + jogo.Nome.length > 35)
        {
            ctx.fillText(`Agora, ${user.Nome}, você é o CEO da empresa`, este.x + 20, este.y + 250, este.width - 20);
            ctx.fillText(`${jogo.Nome}.`, este.x + 20, este.y + 280, este.width - 20);
        }
        else
            ctx.fillText(`Agora, ${user.Nome}, você é o CEO da empresa ${jogo.Nome}.`, este.x + 20, este.y + 250, este.width - 20);

        ctx.textAlign = "center";
        ctx.font = "bold 23pt Century Gothic";
        ctx.fillText("Deseja aprender a gerir sua empresa?", este.x + este.width/2, este.y + 410, este.width - 5);
        ctx.font = "italic bold 16pt Century Gothic";
        ctx.fillText("(Você poderá rever o tutorial sempre que quiser através do menu)", este.x + este.width/2, este.y + 450, este.width - 5);

        este.btnSimTutorial.desenhar();
        este.btnNaoTutorial.desenhar();

        ctx.restore();
    }

    var paginaTutorial = 1;

    var paginas = 
    [
        new Pagina("Índice", function() {
            ctx.textAlign = "center";
            ctx.font = "bold 32pt Century Gothic";
            ctx.fillText("Índice", este.x + este.width/2, este.y + 170);

            ctx.textAlign = "left";
            ctx.textBaseline = "middle";
            ctx.font = "bold 18pt Consolas";
            var pontos = "........................................................................................";
            var pad = "                                                              ";

            for (var i = 0, paginasComNome = 0; i < paginas.length; i++)
                if (paginas[i].nome)
                {
                    var pagina = ((pad + (i + 1)));
                    pagina = pagina.substr(pagina.length - 4);
                    var nome = (paginas[i].nome + pontos).substr(0, 37);
                    ctx.fillText(pagina + " - " + nome, este.x + 40, este.y + 210 + paginasComNome * 38, este.width - 40);
                    este.botoesIrPara[paginasComNome].desenhar();
                    este.botoesIrPara[paginasComNome].pagina = i + 1;
                    paginasComNome++;
                }

        }, function() {
            for (var i = 0; i < paginas.length; i++)
            {
                este.botoesIrPara[i].ativarInteracao();
                BotaoRetangular.exceto.push(este.botoesIrPara[i]);
            }
        }, function() {
            for (var i = 0; i < paginas.length; i++)
                este.botoesIrPara[i].desativarInteracao();
        }, function() {
            este.botoesIrPara = new Array();
            for (var i = 0; i < paginas.length; i++)
            {
                este.botoesIrPara.push(new BotaoRetangular(este.x + 625, este.y + 193 + i * 38, 85, 34, 5, 85, 34,
                                                           "#c3c3c3", "#dedede", null, null, "bold 20pt Century Gothic", "white",
                                                           "Ir", false));
                este.botoesIrPara[i].onclick = function(botao) {
                    paginaTutorial = botao.pagina;
                    este.desativar();
                    este.ativar();
                }
            }
        }),
        new Pagina("Primeiros passos", function() {
            ctx.fillText("Parabéns, você criou uma empresa! Agora você precisa entender", este.x + 40, este.y + 130);
            ctx.fillText("algumas coisas para começar a vender produtos e fazer sucesso.", este.x + 15, este.y + 160);

            ctx.fillText("No topo da tela há uma barra que mostra algumas informações", este.x + 40, este.y + 190);
            ctx.fillText("úteis sobre a empresa e o jogo.", este.x + 15, este.y + 220);
        }, function() {
            este.btnConstrucaoAnterior.ativarInteracao();
            este.btnConstrucaoPosterior.ativarInteracao();
        }, function() {
            este.btnConstrucaoAnterior.desativarInteracao();
            este.btnConstrucaoPosterior.desativarInteracao();
        }, function() {
            este.btnConstrucaoAnterior = new BotaoCircular(este.x + este.width/2 - 215, este.y + 195, 25, 25,
                "#c3c3c3", "#dadada", imgAnterior, imgAnterior,
                "", "", "", false, false, false);
            este.btnConstrucaoAnterior.onclick = function() {
                if (paginaConstrucao > 1)
                    paginaConstrucao--;
                else
                    paginaConstrucao = qtasConstrucoes;
                este.desativar();
                este.ativar();
            }
    
            este.btnConstrucaoPosterior = new BotaoCircular(este.x + este.width/2 + 215, este.y + 195, 25, 25,
                "#c3c3c3", "#dadada", imgPosterior, imgPosterior,
                "", "", "", false, false, false);
            este.btnConstrucaoPosterior.onclick = function() {
                if (paginaConstrucao < qtasConstrucoes)
                    paginaConstrucao++;
                else
                    paginaConstrucao = 1;
                este.desativar();
                este.ativar();
            }
        }),
        new Pagina("Setorização", function() {}, function() {}, function() {}),
        new Pagina("Explosão de vendas", function() {}, function() {}, function() {}),
        new Pagina("Expansão", function() {}, function() {}, function() {})
    ];

    function desenharTutorial()
    {
        ctx.save();

        ctx.fillStyle = "White";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.font = "bold 26pt Century Gothic";
        ctx.fillText("Tutorial", este.x + este.width/2, este.y + 10, este.width - 5);

        ctx.save();
        configurarCanvasTextoTutorial();
        paginas[paginaTutorial - 1].desenhar();
        ctx.restore();

        ctx.fillStyle = "White";
        ctx.textAlign = "center";
        ctx.font = "18pt Century Gothic";
        ctx.textBaseline = "bottom";
        ctx.fillText(`Página ${paginaTutorial}/${paginas.length}`, este.x + este.width/2, este.y + este.height - 15);

        este.btnPaginaAnterior.desenhar();
        este.btnPaginaPosterior.desenhar();
        este.btnFechar.desenhar();

        ctx.restore();
    }
    function configurarCanvasTextoTutorial()
    {
        ctx.fillStyle = "white";
        ctx.textAlign = "left";
        ctx.textBaseline = "alphabetic";
        ctx.font = "bold 18pt Arial";
    }

    /**
     * 1 - Garagem
     * 2 - Armazém
     * 3 - Recursos Humanos
     * 4 - Operacional
     * 5 - Financeiro
     * 6 - Marketing
     */
    var paginaConstrucao = 1;
    var qtasConstrucoes = 6;

    this.ativar = function() 
    {
        BotaoCircular.reativar();
        BotaoRetangular.reativar();

        BotaoRetangular.desativarTodos([this.btnFechar, this.btnNaoTutorial, this.btnSimTutorial]);
        BotaoCircular.desativarTodos([this.btnPaginaAnterior, this.btnPaginaPosterior, this.btnConstrucaoAnterior, this.btnConstrucaoPosterior]);

        if (isPrimeiraVez)
            ativarBemVindo();
        else
            ativarTutorial();
    }
    function ativarBemVindo() 
    {
        este.btnSimTutorial.ativarInteracao();
        este.btnNaoTutorial.ativarInteracao();
    }
    function ativarTutorial() 
    {
        este.btnFechar.ativarInteracao();
        este.btnPaginaPosterior.ativarInteracao();
        este.btnPaginaAnterior.ativarInteracao();
        paginas[paginaTutorial - 1].ativar();
    }
    this.desativar = function() 
    {
        BotaoCircular.reativar();
        BotaoRetangular.reativar();

        this.btnSimTutorial.desativarInteracao();
        this.btnNaoTutorial.desativarInteracao();
        this.btnPaginaAnterior.desativarInteracao();
        this.btnPaginaPosterior.desativarInteracao();
        this.btnFechar.desativarInteracao();
        this.btnFechar.hovering = false;

        for (var i = 0; i < paginas.length; i++)
            paginas[i].desativar();
    }
    function desenharJanela()
    {
        ctx.save();

        ctx.fillStyle = "#333333";
        ctx.globalAlpha = 0.3;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        roundRect(este.x, este.y, este.width, este.height, 20, true, true);

        ctx.fillStyle = "#444444";
        roundRect(este.x, este.y + 60, este.width, este.height - 60, {lowerLeft: 20, lowerRight: 20}, true);

        ctx.restore();
    }
    function configurarBotoes()
    {
        este.btnFechar = new BotaoRetangular(este.x + este.width - 50, este.y + 10, 40, 40,5, 40, 40,
            "#232323", "#535353", null, null, "bold 18pt Century Gothic", "red", "X", false, true, false);
        este.btnFechar.onclick = function() {isPrimeiraVez = false; este.abrirFechar()};

        este.btnSimTutorial = new BotaoRetangular(este.x + 100, este.y + este.height - 95, 275, 60, 10, 275, 60,
                "#00b202", "#0cf20e", null, null, "bold 18pt Century Gothic", "black", "Sim, por favor", false, true, false);
        este.btnSimTutorial.onclick = function() {isPrimeiraVez = false; este.desativar(); este.ativar();};

        este.btnNaoTutorial = new BotaoRetangular(este.x + este.width - 375, este.y + este.height - 95, 275, 60, 10, 275, 60,
                "#af0000", "#f70909", null, null, "bold 18pt Century Gothic", "black", "Não, já sou experiente", false, true, false);
        este.btnNaoTutorial.onclick = function() {isPrimeiraVez = false; este.abrirFechar()};

        este.btnPaginaAnterior = new BotaoCircular(este.x + 45, este.y + este.height - 45, 24, 32,
            "#c3c3c3", "#dadada", imgPaginaAnterior, imgPaginaAnteriorHover,
            "", "", "", false, false, false);
        este.btnPaginaAnterior.onclick = function() {
            if (paginaTutorial > 1)
                paginaTutorial--;
            else
                paginaTutorial = paginas.length;
            este.desativar();
            este.ativar();
        }

        este.btnPaginaPosterior = new BotaoCircular(este.x + este.width - 45, este.y + este.height - 45, 24, 32,
            "#c3c3c3", "#dadada", imgPaginaPosterior, imgPaginaPosteriorHover,
            "", "", "", false, false, false);
        este.btnPaginaPosterior.onclick = function() {
            if (paginaTutorial < paginas.length)
                paginaTutorial++;
            else
                paginaTutorial = 1;
            este.desativar();
            este.ativar();
        }

        for (var i = 0; i < paginas.length; i++)
            paginas[i].configurar();

    }
    configurarBotoes();

    /**
     * Objeto que contém as informações de uma página
     * @param {string} nome Nome da página. Deixar em branco se não for importante.
     * @param {function} funcDesenhar Função de desenho da página, que pode ser acessada através de Pagina.desenhar().
     * @param {function} funcAtivar Função de ativação da página, que pode ser acessada através de Pagina.ativar(). Deixar em branco se não tiver.
     * @param {function} funcDesativar Função de desativação da página, que pode ser acessada através de Pagina.desativar(). Deixar em branco se não tiver.
     * @param {function} funcConfigurar Função de configuração da página, que pode ser acessada através de Pagina.configurar(). Deixar em branco se não tiver.
     */
    function Pagina(nome, funcDesenhar, funcAtivar, funcDesativar, funcConfigurar)
    {
        this.nome = nome?nome:null;
        this.desenhar = funcDesenhar?funcDesenhar: function() {};
        this.ativar = funcAtivar?funcAtivar: function() {};
        this.desativar = funcDesativar?funcDesativar: function() {};
        this.configurar = funcConfigurar?funcConfigurar: function() {};
    }
}