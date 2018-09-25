function ItemConstruido(x, y, w, h, nome, imagem, indiceItem) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    
    this.nome = nome;

    this.botao = new BotaoRetangular(this.x, this.y, this.width, this.height, null, this.width, this.height, "Silver", "#cbcbcb",
                                     imagem, imagem, "bold 14pt Century Gothic", "Black", nome, true, false, false);

    this.botao.onclick = function() {alert("Oi");}

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
        if (!itensConstruidos[itensConstruidos.length - 1].posicaoValida)
            itensConstruidos.pop();
        else
        {
            botoes.push(itensConstruidos[itensConstruidos.length - 1].botao);
            barra.dinheiro -= construcao.itens[indiceItem].preco;
        }
        testandoPosicionamento = false;
        ativarBotoes();
    }
    function moverParaMouse(e)
    {
        var rect = e.target.getBoundingClientRect();
        var xMouse = e.clientX - rect.left;
        var yMouse = e.clientY - rect.top;
        itensConstruidos[itensConstruidos.length - 1].x = xMouse;
        itensConstruidos[itensConstruidos.length - 1].botao.setX(xMouse);
        itensConstruidos[itensConstruidos.length - 1].y = yMouse;
        itensConstruidos[itensConstruidos.length - 1].botao.setY(yMouse);
    }
}