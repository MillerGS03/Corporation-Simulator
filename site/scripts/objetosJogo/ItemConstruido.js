// Informações estáticas
ItemConstruido.armazem = {nome: "Armazém", preco: ItemAVender.armazem.preco, imagem: imgArmazem, width: 120, height: 120, infoMenu: MenuItemConstruido.armazem};
ItemConstruido.garagem = {nome: "Garagem", preco: ItemAVender.garagem.preco, imagem: imgGaragem, width: 140, height: 140, infoMenu: MenuItemConstruido.garagem};
ItemConstruido.operacional = {nome: "Operacional", preco: ItemAVender.operacional.preco, imagem: imgOperacional, width: 140, height: 140, infoMenu: MenuItemConstruido.operacional};
ItemConstruido.recursosHumanos = {nome: "R. Humanos", preco: ItemAVender.recursosHumanos.preco, imagem: imgRecursosHumanos, width: 130, height: 130, infoMenu: MenuItemConstruido.recursosHumanos};
ItemConstruido.marketing = {nome: "Marketing", preco: ItemAVender.marketing.preco, imagem: imgMarketing, width: 120, height: 120, infoMenu: MenuItemConstruido.marketing};
ItemConstruido.financeiro = {nome: "Financeiro", preco: ItemAVender.financeiro.preco, imagem: imgFinanceiro, width: 120, height: 120, infoMenu: MenuItemConstruido.financeiro};

