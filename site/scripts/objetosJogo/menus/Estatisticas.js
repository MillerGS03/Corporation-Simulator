var valores = new Array(1, 2, 3, 4, 5, 6);
function Estatisticas()
{
    this.width = 700;
    this.height = 500;
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
            ctx.fillText("Estatísticas", this.x + this.width/2, this.y + 10, this.width - 5);

            estatisticas.btnFechar.desenhar();

            roundRect(this.x, this.y + 60, this.width, this.height - 60, {lowerLeft: 20, lowerRight: 20 }, true, true);
            desenharGrafico(this.x, this.y);
            ctx.restore();
        }
    }
    this.abrirFechar = function() {
        this.aberto = !this.aberto;
        if (this.aberto)
        {
            desativarBotoes();
            this.btnFechar.ativarInteracao();
        }
        else
        {
            this.btnFechar.desativarInteracao();
            this.btnFechar.hovering = false;
            ativarBotoes();
        }
        atualizar();
    }
}
function desenharGrafico(x, y)
{
    y += 60;
    ctx.strokeStyle = "#eee";
    ctx.stroke();

    // axis
    ctx.beginPath();
    ctx.lineTo(x, y);
    ctx.moveTo(x + 30, y + 290);
    ctx.lineTo(x + 530, y + 290);
    ctx.moveTo(x + 60, y);
    ctx.lineTo(x + 60, y + 375);

    
    ctx.strokeStyle = "#000";
    ctx.stroke();
    
    // graphing functons

    var roulette17 = (function() {
        var winnings = 0;
        return function() {
            winnings = valores[3];
            return winnings;
        };
    })();

    var lineGraph = function(o) {
        ctx.beginPath();
        ctx.moveTo(x + 60, y + 290);
        for(var i = x + 61; i < 500; i += 1) {
            ctx.lineTo(i, y + -o.stepFunction() + 290);
        }
        ctx.strokeStyle = o.color;
        ctx.stroke();
    };

    lineGraph({
        'stepFunction': roulette17,
        'color': '#00e'
    });
}