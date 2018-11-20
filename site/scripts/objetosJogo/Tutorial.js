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
            ctx.fillText("algumas coisas para começar a vender produtos e fazer sucesso.", este.x + 15, este.y + 158);

            ctx.fillText("No topo da tela há uma barra que mostra algumas informações", este.x + 40, este.y + 202);
            ctx.fillText("úteis sobre a empresa e o jogo:", este.x + 15, este.y + 230);

            ctx.drawImage(imgTutBarraSuperior, este.x + (este.width - 720)/2, este.y + 250);

            ctx.textAlign = "right";
            ctx.font = "bold 19pt Arial";
            ctx.fillText("Nível e XP: ", este.x + 200, este.y + 340);
            ctx.fillText("Caixa: ", este.x + 200, este.y + 410);
            ctx.fillText("Dia do mês: ", este.x + 200, este.y + 450);

            ctx.textAlign = "left";
            ctx.font = "16pt Arial";
            ctx.fillText("Indicam sua experiência no jogo. Tendo mais experiência,", este.x + 200, este.y + 340);
            ctx.fillText("você poderá expandir mais sua empresa e criar produtos melhores.", este.x + 15, este.y + 370);
            ctx.fillText("Dinheiro físico que a empresa tem disponível.", este.x + 200, este.y + 410);
            ctx.fillText("É útil para saber quanto tempo vai demorar para algumas", este.x + 200, este.y + 450);
            ctx.fillText("coisas acontecerem, como pagamento de despesas mensais, entrega de", este.x + 15, este.y + 480);
            ctx.fillText("matéria-prima e mudanças na economia.", este.x + 15, este.y + 510);

        }),
        new Pagina("", function() {
            ctx.fillText("Se quiser ainda mais informações sobre a passagem do tempo,", este.x + 40, este.y + 100);
            ctx.fillText("você pode abrir o calendário no botão indicado à esquerda.", este.x + 15, este.y + 128);

            desenharSetaParaOBotao(btnCalendario);

            ctx.drawImage(imgTutCalendario, este.x + (este.width - 519)/2, este.y + 165);
        }),
        new Pagina("", function() {
            ctx.fillText("É hora de começar a construir. Afinal, você só tem um terreno", este.x + 40, este.y + 100);
            ctx.fillText("baldio por enquanto. Vê aquele botão com tijolos? Clicando nele,", este.x + 15, este.y + 128);
            ctx.fillText("a seguinte tela irá abrir:", este.x + 15, este.y + 156);

            desenharSetaParaOBotao(btnConstrucao);

            ctx.drawImage(imgTutConstrucoes, (este.x + (este.width - 519)/2), este.y + 180);
        }),
        new Pagina("", function() {
            ctx.font = "bold 17pt Arial";
            ctx.fillText("Por agora, você só pode construir uma garagem. É lá que você vai", este.x + 40, este.y + 100);
            ctx.fillText("começar sua jornada empresarial. Clique no preço para começar", este.x + 15, este.y + 128);
            ctx.fillText("a posicionar onde quiser (junto à rua, pois é uma garagem).", este.x + 15, este.y + 156);

            ctx.drawImage(imgTutPosicionandoGaragem, este.x + (este.width - 575)/2, este.y + 180);
        }),
        new Pagina("", function() {
            ctx.font = "bold 17pt Arial";
            ctx.fillText("Mova o mouse até posicionar e clique com o botão esquerdo para", este.x + 40, este.y + 100);
            ctx.fillText("soltar. Uma tela de confirmação de compra irá aparecer. É só confirmar", este.x + 15, este.y + 128);
            ctx.fillText("que você terá a garagem construída.", este.x + 15, este.y + 156);

            ctx.drawImage(imgTutConfirmarPagamento, este.x + 80, este.y + 220);
            ctx.drawImage(imgTutGaragemConstruida, este.x + este.width - 380, este.y + 210);
        }),
        new Pagina("", function() {
            ctx.font = "bold 17pt Arial";
            ctx.fillText("Com a garagem você já pode fazer muita coisa. Pra isso, clique com", este.x + 40, este.y + 100);
            ctx.fillText("o botão esquerdo na construção e abra a garagem.", este.x + 15, este.y + 128);

            ctx.drawImage(imgTutMenuItemGaragem, este.x + 10, este.y + 250);
            ctx.drawImage(imgTutGaragemAberta, este.x + este.width - 499, este.y + 190);
        }),
        new Pagina("", function() {
            ctx.font = "bold 17pt Arial";
            ctx.fillText("Que tal desenvolver seu primeiro produto? É só dar um nome, um", este.x + 40, este.y + 100);
            ctx.fillText("preço e apertar em \"criar\".", este.x + 15, este.y + 128);
            ctx.drawImage(imgTutEscolhendoNomeProduto, este.x + (este.width - 316)/2, este.y + 145);

            ctx.fillText("Espere o tempo de desenvolvimento. Quando estiver terminado, você", este.x + 40, este.y + 305);
            ctx.fillText("pode lançar ao mercado ou continuar desenvolvendo para melhorar a", este.x + 15, este.y + 333);
            ctx.fillText("qualidade.", este.x + 15, este.y + 361);
            ctx.drawImage(imgTutDesenvolvendoProduto, este.x + 70, este.y + 380);
            ctx.drawImage(imgTutProdutoDesenvolvido, este.x + este.width - 386, este.y + 380);
        }),
        new Pagina("", function() {
            ctx.font = "bold 17pt Arial";
            ctx.fillText("Mas pra que você aumentaria a qualidade? A resposta é simples:", este.x + 40, este.y + 100);
            ctx.fillText("Se seu produto tiver mais qualidade, as vendas aumentam.", este.x + 15, este.y + 128);
            ctx.fillText("Outros fatores influenciam nas vendas e serão detalhados mais tarde.", este.x + 15, este.y + 156);
            ctx.fillText("Por exemplo: ", este.x + 15, este.y + 194);
            ctx.fillText(" - Quanto tempo faz que o produto foi criado;", este.x + 15, este.y + 227);
            ctx.fillText(" - Se a economia está em alta ou não;", este.x + 15, este.y + 255);
            ctx.fillText(" - Publicidade da empresa;", este.x + 15, este.y + 283);
            ctx.fillText(" - Nível de experiência da empresa;", este.x + 15, este.y + 311);
        }),
        new Pagina("", function() {
            ctx.font = "bold 17pt Arial";
            ctx.fillText("Você acabou de desenvolver seu primeiro produto, mas você não", este.x + 40, este.y + 100);
            ctx.fillText("está vendendo porque ainda não produziu nada. Pode checar isso no", este.x + 15, este.y + 128);
            ctx.fillText("estoque se quiser.", este.x + 15, este.y + 156);

            ctx.drawImage(imgTutEstoqueVazio, este.x + 100, este.y + 171);
        }),
        new Pagina("", function() {
            ctx.font = "bold 17pt Arial";
            ctx.fillText("E como conseguir matéria-prima para começar a produzir? Isso é", este.x + 40, este.y + 100);
            ctx.fillText("trabalho dos fornecedores. É Hora de olhar para os arredores da sua", este.x + 15, este.y + 128);
            ctx.fillText("empresa para encontrar alguns! Clique no botão com um mapa e vá até", este.x + 15, este.y + 156);
            ctx.fillText("os fornecedores, representados por uma caixa de materiais.", este.x + 15, este.y + 184);

            ctx.drawImage(imgTutMapa, este.x + 200, este.y + 204);

            ctx.strokeStyle = "red";
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.ellipse(este.x + 535, este.y + 459, 38, 38, 0, 0, Math.PI * 2, false);
            ctx.closePath();
            ctx.stroke();

            desenharSetaParaOBotao(btnMapa);
        }),
        new Pagina("", function() {
            ctx.font = "bold 17pt Arial";
            ctx.fillText("Contrate seus primeiros fornecedores.", este.x + 40, este.y + 110);
            ctx.drawImage(imgTutTelaInicialFornecedores, este.x + 33, este.y + 175);
            ctx.drawImage(imgTutTelaContratarFornecedores, este.x + este.width - 383, este.y + 175);
        }),
        new Pagina("", function() {
            ctx.font = "bold 17pt Arial";
            ctx.fillText("A partir de agora você está recebendo matéria-prima na sua garagem.", este.x + 40, este.y + 100);
            ctx.fillText("Você pode controlar a frequência de entregas, determinando se serão", este.x + 15, este.y + 128);
            ctx.fillText("mensais, quinzenais ou semanais. Lembre-se que há um custo fixo por", este.x + 15, este.y + 156);
            ctx.fillText("entrega.", este.x + 15, este.y + 184);

            ctx.drawImage(imgTutTelaFornecedores, este.x + (este.width - 520)/2, este.y + 194);
        }),
        new Pagina("", function() {
            ctx.font = "bold 17pt Arial";
            ctx.fillText("Comece a transformar essa matéria-prima em mercadorias para poder", este.x + 40, este.y + 100);
            ctx.fillText("lucrar. É só ir até a aba de produção e aumentar quanto quiser dentro", este.x + 15, este.y + 128);
            ctx.fillText("de sua capacidade de produção por dia.", este.x + 15, este.y + 156);

            ctx.drawImage(imgTutProducao, este.x + (este.width - 600)/2, este.y + 171);
        }),
        new Pagina("", function() {
            ctx.font = "bold 17pt Arial";
            ctx.fillText("Com um produto criado, fornecimento de matéria-prima e produção, ", este.x + 40, este.y + 100);
            ctx.fillText("você já começou a vender! Isso se manterá enquanto você tiver estoque", este.x + 15, este.y + 128);
            ctx.fillText("do produto e não colocar os preços nas alturas.", este.x + 15, este.y + 156);
            
            ctx.drawImage(imgTutVendas, este.x + (este.width - 600)/2, este.y + 171);
        }),
        new Pagina("Setorização", function() {}, function() {}, function() {}),
        new Pagina("Explosão de vendas", function() {}, function() {}, function() {}),
        new Pagina("Expansão", function() {}, function() {}, function() {})
    ];

    function desenharTutorial()
    {
        ctx.save();

        ctx.lineWidth = 2;
        ctx.fillStyle = "#444444";
        roundRect(este.x, este.y + 60, este.width, este.height - 60, {lowerLeft: 20, lowerRight: 20}, true);

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
    function desenharSetaParaOBotao(botao)
    {
        ctx.fillStyle = "darkred";
        ctx.strokeStyle = "darkred";
        ctx.lineWidth = 4;

        ctx.beginPath();
        ctx.moveTo(botao.x - 20, botao.y + botao.radius + 40);
        ctx.lineTo(botao.x, botao.y + botao.radius + 10);
        ctx.lineTo(botao.x + 20, botao.y + botao.radius + 40);
        ctx.stroke();

        roundRect(botao.x - 2, botao.y + botao.radius + 10, 4, 130, 2, true, false);
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