function ItemConstruido(informacoes, isPrimeiro) 
{
    this.x = 0;
    this.y = 0;
    this.width = informacoes.width;
    this.height = informacoes.height;

    var xMenu = this.x;
    var yMenu = this.y;

    var este = this;

    this.nome = informacoes.nome;
    this.imagem = informacoes.imagem;
    this.preco = informacoes.preco;

    this.sustentador = null;

    this.botao = new BotaoRetangular(this.x, this.y, this.width, this.height, null, this.width, this.height, "Silver", "#cbcbcb",
                                     this.imagem, this.imagem, "bold 14pt Century Gothic", "Black", this.nome, true, false, false);
    this.botao.onclick = function() { abrirMenu(); };

    this.menu = new MenuItemConstruido(xMenu, yMenu, this, informacoes.infoMenu);

    function abrirMenu()
    {
        for (var i = 0; i < itens.length; i++)
        {
            itens[i].botao.removerTestesHover();
            itens[i].botao.adicionarTesteHover (
                function()
                {
                    var estaDentro = xMouse > este.menu.x && xMouse < este.menu.x + este.menu.width && yMouse > este.menu.y && yMouse < este.menu.y + este.menu.height;
                    return !estaDentro || !este.menu.aberto;
                }
            );
        }
        este.menu.setX(xMouse);
        este.menu.setY(yMouse);
        este.menu.ativar();
        $("#meuCanvas").on("click", testarClick);
    }
    function fecharMenu()
    {
        este.menu.desativar();
        $("#meuCanvas").off("click", testarClick);
    }
    function testarClick()
    {
        var estaDentroDoMenu = este.menu.aberto && xMouse >= este.menu.x && xMouse < este.menu.x + este.menu.width && yMouse >= este.menu.y && yMouse < este.menu.y + este.menu.height;
        if (!estaDentroDoMenu)
        {
            if (xMouse < este.x || xMouse > este.x + este.width || yMouse < este.y || yMouse > este.y + este.height)
                fecharMenu();
            else
            {
                este.menu.setX(xMouse);
                este.menu.setY(yMouse);
            }
        }
    }

    var reposicionando = false;
    var ultimoX = 0;
    var ultimoY = 0;

    this.getX = function()
    {
        if (reposicionando && this.testandoPosicionamento)
            return ultimoX;
        else
            return this.x;
    }
    this.getY = function()
    {
        if (reposicionando && this.testandoPosicionamento)
            return ultimoY;
        else
            return this.y;
    }
    this.jaComprado = true;
    this.testandoPosicionamento = false;
    this.posicaoValida = false;

    var funcaoPosicionamento = null;

    this.sustentaQuem = function() {
        var sustentando = new Array();
        for (var i = 0; i < itensConstruidos.length; i++)
            if (itensConstruidos[i].sustentador == this.nome)
                sustentando.push(itensConstruidos[i]);
        return sustentando;
    }

    this.desenhar = function()
    {
        ctx.save();
 
        if (this.testandoPosicionamento)
        {
            if (this.posicaoValida && tocando)
                this.botao.backgroundColor = "Green";
            else
                this.botao.backgroundColor = "Red";
        }
        else
            this.botao.backgroundColor = "Silver";
        this.botao.desenhar();

        ctx.restore();
    }

    var itens = null;
    this.passarItens = function(itensConstruidos)
    {
        itens = itensConstruidos;
    }
    this.seguirMouse = function(funcPos, reposicionar)
    {
        pausar();

        statusConstruindo = reposicionar?2:1;
        nomeItemEmConstrucao = this.nome;

        desativarBotoes();
        este.menu.desativar();

        funcaoPosicionamento = funcPos;
        if (reposicionando = reposicionar)
        {
            ultimoX = este.x;
            ultimoY = este.y;
            this.jaComprado = true;
        }
        else
            this.jaComprado = false;

        mover();
        $("#meuCanvas").on("mousemove", mover);
        $("#meuCanvas").on("click", pararDeSeguirMouse)
        if (funcaoPosicionamento != null)
        {
            $("#meuCanvas").on("mousemove", funcaoPosicionamento);
            this.testandoPosicionamento = true;
        }
    }
    function pararDeSeguirMouse()
    {
        despausar();

        statusConstruindo = 0;

        $("#meuCanvas").off("mousemove", mover);
        $("#meuCanvas").off("mousemove", funcaoPosicionamento);
        $("#meuCanvas").off("click", pararDeSeguirMouse);

        var novoX = este.x;
        var novoY = este.y;

        var tinhaTodos = testarSeTemTodosNecessariosParaUpgrade();
        if (!reposicionando)
            itens.pop();
        else
        {
            este.setX(ultimoX);
            este.setY(ultimoY);
        }

        if (este.posicaoValida && tocando)
        {
            var stringAdicional = reposicionando?"Reposicionar ":"";

            fazerCompra(stringAdicional + este.nome, reposicionando?este.preco/20:este.preco, false, true, 3, function() 
            {
                tocarSom("sons/construcao.ogg");
                este.sustentador = novoSustentador;
                if (reposicionando)
                {
                    este.setX(novoX);
                    este.setY(novoY);
                }
                else
                {
                    itens.push(este);
                    botoes.push(este.botao);
                    este.jaComprado = true;
                    ativarBotoes();
                    if (tinhaTodos != testarSeTemTodosNecessariosParaUpgrade())
                        painelNotificacoes.adicionarNotificacao("Reforma disponível!", "Transforme sua garagem em algo a mais!",
                                                                calendario.dia, calendario.mes, calendario.ano);
                }
            })
        }
        este.testandoPosicionamento = false;
        ativarBotoes();
    }
    function testarSeTemTodosNecessariosParaUpgrade()
    {
        var qtde = 0;
        for (var i = 0; i < itens.length; i++)
            if (itens[i].nome == "Armazém" || itens[i].nome == "Operacional" || itens[i].nome == "Financeiro" || itens[i].nome == "Marketing")
                qtde++;
        return qtde == 4;
    }

    var tocando = false;

    var novoSustentador = null;
    function mover()
    {
        if (isPrimeiro)
        {
            este.setX(rua.x - este.width - 2);
            este.setY(yMouse);
            tocando = true;
            novoSustentador = null;
        }
        else
        {
            var coordenadaMaisProxima = new Object();
            coordenadaMaisProxima.distancia = 5000;
            coordenadaMaisProxima.x = -1;
            coordenadaMaisProxima.y = -1;

            // Aqui, a coordenada mais próxima deve ser encontrada.
            for (var i = 0; i < itens.length; i++)
            {
                if (itens[i] != este)
                {
                    var distX = distanciaX(itens[i]);
                    if (distX <= coordenadaMaisProxima.distancia && distX > 0)
                    {
                        novoSustentador = itens[i].nome;
                        coordenadaMaisProxima.distancia = distX;
                        if (xMouse < itens[i].x)
                            coordenadaMaisProxima.x = itens[i].x - este.width - 1;
                        else
                            coordenadaMaisProxima.x = itens[i].x + itens[i].width + 1;
                        coordenadaMaisProxima.y = -1;
                    }
                    var distY = distanciaY(itens[i]);
                    if (distY < coordenadaMaisProxima.distancia && distY > 0)
                    {
                        novoSustentador = itens[i].nome;
                        coordenadaMaisProxima.distancia = distY;
                        if (yMouse < itens[i].y)
                            coordenadaMaisProxima.y = itens[i].y - este.height - 1;
                        else
                            coordenadaMaisProxima.y = itens[i].y + itens[i].height + 1;
                        coordenadaMaisProxima.x = -1;
                    }
                }
            }
            tocando = false;
            if (coordenadaMaisProxima.x >= 0)
            {
                este.setX(coordenadaMaisProxima.x);
                tocando = true;
            }
            else
                este.setX(xMouse);
            
            if (coordenadaMaisProxima.y >= 0)
            {
                este.setY(coordenadaMaisProxima.y);
                tocando = true;
            }
            else
                este.setY(yMouse);
        }
    }
    this.setX = function(x)
    {
        this.x = x;
        this.botao.x = x;
    }
    this.setY = function(y)
    {
        this.y = y;
        this.botao.y = y;
    }
    function distanciaX(outroItem)
    {
        if ((yMouse <= outroItem.y + outroItem.height && yMouse >= outroItem.y) ||
            (outroItem.y < yMouse + este.height && outroItem.y > yMouse))
        {
            if (xMouse < outroItem.x)
                return Math.abs(xMouse - outroItem.x);
            return Math.abs(xMouse - (outroItem.x + outroItem.width))
        }
        return -1;
    }
    function distanciaY(outroItem)
    {
        if ((xMouse <= outroItem.x + outroItem.width && xMouse >= outroItem.x) ||
            (outroItem.x < xMouse + este.width && outroItem.x > xMouse))
        {
            if (yMouse < outroItem.y)
                return Math.abs(yMouse - outroItem.y);
            return Math.abs(yMouse - (outroItem.y + outroItem.height));
        }
        return -1;
    }
}