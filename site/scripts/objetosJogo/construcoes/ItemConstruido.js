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
        este.menu.x = getMousePos().x; 
        este.menu.y = getMousePos().y;
        canvas.addEventListener("click", testarClick);
    }
    function fecharMenu()
    {
        este.menuVisivel = false;
        canvas.removeEventListener("click", testarClick);
    }
    function testarClick()
    {
        var mousePos = getMousePos();
        var estaDentro = mousePos.x >= este.menu.x && mousePos.x < este.menu.x + 200 && mousePos.y >= este.menu.y && mousePos.y < este.menu.y + 300;
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

        moverParaMouse(event);
        canvas.addEventListener("mousemove", moverParaMouse);
        canvas.addEventListener("click", pararDeSeguirMouse)
        if (funcaoPosicionamento != null)
        {
            canvas.addEventListener("mousemove", funcaoPosicionamento);
            testandoPosicionamento = true;
        }
    }
    function pararDeSeguirMouse()
    {
        canvas.removeEventListener("mousemove", moverParaMouse);
        canvas.removeEventListener("mousemove", funcaoPosicionamento);
        canvas.removeEventListener("click", pararDeSeguirMouse);
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
    function moverParaMouse(e)
    {
        var mousePos = getMousePos();
        
        este.x = mousePos.x;
        este.botao.setX(mousePos.x);
        este.y = mousePos.y;
        este.botao.setY(mousePos.y);
    }
}