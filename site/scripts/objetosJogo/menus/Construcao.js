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
        "#232323", "#535353", null, null, "bold 18pt Century Gothic", "red", "X", false, false, false);
    this.btnFechar.onclick = function(e) {
        este.abrirFechar();
    }

    configurarItens();

    this.testarPosicionamento = function(itemAtual)
    {
        itemAtual.posicaoValida = false;
        if (itemAtual.x + itemAtual.width < rua.x - 1 && itemAtual.x > 126 && itemAtual.y > 131 && itemAtual.y + itemAtual.height < canvas.height - 31)
        {
            var colidiu = false;
            for (var i = itensConstruidos.length - 1; i >= 0; i--)
                if (itemAtual != itensConstruidos[i] && itemAtual.x + itemAtual.width >= itensConstruidos[i].x && itemAtual.x <= itensConstruidos[i].x + itensConstruidos[i].width &&
                    itemAtual.y + itemAtual.height >= itensConstruidos[i].y && itemAtual.y <= itensConstruidos[i].y + itensConstruidos[i].height)
                    {
                        colidiu = true;
                        break;
                    }
            console.log("oi");
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
            alerta("Você já tem esse item!");
        else 
        {
            construcao.abrirFechar();
            itensConstruidos.push(item);
            for (var i = 0; i < itensConstruidos.length; i++)
                itensConstruidos[i].passarItens(itensConstruidos);
            itensConstruidos[itensConstruidos.length - 1].seguirMouse(function() {este.testarPosicionamento(itensConstruidos[itensConstruidos.length - 1])});
            desativarBotoes();
        }
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
            {
                este.itens[i].desenharDescricao();
                break;
            }
    }
    function configurarItens()
    {
        este.itens = new Array();

        var itensAVender = ["garagem", "armazem", "operacional", "recursosHumanos", "marketing", "financeiro"];
        
        for (var i = 0; i < itensAVender.length; i++)
        {
            este.itens.push(new ItemAVender(este.x + 22 + 205 * (i < 4?i:i - 3), este.y + (i < 4?70:este.height - 260), ItemAVender[itensAVender[i]], i));
            este.itens[i].botaoComprar.indiceItem = i;
            este.itens[i].botaoComprar.onclick = function(botao) {
                comprar(new ItemConstruido(ItemConstruido[itensAVender[botao.indiceItem]], itensConstruidos.length == 0), i);
            }
        }
    }

    this.setNivel = function(nivel)
    {
        for (var i = 0; i < this.itens.length; i++)
            this.itens[i].setNivel(nivel);
    }

    this.abrirFechar = function() {
        this.aberto = !this.aberto;
        if (this.aberto)
        {
            desativarBotoes();
            this.btnFechar.ativarInteracao();
            qtosBotoesInicialmente = botoes.length;
            for (var i = 0; i < this.itens.length; i++)
                this.itens[i].habilitar();
        }
        else
        {
            this.btnFechar.desativarInteracao();

            for (var i = 0; i < this.itens.length; i++)
                this.itens[i].desabilitar();

            ativarBotoes();
        }
    }
}