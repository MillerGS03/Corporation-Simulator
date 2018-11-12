function Garagem()
{
    this.width = 900;
    this.height = 620;
    this.x = (canvas.width - this.width)/2;
    this.y = (canvas.height - this.height - 60)/2 + 60;

    this.reformada = false;

    this.qtdeFuncionarios = 0;

    this.produtos = new Array();
    this.produtosRemovidos = new Array();
    this.qtdeMateriaPrima = 150;
    this.capacidade = 300;

    this.capacidadeProducao = 100;

    var produtoSendoAlterado = null;

    this.contas = new Array();

    this.adicionarMateriaPrima = function(materiaPrima)
    {
        buscarConstrucoes();
        if (armazem)
            return armazem.entregar(materiaPrima);
        else
            return entregar(materiaPrima);
    }
    var entregar = function(materiaPrima)
    {
        if (materiaPrima > this.getEspacoLivre())
        {
            this.qtdeMateriaPrima += materiaPrima;
            return {sucesso: true, faltandoAEntregar: 0}
        }
        else
        {
            var faltando = materiaPrima - this.getEspacoLivre();
            this.qtdeMateriaPrima += this.getEspacoLivre();
            return {sucesso: false, faltandoAEntregar: faltando};
        }
    }

    this.getEspacoLivre = function()
    {
        return this.capacidade - (this.getQtdeTotalDeProdutos() + this.qtdeMateriaPrima);
    }
    this.getQtdeTotalDeProdutos = function() {
        var total = 10;
        for (var i = 0; i < this.produtos.length; i++)
            total += this.produtos[i].qtdeEmEstoque;
        return total;
    }

    for (var i = 0; i < this.produtos.length; i++)
        this.produtos[i].status = 1;

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
            this.ativar();
        else
            this.desativar();
    }

    var armazem = null;
    var financeiro = null;
    var marketing = null;
    var operacional = null;
    var rh = null;
    function buscarConstrucoes()
    {
        armazem = getJanelaConstrucao("Armazém");
        financeiro = getJanelaConstrucao("Financeiro");
        marketing = getJanelaConstrucao("Marketing");
        operacional = getJanelaConstrucao("Operacional");
        rh = getJanelaConstrucao("R. Humanos");
    }

    this.ativar = function()
    {
        this.aberto = true;

        desativarBotoes();

        this.btnFechar.ativarInteracao();
        this.btnEstoque.ativarInteracao();
        this.btnMercadorias.ativarInteracao();
        this.btnGerenciarProducao.ativarInteracao();
        this.btnGerenciarDinheiro.ativarInteracao();
        this.btnVendas.ativarInteracao();

        buscarConstrucoes();

        if (!this.reformada && armazem && financeiro && marketing && operacional)
        {
            this.btnReformar.ativarInteracao();
            this.btnReformar.backgroundColor = "#c3c3c3";
            this.btnReformar.backgroundHoverColor = "#dadada";
            this.btnReformar.textStyle = "black";
        }
        else if (this.reformada)
        {
            this.btnMercadorias.y = this.y + 200;
            this.btnEstoque.y = this.y + 245;
            this.btnGerenciarProducao.y = this.y + 290;
            this.btnGerenciarDinheiro.y = this.y + 335;
            this.btnVendas.y = this.y + 380;
        }

        switch (opcaoAberta)
        {
            case 0:
                for (var i = 0; i < this.produtos.length; i++)
                {
                    if (this.produtos[i].status == 1)
                    {
                        this.botoesAlterar[i].ativarInteracao();
                        this.botoesExcluir[i].ativarInteracao();
                    }
                }

                var ultimoProduto = this.produtos[this.produtos.length - 1];
                if (ultimoProduto != null && (produtoSendoAlterado || (ultimoProduto.status != 1 && ultimoProduto.diasRestantes == 0)))
                {
                    this.btnAprimorarCancelar.ativarInteracao();
                    this.btnLancarAlterar.ativarInteracao();
                    if (produtoSendoAlterado)
                        transformarElementosAlterando(true);
                }
                else
                {
                    this.btnCriarCancelar.ativarInteracao();
                    transformarElementosCriando(ultimoProduto != null && ultimoProduto.status != 1);
                }
                this.txtNome.ativarInteracao();
                this.txtPreco.ativarInteracao();
                break;
            case 1:
                if (armazem)
                    this.btnIrParaConstrucao.ativarInteracao();
                break;
            case 2:
                if (!operacional)
                {
                    for (var i = 0; i < this.produtos.length; i++)
                        if (this.produtos[i].status == 1)
                            this.txtsProducao[i].ativarInteracao();
                }
                else
                    this.btnIrParaConstrucao.ativarInteracao();
                break;
            case 3:
                if (!financeiro)
                {
                    for (var i = 0; i < this.contas.length; i++)
                        this.switchers[i].ativarInteracao();
                    this.btnIrParaBanco.ativarInteracao();
                }
                else
                    this.btnIrParaConstrucao.ativarInteracao();
                break;
            case 4:
                if (marketing)
                    this.btnIrParaConstrucao.ativarInteracao();
                break;
        }
    }
    this.desativar = function()
    {
        this.aberto = false;

        this.btnFechar.desativarInteracao();
        this.btnEstoque.desativarInteracao();
        this.btnMercadorias.desativarInteracao();
        this.btnGerenciarProducao.desativarInteracao();
        this.btnGerenciarDinheiro.desativarInteracao();
        this.btnVendas.desativarInteracao();
        this.btnReformar.desativarInteracao();
        this.btnCriarCancelar.desativarInteracao();
        this.btnAprimorarCancelar.desativarInteracao();
        this.btnLancarAlterar.desativarInteracao();
        this.btnIrParaBanco.desativarInteracao();
        this.btnIrParaConstrucao.desativarInteracao();

        for (var i = 0; i < 8; i++)
        {
            this.botoesAlterar[i].desativarInteracao();
            this.botoesExcluir[i].desativarInteracao();
            this.txtsProducao[i].desativarInteracao();
        }
        for (var i = 0; i < this.switchers.length; i++)
            this.switchers[i].desativarInteracao();

        this.txtNome.desativarInteracao();
        this.txtPreco.desativarInteracao();

        ativarBotoes();
    }

    this.passarDia = function()
    {
        var ultimoProduto = this.produtos[this.produtos.length - 1];
        if (ultimoProduto != null &&ultimoProduto.status != 1 && ultimoProduto.diasRestantes > 0)
        {
            ultimoProduto.diasRestantes--;
            if (ultimoProduto.diasRestantes == 0)
            {
                painelNotificacoes.adicionarNotificacao(ultimoProduto.nome + " terminado(a)!", "Aprimore ou lance ao mercado!",
                                                        calendario.dia, calendario.mes, calendario.ano);
                ultimoProduto.calcularQualidade();
                if (this.aberto)
                {
                    this.desativar();
                    this.ativar();
                }
            }
        }

        for (var i = 0; i < este.produtos.length; i++)
        {
            var produtoAtual = este.produtos[i];
            if (este.qtdeMateriaPrima > 0)
            {
                if (este.qtdeMateriaPrima > produtoAtual.producao)
                {
                    produtoAtual.qtdeEmEstoque += produtoAtual.producao;
                    este.qtdeMateriaPrima -= produtoAtual.producao;
                }
                else
                {
                    produtoAtual.qtdeEmEstoque += este.qtdeMateriaPrima;
                    este.qtdeMateriaPrima = 0;
                    painelNotificacoes.adicionarNotificacao("Matéria-prima acabou!", "Obtenha mais para continuar a produzir!",
                                                            calendario.dia, calendario.mes, calendario.ano);
                }
            }
            if (produtoAtual.qtdeEmEstoque > produtoAtual.calcularVendasDiarias())
            {
                produtoAtual.totalDeVendas += produtoAtual.vendasDiarias;
                produtoAtual.qtdeEmEstoque -= produtoAtual.vendasDiarias;
                barra.dinheiro += produtoAtual.vendasDiarias * produtoAtual.preco;
            }
            else if (produtoAtual.qtdeEmEstoque > 0)
            {
                produtoAtual.totalDeVendas += produtoAtual.qtdeEmEstoque;
                barra.dinheiro += produtoAtual.qtdeEmEstoque;
                produtoAtual.qtdeEmEstoque = 0;
            }
            if (produtoAtual.fatorMarketing > 0 )
            {
                produtoAtual.diasRestantes--;
                if (produtoAtual.diasRestantes == 0)
                {
                    produtoAtual.fatorMarketing = 0;
                    painelNotificacoes.adicionarNotificacao("Publicidade expirada", `O marketing de "${produtoAtual.nome}" diminuiu`,
                                                            calendario.dia, calendario.mes, calendario.ano)
                }
            }

        }

        var marketing = getJanelaConstrucao("Marketing");
        if (marketing && marketing.promocaoEmpresa > 0)
        {
            marketing.diasRestantesPromocaoEmpresa--;
            if (marketing.diasRestantesPromocaoEmpresa == 0)
            {
                marketing.promocaoEmpresa = 0;
                painelNotificacoes.adicionarNotificacao("Publicidade expirada", "O marketing da empresa diminuiu", 
                                                        calendario.dia, calendario.mes, calendario.ano);
                if (marketing.aberto)
                {
                    marketing.desativar();
                    marketing.ativar();
                }
            }
        }

    }

    /**
     * 0 - Mercadorias
     * 1 - Estoque
     * 2 - Gerenciar produção
     * 3 - Gerenciar dinheiro
     * 4 - Vendas
     */
    var opcaoAberta = 0;
    this.desenhar = function()
    {
        if (this.aberto)
        {
            ctx.save();

            desenharJanela();
            desenharLayout();

            switch (opcaoAberta)
            {
                case 0:
                    desenharMercadorias();
                    break;
                case 1:
                    desenharEstoque();
                    break;
                case 2:
                    desenharGerenciarProducao();
                    break;
                case 3:
                    desenharGerenciarDinheiro();
                    break;
                case 4:
                    desenharVendas();
                    break;
            }

            ctx.restore();
        }
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
        roundRect(este.x, este.y, este.width, este.height, 20, true, true)

        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.font = "bold 24pt Century Gothic";
        ctx.fillText(este.reformada?"Escritório":"Garagem", este.x + este.width/2, este.y + 10, este.width - 5);

        este.btnFechar.desenhar();

        roundRect(este.x, este.y + 60, este.width, este.height - 60, {lowerLeft: 20, lowerRight: 20 }, true, true);

        ctx.globalAlpha = 0.2;
        if (este.reformada)
            ctx.drawImage(imgFundoEscritorio, este.x + este.width/2 - 116, este.y + este.height/2 - 226);
        else
            ctx.drawImage(imgFundoGaragem, este.x + 182, este.y + 80);

        ctx.restore();
    }
    function desenharLayout()
    {
        ctx.save();

        ctx.fillStyle = "gray";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;

        roundRect(este.x, este.y + 60, 280, este.height - 60, {lowerLeft: 20}, true, true);

        este.btnMercadorias.desenhar();
        este.btnEstoque.desenhar();
        este.btnGerenciarProducao.desenhar();
        este.btnGerenciarDinheiro.desenhar();
        este.btnVendas.desenhar();

        if (!este.reformada)
        {
            este.btnReformar.desenhar();
            desenharRequerimentosReforma();
        }

        ctx.restore();
    }
    function desenharRequerimentosReforma()
    {
        ctx.save();

        ctx.fillStyle = "black";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.font = "bold 14.5pt Century Gothic"
        
        var requerimentos = [{titulo: "Armazém construído", valor: armazem!=false}, 
                             {titulo: "Financeiro construído", valor: financeiro!=false},
                             {titulo: "Operacional construído", valor: operacional!=false},
                             {titulo: "Marketing construído", valor: marketing!=false}];

        for (var i = 0; i < requerimentos.length; i++)
        {
            ctx.drawImage(requerimentos[i].valor?imgFeito:imgNaoFeito, este.x + 5, este.y + 443 + i * 30)
            ctx.fillText(`${requerimentos[i].titulo}`, este.x + 34, este.y + 455 + i * 30, 280);
        }

        ctx.restore();
    }
    function desenharMercadorias()
    {
        ctx.save();

        desenharCriacaoDeMercadorias();
        desenharTabelaMercadorias();

        ctx.restore();
    }
    function desenharCriacaoDeMercadorias()
    {
        ctx.save();

        ctx.fillStyle = "silver";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        roundRect(este.x + 300, este.y + 95, este.width - 320, 200, 10, true, true);

        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.font = "bold 18pt Century Gothic";
        ctx.fillText("Desenvolvimento de Novos Produtos", este.x + este.width/2 + 140, este.y + 100);

        ctx.textAlign = "right";
        ctx.textBaseline = "middle";
        ctx.font = "bold 15pt Century Gothic";
        ctx.fillText("Nome", este.x + 380, este.y + 170);
        ctx.fillText("Preço", este.x + 710, este.y + 170);

        este.txtNome.desenhar();
        este.txtPreco.desenhar();

        var ultimoProduto = este.produtos[este.produtos.length - 1];
        if (ultimoProduto == null || ultimoProduto.status == 1)
        {
            ctx.textBaseline = "alphabetic";
            ctx.textAlign = "top";
            ctx.font = "bold 15pt Century Gothic";
            ctx.fillText("Tempo de desenvolvimento: ", este.x + 600, este.y + 234);
            ctx.fillText("Custo de desenvolvimento: ", este.x + 600, este.y + 266);

            ctx.textAlign = "left";
            ctx.font = "15pt Century Gothic";
            ctx.fillText("10 dias", este.x + 600, este.y + 234);

            ctx.fillStyle = "green";
            ctx.fillText(formatarDinheiro(2000), este.x + 600, este.y + 266);
        }
        else
        {
            ctx.fillStyle = "#8e8e8e";
            roundRect(este.x + 330, este.y + 230, 350, 30,{lowerRight:15, upperRight:15}, true, true);
            ctx.fillStyle = ultimoProduto.diasRestantes==0?"#03c403":"green";
            roundRect(este.x + 330, este.y + 230, (10 - ultimoProduto.diasRestantes)/10 * 350, 30, {lowerRight: 15, upperRight:15}, true, true);

            ctx.font = "bold 15.5pt Century Gothic";
            ctx.textAlign = "center";
            ctx.fillStyle = "black";
            if (ultimoProduto.diasRestantes == 0)
                ctx.fillText("Desenvolvimento completo!", este.x + 505, este.y + 245);
            else
                ctx.fillText((10 - ultimoProduto.diasRestantes) + "/10 dias", este.x + 505, este.y + 245);

            ctx.fillStyle = "silver";
            ctx.fillRect(este.x + 305, este.y + 228, 24, 34);
        }

        if (ultimoProduto != null && (produtoSendoAlterado || (ultimoProduto.status != 1 && ultimoProduto.diasRestantes == 0)))
        {
            este.btnLancarAlterar.desenhar();
            este.btnAprimorarCancelar.desenhar();
        }
        else
            este.btnCriarCancelar.desenhar();

        ctx.restore();
    }
    function desenharTabelaMercadorias()
    {
        ctx.save();

        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;

        var xTabela = este.x + 300;
        var yTabela = este.y + 330;
        var widthTabela = este.width - (xTabela + 20 - este.x);
        var heightTabela = 263;

        ctx.fillStyle = "silver";
        ctx.fillRect(xTabela, yTabela, widthTabela, heightTabela);
        ctx.strokeRect(xTabela, yTabela, widthTabela, heightTabela);

        ctx.fillStyle = "gray";
        ctx.fillRect(xTabela, yTabela, widthTabela, 30);
        ctx.strokeRect(xTabela, yTabela, widthTabela, 30);

        ctx.fillStyle = "black";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.font = "bold 13pt Consolas";

        ctx.fillText(" Produto                Preço            Atualizar", xTabela, yTabela + 15);

        for (var i = 0; i < 8; i++)
        {
            if (i%2 == 0)
            {
                ctx.fillStyle = "#d8d8d8";
                ctx.fillRect(xTabela + 1, yTabela + 31 + 29 * i, widthTabela - 2, 30);
            }

            if (i < este.produtos.length && este.produtos[i].status == 1)
            {
                ctx.fillStyle = "black";
                var pad = "                                                          ";
                ctx.fillText(" " + (este.produtos[i].nome + pad).substr(0, 20) + (pad + formatarDinheiro(este.produtos[i].preco)).substr(-10),
                             xTabela, yTabela + 45 + 29 * i);
                este.botoesAlterar[i].desenhar();
                este.botoesExcluir[i].desenhar();
            }
        }

        var xLinhas = [200, 305];

        for (var i = 0; i < xLinhas.length; i++)
        {
            ctx.beginPath();
            ctx.moveTo(xTabela + xLinhas[i], yTabela + 30);
            ctx.lineTo(xTabela + xLinhas[i], yTabela + heightTabela);
            ctx.closePath();
            ctx.stroke();
        }

        ctx.restore();
    }
    function desenharEstoque()
    {
        ctx.save();

        if (!armazem)
        {
            desenharLayoutEstoque();
            desenharMateriasPrimasEstoque();
            desenharMercadoriasEstoque();
            desenharEstoqueEstoque();
        }
        else
            desenharIrPara("armazém");

        ctx.restore();
    }
    function desenharLayoutEstoque()
    {
        ctx.save();

        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.moveTo(este.x + 280, este.y + este.height/3 + 29);
        ctx.lineTo(este.x + este.width/2 + 164, este.y + este.height/3 + 29);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(este.x + este.width/2 + 164, este.y + 60);
        ctx.lineTo(este.x + este.width/2 + 164, este.y + este.height/2);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(este.x + este.width/2 + 164, este.y + este.height/2);
        ctx.lineTo(este.x + este.width - 1, este.y + este.height/2)
        ctx.closePath();
        ctx.stroke();

        ctx.drawImage(imgIconeFornecedores, este.x + 300, este.y + 70);
        ctx.drawImage(imgMercadoria, este.x + 300, este.y + este.height/3 + 39);

        ctx.fillStyle = "black";
        ctx.textBaseline = "middle";
        ctx.font = "bold 22pt Century Gothic";
        ctx.textAlign = "center";

        ctx.fillText("Matérias-primas", este.x + (este.width - 280) / 4 + 330, este.y + 102);
        ctx.fillText("Mercadorias", este.x + (este.width - 280) / 4 + 330, este.y + este.height/3 + 81);
        ctx.fillText("Estoque", este.x + 290 + 3 * (este.width - 280)/4, este.y + 102);

        ctx.restore();
    }
    function desenharMateriasPrimasEstoque()
    {
        ctx.save();

        ctx.fillStyle = "black";
        ctx.textAlign = "right";
        ctx.textBaseline = "alphabetic";
        ctx.font = "bold 16.5pt Century Gothic";
        ctx.fillText("Quantidade: ", este.x + 445, este.y + 180);

        ctx.textAlign = "left";
        ctx.font = "16.5pt Century Gothic";
        ctx.fillText(este.qtdeMateriaPrima + " " + (este.qtdeMateriaPrima == 1?"unidade.":"unidades."), este.x + 445, este.y + 180);

        ctx.restore();
    }
    function desenharMercadoriasEstoque()
    {
        ctx.save();

        var xTabela = este.x + 395;
        var yTabela = este.y + este.height/3 + 128;
        var widthTabela = este.width/2 - 80;
        var heightTabela = 263;

        ctx.fillStyle = "silver";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;

        ctx.fillRect(xTabela, yTabela, widthTabela, heightTabela);
        ctx.strokeRect(xTabela, yTabela, widthTabela, heightTabela);

        ctx.fillStyle = "gray";
        ctx.fillRect(xTabela, yTabela, widthTabela, 30);
        ctx.strokeRect(xTabela, yTabela, widthTabela, 30);

        ctx.fillStyle = "black";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.font = "bold 12pt Consolas";

        ctx.fillText(" Produto                 Preço     Qtde", xTabela, yTabela + 15);

        for (var i = 0; i < 8; i++)
        {
            if (i % 2 == 0)
            {
                ctx.fillStyle = "#d8d8d8";
                ctx.fillRect(xTabela + 1, yTabela + 33 + 29 * i, widthTabela - 2, 30);
            }

            if (i < este.produtos.length && este.produtos[i].status == 1)
            {
                ctx.fillStyle = "black";
                var pad = "                                                          ";
                ctx.fillText(" " + (este.produtos[i].nome + pad).substr(0, 20) +
                                   (pad + formatarDinheiro(este.produtos[i].preco)).substr(-11) +
                                   (pad + este.produtos[i].qtdeEmEstoque).substr(-9),
                                   xTabela, yTabela + 45.5 + 29 * i);
            }
        }

        var xLinhas = [200, 285];

        for (var i = 0; i < xLinhas.length; i++)
        {
            ctx.beginPath();
            ctx.moveTo(xTabela + xLinhas[i], yTabela + 30);
            ctx.lineTo(xTabela + xLinhas[i], yTabela + heightTabela);
            ctx.closePath();
            ctx.stroke();
        }

        ctx.restore();
    }
    function desenharEstoqueEstoque()
    {
        ctx.save();

        // Títulos

        ctx.fillStyle = "black";
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";
        ctx.font = "bold 13.5pt Century Gothic";

        ctx.fillText("Espaço disponível: ", este.x + este.width/2 + 375, este.y + 160);
        ctx.fillText("Capacidade máxima: ", este.x + este.width/2 + 375, este.y + 190);

        // Valores absolutos

        ctx.textAlign = "left";
        ctx.font = "13.5pt Century Gothic";

        ctx.fillText(`${este.capacidade - este.qtdeMateriaPrima - este.getQtdeTotalDeProdutos()} u`, este.x + este.width/2 + 375, este.y + 160);
        ctx.fillText(`${este.capacidade} u`, este.x + este.width/2 + 375, este.y + 190);

        // Observação

        ctx.textAlign = "left";
        ctx.font = "italic 13pt Century Gothic";
        ctx.fillText("Observação: u = unidade(s)", este.x + este.width/2 + 190, este.y + este.height - 400);

        ctx.textAlign = "center";
        ctx.font = "bold 14pt Century Gothic";
        ctx.fillText("Compre o armazém para", este.x + este.width/2 + 309, este.y + este.height - 365);
        ctx.fillText("aumentar a capacidade!", este.x + este.width/2 + 309, este.y + este.height - 340);

        ctx.restore();
    }
    function desenharGerenciarProducao()
    {
        ctx.save();

        if (!operacional)
        {
            desenharInformacoesProducao();
            desenharGraficoProducao();
            desenharTabelaProducao();
        }
        else
            desenharIrPara("setor operacional");

        ctx.restore();
    }
    function desenharInformacoesProducao()
    {
        ctx.save();

        ctx.textAlign = "right";
        ctx.textBaseline = "alphabetic";
        ctx.font = "bold 20pt Century Gothic";
        ctx.fillStyle = "black";
        ctx.fillText("Capacidade de produção: ", este.x + 650, este.y + 100);

        ctx.textAlign = "left";
        ctx.font = "20pt Century Gothic";
        ctx.fillText(`${este.capacidadeProducao}u/dia`, este.x + 650, este.y + 100);

        ctx.textAlign = "center";
        ctx.font = "bold 15pt Century Gothic";
        ctx.fillText("Compre o operacional para aumentar", este.x + 495, este.y + 240);
        ctx.fillText("a capacidade de produção!", este.x + 495, este.y + 270);

        ctx.textBaseline = "top";
        ctx.textAlign = "right";
        ctx.fillStyle = "black";
        ctx.font = "bold 17pt Century Gothic";
        ctx.fillText("Status da produção: ", este.x + este.width/2 + 125, este.y + 125);

        var produtosAtivos = 0;
        for (var i = 0; i < este.produtos.length; i++)
            if (este.produtos[i].producao > 0)
                produtosAtivos++;

        ctx.textAlign = "left";
        ctx.fillStyle = produtosAtivos == 0 || este.qtdeMateriaPrima==0?"red":"green";
        ctx.fillText(produtosAtivos == 0 || este.qtdeMateriaPrima==0?"parada.":"ativa.", este.x + este.width/2 + 125, este.y + 125);

        ctx.textAlign = "center";
        ctx.font = "italic 16pt Century Gothic";
        var texto;
        if (produtosAtivos > 0)
            texto = este.qtdeMateriaPrima==0?"Sem matéria-prima.":`${este.qtdeMateriaPrima}u de matéria-prima disponível`;
        else if (este.produtos.length == 0)
            texto = "Crie produtos para começar!";
        else
            texto = este.produtos.length - (este.produtos[este.produtos.length - 1].status!=1?1:0) > 1?"Inicie a produção dos itens abaixo!":"Inicie a produção do item abaixo!";

        ctx.fillText(texto, este.x + este.width/2 + 60, este.y + 150);

        ctx.restore();
    }
    var coresGrafico = ["#00e52a", "#ba0000", "#e87b06", "#efff3f", "#8e0047", "#aa00ff", "#0003c4", "#00c3e5", "gray"];
    function desenharGraficoProducao()
    {
        ctx.save();

        var raio = 88;
        var xCentro = este.x + este.width - (raio + 15);
        var yCentro = este.y + 204;
        var valores = new Array();
        for (var i = 0; i < este.produtos.length; i++)
            valores.push(este.produtos[i].producao);

        var total = este.capacidadeProducao;

        desenharGraficoPizza(raio, xCentro, yCentro, valores, total, coresGrafico, "gray");

        ctx.restore();
    }

    function calcularProducaoDisponivel()
    {
        var producaoDisponivel = este.capacidadeProducao;
        for (var i = 0; i < este.produtos.length; i++)
            producaoDisponivel -= parseInt(este.txtsProducao[i].text);
        return producaoDisponivel;
    }
    var xTabelaProducao = este.x + 300;
    var yTabelaProducao = este.y + 308;
    function desenharTabelaProducao()
    {
        ctx.save();

        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;

        var widthTabela = este.width - (xTabelaProducao + 20 - este.x);
        var heightTabela = 303;

        ctx.fillStyle = "silver";
        ctx.fillRect(xTabelaProducao, yTabelaProducao, widthTabela, heightTabela);
        ctx.strokeRect(xTabelaProducao, yTabelaProducao, widthTabela, heightTabela);

        ctx.fillStyle = "gray";
        ctx.fillRect(xTabelaProducao, yTabelaProducao, widthTabela, 30);
        ctx.strokeRect(xTabelaProducao, yTabelaProducao, widthTabela, 30);

        ctx.fillStyle = "black";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.font = "bold 13pt Consolas";

        ctx.fillText(" Legenda           Nome                    Produção", xTabelaProducao, yTabelaProducao + 15);

        for (var i = 0; i < 9; i++)
        {
            if (i%2 == 0) // Faixas mais claras
            {
                ctx.fillStyle = "#d8d8d8";
                ctx.fillRect(xTabelaProducao + 1, yTabelaProducao + 31 + 30 * i, widthTabela - 2, 31);
            }

            ctx.fillStyle = coresGrafico[i];
            ctx.fillRect(xTabelaProducao + 6, yTabelaProducao + 36 + 30 * i, 80, 20);
            ctx.strokeRect(xTabelaProducao + 6, yTabelaProducao + 36 + 30 * i, 80, 20);

            ctx.fillStyle = "black";
            if (i < este.produtos.length && este.produtos[i].status == 1)
            {
                var pad = "                                                          ";
                ctx.fillText(" " + (este.produtos[i].nome + pad).substr(0, 20), xTabelaProducao + 92, yTabelaProducao + 46 + 30 * i);
                ctx.fillText("u/dia", xTabelaProducao + 509, yTabelaProducao + 45 + 30 * i)
                este.txtsProducao[i].desenhar();
            }
            else if (i == 8)
            {
                ctx.save();

                ctx.textAlign = "center";
                ctx.font = "bold 14.5pt Consolas"
                ctx.fillText("Produção disponível", xTabelaProducao + 208.5, yTabelaProducao + 46 + 30 * i);
                ctx.fillText(calcularProducaoDisponivel() + "u/dia", xTabelaProducao + (widthTabela + 325)/2, yTabelaProducao + 46 + 30 * i);

                ctx.restore();
            }
        }

        var xLinhas = [92, 325];

        for (var i = 0; i < xLinhas.length; i++)
        {
            ctx.beginPath();
            ctx.moveTo(xTabelaProducao + xLinhas[i], yTabelaProducao + 30);
            ctx.lineTo(xTabelaProducao + xLinhas[i], yTabelaProducao + heightTabela);
            ctx.closePath();
            ctx.stroke();
        }

        ctx.restore();
    }
    function desenharGerenciarDinheiro()
    {
        ctx.save();

        if (!financeiro)
        {
            desenharTabelaFinancas();
            desenharInformacoesFinancas();
        }
        else
            desenharIrPara("setor financeiro");

        ctx.restore();
    }
    var widthTabelaFinancas = este.width - 300;
    var heightTabelaFinancas = 380;
    var xTabelaFinancas = este.x + 280 + (este.width - 280 - widthTabelaFinancas)/2;
    var yTabelaFinancas = este.y + 70;
    function desenharTabelaFinancas()
    {
        ctx.save();

        ctx.lineWidth = 2;
        ctx.fillStyle = "#333333";
        ctx.strokeStyle = "black";
        roundRect(xTabelaFinancas, yTabelaFinancas, widthTabelaFinancas, heightTabelaFinancas, 10, true, true);

        ctx.fillStyle = "gray";
        roundRect(xTabelaFinancas, yTabelaFinancas, widthTabelaFinancas, 40, {upperLeft: 10, upperRight: 10}, true, true);

        ctx.fillStyle = "white";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.font = "bold 13pt Century Gothic";
        ctx.fillText(" Nome da conta                                Classificação         Caixa ou Débito", xTabelaFinancas + 5, yTabelaFinancas + 20);

        for (var i = 0; i < 10; i++)
        {
            if (i % 2 == 0)
            {
                ctx.fillStyle = "#555555";
                ctx.fillRect(xTabelaFinancas + 1, yTabelaFinancas + 41 + i * 34, widthTabelaFinancas - 2, 34);
                ctx.fillStyle = "#333333";
            }
            if (i < este.contas.length)
            {
                ctx.fillStyle = "black";
                ctx.fillText(este.contas[i].nome, xTabelaFinancas + 5, yTabelaFinancas + 58 + i * 34);
                ctx.fillText(este.contas[i].classificacao, xTabelaFinancas + 285, yTabelaFinancas + 58 + i * 34);
                ctx.drawImage(imgDinheiroGaragem, este.switchers[i].x - 32, yTabelaFinancas + 42 + i * 34);
                ctx.drawImage(imgCartaoGaragem, este.switchers[i].x + este.switchers[i].width + 8, yTabelaFinancas + 42 + i * 34)
                este.switchers[i].desenhar();
            }
        }

        var xLinhas = [280, 440];
        for (var i = 0; i < xLinhas.length; i++)
        {
            ctx.beginPath();
            ctx.moveTo(xTabelaFinancas + xLinhas[i], yTabelaFinancas + 41);
            ctx.lineTo(xTabelaFinancas + xLinhas[i], yTabelaFinancas + heightTabelaFinancas - 1);
            ctx.closePath();
            ctx.stroke();
        }

        ctx.restore();
    }

    var saldos = estatisticas.getEstatisticas().Saldo;
    function desenharInformacoesFinancas()
    {
        ctx.save();

        ctx.textAlign = "right";
        ctx.textBaseline = "alphabetic";
        ctx.fillStyle = "black";
        ctx.font = "bold 16pt Century Gothic";
        ctx.fillText("Status mensal: ", xTabelaFinancas + 160, yTabelaFinancas + heightTabelaFinancas + 65);
        ctx.fillText("Status anual: ", xTabelaFinancas + 160, yTabelaFinancas + heightTabelaFinancas + 100);

        var corStatusMensal = "black";
        var corStatusAnual = "black";
        var msgStatusMensal = " - ";
        var msgStatusAnual = " - ";

        if (saldos.length > 30)
        {
            var saldoAtual = saldos[saldos.length - 1].y;
            var saldoMesAnterior = saldos[saldos.length - 31].y;
            var lucroOuPrejuizoMensal = saldoAtual - saldoMesAnterior;
            if (lucroOuPrejuizoMensal > 0)
            {
                msgStatusMensal = "Lucro de " + formatarDinheiro(Math.abs(lucroOuPrejuizoMensal));
                corStatusMensal = "green";
            }
            else if (lucroOuPrejuizoMensal == 0)
                msgStatusMensal = "Sem variação";
            else
            {
                msgStatusMensal = "Prejuízo de " + formatarDinheiro(Math.abs(lucroOuPrejuizoMensal));
                corStatusMensal = "red";
            }

            if (saldos.length > 364)
            {
                var saldoAnoAnterior = saldos[saldos.length - 365].y;
                var lucroOuPrejuizoAnual = saldoAtual - saldoAnoAnterior;
                if (lucroOuPrejuizoAnual > 0)
                {
                    msgStatusAnual = "Lucro de " + formatarDinheiro(Math.abs(lucroOuPrejuizoAnual));
                    corStatusAnual = "green";
                }
                else if (lucroOuPrejuizoAnual == 0)
                    msgStatusAnual = "Sem variação";
                else
                {
                    msgStatusAnual = "Prejuízo de " + formatarDinheiro(Math.abs(lucroOuPrejuizoAnual));
                    corStatusAnual = "red";
                }
            }
        }

        ctx.textAlign = "left";
        ctx.fillStyle = corStatusMensal;
        ctx.fillText(msgStatusMensal, xTabelaFinancas + 160, yTabelaFinancas + heightTabelaFinancas + 65);
        ctx.fillStyle = corStatusAnual;
        ctx.fillText(msgStatusAnual, xTabelaFinancas + 160, yTabelaFinancas + heightTabelaFinancas + 100);

        este.btnIrParaBanco.desenhar();

        ctx.restore();
    }
    function desenharVendas()
    {
        ctx.save();

        if (!marketing)
        {
            desenharTabelaVendas();
            desenharGraficoRendaDiariaVendas();
            desenharGraficoVendasTotais();
            desenharInformacoesVendas();
        }
        else
            desenharIrPara("marketing");

        ctx.restore();
    }

    var xTabelaVendas = este.x + 290;
    var yTabelaVendas = este.y + 330;

    function desenharTabelaVendas()
    {
        ctx.save();

        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;

        var widthTabela = este.width - (xTabelaVendas + 10 - este.x);
        var heightTabela = 272;

        ctx.fillStyle = "silver";
        ctx.fillRect(xTabelaVendas, yTabelaVendas, widthTabela, heightTabela);
        ctx.strokeRect(xTabelaVendas, yTabelaVendas, widthTabela, heightTabela);

        ctx.fillStyle = "gray";
        ctx.fillRect(xTabelaVendas, yTabelaVendas, widthTabela, 30);
        ctx.strokeRect(xTabelaVendas, yTabelaVendas, widthTabela, 30);

        ctx.fillStyle = "black";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.font = "bold 13pt Consolas";

        ctx.fillText(" Legenda          Produto          Renda Diária  Vendas Totais", xTabelaVendas, yTabelaVendas + 15);

        for (var i = 0; i < 8; i++)
        {
            if (i%2 == 0) // Faixas mais claras
            {
                ctx.fillStyle = "#d8d8d8";
                ctx.fillRect(xTabelaVendas + 1, yTabelaVendas + 31 + 30 * i, widthTabela - 2, 31);
            }

            ctx.fillStyle = coresGrafico[i];
            ctx.fillRect(xTabelaVendas + 6, yTabelaVendas + 36 + 30 * i, 80, 20);
            ctx.strokeRect(xTabelaVendas + 6, yTabelaVendas + 36 + 30 * i, 80, 20);

            ctx.fillStyle = "black";
            if (i < este.produtos.length && este.produtos[i].status == 1)
            {
                var pad = "                                                          ";
                ctx.textAlign = "left";
                ctx.fillText(" " + (este.produtos[i].nome + pad).substr(0, 20), xTabelaVendas + 92, yTabelaVendas + 46 + 30 * i);
                ctx.textAlign = "right";
                ctx.fillText(formatarDinheiro(este.produtos[i].vendasDiarias * este.produtos[i].preco), xTabelaVendas + 453, yTabelaVendas + 46 + 30 * i);
                ctx.fillText(este.produtos[i].totalDeVendas, xTabelaVendas + widthTabela - 4, yTabelaVendas + 46 + 30 * i)
            }
        }

        var xLinhas = [92, 322, 457];

        for (var i = 0; i < xLinhas.length; i++)
        {
            ctx.beginPath();
            ctx.moveTo(xTabelaVendas + xLinhas[i], yTabelaVendas + 30);
            ctx.lineTo(xTabelaVendas + xLinhas[i], yTabelaVendas + heightTabela);
            ctx.closePath();
            ctx.stroke();
        }

        ctx.restore();
    }
    function desenharGraficoRendaDiariaVendas()
    {
        ctx.save();

        var raio = 70;
        var xCentro = este.x + raio + 310;
        var yCentro = este.y + raio + 165;
        var valores = new Array();
        var total = 0;

        for (var i = 0; i < este.produtos.length; i++)
        {
            var rendaDiaria = este.produtos[i].vendasDiarias * este.produtos[i].preco;
            valores.push(rendaDiaria);
            total += rendaDiaria;
        }

        desenharGraficoPizza(raio, xCentro, yCentro, valores, total, coresGrafico, "gray");

        ctx.textBaseline = "bottom";
        ctx.textAlign = "center";
        ctx.fillStyle = "black";
        ctx.font = "bold 19pt Century Gothic";

        ctx.fillText("Renda Diária", xCentro, yCentro - raio - 10);

        ctx.restore();
    }
    function desenharGraficoVendasTotais()
    {
        ctx.save();

        var raio = 70;
        var xCentro = este.x + este.width - (raio + 30);
        var yCentro = este.y + raio + 165;
        var valores = new Array();
        var total = 0;

        for (var i = 0; i < este.produtos.length; i++)
        {
            var vendasTotais = este.produtos[i].totalDeVendas;
            valores.push(vendasTotais);
            total += vendasTotais;
        }

        desenharGraficoPizza(raio, xCentro, yCentro, valores, total, coresGrafico, "gray");

        ctx.textBaseline = "bottom";
        ctx.textAlign = "center";
        ctx.fillStyle = "black";
        ctx.font = "bold 19pt Century Gothic";

        ctx.fillText("Vendas Totais", xCentro, yCentro - raio - 10);

        ctx.restore();
    }
    function desenharInformacoesVendas()
    {
        ctx.save();

        ctx.textBaseline = "top";
        ctx.textAlign = "right";
        ctx.fillStyle = "black";
        ctx.font = "bold 19pt Century Gothic";
        ctx.fillText("Status das vendas: ", este.x + este.width/2 + 200, este.y + 70);

        var produtosComEstoque = 0;
        for (var i = 0; i < este.produtos.length; i++)
            if (este.produtos[i].rendaDiaria > 0 || este.produtos[i].qtdeEmEstoque > 0)
                produtosComEstoque++;

        ctx.textAlign = "left";
        ctx.fillStyle = produtosComEstoque==0?"red":"green";
        ctx.fillText(produtosComEstoque==0?"paradas.":"ativas.", este.x + este.width/2 + 200, este.y + 70);

        ctx.textAlign = "center";
        ctx.font = "italic 16pt Century Gothic";
        var texto = produtosComEstoque==0?"Nenhum produto com estoque.":`${produtosComEstoque}/${este.produtos.length - (este.produtos[este.produtos.length - 1].status!=1?1:0)} produto(s) com estoque`;
        ctx.fillText(texto, este.x + este.width/2 + 140, este.y + 95);

        ctx.restore();
    }

    function transformarElementosCriando(criando)
    {
        este.btnCriarCancelar.text = criando?"Parar":"Criar!";
        este.btnCriarCancelar.backgroundColor = criando?"#ba0000":"#4c98a5";
        este.btnCriarCancelar.backgroundHoverColor = criando?"#e00000":"#5eb9c9";

        var ultimoProduto = este.produtos[este.produtos.length - 1];
        if (criando)
        {
            este.txtNome.text = ultimoProduto.nome;
            este.txtPreco.text = ultimoProduto.preco;
        }
        este.txtNome.enabled = !criando;
        este.txtPreco.enabled = !criando;
    }
    function transformarElementosAlterando(alterando)
    {
        este.txtNome.enabled = !alterando;
        este.txtPreco.enabled = true;
        este.txtNome.text = alterando?produtoSendoAlterado.nome + "":"";
        este.txtPreco.text = alterando?produtoSendoAlterado.preco + "":"";
        este.txtPreco.setFocused(alterando);
        este.btnLancarAlterar.text = alterando?"Alterar":"Lançar!";
        este.btnAprimorarCancelar.text = alterando?"Cancelar":"Aprimorar";
        este.btnAprimorarCancelar.backgroundColor = alterando?"#ba0000":"#4c98a5";
        este.btnAprimorarCancelar.backgroundHoverColor = alterando?"#e00000":"#5eb9c9";
    }
    function desenharIrPara(onde)
    {
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        ctx.fillStyle = "black";
        ctx.font = "bold 23pt Century Gothic";

        ctx.fillText(`Você já tem o ${onde}.`, este.x + 280 + (este.width - 280)/2, este.y + 265);
        ctx.fillText("Deseja visitá-lo?", este.x + 280 + (este.width - 280)/2, este.y + 300);

        if (onde == "setor operacional")
            onde = "operacional";
        else if (onde == "setor financeiro")
            onde = "financeiro";

        este.btnIrParaConstrucao.text = "Ir para " + onde;
        este.btnIrParaConstrucao.desenhar();
    }
    this.reformar = function()
    {
        buscarConstrucoes();

        var nomesConstrucoes = ["armazem", "financeiro", "marketing", "operacional", "rh"];
        for (var i = 0; i < nomesConstrucoes.length; i++)
        {
            eval(`${nomesConstrucoes[i]}.btnIrParaGaragem.backgroundImage = imgIrParaEscritorio;`);
            eval(`${nomesConstrucoes[i]}.btnIrParaGaragem.backgroundHoverImage = imgIrParaEscritorio;`);
        }

        for (var i = 0; i < itensConstruidos.length; i++)
            if (itensConstruidos[i].nome == "Garagem")
            {
                itensConstruidos[i].botao.text = "Escritório";
                itensConstruidos[i].botao.backgroundImage = imgEscritorio;
                itensConstruidos[i].botao.backgroundHoverImage = imgEscritorio;
                itensConstruidos[i].menu.nome = "Escritório";
                itensConstruidos[i].menu.botoesOpcoes[0].text = "Abrir escritório";
                break;
            }
    }
    function configurar()
    {
        este.btnMercadorias = new BotaoRetangular(este.x, este.y + 140, 280, 45, 0, 280, 45,
                                                  "#e5e5e5", "#ececec", null, null, "bold 18pt Century Gothic",
                                                  "black", "Mercadorias", false, false, false);
        este.btnEstoque = new BotaoRetangular(este.x, este.y + 185, 280, 45, 0, 280, 45,
                                              "#c3c3c3", "#dadada", null, null, "bold 18pt Century Gothic",
                                              "black", "Estoque", false, false, false);
        este.btnGerenciarProducao = new BotaoRetangular(este.x, este.y + 230, 280, 45, 0, 280, 45,
                                                        "#c3c3c3", "#dadada", null, null, "bold 18pt Century Gothic",
                                                        "black", "Gerenciar Produção", false, false, false);
        este.btnGerenciarDinheiro = new BotaoRetangular(este.x, este.y + 275, 280, 45, 0, 280, 45,
                                                        "#c3c3c3", "#dadada", null, null, "bold 18pt Century Gothic",
                                                        "black", "Gerenciar Dinheiro", false, false, false);
        este.btnVendas = new BotaoRetangular(este.x, este.y + 320, 280, 45, 0, 280, 45,
                                             "#c3c3c3", "#dadada", null, null, "bold 18pt Century Gothic",
                                             "black", "Vendas", false, false, false);

        var onclickBotoesMenu = function(sender)
        {
            este.btnMercadorias.backgroundColor = "#c3c3c3";
            este.btnEstoque.backgroundColor = "#c3c3c3";
            este.btnGerenciarProducao.backgroundColor = "#c3c3c3";
            este.btnGerenciarDinheiro.backgroundColor = "#c3c3c3";
            este.btnVendas.backgroundColor = "#c3c3c3";

            este.btnMercadorias.backgroundHoverColor = "#dadada";
            este.btnEstoque.backgroundHoverColor = "#dadada";
            este.btnGerenciarProducao.backgroundHoverColor = "#dadada";
            este.btnGerenciarDinheiro.backgroundHoverColor = "#dadada";
            este.btnVendas.backgroundHoverColor = "#dadada";

            sender.backgroundColor = "#e5e5e5";
            sender.backgroundHoverColor = "#ececec";

            este.desativar();
            este.ativar();
        }

        este.btnMercadorias.onclick = function() {opcaoAberta = 0; onclickBotoesMenu(este.btnMercadorias)};
        este.btnEstoque.onclick = function() {opcaoAberta = 1; onclickBotoesMenu(este.btnEstoque)};
        este.btnGerenciarProducao.onclick = function() {opcaoAberta = 2; onclickBotoesMenu(este.btnGerenciarProducao)};
        este.btnGerenciarDinheiro.onclick = function() {opcaoAberta = 3; onclickBotoesMenu(este.btnGerenciarDinheiro)};
        este.btnVendas.onclick = function() {opcaoAberta = 4; onclickBotoesMenu(este.btnVendas)};

        este.btnCriarCancelar = new BotaoRetangular(este.x + 720, este.y + 220, 130, 50, 10, 130, 50,
                                                    "#4c98a5", "#5eb9c9", null, null, "bold 19pt Century Gothic",
                                                    "white", "Criar!", false, false, false);
        este.btnCriarCancelar.onclick = function() {
            if (este.btnCriarCancelar.text == "Criar!")
            {
                try
                {
                    if (este.produtos.length < 8)
                    {
                        var nome = este.txtNome.text;
                        var preco = parseFloat(este.txtPreco.text);

                        if (nome.length < 2)
                            throw new DOMException("Insira um nome com pelo menos 2 caracteres!", "Erro");
                        if (!preco || preco == 0)
                            throw new DOMException("Insira um preço não nulo!", "Erro");

                        for (var i = 0; i < este.produtos.length; i++)
                            if (este.produtos[i].nome.toUpperCase() == nome.toUpperCase())
                                throw new DOMException("Nome de produto já existente!")

                        fazerCompra("Desenv. do produto: " + nome, 2000, false, true, 1, function() {
                            este.produtos.push(new Produto(nome, preco));

                            transformarElementosCriando(true);
                        })
                    }
                    else
                        throw new DOMException("Você atingiu o limite de produtos!");
                }
                catch (ex) {alerta(ex.message)}
            }
            else
            {
                confirma("Você não terá o custo de volta se parar. Deseja continuar?", function() {
                    este.produtos.pop();

                    transformarElementosCriando(false);
                })
            }
        }

        este.btnLancarAlterar = new BotaoRetangular(este.x + 715, este.y + 201, 140, 40, 10, 140, 40,
                                             "#4c98a5", "#5eb9c9", null, null, "bold 18pt Century Gothic",
                                             "white", "Lançar!", false, false, false);
        este.btnLancarAlterar.onclick = function() {
            if (este.btnLancarAlterar.text == "Lançar!")
            {
                confirma('Deseja realmente lançar o produto "' + este.txtNome.text + '" ao mercado?', function() {
                    var ultimoProduto = este.produtos[este.produtos.length - 1];
                    ultimoProduto.status = 1;
                    ultimoProduto.dataDeCriacao = formatarData(calendario.dia, calendario.mes, calendario.ano);

                    este.txtNome.clear();
                    este.txtPreco.clear();
                    este.txtNome.enabled = true;
                    este.txtPreco.enabled = true;

                    este.btnCriarCancelar.text = "Criar!";
                    este.btnCriarCancelar.backgroundColor = "#4c98a5";
                    este.btnCriarCancelar.backgroundHoverColor = "#5eb9c9";

                    este.desativar();
                    este.ativar();
                });
            }
            else
            {
                try
                {
                    var preco = parseFloat(este.txtPreco.text);

                    if (!preco || preco == 0)
                        throw new DOMException("Insira um preço não nulo!", "Erro");

                    confirma("Deseja realmente alterar o produto?", function() {
                        produtoSendoAlterado.preco = preco;
                        produtoSendoAlterado = null;

                        transformarElementosAlterando(false);
                    })
                }
                catch (ex) {alerta(ex.message)}
            }
        }
        este.btnAprimorarCancelar = new BotaoRetangular(este.x + 715, este.y + 249, 140, 40, 10, 140, 40,
                                                "#4c98a5", "#5eb9c9", null, null, "bold 18pt Century Gothic",
                                                "white", "Aprimorar", false, false, false);
        este.btnAprimorarCancelar.onclick = function() {
            if (este.btnAprimorarCancelar.text == "Aprimorar")
            {
                var ultimoProduto = este.produtos[este.produtos.length - 1];
                if (ultimoProduto.status == -2)
                    alerta("Não é possível aprimorar mais.");
                else
                {
                    fazerCompra('Aprimoramento de "' + ultimoProduto.nome + '"', (2 - ultimoProduto.status) * 2000, false, true, 1, function() {
                        ultimoProduto.status--;
                        ultimoProduto.diasRestantes = 10;

                        transformarElementosCriando(true);

                        este.desativar();
                        este.ativar();
                    })
                }
            }
            else
            {
                produtoSendoAlterado = null;
                transformarElementosAlterando(false);
            }
        }

        este.botoesAlterar = new Array();
        este.botoesExcluir = new Array();

        for (var i = 0; i < 8; i++)
        {
            este.botoesAlterar.push(new BotaoRetangular(este.x + 611, este.y + 364 + 29 * i, 127, 24, 3, 127, 24, "#c3c3c3", "#dadada",
                                          null, null, "bold 12pt Century Gothic", "black", "Alterar Preço", false, false, false));

            este.botoesAlterar[i].numeroRegistro = i;
            este.botoesAlterar[i].onclick = function(botao) {
                if (este.produtos[este.produtos.length - 1].status != 1)
                    alerta("Não é possível alterar um produto desenvolvendo outro.");
                else
                {
                    produtoSendoAlterado = este.produtos[botao.numeroRegistro];
                    transformarElementosAlterando(true);
                    este.desativar();
                    este.ativar();
                }
            }

            este.botoesExcluir.push(new BotaoRetangular(este.x + 746, este.y + 364 + 29 * i, 127, 24, 3, 127, 24, "#c3c3c3", "#dadada",
                                    null, null, "bold 12pt Century Gothic", "black", "Excluir", false, false, false));
            este.botoesExcluir[i].numeroRegistro = i;
            este.botoesExcluir[i].onclick = function(botao) {
                var produto = este.produtos[botao.numeroRegistro];
                if (produtoSendoAlterado == produto)
                    alerta("Cancele a alteração do produto antes de excluí-lo!");
                else
                    confirma('Deseja realmente tirar o produto "' + produto.nome + '" do mercado?', function() {
                        este.desativar();
                        este.produtosRemovidos.push(este.produtos[botao.numeroRegistro]);
                        este.produtos.splice(botao.numeroRegistro, 1);

                        for (var i = 0; i < este.produtos.length; i++)
                        {
                            este.txtsProducao[i].text = este.produtos[i].producao + "";
                            var operacional = getJanelaConstrucao("Operacional");
                            if (operacional)
                                operacional.txtsProducao[i].text = este.produtos[i].producao + "";
                        }

                        este.ativar();
                    })
            }
        }

        este.txtNome = new TextBox({
            x: este.x + 390,
            y: este.y + 150,
            width: 240,
            placeholder: "Nome",
            font: "15pt Century Gothic",
            maxlength: 20
        });
        este.txtPreco = new TextBox({
            x: este.x + 720,
            y: este.y + 150,
            width: 130,
            placeholder: "Preço",
            font: "15pt Century Gothic",
            onlynumbers: true,
            maxvalue: 99999,
            maxlength: 8
        })

        este.txtsProducao = new Array();
        for (var i = 0; i < 8; i++)
        {
            este.txtsProducao.push(new TextBox({
                x: xTabelaProducao + 375,
                y: yTabelaProducao + 34 + 30 * i,
                width: 130,
                height: 24,
                text: "0",
                onlynumbers: true,
                acceptFloats: false,
                font: "13pt Century Gothic",
                beforeTextChanged: function(textbox) {
                    textbox.maxvalue = calcularProducaoDisponivel() + parseInt(textbox.text);
                },
                afterTextChanged: function(textbox) {
                    var registro = (textbox.y - (yTabelaProducao + 34))/30;
                    este.produtos[registro].producao = parseInt(textbox.text);
                    var operacional = getJanelaConstrucao("Operacional");
                    if (operacional)
                        operacional.txtsProducao[registro].text = textbox.text;
                }
            }))
        }
        
        este.switchers = new Array();
        for (var i = 0; i < 10; i++)
        {
            este.switchers.push(new Switcher({
                x: xTabelaFinancas + (440 + widthTabelaFinancas - 84)/2,
                y: yTabelaFinancas + 45 + i * 34
            }));
            este.switchers[i].numeroRegistro = i;
            este.switchers[i].onswitch = function(switcher) {
                este.contas[switcher.numeroRegistro].efetuarNoDebito = switcher.side=="right";
            }
        }
        este.btnIrParaBanco = new BotaoRetangular(xTabelaFinancas + widthTabelaFinancas - 210, este.y + (yTabelaFinancas - este.y + heightTabelaFinancas + este.height)/2 - 22,
                                                    210, 44, 8, 210, 44, "#c3c3c3", "#ececec", null, null, "bold 17pt Century Gothic",
                                                    "black", "Ir para o banco", false, false, false);
        este.btnIrParaBanco.onclick = function() {
            este.abrirFechar();
            mapa.setLugarAberto(0);
            mapa.abrirFechar();
        }

        este.btnIrParaConstrucao = new BotaoRetangular(este.x + 140 + (este.width - 290)/2, este.y + 315,
                                                       290, 50, 8, 290, 50, "#c3c3c3", "#ececec", null, null, "bold 20.5pt Century Gothic",
                                                       "black", "Ir para (...)", false, false, false);
        este.btnIrParaConstrucao.onclick = function() {
            este.desativar();
            getJanelaConstrucao(este.btnIrParaConstrucao.text.substr(8)).abrirFechar();
        }

        este.btnReformar = new BotaoRetangular(este.x + 10, este.y + 390, 260, 45, 10, 260, 45,
                                               "#737373", "#9a9a9a", null, null, "bold 17pt Century Gothic",
                                               "#555555", "Reformar Garagem", false, false, false);
        este.btnReformar.onclick = function() {
            fazerCompra("Reforma da garagem", 90000, true, true, 5, function() {
                este.reformada = true;
                este.reformar();
                este.desativar();
                este.ativar();
            })
        }
    }
    configurar();
}
function Produto(nome, preco)
{
    this.nome = nome;
    this.preco = preco;
    this.qtdeEmEstoque = 0;

    /**
     *  1 - Lançado
     *  0 - Em desenvolvimento
     * -1 - Primeiro aprimoramento
     * -2 - Segundo aprimoramento
     */
    this.status = 0;

    // Dias que ainda faltam para acabar o desenvolvimento ou para acabar o período de promoção do marketing.
    this.diasRestantes = 10;
    this.fatorMarketing = 0;
    this.dataDeCriacao = "";
    this.qualidade = 0;
    this.producao = 0;
    this.totalDeVendas = 0;
    this.vendasDiarias = 0;

    this.calcularQualidade = function()
    {
        var rh = getJanelaConstrucao("R. Humanos");
        var qtosFuncionarios = rh?rh.getRH().FuncionariosDesenvolvimento + 1:1;

        if (this.status == 0)
            this.qualidade = (Math.random() * 2 + 1) * Math.log2(qtosFuncionarios + 1);
        else
            this.qualidade += Math.random() * 2 * Math.log2(qtosFuncionarios + 1);

        return this.qualidade;
    }
    this.calcularVendasDiarias = function()
    {
        var dataDesformatada = desformatarData(this.dataDeCriacao);
        var objDataCriacao = new Date(dataDesformatada.ano, dataDesformatada.mes, dataDesformatada.dia);
        var objDataAtual = new Date(calendario.ano, calendario.mes, calendario.dia);
        var diferencaDeDias = (objDataAtual.getTime() - objDataCriacao.getTime()) / (1000 * 60 * 60 * 24);
        var pesoDiferencaDeDias = Math.log(diferencaDeDias + 4) / Math.log(3);
        var pesoPreco = Math.pow(this.preco, 2 - (calendario.fatorEconomia() / 8 ));
        var pesoMarketingProduto = this.fatorMarketing/2 + 1;
        var pesoMarketingEmpresa = 1;
        var marketing = getJanelaConstrucao("Marketing");
        if (marketing && marketing.promocaoEmpresa)
            pesoMarketingEmpresa = marketing.promocaoEmpresa/4 + 1;
        this.vendasDiarias = Math.floor(500 * this.qualidade * pesoMarketingEmpresa * pesoMarketingProduto * Math.sqrt(barra.nivel) / (pesoDiferencaDeDias * pesoPreco));
        if (this.vendasDiarias > this.qtdeEmEstoque)
            this.vendasDiarias = this.qtdeEmEstoque;

        return this.vendasDiarias;
    }
}
function Conta(nome, classificacao)
{
    this.nome = nome;
    this.classificacao = classificacao;
    this.efetuarNoDebito = false;
}