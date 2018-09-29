function ItemConstruido(x, y, w, h, nome, imagem, indiceItem) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;

    var xMenu = this.x;
    var yMenu = this.y;

    var este = this;

    this.nome = nome;

    this.botao = new BotaoRetangular(this.x, this.y, this.width, this.height, null, this.width, this.height, "Silver", "#cbcbcb",
                                     imagem, imagem, "bold 14pt Century Gothic", "Black", nome, true, false, false);
    this.botao.onclick = function() {abrirMenu(); }

    this.menu = new MenuItemConstruido(xMenu, yMenu, ["Vender", "Upgrade"]);

    function abrirMenu()
    {
        este.menuVisivel = true; 
        este.menu.x = xMouse; 
        este.menu.y = yMouse;
        $("#meuCanvas").on("click", testarClick);
        este.botao.adicionarTesteHover (
            function()
            {
                var estaDentro = xMouse > este.menu.x && xMouse < este.menu.x + 200 && yMouse > este.menu.y && yMouse < este.menu.y + 300;
                return !estaDentro;
            }
        );
    }
    function fecharMenu()
    {
        este.menuVisivel = false;
        este.botao.removerTestesHover();
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
            if (this.posicaoValida)
                this.botao.backgroundColor = "Green";
            else
                this.botao.backgroundColor = "Red";
        }
        else
            this.botao.backgroundColor = "Silver";
        this.botao.desenhar();

        ctx.restore();
    }
    this.seguirMouse = function(funcPos)
    {
        funcaoPosicionamento = funcPos;

        moverParaMouse();
        $("#meuCanvas").on("mousemove", moverParaMouse);
        $("#meuCanvas").on("click", pararDeSeguirMouse)
        if (funcaoPosicionamento != null)
        {
            $("#meuCanvas").on("mousemove", funcaoPosicionamento);
            testandoPosicionamento = true;
        }
    }
    function pararDeSeguirMouse()
    {
        $("#meuCanvas").off("mousemove", moverParaMouse);
        $("#meuCanvas").off("mousemove", funcaoPosicionamento);
        $("#meuCanvas").off("click", pararDeSeguirMouse);

        if (!este.posicaoValida)
            itensConstruidos.pop();
        else
        {
            botoes.push(este.botao);
            barra.dinheiro -= construcao.itens[indiceItem].preco;
        }
        testandoPosicionamento = false;
        ativarBotoes();
    }
    function moverParaMouse()
    {
        este.x = xMouse;
        este.y = yMouse;
        este.botao.x = xMouse;
        este.botao.y = yMouse;
    }
}