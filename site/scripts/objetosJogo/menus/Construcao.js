var imgItemGaragem = new Image();
var imgItemArmazem = new Image();
imgItemGaragem.src = "imagens/iconesItens/garagem.png";
imgItemArmazem.src = "imagens/iconesItens/armazem.png";

function Construcao()
{
    var qtosBotoesInicialmente = 0;

    this.botoesConstrucao = new Array();

    this.width = 850;
    this.height = 600;
    this.x = (canvas.width - this.width)/2;
    this.y = (canvas.height - this.height - 60)/2 + 60;

    this.aberto = false;
    this.btnFechar = new BotaoRetangular(this.x + this.width - 50, this.y + 10, 40, 40,
                             { upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5 }, 40, 40,
        "#232323", "#535353", null, null, "bold 18pt Century Gothic", "red", "X", false, true, false);
    this.btnFechar.onclick = function(e) {
        construcao.abrirFechar();
    }

    this.itens = new Array();

    this.itens.push(new ItemAVender(this.x + 20 + 205 * this.itens.length, this.y + 175, "Armazém",
    ["Isto é um armazém. Ele é", "utilizado para armazenar", "matéria-prima."],
    500, imgItemArmazem, this.itens.length));
    this.itens.push(new ItemAVender(this.x + 20 + 205 * this.itens.length, this.y + 175, "Garagem","", 1500, imgItemGaragem, this.itens.length));
    this.itens.push(new ItemAVender(this.x + 20 + 205 * this.itens.length, this.y + 175, "Operacional","", 3000, imgBtnConstrucaoHover, this.itens.length));
    this.itens.push(new ItemAVender(this.x + 20 + 205 * this.itens.length, this.y + 175, "Marketing","", 3500, imgBtnConstrucaoHover, this.itens.length));

    function TestarPosicionamento()
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

    this.itens[0].botaoComprar.onclick = function() {
        construcao.abrirFechar();
        itensConstruidos.push(new Armazem(0,0, 100, 100));
        itensConstruidos[itensConstruidos.length - 1].seguirMouse(TestarPosicionamento);
        desativarBotoes();
    }
    this.itens[1].botaoComprar.onclick = function() {
        construcao.abrirFechar();
        itensConstruidos.push(new Garagem(0,0, 130, 130));
        itensConstruidos[itensConstruidos.length - 1].seguirMouse(TestarPosicionamento);
        desativarBotoes();
    }
    this.itens[2].botaoComprar.onclick = function() {
        construcao.abrirFechar();
        itensConstruidos.push(new Operacional(0,0, 140, 140));
        itensConstruidos[itensConstruidos.length - 1].seguirMouse(TestarPosicionamento);
        desativarBotoes();
    }
    this.itens[3].botaoComprar.onclick = function() {
        construcao.abrirFechar();
        itensConstruidos.push(new Marketing(0,0, 140, 140));
        itensConstruidos[itensConstruidos.length - 1].seguirMouse(TestarPosicionamento);
        desativarBotoes();
    }

    this.desenhar = function() {

        if (this.aberto)
        {
            ctx.save();
            ctx.fillStyle = "#333333";
            ctx.globalAlpha = 0.3;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.globalAlpha = 1;
            ctx.strokeStyle = "black";
            ctx.lineWidth = 2;
            roundRect(this.x, this.y, this.width, this.height, { upperLeft: 20, upperRight: 20, lowerLeft: 20, lowerRight: 20 }, true, true)
           
            ctx.fillStyle = "White";
            ctx.textAlign = "center";
            ctx.textBaseline = "top";
            ctx.font = "bold 24pt Century Gothic";
            ctx.fillText("Construção", this.x + this.width/2, this.y + 10, this.width - 5);

            construcao.btnFechar.desenhar();

            roundRect(this.x, this.y + 60, this.width, this.height - 60, {lowerLeft: 20, lowerRight: 20 }, true, true);

            for (var i = 0; i < this.itens.length; i++)
                this.itens[i].desenhar();
            for (var i = 0; i < this.itens.length; i++)
                if (this.itens[i].getDescricaoVisivel())
                    this.itens[i].desenharDescricao();

            ctx.restore();
        }
    }
    this.abrirFechar = function() {
        this.aberto = !this.aberto;
        if (this.aberto)
        {
            desativarBotoes();
            this.btnFechar.ativarInteracao();
            qtosBotoesInicialmente = botoes.length;
            botoes.push(this.btnFechar);
            for (var i = 0; i < this.itens.length; i++)
            {
                botoes.push(this.itens[i].botaoComprar);
                botoes.push(this.itens[i].botaoDica);
                this.itens[i].botaoComprar.ativarInteracao();
                this.itens[i].botaoDica.ativarInteracao();
            }
        }
        else
        {
            this.btnFechar.desativarInteracao();
            this.btnFechar.hovering = false;
            botoes.pop();

            for (var i = 0; i < this.itens.length; i++)
            {
                this.itens[this.itens.length - i - 1].botaoComprar.desativarInteracao();
                this.itens[this.itens.length - i - 1].botaoDica.desativarInteracao();
                botoes.pop();
                botoes.pop();
            }

            ativarBotoes();
        }
        atualizar();
    }
}