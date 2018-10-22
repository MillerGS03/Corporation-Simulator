// Informaçõe estáticas
ItemConstruido.armazem = {nome: "Armazém", preco: ItemAVender.armazem.preco, imagem: imgArmazem, width: 100, height: 100};
ItemConstruido.garagem = {nome: "Garagem", preco: ItemAVender.garagem.preco, imagem: imgGaragem, width: 130, height: 130};
ItemConstruido.operacional = {nome: "Operacional", preco: ItemAVender.operacional.preco, imagem: imgOperacional, width: 140, height: 140};
ItemConstruido.recursosHumanos = {nome: "R. Humanos", preco: ItemAVender.recursosHumanos.preco, imagem: imgRecursosHumanos, width: 130, height: 130};
ItemConstruido.marketing = {nome: "Marketing", preco: ItemAVender.marketing.preco, imagem: imgMarketing, width: 100, height: 100};
ItemConstruido.caminho = {nome: "", preco: ItemAVender.caminho.preco, imagem: null, width: 20, height: 20};

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

    this.botao = new BotaoRetangular(this.x, this.y, this.width, this.height, null, this.width, this.height, "Silver", "#cbcbcb",
                                     this.imagem, this.imagem, "bold 14pt Century Gothic", "Black", this.nome, true, false, false);
    this.botao.onclick = function() { abrirMenu(); };

    this.menu = new MenuItemConstruido(xMenu, yMenu, ["Vender", "Upgrade"], this.nome);

    function abrirMenu()
    {
        este.menuVisivel = true; 
        este.menu.x = xMouse; 
        este.menu.y = yMouse;
        for (var i = 0; i < itens.length; i++)
            itens[i].botao.adicionarTesteHover (
                function()
                {
                    var estaDentro = xMouse > este.menu.x && xMouse < este.menu.x + 200 && yMouse > este.menu.y && yMouse < este.menu.y + 300;
                    return !estaDentro;
                }
            );
        $("#meuCanvas").on("click", testarClick);
    }
    function fecharMenu()
    {
        este.menuVisivel = false;
        for (var i = 0; i < itens.length; i++)
            itens[i].botao.removerTestesHover();
        $("#meuCanvas").off("click", testarClick);
    }
    function testarClick()
    {
        var estaDentro = xMouse >= este.menu.x && xMouse < este.menu.x + 200 && yMouse >= este.menu.y && yMouse < este.menu.y + 300;
        if (!estaDentro)
            fecharMenu();
    }
    
    this.menuVisivel = false;

    var testandoPosicionamento = false;
    this.posicaoValida = false;

    var funcaoPosicionamento = null;

    this.desenhar = function()
    {
        ctx.save();
 
        if (testandoPosicionamento)
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
    this.seguirMouse = function(funcPos)
    {
        funcaoPosicionamento = funcPos;

        mover();
        $("#meuCanvas").on("mousemove", mover);
        $("#meuCanvas").on("click", pararDeSeguirMouse)
        if (funcaoPosicionamento != null)
        {
            $("#meuCanvas").on("mousemove", funcaoPosicionamento);
            testandoPosicionamento = true;
        }
    }
    function pararDeSeguirMouse()
    {
        $("#meuCanvas").off("mousemove", mover);
        $("#meuCanvas").off("mousemove", funcaoPosicionamento);
        $("#meuCanvas").off("click", pararDeSeguirMouse);

        itens.pop();
        if (este.posicaoValida && tocando)
        {
            fazerCompra(este.nome, este.preco, false, true, 3, function() {
                itens.push(este);
                botoes.push(este.botao);
                var novoItem = new Object();
                novoItem.ItemConstruido = este.nome;
                novoItem.X = este.x;
                novoItem.Y = este.y;
                $.post('http://localhost:3000/construir/' + jogo.CodJogo, novoItem);
                ativarBotoes();
            })
        }
        testandoPosicionamento = false;
        ativarBotoes();
    }

    var tocando = false;
    function mover()
    {
        if (isPrimeiro)
        {
            este.setX(rua.x - este.width - 2);
            este.setY(yMouse);
            tocando = true;
        }
        else
        {
            var coordenadaMaisProxima = new Object();
            coordenadaMaisProxima.distancia = 5000;
            coordenadaMaisProxima.x = -1;
            coordenadaMaisProxima.y = -1;

            // Aqui, a coordenada mais próxima deve ser encontrada.
            for (var i = 0; i < itens.length - 1; i++)
            {
                var distX = distanciaX(itens[i]);
                if (distX <= coordenadaMaisProxima.distancia && distX > 0)
                {
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
                    coordenadaMaisProxima.distancia = distY;
                    if (yMouse < itens[i].y)
                        coordenadaMaisProxima.y = itens[i].y - este.height - 1;
                    else
                        coordenadaMaisProxima.y = itens[i].y + itens[i].height + 1;
                    coordenadaMaisProxima.x = -1;
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