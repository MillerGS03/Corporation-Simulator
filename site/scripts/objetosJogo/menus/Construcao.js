function Construcao()
{
    var qtosBotoesInicialmente = 0;

    this.botoesConstrucao = new Array();

    this.width = 850;
    this.height = 600;
    this.x = (canvas.width - this.width)/2;
    this.y = (canvas.height - this.height - 60)/2 + 60;

    var este = this;

    this.aberto = false;
    this.btnFechar = new BotaoRetangular(this.x + this.width - 50, this.y + 10, 40, 40,
                             { upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5 }, 40, 40,
        "#232323", "#535353", null, null, "bold 18pt Century Gothic", "red", "X", false, true, false);
    this.btnFechar.onclick = function(e) {
        este.abrirFechar();
    }

    configurarItens();

    function testarPosicionamento()
    {
        var itemAtual = itensConstruidos[itensConstruidos.length - 1];
        itemAtual.posicaoValida = false;
        if (itemAtual.x + itemAtual.width < rua.x - 2 && itemAtual.x > 1 && itemAtual.y > 62 && itemAtual.y + itemAtual.height < canvas.height - 1)
        {
            var colidiu = false;
            for (var i = itensConstruidos.length - 2; i >= 0; i--)
                if (itemAtual.x + itemAtual.width > itensConstruidos[i].x && itemAtual.x < itensConstruidos[i].x + itensConstruidos[i].width &&
                    itemAtual.y + itemAtual.height > itensConstruidos[i].y && itemAtual.y < itensConstruidos[i].y + itensConstruidos[i].height)
                    {
                        colidiu = true;
                        break;
                    }
            itemAtual.posicaoValida = !colidiu;
        }
    }
    function comprar(item, indiceItem)
    {
        var jaTem = false;
        for (var i = 0; i < itensConstruidos.length; i++)
            if(itensConstruidos[i].nome === item.nome)
            {
                jaTem = true;
                break;
            }
        if (jaTem)
            alert("Você já tem esse item!");
        else if (barra.dinheiro >= construcao.itens[indiceItem].preco && !jaTem)
        {
            construcao.abrirFechar();
            itensConstruidos.push(item);
            itensConstruidos[itensConstruidos.length - 1].seguirMouse(testarPosicionamento);
            desativarBotoes();
        }
        else 
            alert("Você não tem dinheiro suficiente!");
    }
    this.desenhar = function() {

        if (this.aberto)
        {
            ctx.save();

            desenharJanela();
            desenharItensAVenda();

            ctx.restore();
        }
    }
    function desenharJanela()
    {
        ctx.fillStyle = "#333333";
        ctx.globalAlpha = 0.3;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        roundRect(este.x, este.y, este.width, este.height, { upperLeft: 20, upperRight: 20, lowerLeft: 20, lowerRight: 20 }, true, true)
       
        ctx.fillStyle = "White";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.font = "bold 24pt Century Gothic";
        ctx.fillText("Construção", este.x + este.width/2, este.y + 10, este.width - 5);

        este.btnFechar.desenhar();

        roundRect(este.x, este.y + 60, este.width, este.height - 60, {lowerLeft: 20, lowerRight: 20 }, true, true);
    }
    function desenharItensAVenda()
    {
        for (var i = 0; i < este.itens.length; i++)
        este.itens[i].desenhar();
        for (var i = 0; i < este.itens.length; i++)
            if (este.itens[i].getDescricaoVisivel())
                este.itens[i].desenharDescricao();
    }
    function configurarItens()
    {
        este.itens = new Array();
        
        este.itens.push(new ItemAVender(este.x + 22 + 205 * este.itens.length, este.y + 175, ItemAVender.armazem, este.itens.length));
        este.itens.push(new ItemAVender(este.x + 22 + 205 * este.itens.length, este.y + 175, ItemAVender.garagem, este.itens.length));
        este.itens.push(new ItemAVender(este.x + 22 + 205 * este.itens.length, este.y + 175, ItemAVender.operacional, este.itens.length));
        este.itens.push(new ItemAVender(este.x + 22 + 205 * este.itens.length, este.y + 175, ItemAVender.recursosHumanos, este.itens.length));

        este.itens[0].botaoComprar.onclick = function() {
            comprar(new ItemConstruido(ItemConstruido.armazem), 0);
        }
        este.itens[1].botaoComprar.onclick = function() {
            comprar(new ItemConstruido(ItemConstruido.garagem), 1);
        }
        este.itens[2].botaoComprar.onclick = function() {
            comprar(new ItemConstruido(ItemConstruido.operacional), 2);
        }
        este.itens[3].botaoComprar.onclick = function() {
            comprar(new ItemConstruido(ItemConstruido.recursosHumanos), 3)
        }
    }
    this.abrirFechar = function() {
        this.aberto = !this.aberto;
        if (this.aberto)
        {
            desativarBotoes();
            this.btnFechar.ativarInteracao();
            qtosBotoesInicialmente = botoes.length;
            for (var i = 0; i < this.itens.length; i++)
            {
                this.itens[i].botaoComprar.ativarInteracao();
                this.itens[i].botaoDica.ativarInteracao();
            }
        }
        else
        {
            this.btnFechar.desativarInteracao();

            for (var i = 0; i < this.itens.length; i++)
            {
                this.itens[this.itens.length - i - 1].botaoComprar.desativarInteracao();
                this.itens[this.itens.length - i - 1].botaoDica.desativarInteracao();
            }

            ativarBotoes();
        }
        atualizar();
    }
}