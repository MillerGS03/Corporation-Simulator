function Garagem()
{
    this.width = 900;
    this.height = 620;
    this.x = (canvas.width - this.width)/2;
    this.y = (canvas.height - this.height - 60)/2 + 60;

    this.qtdeFuncionarios = 0;

    this.produtos = new Array();
    this.qtdeMateriaPrima = 150;
    this.capacidade = 300;

    var produtoSendoAlterado = null;

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

    configurar();

    this.abrirFechar = function() 
    {
        this.aberto = !this.aberto;
        if (this.aberto)
            this.ativar();
        else
            this.desativar();
    }

    this.ativar = function()
    {
        desativarBotoes();
        
        this.btnFechar.ativarInteracao();
        this.btnEstoque.ativarInteracao();
        this.btnMercadorias.ativarInteracao();
        this.btnGerenciarProducao.ativarInteracao();
        this.btnGerenciarDinheiro.ativarInteracao();
        this.btnVendas.ativarInteracao();

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
                }
                else
                    this.btnCriarCancelar.ativarInteracao();
                this.txtNome.ativarInteracao();
                this.txtPreco.ativarInteracao();
                break;
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                break;
        }
    }
    this.desativar = function()
    {
        this.btnFechar.desativarInteracao();
        this.btnEstoque.desativarInteracao();
        this.btnMercadorias.desativarInteracao();
        this.btnGerenciarProducao.desativarInteracao();
        this.btnGerenciarDinheiro.desativarInteracao();
        this.btnVendas.desativarInteracao();
        this.btnCriarCancelar.desativarInteracao();
        this.btnAprimorarCancelar.desativarInteracao();
        this.btnLancarAlterar.desativarInteracao();

        for (var i = 0; i < this.produtos.length; i++)
        {
            this.botoesAlterar[i].desativarInteracao();
            this.botoesExcluir[i].desativarInteracao();
        }

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
        ctx.fillText("Garagem", este.x + este.width/2, este.y + 10, este.width - 5);

        este.btnFechar.desenhar();

        roundRect(este.x, este.y + 60, este.width, este.height - 60, {lowerLeft: 20, lowerRight: 20 }, true, true);

        ctx.globalAlpha = 0.15;
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

        ctx.restore();
    }
    function desenharMercadorias()
    {
        ctx.save();

        // Criação de produtos

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

        // Tabela

        ctx.fillStyle = "silver";
        ctx.fillRect(este.x + 300, este.y + 330, este.width - 320, 263);
        ctx.strokeRect(este.x + 300, este.y + 330, este.width - 320, 263);

        ctx.fillStyle = "gray";
        ctx.fillRect(este.x + 300, este.y + 330, este.width - 320, 30);
        ctx.strokeRect(este.x + 300, este.y + 330, este.width - 320, 30);

        ctx.fillStyle = "black";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.font = "bold 13pt Consolas";
        
        ctx.fillText(" Produto              Preço             Atualizar", este.x + 300, este.y + 345);

        for (var i = 0; i < 8; i++)
        {
            if (i%2 == 0)
            {
                ctx.fillStyle = "#d8d8d8";
                ctx.fillRect(este.x + 301, este.y + 361 + 29 * i, este.width - 322, 30);
            }

            if (i < este.produtos.length && este.produtos[i].status == 1)
            {
                ctx.fillStyle = "black";
                var pad = "                                                          ";
                ctx.fillText(" " + (este.produtos[i].nome + pad).substr(0, 20) + (pad + formatarDinheiro(este.produtos[i].preco)).substr(-10),
                             este.x + 300, este.y + 375 + 29 * i);
                este.botoesAlterar[i].desenhar();
                este.botoesExcluir[i].desenhar();
            }
        }

        ctx.beginPath();
        ctx.moveTo(este.x + 500, este.y + 360);
        ctx.lineTo(este.x + 500, este.y + 593);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(este.x + 605, este.y + 360);
        ctx.lineTo(este.x + 605, este.y + 593);
        ctx.closePath();
        ctx.stroke();

        ctx.restore();
    }
    function desenharEstoque()
    {
        ctx.save();

        desenharLayoutEstoque();
        desenharMateriasPrimasEstoque();
        desenharMercadoriasEstoque();
        desenharEstoqueEstoque();

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

        ctx.fillStyle = "silver";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;

        ctx.fillRect(este.x + 395, este.y + este.height/3 + 128, este.width/2 - 80, 263);
        ctx.strokeRect(este.x + 395, este.y + este.height/3 + 128, este.width/2 - 80, 263);

        ctx.fillStyle = "gray";
        ctx.fillRect(este.x + 395, este.y + este.height/3 + 128, este.width/2 - 80, 30);
        ctx.strokeRect(este.x + 395, este.y + este.height/3 + 128, este.width/2 - 80, 30);

        ctx.fillStyle = "black";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.font = "bold 12pt Consolas";
        
        ctx.fillText(" Produto                 Preço     Qtde", este.x + 395, este.y + este.height/3 + 143);

        for (var i = 0; i < 8; i++)
        {
            if (i % 2 == 0)
            {
                ctx.fillStyle = "#d8d8d8";
                ctx.fillRect(este.x + 396, este.y + este.height/3 + 161 + 29 * i, este.width/2 - 82, 30);
            }

            if (i < este.produtos.length && este.produtos[i].status == 1)
            {
                ctx.fillStyle = "black";
                var pad = "                                                          ";
                ctx.fillText(" " + (este.produtos[i].nome + pad).substr(0, 20) + 
                                   (pad + formatarDinheiro(este.produtos[i].preco)).substr(-11) + 
                                   (pad + este.produtos[i].qtdeEmEstoque).substr(-9),
                                   este.x + 395, este.y + este.height/3 + 173.5 + 29 * i);
            }
        }

        ctx.beginPath();
        ctx.moveTo(este.x + 595, este.y + este.height/3 + 128);
        ctx.lineTo(este.x + 595, este.y + este.height/3 + 391);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(este.x + 680, este.y + este.height/3 + 128);
        ctx.lineTo(este.x + 680, este.y + este.height/3 + 391);
        ctx.closePath();
        ctx.stroke();

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
        
        
        
        ctx.restore();
    }
    function desenharGerenciarDinheiro()
    {
        ctx.save();
        
        
        
        ctx.restore();
    }
    function desenharVendas()
    {
        ctx.save();
        
        
        
        ctx.restore();
    }

    function configurar()
    {
        este.btnMercadorias = new BotaoRetangular(este.x, este.y + 200, 280, 45, 0, 280, 45,
                                                  "#e5e5e5", "#ececec", null, null, "bold 18pt Century Gothic",
                                                  "black", "Mercadorias", false, false, false);
        este.btnEstoque = new BotaoRetangular(este.x, este.y + 245, 280, 45, 0, 280, 45,
                                              "#c3c3c3", "#dadada", null, null, "bold 18pt Century Gothic",
                                              "black", "Estoque", false, false, false);
        este.btnGerenciarProducao = new BotaoRetangular(este.x, este.y + 290, 280, 45, 0, 280, 45,
                                                        "#c3c3c3", "#dadada", null, null, "bold 18pt Century Gothic",
                                                        "black", "Gerenciar Produção", false, false, false);
        este.btnGerenciarDinheiro = new BotaoRetangular(este.x, este.y + 335, 280, 45, 0, 280, 45,
                                                        "#c3c3c3", "#dadada", null, null, "bold 18pt Century Gothic",
                                                        "black", "Gerenciar Dinheiro", false, false, false);
        este.btnVendas = new BotaoRetangular(este.x, este.y + 380, 280, 45, 0, 280, 45,
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

                        este.btnCriarCancelar.text = "Parar";
                        este.btnCriarCancelar.backgroundColor = "#ba0000";
                        este.btnCriarCancelar.backgroundHoverColor = "#e00000";

                        este.txtNome.enabled = false;
                        este.txtPreco.enabled = false;
                    })
                }
                catch (ex) {alerta(ex.message)}
            }
            else
            {
                confirma("Você não terá o custo de volta se parar. Deseja continuar?", function() {
                    este.produtos.pop();

                    este.btnCriarCancelar.text = "Criar!";
                    este.btnCriarCancelar.backgroundColor = "#4c98a5";
                    este.btnCriarCancelar.backgroundHoverColor = "#5eb9c9";
    
                    este.txtNome.enabled = true;
                    este.txtPreco.enabled = true;
                })
            }
        }

        function transformarElementos(alterando)
        {
            este.txtNome.enabled = !alterando;
            este.txtNome.text = alterando?produtoSendoAlterado.nome + "":"";
            este.txtPreco.text = alterando?produtoSendoAlterado.preco + "":"";
            este.txtPreco.setFocused(alterando);
            este.btnLancarAlterar.text = alterando?"Alterar":"Lançar";
            este.btnAprimorarCancelar.text = alterando?"Cancelar":"Aprimorar";
            este.btnAprimorarCancelar.backgroundColor = alterando?"#ba0000":"#4c98a5";
            este.btnAprimorarCancelar.backgroundHoverColor = alterando?"#e00000":"#5eb9c9";

            este.desativar();
            este.ativar();
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

                        transformarElementos(false);
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

                        este.btnCriarCancelar.text = "Parar";
                        este.btnCriarCancelar.backgroundColor = "#ba0000";
                        este.btnCriarCancelar.backgroundHoverColor = "#e00000";

                        este.txtNome.enabled = false;
                        este.txtPreco.enabled = false;

                        este.desativar();
                        este.ativar();
                    })
                }
            }
            else
            {
                produtoSendoAlterado = null;
                transformarElementos(false);
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
                    transformarElementos(true);
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
                        este.produtos.splice(botao.numeroRegistro, 1);
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
            maxlength: 7
        })
    }
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

    // Dias que ainda faltam para acabar o desenvolvimento.
    this.diasRestantes = 10;
    this.dataDeCriacao = "";
    this.qualidade = 0;

    this.calcularQualidade = function() 
    {
        var qtosFuncionarios = getJanelaConstrucao("R. Humanos")?getJanelaConstrucao("R. Humanos").funcionariosDesenvolvimento + 1:1;
    
        if (this.status == 0)
            this.qualidade = (Math.random() * 2 + 1) * Math.log2(qtosFuncionarios + 1);
        else
            this.qualidade += Math.random() * 2 * Math.log2(qtosFuncionarios + 1);
    }
}