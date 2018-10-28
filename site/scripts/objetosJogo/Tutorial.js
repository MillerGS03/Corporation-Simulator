function Tutorial()
{
    this.width = 800;
    this.height = 600;
    this.x = (canvas.width - this.width)/2;
    this.y = (canvas.height - this.height - 60)/2 + 60;

    var este = this;
    var isPrimeiraVez = jogo.Caixa == -1;

    this.aberto = false;

    configurarBotoes();
    this.abrirFechar = function() 
    {
        this.aberto = !this.aberto;
        if (this.aberto)
        {
            this.ativar();
            BotaoRetangular.desativarTodos([this.btnFechar, this.btnNaoTutorial, this.btnSimTutorial]);
            BotaoCircular.desativarTodos([this.btnPaginaAnterior, this.btnPaginaPosterior, this.btnConstrucaoAnterior, this.btnConstrucaoPosterior]);

            clearInterval(timerDias);
            rua.pausar();
        }
        else
        {
            BotaoRetangular.reativar();
            BotaoCircular.reativar();

            this.desativar();

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
        ctx.fillText("Você acaba de abrir uma empresa com um capital de $20000.", este.x + 50, este.y + 220, este.width - 50);
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
    var qtasPaginas = 2;
    function desenharTutorial()
    {
        ctx.save();

        ctx.fillStyle = "White";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.font = "bold 26pt Century Gothic";
        ctx.fillText("Tutorial", este.x + este.width/2, este.y + 10, este.width - 5);

        switch (paginaTutorial)
        {
            case 1:
                desenharPagina1();
                break;
            case 2:
                desenharPagina2();
                break;
        }

        ctx.font = "18pt Century Gothic";
        ctx.textBaseline = "bottom";
        ctx.fillText(`Página ${paginaTutorial}/${qtasPaginas}`, este.x + este.width/2, este.y + este.height - 15);

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
    function desenharPagina1()
    {
        ctx.save();

        configurarCanvasTextoTutorial();

        ctx.fillText("Você acaba de começar uma empresa, e não tem nada construído.", este.x + 60, este.y + 115, este.width - 70);
        ctx.fillText("No canto esquerdo da tela há alguns botões, entre eles um que abre um", este.x + 10, este.y + 145, este.width - 20);
        ctx.fillText("menu de construção.", este.x + 10, este.y + 175, este.width - 20);
        
        ctx.fillText("Lá você pode comprar itens de acordo com seu", este.x + 240, este.y + 290, este.width - 250);
        ctx.fillText("dinheiro, sua experiência e seus recursos para melhorar", este.x + 186, este.y + 320, este.width - 196);
        ctx.fillText("sua empresa.", este.x + 186, este.y + 350, este.width - 196);

        ctx.drawImage(imgTutConstrucao, este.x + 50, este.y + 220);
        ctx.lineWidth = 2;
        ctx.fillStyle = "black";
        ctx.strokeRect(este.x + 50, este.y + 220, 126, 273);

        ctx.restore();
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
    function desenharPagina2()
    {
        ctx.save();

        ctx.fillStyle = "white";
        ctx.textBaseline = "alphabetic";
        ctx.textAlign = "center";
        ctx.font = "bold 25pt Arial";

        ctx.fillText("As construções são:", este.x + este.width/2, este.y + 110, este.width - 20);
        
        ctx.strokeStyle = "black";
        ctx.lineWidth = "2";
        roundRect(este.x + 50, este.y + 160, este.width - 100, 350, 10, true, true);

        function desenharTituloConstrucao(titulo)
        {
            ctx.save();

            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.font = "bold 26pt Arial";
            ctx.fillText(titulo, este.x + este.width/2, este.y + 195);
            
            ctx.font = "italic 18pt Arial";
            ctx.fillText(`${paginaConstrucao}/${qtasConstrucoes}`, este.x + este.width/2, este.y + 230);

            ctx.restore();
        }
        function desenharInformacoesConstrucao(nivelMinimo, preco)
        {
            ctx.save();

            ctx.textAlign = "left";
            ctx.textBaseline = "alphabetic";
            ctx.font = "bold 20pt Arial";

            ctx.fillStyle = "green";
            ctx.fillText("Preço: " + formatarDinheiro(preco), este.x + 90, este.y + 480);

            ctx.fillStyle = "#2dd1ed";
            ctx.fillText("Nível mínimo: " + nivelMinimo, este.x + 500, este.y + 480);

            ctx.restore();
        }

        ctx.font = "bold 14pt Arial";
        ctx.textAlign = "left";
        ctx.textBaseline = "alphabetic";
        ctx.fillStyle = "black";

        switch (paginaConstrucao)
        {
            case 1:
                ctx.drawImage(imgItemGaragem, este.x + 55, este.y + 260);
                desenharTituloConstrucao("Garagem");    

                ctx.fillText("Não é muito luxo, mas os começos em simples garagens", este.x + 235, este.y + 270, este.width - 280);
                ctx.fillText("já provaram ter bastante potencial. Numa garagem você pode", este.x + 195, este.y + 295, este.width - 250);
                ctx.fillText("fazer de tudo, como amazenar seu pequeno estoque, produzir", este.x + 195, este.y + 320, este.width - 250);
                ctx.fillText("mercadorias, administrar o dinheiro e realizar suas vendas.", este.x + 195, este.y + 345, este.width - 250);
                ctx.fillText("Mas é claro: precariamente.", este.x + 195, este.y + 370, este.width - 250);

                desenharInformacoesConstrucao(ItemAVender.garagem.nivelMinimo, ItemAVender.garagem.preco);

                break;
            case 2:
                ctx.drawImage(imgItemArmazem, este.x + 55, este.y + 260);
                desenharTituloConstrucao("Armazém");

                ctx.fillText("Cansado de jogar suas coisas numa garagem apertada?", este.x + 235, este.y + 295, este.width - 280);
                ctx.fillText("O armazém aumenta a capacidade de estocagem para guardar", este.x + 195, este.y + 320, este.width - 250);
                ctx.fillText("mais matéria-prima e mercadoria.", este.x + 195, este.y + 345, este.width - 250);
                
                desenharInformacoesConstrucao(ItemAVender.armazem.nivelMinimo, ItemAVender.armazem.preco);

                break;
            case 3:
                ctx.drawImage(imgItemOperacional, este.x + 55, este.y + 260);
                desenharTituloConstrucao("Operacional");

                ctx.fillText("Não dá pra produzir muito num espaço minúsculo como", este.x + 235, este.y + 295, este.width - 280);
                ctx.fillText("uma garagem. Construa um setor para isso, transformando", este.x + 195, este.y + 320, este.width - 250);
                ctx.fillText("matéria-prima em mercadoria pronta para venda.", este.x + 195, este.y + 345, este.width - 250);
                
                desenharInformacoesConstrucao(ItemAVender.operacional.nivelMinimo, ItemAVender.operacional.preco);     

                break;
            case 4:
                ctx.drawImage(imgItemRecursosHumanos, este.x + 55, este.y + 260);
                desenharTituloConstrucao("Recursos Humanos");

                ctx.fillText("Está precisando de funcionários? É hora de construir a", este.x + 235, este.y + 295, este.width - 280);
                ctx.fillText("sala e contratar o pessoal do RH. Assim você pode conseguir", este.x + 195, este.y + 320, este.width - 250);
                ctx.fillText("mais mão-de-obra qualificada.", este.x + 195, este.y + 345, este.width - 250);

                desenharInformacoesConstrucao(ItemAVender.recursosHumanos.nivelMinimo, ItemAVender.recursosHumanos.preco);

                break;
            case 5:
                // Desenhar imagem do marketing
                desenharTituloConstrucao("Marketing");

                ctx.fillText("Pouca clientela? O que você precisa é de um setor de", este.x + 235, este.y + 295, este.width - 280);
                ctx.fillText("marketing para divulgar melhor sua empresa, aumentando as", este.x + 195, este.y + 320, este.width - 250);
                ctx.fillText("vendas e gerando lucro!", este.x + 195, este.y + 345, este.width - 250);
                
                desenharInformacoesConstrucao(ItemAVender.marketing.nivelMinimo, ItemAVender.marketing.preco);
                break;
            case 6:
                // Desenhar imagem do financeiro
                desenharTituloConstrucao("Financeiro");

                ctx.fillText("Gerencie melhor o fluxo de caixa da sua empresa, faça", este.x + 235, este.y + 295, este.width - 280);
                ctx.fillText("previsões, cortes de gastos e direcionamento de pagamentos", este.x + 195, este.y + 320, este.width - 250);
                ctx.fillText("facilmente.", este.x + 195, este.y + 345, este.width - 250);

                desenharInformacoesConstrucao(ItemAVender.financeiro.nivelMinimo, ItemAVender.financeiro.preco);

                break;
        }

        este.btnConstrucaoAnterior.desenhar();
        este.btnConstrucaoPosterior.desenhar();

        ctx.restore();
    }
    this.ativar = function() 
    {
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
        if (paginaTutorial == 2)
        {
            este.btnConstrucaoAnterior.ativarInteracao();
            este.btnConstrucaoPosterior.ativarInteracao();
        }
    }
    this.desativar = function() 
    {
        this.btnSimTutorial.desativarInteracao();
        this.btnNaoTutorial.desativarInteracao();
        this.btnConstrucaoAnterior.desativarInteracao();
        this.btnConstrucaoPosterior.desativarInteracao();
        this.btnPaginaAnterior.desativarInteracao();
        this.btnPaginaPosterior.desativarInteracao();
        this.btnFechar.desativarInteracao();
        this.btnFechar.hovering = false;
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
                paginaTutorial = qtasPaginas;
            este.desativar();
            este.ativar();
        }

        este.btnPaginaPosterior = new BotaoCircular(este.x + este.width - 45, este.y + este.height - 45, 24, 32,
            "#c3c3c3", "#dadada", imgPaginaPosterior, imgPaginaPosteriorHover,
            "", "", "", false, false, false);
        este.btnPaginaPosterior.onclick = function() {
            if (paginaTutorial < qtasPaginas)
                paginaTutorial++;
            else
                paginaTutorial = 1;
            este.desativar();
            este.ativar();
        }
        
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

    }
}