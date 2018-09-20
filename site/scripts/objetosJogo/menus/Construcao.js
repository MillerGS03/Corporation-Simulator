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

    this.itens.push(new ItemAVender(this.x + 20 + 205 * this.itens.length, this.y + 175, "Garagem","", 1500, imgBtnConstrucaoHover));
    this.itens.push(new ItemAVender(this.x + 20 + 205 * this.itens.length, this.y + 175, "Armazém","", 500, imgBtnConstrucaoHover));
    this.itens.push(new ItemAVender(this.x + 20 + 205 * this.itens.length, this.y + 175, "Operacional","", 3000, imgBtnConstrucaoHover));
    this.itens.push(new ItemAVender(this.x + 20 + 205 * this.itens.length, this.y + 175, "Marketing","", 3500, imgBtnConstrucaoHover));

    this.itens[0].botaoComprar.onclick = function() {
        construcao.abrirFechar();
        itensConstruidos.push(new Garagem(0,0, 200, 200));
        itensConstruidos[0].seguirMouse();
    }
    this.itens[1].botaoComprar.onclick = function() {
        construcao.abrirFechar();
    }
    this.itens[2].botaoComprar.onclick = function() {
        construcao.abrirFechar();
    }
    this.itens[3].botaoComprar.onclick = function() {
        construcao.abrirFechar();
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
                this.itens[i].botaoComprar.ativarInteracao();
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
                botoes.pop();
            }

            ativarBotoes();
        }
        atualizar();
    }
}